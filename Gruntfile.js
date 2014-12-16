var mozjpeg = require('imagemin-mozjpeg');

module.exports = function (grunt) {

    'use strict';

    // Project configuration.
    grunt.initConfig({


        /*
         * Metadata
         */
        pkg: grunt.file.readJSON('package.json'),

        banner: '/* <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
                '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
                '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
                '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
        ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',


        /*
         * Tasks configuration.
         */
        clean:  ['public'],

        cssmin: {
            add_banner: {
                options: {
                    banner: '<%= banner %>'
                },
                files:   {
                    'public/app.min.css': ['app/assets/css/**/*.css']
                }
            }
        },

        concat: {
            options: {
                banner:       '<%= banner %>',
                stripBanners: true
            },
            css:     {
                src:  ['app/assets/css/**/*.css'],
                dest: 'public/app.min.css'
            }
        },

        connect: {
            server: {
                options: {
                    hostname:  'localhost',
                    keepalive: true,
                    port:      1337,
                    base:      'public'
                }
            }
        },

        copy: {
            html:   {
                expand: true,
                cwd:    'app/public/',
                src:    '**/*.html',
                dest:   'public/'
            },
            img:    {
                expand: true,
                cwd:    'app/assets/img/',
                src:    '**/*',
                dest:   'public/img/'
            },
            public: {
                expand: true,
                cwd:    'app/public/',
                src:    ['**/*', '!**/*.html'],
                dest:   'public/'
            }
        },

        htmlmin: {
            dist: {
                options: {
                    removeComments:     true,
                    collapseWhitespace: true
                },
                files:   [
                    {
                        expand: true,
                        cwd:    'app/public',
                        src:    '**/*.html',
                        dest:   'public/'
                    }]
            }
        },

        imagemin: {
            dynamic: {
                files: [
                    {
                        expand: true,
                        cwd:    'app/assets/img/',
                        src:    ['**/*.{png,jpg,gif}'],
                        dest:   'public/img/'
                    }]
            }
        },

        uglify: {
            options: {
                banner: '<%= banner %>'
            },
            dev:     {
                options: {
                    beautify: {
                        width:    120,
                        beautify: true
                    }
                },
                files:   {
                    'public/app.min.js': ['app/assets/js/**/*.js']
                }
            },
            prod:    {
                src:  'app/assets/js/**/*.js',
                dest: 'public/app.min.js'
            }
        },

        watch: {
            css: {
                files: 'app/assets/css/**/*.css',
                tasks: ['css']
            },
            img: {
                files: 'app/assets/img/**/*',
                tasks: ['img']
            },
            js:  {
                files: 'app/assets/js/**/*.js',
                tasks: ['js']
            }
        }
    });


    /*
     * Load Grunt plugins
     */
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');


    /*
     * Custom tasks
     */
    grunt.registerTask('css', ['concat:css']);
    grunt.registerTask('css-prod', ['cssmin']);

    grunt.registerTask('html', ['copy:html', 'copy:public']);
    grunt.registerTask('html-prod', ['htmlmin', 'copy:public']);

    grunt.registerTask('img', ['copy:img']);
    grunt.registerTask('img-prod', ['imagemin']);

    grunt.registerTask('js', ['uglify:dev']);
    grunt.registerTask('js-prod', ['uglify:prod']);

    grunt.registerTask('default', ['css', 'html', 'img', 'js']);
    grunt.registerTask('build', ['css-prod', 'html-prod', 'img-prod', 'js-prod']);

    grunt.registerTask('start', ['default', 'watch']);
    grunt.registerTask('server', ['connect']);
};
