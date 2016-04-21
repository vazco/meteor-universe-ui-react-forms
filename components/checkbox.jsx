import React from 'react';
import UniUI from '../lib/UniUI.jsx';
import {findDOMNode} from 'react-dom';

export const Checkbox = React.createClass({
    displayName: 'Checkbox',

    componentDidMount () {
        $('.checkbox', findDOMNode(this))
            .checkbox(this.props.value ? 'check' : 'uncheck')
            .checkbox({
                onChecked:   () => this.props.valueLink.requestChange(true),
                onUnchecked: () => this.props.valueLink.requestChange(false)
            });
    },

    componentDidUpdate () {
        $('.checkbox', findDOMNode(this))
            .checkbox(this.props.value ? 'check' : 'uncheck');
    },

    render () {
        const {className = '', name, label} = this.props;

        return (
            <div className="field">
                <div className={`ui ${className} checkbox`}>
                    {label && (
                        <label>
                            {label}
                        </label>
                    )}

                    <input type="checkbox" name={name} className="hidden"/>
                </div>
            </div>
        );
    }
});

UniUI.registerComponent('checkbox', {
    edit (props) {
        return (
            <Checkbox {...props}/>
        );
    },

    view ({label, value, className}) {
        return (
            <p className={className}>{label ? label + ': ' : undefined}{value ? 'yes' : 'no'}</p>
        );
    }
});
