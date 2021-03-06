<h1 align="center">
    <a href="https://github.com/vazco">vazco</a>/Universe UI React Forms
</h1>

&nbsp;

<h3 align="center">
  -- Abandonware. This package is deprecated! --
</h3>

&nbsp;

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
import {UniUI} from '{universe:ui-react-forms}';
import {DualLinkMixin} from '{universe:utilities-react}';

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

### License

<img src="https://vazco.eu/banner.png" align="right">

**Like every package maintained by [Vazco](https://vazco.eu/), Universe UI React Forms is [MIT licensed](https://github.com/vazco/uniforms/blob/master/LICENSE).**
