﻿var gulp = require('gulp'),
    Q = require('q'),
    rimraf = require('rimraf');

gulp.task('clean', function (cb) {
	return rimraf('./wwwroot/lib/', cb);
});

gulp.task('copy:lib', function () {
	var libs = [
        "@angular",
        "systemjs",
        "core-js",
        "zone.js",
        "reflect-metadata",
        "rxjs"
	];

	var promises = [];

	libs.forEach(function (lib) {
		var defer = Q.defer();
		var pipeline = gulp
            .src('node_modules/' + lib + '/**/*')
            .pipe(gulp.dest('./wwwroot/lib/' + lib));

		pipeline.on('end', function () {
			defer.resolve();
		});
		promises.push(defer.promise);
	});

	return Q.all(promises);
});

gulp.task('jquery', function () {
	gulp.src(["lib/jquery/dist/*"]).pipe(gulp.dest("wwwroot/lib/jquery"));
});

gulp.task('bootstrap', ['jquery'], function () {
	gulp.src(["lib/bootstrap/dist/*/*.*"]).pipe(gulp.dest("wwwroot/lib/bootstrap"));
});

gulp.task("fontawesome", function () {
	gulp.src(["lib/font-awesome/css/*"]).pipe(gulp.dest("wwwroot/lib/fontawesome"));
	gulp.src(["lib/font-awesome/fonts/*"]).pipe(gulp.dest("wwwroot/lib/fonts"));
});