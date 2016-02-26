import {UniUI} from '../lib/UniUI.jsx';

UniUI.registerComponent('number', {
    edit ({name, label, className = '', field: {min, max, decimal}, placeholder, valueLink}) {
        return (
            <div className="field">
                {label && (
                    <label>{label}</label>
                )}

                <div className={'ui input ' + className}>
                    <input type="number" max={max} min={min} step={decimal ? '0.01' : '1'}
                           name={name} placeholder={placeholder} valueLink={valueLink}
                    />
                </div>
            </div>
        );
    },

    view ({label, field: {decimal}, value, className}) {
        if (decimal) {
            value = value.toFixed(2);
        }

        return (
            <p className={className}>
                {label ? label + ': ' : undefined}{value}
            </p>
        );
    }
});