import {UniUI} from '../lib/UniUI';

UniUI.registerComponent('text', {
    edit ({name, label, className = '', placeholder, valueLink}) {
        return (
            <div className="field">
                {label ?
                    <label>{label}</label>
                : undefined}

                <div className={'ui input ' + className}>
                    <input type="text" name={name} placeholder={placeholder} valueLink={valueLink}/>
                </div>
            </div>
        );
    },

    view ({label, value, className}) {
        return (
            <p className={className}>
                {label && (
                    label + ': '
                )}{value}
            </p>
        );
    }
});