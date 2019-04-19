var path = require('path');
var webpack = require('webpack');
var packageJSON = require('./package.json');
/**
 * Env
 * Get npm lifecycle event to identify the environment
 */
var ENV = process.env.npm_lifecycle_event;

var config  = {
    entry: './examples/' + ENV + '/main.js',
    output: {
        // path: __dirname,
        path: path.join(__dirname, './examples/' + ENV + '/'),
        filename: 'bundler.js'
    },
    module: {
        loaders: [
            {
                loader: 'babel-loader',
                test: /\.js$/,
                query: {
                    presets: ['env','omi'],
                    plugins : [
                      "transform-es3-property-literals",
                      "transform-es3-member-expression-literals",
                      "transform-class-properties",
                      "transform-object-rest-spread"
                  ]
                }
            },
            {
              test: /\.(png|jpg|gif)$/i,
              use: [
                {
                  loader: 'url-loader',
                  options: {
                    limit: 8192
                  }
                }
              ]
            }
        ]
    },
    plugins: [
        // Avoid publishing files when compilation fails
        new webpack.NoEmitOnErrorsPlugin()
    ],
    stats: {
        // Nice colored output
        colors: true
    },
    // Create Sourcemaps for the bundle
    // devtool: 'source-map',
};

if(ENV === 'build'||ENV === 'build-min'){
    config = {
        entry: {
            'omiu': './src/index.js'
        },
        output: {
            // path: __dirname,
            path: path.join(__dirname, 'src/dist/'),
            library:'Omiu',
            libraryTarget: 'umd',
            filename:  '[name].js'
            //umdNamedDefine: true
        },
        externals: {
            "omi": 'omi',
            "omio": 'omi'
        },
        module: {
            loaders: [
                {
                    loader: 'babel-loader',
                    test: path.join(__dirname, 'src'),
                    query: {
                        presets: ['env','omi'],
                        plugins : [
                            "transform-es3-property-literals",
                            "transform-es3-member-expression-literals",
                            "transform-class-properties",
                            "transform-object-rest-spread"
                        ]
                    },
                },
                {
                  test: /[\\|\/]_[\S]*\.css$/,
                  use: [
                      'to-string-loader',
                      'css-loader'
                  ]
                },
            ]
        },
        plugins: [
            // Avoid publishing files when compilation fails
            new webpack.BannerPlugin(" omiu v"+packageJSON.version+" By dntzhang \r\n Github: https://github.com/AlloyTeam/omi\r\n MIT Licensed."),
            new webpack.NoEmitOnErrorsPlugin()
        ],
        stats: {
            // Nice colored output
            colors: true
        },
        // Create Sourcemaps for the bundle
        // devtool: 'source-map',
    };

    if(ENV === 'build-min'){
        config.plugins.push(new webpack.optimize.UglifyJsPlugin());
        config.entry = {
            'omiu.min': './src/index.js'
        };
    }
}

module.exports = config;
