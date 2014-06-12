var grunt = require('grunt');
var prerender = grunt.option('prerender');

module.exports = {
  indexHTMLDebugApp: {
    src : 'app/index.html', dest : 'tmp/result/index.html',
    options: { context: { dist: false, tests: false, prerender: prerender } }
  },
  indexHTMLDebugTests: {
    src : 'app/index.html', dest : 'tmp/result/tests/index.html',
    options: { context: { dist: false, tests: true, prerender: prerender } }
  },
  indexHTMLDistApp: {
    src : 'app/index.html', dest : 'tmp/result/index.html',
    options: { context: { dist: true, tests: false, prerender: prerender } }
  },
  indexHTMLDistTests: {
    src : 'app/index.html', dest : 'tmp/result/tests/index.html',
    options: { context: { dist: true, tests: true, prerender: prerender } }
  }
};