import React from 'react';
import {findDOMNode} from 'react-dom';

export const Form = React.createClass({
    componentDidMount () {
        const done = this.done;
        const wrapListener = (listener) => {
            return function () {
                return !!listener($(this).form('refresh').form('get values'), done);
            };
        };

        $(findDOMNode(this)).form({
            inline: true,

            onFailure: wrapListener((...args) => UniUtils.get(this, 'props.onFailure', () => {})(...args)),
            onSuccess: wrapListener((...args) => UniUtils.get(this, 'props.onSuccess', () => {})(...args)),

            ...this.props.form
        });
    },

    render () {
        const {className = '', ...props} = this.props;

        return (
            <div className={`ui ${className} form`} {...props}/>
        );
    },

    done (errors) {
        errors = errors ? [].concat(errors) : [];

        const still = _.pluck(errors, 'field');
        const $form = $(findDOMNode(this));

        if (errors.length) {
            $form.form('set error')
                 .form('add errors', errors.map(({field, message}) => {
                     if (field && message) {
                         if ($form.form('has field',  field)) {
                             $form.form('add prompt', field, message);
                         }
                     }

                     return message;
                 }))
                 .find('[name]').each(function () {
                     const name = $(this).attr('name');

                     if (still.indexOf(name) === -1) {
                         $form.form('remove prompt', name);
                     }
                 });
        } else {
            $form.form('set success')
                 .find('[name]').each(function () {
                     $form.form('remove prompt', $(this).attr('name'));
                 });
        }
    }
});
