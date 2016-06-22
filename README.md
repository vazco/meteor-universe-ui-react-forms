<a href="http://unicms.io"><img src="http://unicms.io/banners/standalone.png" /></a>

# universe:ui-react-forms

### Basic usage
```js
export const Collection = new UniCollection('collection');

Collection.setSchema({
    'field1': {
        type: String,
        uniUI: {
            component: 'text'  // explicit; component is deduced from type
            componentProps: {} // extra component props,

            // Extra options to specific modes
            view: {label: '', className: ''},
            edit: {label: '', className: '', placeholder: ''}
        }
    },

    'field2': {
        type: Object
    },

    'field2.subField': {
        type: Number
    }
});
```

```js
import {UniUI} from 'meteor/universe:admin:ui-react-forms';
import {DualLinkMixin} from 'meteor/universe:utilities-react';

import Collection from 'Collection';

export const CollectionForm = React.createClass({
    displayName: 'CollectionForm',

    mixins: [DualLinkMixin],

    componentWillMount () {
        this.dualLink().setRemote(this.props.doc);
    },

    componentWillReceiveProps (props) {
        this.dualLink().clear();
        this.dualLink().setRemote(props.doc);
    },

    render () {
        return UniUI.render(this.dualLink(), (doc, done) => {
            console.log('onSubmit', doc);
            done();
        }, 'edit');
    }
});
```
