import {UniUI} from '../lib/UniUI';
import React from 'react';
import ReactDOM from 'react-dom';

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