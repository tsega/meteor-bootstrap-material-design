'use strict';
$ =jQuery.noConflict();

var plugins = ['affix', 'alert', 'button', 'carousel', 'collapse', 'dropdown', 'modal', 'popover', 'scrollspy', 'tab', 'tooltip'];

document.addEventListener('DOMContentLoaded', function() {
    // test plugins
    plugins.forEach(function (plugin) {
      Tinytest.add('Plugin - ' + plugin, function (test) {
        test.instanceOf($(document.body)[plugin], Function, 'instantiated correctly');
      });
    });

    // visual check
    plugins.forEach(function (plugin) {

      Tinytest.addAsync('Visual check - ' + plugin, function (test, done) {
        var bootstrapDropZone = document.createElement('div');
        document.body.appendChild(bootstrapDropZone);


        HTTP.get('http://rawgit.com/twbs/bootstrap/master/js/tests/visual/' + plugin + '.html', function callback(error, result) {
          if (error) {
            test.fail('Error getting the test file. Do we have an Internet connection to rawgit.com?');
          } else {
            // [^] matches across newlines. Stay within the container div, or else the fragment will attempt to load resources on its own.
            bootstrapDropZone.innerHTML = result.content.match(/<div[^]+<\/div>/);
            test.ok({message: 'Test passed if the display looks OK *and* clicking dropdowns/popovers/tooltips works.'});
          }

          done();
        });

      });

    });


    Tinytest.addAsync('Visual check - Material Design', function (test, done) {
      var bootstrapDropZone = document.createElement('div');
      document.body.appendChild(bootstrapDropZone);

      HTTP.get('http://rawgit.com/FezVrasta/bootstrap-material-design/master/bootstrap-elements.html', function callback(error, result) {
        if (error) {
          test.fail('Error getting the FezVrasta test file. Do we have an Internet connection to rawgit.com?');
        } else {
          // [^] matches across newlines. Stay within the container div, or else the fragment will attempt to load resources on its own.
          bootstrapDropZone.innerHTML = result.content.match(/<meta name="viewport"[^]+<script src=/);
          test.ok({message: 'Test passed if the display looks OK *and* clicking dropdowns/popovers/tooltips works.'});
          // only does anything after loading the 'dropdown' plugin test
          $('[data-toggle="dropdown"]').dropdown();
          // only does anything after loading the 'popover' plugin test
          $('[data-toggle="popover"]').popover();
          // only does anything after loading the 'tooltip' plugin test
          $('[data-toggle="tooltip"]').tooltip();
          // don't initialize the modals because that messes up the Tinytest runner HTML
          $.material.init();
        }

        done();
      });

    });

});
