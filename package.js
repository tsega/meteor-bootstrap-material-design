// package metadata file for Meteor.js
'use strict';

var packageName = 'tsega:bootstrap-material-design';
var where = 'client';

Package.describe({
  name: packageName,
  version: '0.5.10_0.0.1',
  // Brief, one-line summary of the package.
  summary: 'Material Design for Bootstrap V3',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/tsega/meteor-bootstrap-material-design',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('METEOR@1.2');
  api.use('twbs:bootstrap@3.3.6');
  api.use('jquery');
  api.addFiles([
    'src/css/bootstrap-material-design.css',
    'src/css/ripples.css',
    'src/js/material.js',
    'src/js/ripples.js',
    'src/js/init.js'
  ], where);
});

Package.onTest(function(api) {
  api.use(packageName, where);
  api.use(['tinytest', 'http'], where);
  api.addFiles('test/test.js', where);
});
