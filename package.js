Package.describe({
    name: 'universe:ui-react-forms',
    summary: 'Forms components for UniCMS.',
    version: '0.1.4',
    readme: 'README.md'
});

Package.onUse(function (api) {
    api.versionsFrom('1.2.0.2');

    api.use([
        'aldeed:simple-schema@1.5.3',
        'universe:ui-react@0.1.0',
        'underscore',
        'check',
        'ecmascript'
    ]);

    api.addFiles([
        'index.js'
    ]);
    api.mainModule('index.js');
});
