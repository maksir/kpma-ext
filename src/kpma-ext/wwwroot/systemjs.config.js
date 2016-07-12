
// SystemJS configuration file, see links for more information
// https://github.com/systemjs/systemjs
// https://github.com/systemjs/systemjs/blob/master/docs/config-api.md
/***********************************************************************************************
 * User Configuration.
 **********************************************************************************************/
/** Map relative paths to URLs. */
var map = {};
/** User packages configuration. */
var packages = {};
////////////////////////////////////////////////////////////////////////////////////////////////
/***********************************************************************************************
 * Everything underneath this line is managed by the CLI.
 **********************************************************************************************/

/*
var barrels = [
    // Angular specific barrels.
    '@angular/core',
    '@angular/common',
    '@angular/compiler',
    '@angular/forms',
    '@angular/http',
    '@angular/router',
    '@angular/platform-browser',
    '@angular/platform-browser-dynamic',
    // Thirdparty barrels.
    'rxjs',
    // App specific barrels.
    'app'
];
var cliSystemConfigPackages = {};
barrels.forEach(function (barrelName) {
	cliSystemConfigPackages[barrelName] = { main: 'index' };
});
// Apply the CLI SystemJS configuration.
System.config({
	map: {
		'@angular': 'lib/@angular',
		'rxjs': 'lib/rxjs'
	},
	packages: cliSystemConfigPackages
});
// Apply the user's configuration.
System.config({ map: map, packages: packages });
//# sourceMappingURL=system-config.js.map
*/


(function (global) {
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

