import {UniUI} from '../lib/UniUI';

export const Dropdown = React.createClass({
    componentDidMount () {
        $('.ui.dropdown', ReactDOM.findDOMNode(this)).dropdown({
            match: 'text',
            fullTextSearch: true,

            onChange: (value) => this.props.valueLink.requestChange(value)
        });

        this.update();
    },

    componentWillReceiveProps (props) {
        if (!_.isEqual(props.value, this.props.value) ||
            !_.isEqual(props.field.allowedValues, this.props.field.allowedValues)
        ) {
            // This seems to be buggy.
            // this.update();
            Meteor.setTimeout(() => this.update());
        }
    },

    render () {
        const {
            name,
            label,
            className = '',
            placeholder,
            transformOption = x => x,
            field: {allowedValues: options = []}
        } = this.props;

        return (
            <div className="field">
                {label ?
                    <label>{label}</label>
                : undefined}

                <select name={name} multiple={className.indexOf('multiple') !== -1}
                        className={'ui search selection ' + className + ' dropdown'}
                >
                    {placeholder ?
                        <option value="">{placeholder}</option>
                    : undefined}

                    {options.map((option) => {
                        return <option value={option} key={option}>
                            {transformOption(option)}
                        </option>;
                    })}
                </select>
            </div>
        );
    },

    update () {
        const requestChange = this.props.valueLink.requestChange;

        // To stop circular calls.

        this.props.valueLink.requestChange = () => {};
        const $dropdown = $('.ui.dropdown', ReactDOM.findDOMNode(this)).dropdown('clear');
        [].concat(this.props.value).map(value => $dropdown.dropdown('set selected', value));
        this.props.valueLink.requestChange = requestChange;
    }
});

UniUI.registerComponent('dropdown', {
    edit (params) {
        return (
            <Dropdown {...params}/>
        );
    },

    view (params) {
        return (
            <Dropdown {...params} disabled={true}/>
        );
    }
});
