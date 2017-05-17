var gulp = require('gulp');
var gutil = require('gulp-util');
var runSequence = require('run-sequence');

var del = require("del");


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


gulp.task('populate release / dev folder', function () {
    gulp.src('server/**')
        .pipe(gulp.dest(destFolder + '/server'));

    gulp.src('dist/**')
        .pipe(gulp.dest(destFolder  + '/dist'))

});


gulp.task('create start file', () => {
    let content = 'cd server \r\n node wis-installer.js %1 \r\n pause';
    return fileGenerator("start.bat", content).pipe(gulp.dest(destFolder));
});

gulp.task('create stop file', () => {
    let content = 'cd server \r\n node wis-uninstaller.js %1 \r\n pause';
    return fileGenerator("stop.bat", content).pipe(gulp.dest(destFolder));
});


gulp.task('create start dev file', () => {
    let content = 'cd server \r\n node src/main.js';
    return fileGenerator("start-dev.bat", content).pipe(gulp.dest(destFolder));
});

gulp.task('release', runSequence('populate release / dev folder', 'create start file' , 'create stop file'));
gulp.task('dev', runSequence('populate release / dev folder', 'create start dev file'));



