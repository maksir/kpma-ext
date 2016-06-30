﻿(function (global) {
	// map tells the System loader where to look for things
	var map = {
		'app': 'app', // 'dist',
		'@angular': 'lib/@angular',
		'rxjs': 'lib/rxjs',
		'@services': 'app/services'
	};
	// packages tells the System loader how to load when no filename and/or no extension
	var packages = {
		'app': { main: 'boot.js', defaultExtension: 'js' },
		'rxjs': { defaultExtension: 'js' }
	};
	var ngPackageNames = [
      'common',
      'compiler',
      'core',
	  'forms',
      'http',
      'platform-browser',
      'platform-browser-dynamic',
      'router',
      'router-deprecated',
      'upgrade',
	];
	// Add package entries for angular packages
	ngPackageNames.forEach(function (pkgName) {

		packages['@angular/' + pkgName] = { main: 'bundles/' + pkgName + '.umd.js', defaultExtension: 'js' };
		
	});

	packages['@angular/router'] = { main: 'index.js', defaultExtension: 'js' };

	var config = {
		map: map,
		packages: packages
	}
	System.config(config);
})(this);