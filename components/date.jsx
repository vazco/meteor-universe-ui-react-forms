import {UniUI} from '../lib/UniUI.jsx';

export const DatePicker = React.createClass({
    getDefaultProps () {
        return {
            value: null,
            format: 'DD-MM-YYYY HH:mm'
        };
    },

    getInitialState () {
        let date;

        if (_.isString(this.props.value)) {
            date = moment(this.props.value, this.props.format, true);
        } else {
            date = moment(this.props.value);
        }

        return {
            value: date.isValid() ? date.format(this.props.format) : ''
        };
    },

    render () {
        if (this.props.disabled) {
            return (
                <p>
                    {this.props.label} {this.state.value}
                </p>
            );
        }

        return (
            <input type="text" placeholder={this.props.placeholder + ' (' + this.props.format + ')'}
                   onBlur={this.onBlur} onChange={this.onChange} value={this.state.value} name={this.props.name}
            />
       );
    },

    onBlur () {
        const date = moment(this.state.value, this.props.format, true);

        if (date.isValid()) {
            this.props.valueLink.requestChange(date.toDate());
        } else {
            this.setState({
                value: 'Invalid date'
            });
        }
    },

    onChange (event) {
        this.setState({
            value: event.target.value
        });
    }
});

UniUI.registerComponent('date', {
    edit (props) {
        return (
            <div className="field">
                {props.label ? <label>{props.label}</label> : undefined}
                <div className="ui input">
                    <DatePicker {...props}/>
                </div>
            </div>
        );
    },

    view (props) {
        return (
            <div className="field">
                {props.label ? <p>{props.label}</p> : undefined}
                <DatePicker disabled={true} {...props}/>
            </div>
        );
    }
});
