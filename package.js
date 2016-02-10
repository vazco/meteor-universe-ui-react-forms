Package.describe({
    name: 'universe:ui-react-forms',
    summary: 'Forms components for UniCMS.',
    version: '0.1.1',
    readme: 'README.md'
});

Package.onUse(function (api) {
    api.versionsFrom('1.2.0.2');

    api.use([
        'aldeed:simple-schema@1.5.3',
        'universe:ui-react@0.1.0',
        'universe:modules@0.6.8',
        'react-runtime@0.14.4',
        'underscore',
        'check'
    ]);

    api.addFiles([
        'index.import.js',

        'lib/UniUI.import.jsx',
        'lib/UniUISchema.import.js',

        'components/Form.import.jsx',

        'components/checkbox.import.jsx',
        'components/composite.email.import.jsx',
        'components/composite.import.jsx',
        'components/date.import.jsx',
        'components/dropdown.import.jsx',
        'components/none.import.jsx',
        'components/number.import.jsx',
        'components/text.import.jsx',
        'components/text.password.import.jsx'
    ]);
});
