module.exports = function(grunt) {

  grunt.initConfig({
    watch: {
      jade: {
        files: ['app/views/**'],
        options: {
          livereload: true
        }
      },
      js: {
        files: ['routes/*.js', 'app.js', 'public/javascripts/*.js', 'app/**/*.js'],
        tasks: ['jshint'],
        options: {
          livereload: true
        }
      }
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: ['gruntfile.js', 'routes/*.js', 'app.js', 'public/javascripts/*.js', 'app/**/*.js']
    },

    nodemon: {
      dev: {
        script: './bin/www',
        options: {
          file: './bin/www',
          args: [],
          ignoreFiles: ['README.md', 'node_modules/**', '.DS_Store', '.git'],
          watchedExtensions: ['js'],
          watchedFolders: ['app', 'config'],
          debug: true,
          delayTime: 1,
          env: {
            PORT: 3400
          },
          cwd: __dirname
        }
      }
    },

    concurrent: {
      task: ['nodemon', 'watch', 'jshint'],
      options: {
        logConcurrentOutput: true,
        limit: 3
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.option('force', true);
  grunt.registerTask('default', ['concurrent']);
};
