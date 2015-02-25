//Gruntfile
module.exports = function(grunt) {

//Initializing the configuration object
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        //
        requirejs: {
            compile: {
                options: {
                    baseUrl: "./js_config/",
                    mainConfigFile: "./js_config/config.js",
                    dir: "web/js",
                    removeCombined: true,
                    findNestedDependencies: true,
                    preserveLicenseComments: false,
                    optimize: "none", //none, uglify, uglify2
                }
            }
        },

        //Minify JS
        uglify: {
            requirejs: {
                files: {
                    './js_config/require.min.js': './vendor/requirejs/require.js'
                }
            },

        },

        //For SCSS compile to CSS
        compass: {
            clean: {
                options: {
                    config: 'config.rb',
                    clean: true
                }
            },
            compile: {
                options: {
                    config: 'config.rb',
                    force: false, //false - cache
                }
            },
            watch: {
                options: {
                    watch: true
                }
            }
        },

        jshint: {
            options: {
                camelcase: true,
                curly: true,
                eqeqeq: true,
                eqnull: true,
                forin: true,
                indent: 4,
                trailing: true,
                undef: true,
                browser: true,
                devel: true,
                node: true,
                noarg: true,
                noempty: true,
                nonew: true,
                evil: true,
                globals: {
                    jQuery: true,
                    $: true,
                    define: true
                },
                reporter: require('jshint-stylish')
            },
            all: ['js_config/**/*.js']
        },

        concurrent: {
            watch: {
                tasks: ['watch:requirejs', 'watch:jshint', 'compass:watch'],
                options: {
                    logConcurrentOutput: true
                }
            }
        },

        //Live coding use: grunt watch
        watch: {
            jshint: {
                files: [
                    // Add watched files css
                    'js_config/**/*.js',
                ],
                tasks: ['jshint'],
            },
            requirejs: {
                files: [
                    // Add watched files js
                    'js_config/common.js',
                    'js_config/config.js',
                    //'js_config/pages/**/*.js',
                    'js_config/module/*.js',
                ],
                tasks: ['requirejs'],
            },
        },

        clean: {
            boostrap: ["web/fonts/*"],
            css: ["web/css/*"],
        },

        copy: {
            boostrap: {
                files: [
                    {expand: true, cwd: 'vendor/bootstrap-sass/assets/fonts/', src: ['**'], dest: 'web/fonts/'},
                ]
            }
        },

    });

// Plugin loading
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');

    // Run `grunt` for compile project and JSHint
    grunt.registerTask('default', ['uglify:requirejs','requirejs:compile', 'clean:boostrap', 'copy:boostrap', 'clean:css', 'compass:compile', 'concurrent']);

    grunt.registerTask('deploy', ['uglify:requirejs','requirejs:compile', 'clean:boostrap', 'copy:boostrap', 'clean:css', 'compass:compile']);

};