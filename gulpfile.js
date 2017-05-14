var gulp = require('gulp');
var gutil = require('gulp-util');
var runSequence = require('run-sequence');

var ver = getVersion();
var destFolder = 'DEMC_' + ver;



function fileGenerator(filename, string) {
    var src = require('stream').Readable({objectMode: true})
    src._read = function () {
        this.push(new gutil.File({
            cwd: "",
            base: "",
            path: filename,
            contents: new Buffer(string)
        }))
        this.push(null)
    }
    return src
}

function getVersion() {
    var pkg = require('./package.json');
    return pkg.version;
}


gulp.task('populate release folder', function () {
    gulp.src('server/**')
        .pipe(gulp.dest(destFolder + '/server'));

    gulp.src('dist/**')
        .pipe(gulp.dest(destFolder  + '/dist'))

});

gulp.task('create start file', function () {
    let content = 'cd server/src \r\n'+
        'node main.js';
    return fileGenerator("start.bat", content).pipe(gulp.dest(destFolder));
});

gulp.task('release', runSequence('populate release folder', 'create start file'));


