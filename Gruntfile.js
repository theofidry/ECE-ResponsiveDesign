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

        copy: {
            main: {
                expand: true,
                cwd:    'app/assets/img/',
                src:    '**/*',
                dest:   'public/img/'
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
            img:  {
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
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');


    /*
     * Custom tasks
     */
    grunt.registerTask('css', ['concat:css']);
    grunt.registerTask('css-prod', ['cssmin']);

    grunt.registerTask('js', ['uglify:dev']);
    grunt.registerTask('js-prod', ['uglify:prod']);

    grunt.registerTask('img', ['copy']);
    grunt.registerTask('img-prod', ['imagemin']);

    grunt.registerTask('default', ['css', 'js', 'img']);
    grunt.registerTask('build', ['css-prod', 'js-prod', 'img-prod']);
};
