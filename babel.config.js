
function buildPresets() {
    const presets = [];

    const targets = {
        chrome: '58'
    };
    presets.push([
        '@babel/preset-env',
        {
            targets: targets,
            modules: false,
            useBuiltIns: 'usage'
        }
    ]);
    // include react preset after preset-env
    presets.push('@babel/preset-react');

    return presets;
}

function buildPlugins() {
    const plugins = [
        ['@babel/plugin-proposal-class-properties', { loose: true }],
        [
            '@babel/plugin-transform-runtime',
            {
                corejs: false,
                helpers: false,
                regenerator: true,
                useESModules: false
            }
        ],
        // Allows async/await
        '@babel/plugin-transform-regenerator',
        // allows const { a, b } = object;
        '@babel/plugin-transform-destructuring',
        // Allows const { prop1, prop2, ...rest } = object;
        '@babel/plugin-proposal-object-rest-spread',
        // Allows for dynamic imports
        '@babel/plugin-syntax-dynamic-import'
    ];
    return plugins;
}

module.exports = function(api) {
    api.cache(true);
    const retCfg = {
        babelrc: false,
        presets: buildPresets(),
        plugins: buildPlugins(),
    };

    return retCfg;
};
