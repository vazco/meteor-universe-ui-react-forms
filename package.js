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
        'universe:utilities@2.2.2',
        'modules@0.5.0-modules.8',
        'ecmascript@0.4.0-modules.8',
        'underscore',
        'check'
    ]);

    api.addFiles([
        'index.js',

        'lib/UniUI.jsx',
        'lib/UniUISchema.js',

        'components/Form.jsx',

        'components/checkbox.jsx',
        'components/composite.email.jsx',
        'components/composite.jsx',
        'components/date.jsx',
        'components/dropdown.jsx',
        'components/none.jsx',
        'components/number.jsx',
        'components/text.jsx',
        'components/text.password.jsx'
    ]);
});
