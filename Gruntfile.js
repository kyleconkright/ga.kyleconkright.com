module.exports = function(grunt) {

  // Project configuration.
  	grunt.initConfig({
	    pkg: grunt.file.readJSON('package.json'),
	    
	    sass: {
	    	dist: {
		      	options: {
		        	style: 'compressed'
		      	},
		      	files: {
		        	'tmp/global.css': 'lib/global.scss'
		      	}
		    }
		},
		cssmin: {
		  	combine: {
		    	files: {
		      		'tmp/globalmin.css': ['lib/vendor/lemonade.css', 'tmp/global.css']
		    	}
		  	}
		},
		autoprefixer: {
            dist: {
                files: {
                    'build/css/global.css':['tmp/globalmin.css']
                }
            }
        },
        coffee: {
          compile: {
	            files: {
	              	'tmp/script.js': 'lib/script.coffee'
	            }
          	}
      	},
      	uglify: {
      		my_target: {
      		    files: {
      		    	'build/js/vendor.min.js': ['lib/vendor/jquery.js','lib/vendor/lightbox.js','lib/vendor/slides.js'],
      		    	'build/js/script.min.js': 'tmp/script.js'
      		    }
      		}
	    },
	    imagemin: {                          
	        dynamic: {
	        	options: {
	        		optimizationLevel: 1,
	        		cache: false
	        	}, 
		        files: [{
		          expand: true,
		          cwd: 'assets/series-max/',
		          src: ['**/*.jpg'],
		          dest: 'assets/series/'
		        }]
	        }
	    },
	    watch: {
	     	css: {
	        	files: 'lib/*.scss',
	        	tasks: ['sass','cssmin','autoprefixer'],
	        	options: {
	          		livereload: true,
	        	},
	      	},
	      	scripts: {
	      	    files: 'lib/*.coffee',
	      	    tasks: ['coffee','uglify']
	      	},
	    }

  	});

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  // Default task(s).
  grunt.registerTask('default', ['uglify','sass','autoprefixer','coffee','watch','imagemin','cssmin']);


};