import {UniUI} from '../lib/UniUI';
import React from 'react';
import ReactDOM from 'react-dom';

UniUI.inheritComponent('composite.email', 'composite', {
    edit ({renderField}) {
        return (
            <div className="two fields">
                <div className="twelve wide field">
                    {renderField('address', 'edit', {
                        schemaExtension: {
                            uniUI: {
                                edit: {
                                    label: false
                                }
                            }
                        }
                    })}
                </div>
                <div className="four wide field">
                    <div className="ui basic compact segment" style={{
                        padding: '0.65em'
                    }}>
                        {renderField('verified', 'edit')}
                    </div>
                </div>
            </div>
        );
    }
});