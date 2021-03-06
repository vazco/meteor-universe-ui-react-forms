import {UniUI} from '../lib/UniUI';

UniUI.registerComponent('composite', {
    edit ({renderField, subFields}) {
        return (
            <div>
                {subFields.map((field) => {
                    field = field.indexOf('$.') === 0 ? field.substr(2) : field;

                    if (field) {
                        return (
                            <div key={field}>
                                {renderField(field)}
                            </div>
                        );
                    }

                    return null;
                })}
            </div>
        );
    },

    view ({renderField, subFields}) {
        return (
            <div className="ui message">
                {subFields.map((field) => {
                    field = field.indexOf('$.') === 0 ? field.substr(2) : field;

                    if (field) {
                        return (
                            <div key={field}>
                                {renderField(field)}
                            </div>
                        );
                    }

                    return null;
                })}
            </div>
        );
    }
});