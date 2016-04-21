import React from 'react';
import {UniUI} from '../lib/UniUI.jsx';

export const CompositeEmail = UniUI.inheritComponent('composite.email', 'composite', {
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