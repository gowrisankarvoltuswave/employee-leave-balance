module.exports = function (grunt) {
    grunt.initConfig({
        concat: {
            js: {
                src: ['public/scripts/controllers/*.js', 'public/scripts/services/*.js', 'public/scripts/factorys/*.js', 'public/scripts/config.js'],
                dest: 'public/build/script.js',
            },
            options: {
                inline: true,
                context: {
                    DEBUG: false
                }
            }
        },
        watch: {
            js: {
                files: ['public/scripts/controllers/*.js', 'public/scripts/services/*.js', 'public/scripts/factorys/*.js', 'public/scripts/config.js'],
                tasks: ['concat']
            },
        },
        uglify: {
            my_target: {
                options: {
                    mangle: false,
                    context: {
                        DEBUG: false
                    }
                },
                files: {
                    'public/build/script.min.js': ['public/build/script.js'],
                },
            },
        },
    });
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.registerTask('default', ['concat', 'watch', 'uglify', 'clean:build'])

}




// 'public/scripts/config.js'