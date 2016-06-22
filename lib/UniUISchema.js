import React from 'react';

SimpleSchema.extendOptions({
    uniUI: Match.Optional(Match.ObjectIncluding({
        // Component
        //
        // Values:
        //     String (name of registered view component)
        //     [String] (name of registered view component in brackets)
        //
        // Default: based on type of field
        component: Match.Optional(Match.OneOf(String, [String])),

        // Component props
        //
        // Default: {}
        componentProps: Match.Optional(Object),

        // Edit mode options
        edit: Match.Optional(Match.ObjectIncluding({
            // Label of field
            //
            // Values:
            //     true   (label from schema)
            //     false  (none)
            //     String (this)
            //
            // Default: true
            label: Match.Optional(Match.OneOf(Boolean, String)),

            // Placeholder of field
            //
            // Values:
            //     true   (label from schema)
            //     false  (none)
            //     String (this)
            //
            // Default: true
            placeholder: Match.Optional(Match.OneOf(Boolean, String)),

            // Additional component className
            //
            // Values:
            //     String (this)
            //
            // Default: undefined
            className: Match.Optional(String)
        })),

        // View mode options
        view: Match.Optional(Match.ObjectIncluding({
            // Label of field
            //
            // Values:
            //     true   (label from schema)
            //     false  (none)
            //     String (this)
            //
            // Default: true
            label: Match.Optional(Match.OneOf(Boolean, String)),

            // Additional component className
            //
            // Values:
            //     String (this)
            //
            // Default: undefined
            className: Match.Optional(String)
        }))
    }))
});