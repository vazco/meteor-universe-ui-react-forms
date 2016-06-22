import React from 'react';
import ReactDOM from 'react-dom';
import {UniUI} from '../lib/UniUI';

UniUI.inheritComponent('text.password', 'text', {
    edit ({name, label, className = '', placeholder, valueLink}) {
        return (
            <div className="field">
                {label && (
                    <label>{label}</label>
                )}

                <div className={'ui input ' + className}>
                    <input type="password" name={name} placeholder={placeholder} valueLink={valueLink}/>
                </div>
            </div>
        );
    }
});