Package.describe({
    name: 'universe:ui-react-forms',
    summary: 'Forms components for UniCMS.',
    version: '0.1.0',
    readme: 'README.md'
});

Package.onUse(function (api) {
    api.versionsFrom('1.2.0.2');

    api.use([
        'check',
        'underscore',
        'react-runtime@0.14.1_1',

        'aldeed:simple-schema@1.3.3',

        'universe:modules@0.6.7',
        'universe:ui-react@0.1.0'
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
