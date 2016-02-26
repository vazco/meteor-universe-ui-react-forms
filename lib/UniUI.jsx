import {Form} from '../components/Form.jsx';

export class UniUI {
    static inheritComponent (name, inherit, definition) {
        let inherited = UniUI._components[inherit];
        if (inherited === undefined) {
            throw new Meteor.Error(`[UniUI] There is no component '${inherit}'' to inherit.`);
        }

        UniUI._components[name] = {
            ...inherited,
            ...definition
        };
    }

    static registerComponent (name, definition) {
        UniUI._components[name] = definition;
    }

    static render (dualLink, onSuccess, ...args) {
        return new UniUI(dualLink, {schema: args[1] && args[1].schema, onSuccess}).render(...args);
    }

    static createValidator (schema, operation, defaults = {}, dualLink = null) {
        const context = schema.newContext();
        const cleanArrays = (object) => {
            // It needs to be simpler
            return _.reduce(_.keys(object), (cleaned, key) => {
                if (_.isArray(object[key])) {
                    cleaned[key] = object[key].filter(x => x !== undefined);
                } else if (_.isDate(object[key])) {
                    cleaned[key] = object[key];
                } else if (_.isObject(object[key])) {
                    cleaned[key] = cleanArrays(object[key]);
                } else {
                    cleaned[key] = object[key];
                }

                return cleaned;
            }, {});
        };

        return (values, done) => {
            values = schema.clean({
                ...defaults,
                ...dualLink ? dualLink.get() : values
            });
            values = cleanArrays(_.reduce(_.keys(values), (cleaned, field) => {
                return UniUtils.set(cleaned, field, values[field]);
            }, {}));

            if (context.validate(values)) {
                operation(values, done);
            } else {
                done(context.invalidKeys().map(({name: field}) => {
                    return {field, message: context.keyErrorMessage(field)};
                }));
            }

            context.resetValidation();
        };
    }


    constructor (dualLink, {schema = dualLink.get().getSchema(), onSuccess} = {}) {
        if (_.isString(schema) && !dualLink.isEmpty()) {
            schema = dualLink.get().getSchema(schema);
        }

        this.schema    = schema;
        this.dualLink  = dualLink;
        this.onSuccess = onSuccess;
    }

    render (mode, {schema, schemaExtension} = {}) {
        if (_.isString(schema) && !this.dualLink.isEmpty()) {
            schema = this.dualLink.get().getSchema(schema);
        }

        const computedSchema = new SimpleSchema([this.schema, schema]);

        return <Form onSuccess={UniUI.createValidator(computedSchema, this.onSuccess, {}, this.dualLink)}>
            {_.map(computedSchema.schema(), (field, fieldName) => {
                if (fieldName.indexOf('$') !== -1) {
                    return;
                }

                return <div className="field" key={fieldName}>
                    {this.renderField(fieldName, mode, {computedSchema, schemaExtension})
                }</div>;
            }).filter(x => x)}

            <div className="ui error message"></div>
        </Form>;
    }

    renderField (fieldName, mode, {schema, component, schemaExtension} = {}) {
        if (_.isString(schema) && !this.dualLink.isEmpty()) {
            schema = this.dualLink.get().getSchema(schema);
        }

        const computedSchema = new SimpleSchema([this.schema, schema]);
        const computedField = $.extend(true, $.extend(true, {}, computedSchema.schema(fieldName)), schemaExtension);

        let computedComponent = component || this.getComponent(computedField);

        if (_.isArray(computedComponent)) {
            if (computedField.uniUI && computedField.uniUI.component === 'none') {
                return;
            }

            const items = this.dualLink.get(fieldName) || [];

            return items.map((item, index) => {
                if (item === null) {
                    return;
                }

                return <div className="ui message" key={index}>
                    {!_.isNumber(computedField.minCount) || items.filter(x => x).length > computedField.minCount ?
                        <i className="close icon" onClick={() => {
                            const temporary = this.dualLink.get(fieldName);
                            temporary[index] = null;

                            this.dualLink.setLocal(fieldName, temporary);
                        }}></i>
                    : undefined}
                    {this.renderField(fieldName + '.' + index, mode, {
                        schema, component: computedComponent[0], schemaExtension
                    })}
                </div>;
            }).concat((!_.isNumber(computedField.maxCount) || items.filter(x => x).length < computedField.maxCount) && [
                <div className="ui fluid icon button" key="add" onClick={() => {
                    this.dualLink.setLocal(fieldName, (this.dualLink.get(fieldName) || []).concat({
                        [Number]:  0,
                        [String]:  '',
                        [Boolean]: false
                    }[computedField.type] || {}));
                }}>
                    <i className="plus icon"></i>
                </div>
            ]).filter(x => x);
        }

        return computedComponent[mode]({...this.getParams({
            fieldName, computedField, computedSchema, mode
        }), ...UniUtils.get(computedField, 'uniUI.componentProps', {})});
    }

    getComponent ({type, uniUI: {component} = {}}) {
        if (component) {
            if (_.isString(component)) return UniUI._components[component];
            if (_.isArray(component)) return [UniUI._components[component[0]]];
        }

        switch (type) {
            case Date:    return UniUI._components.date;
            case String:  return UniUI._components.text;
            case Number:  return UniUI._components.number;
            case Boolean: return UniUI._components.checkbox;
        }

        switch (type[0]) {
            case Date:      return [UniUI._components.date];
            case String:    return [UniUI._components.text];
            case Number:    return [UniUI._components.number];
            case Boolean:   return [UniUI._components.checkbox];
            case undefined: return UniUI._components.composite;
        }

        return [UniUI._components.composite];
    }

    getParams ({fieldName, computedField, computedSchema, mode}) {
        let params = {
            name: fieldName,
            field: computedField,

            subFields: _.keys(computedSchema.schema()).filter(field => {
                return field.indexOf(fieldName.replace(/\.\d+/g, '.$')) === 0;
            }).map(field => {
                return field.substr(fieldName.replace(/\.\d+/g, '.$').length + 1);
            }).filter(field => {
                return field !== '';
            }),

            value: this.dualLink.get(fieldName),
            valueLink: this.dualLink.valueLink(fieldName),

            className: computedField.uniUI && computedField.uniUI[mode] && computedField.uniUI[mode].className,

            renderField: (name, submode = mode, {schemaExtension} = {}) => {
                return this.renderField(fieldName + '.' + name, submode, {schema: computedSchema, schemaExtension});
            }
        };

        if (computedField.uniUI && computedField.uniUI[mode]) {
            if (computedField.uniUI[mode].label === undefined || computedField.uniUI[mode].label === true) {
                params.label = computedSchema.label(fieldName);
            } else if (_.isString(computedField.uniUI[mode].label)) {
                params.label = computedField.uniUI[mode].label;
            }
        } else {
            params.label = computedSchema.label(fieldName);
        }

        if (computedField.uniUI && computedField.uniUI[mode]) {
            if (computedField.uniUI[mode].placeholder === undefined || computedField.uniUI[mode].placeholder === true) {
                params.placeholder = computedSchema.label(fieldName);
            } else if (_.isString(computedField.uniUI[mode].placeholder)) {
                params.placeholder = computedField.uniUI[mode].placeholder;
            }
        } else {
            params.placeholder = computedSchema.label(fieldName);
        }

        return params;
    }
}

UniUI._components = {};

export default UniUI;
