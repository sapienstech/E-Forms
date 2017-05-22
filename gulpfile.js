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


gulp.task('populate unpacked folder', function () {
    gulp.src('server/**')
        .pipe(gulp.dest(destFolder + '/server')).on('end', function () {
        console.log('finished copying server folder')
    });
    ;

    gulp.src('node_modules/**')
        .pipe(gulp.dest(destFolder + '/node_modules')).on('end', function () {
        console.log('finished copying node_modules folder')
    });

    gulp.src('dist/**')
        .pipe(gulp.dest(destFolder + '/dist')).on('end', function () {
        console.log('finished copying dist folder')
    });

});

gulp.task('populate packed folder', function () {
    gulp.src('server/data/**')
        .pipe(gulp.dest(destFolder + '/data'));

    gulp.src('dist/**')
        .pipe(gulp.dest(destFolder + '/dist'))

});


gulp.task('create start file', () => {

    let content = 'cd server \r\n' + 'node wis-installer.js %1 \r\n' + 'pause';

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


gulp.task('dev : unpacked', ['populate unpacked folder', 'create start dev file']);

gulp.task('release : packed', ['populate packed folder', 'create start file', 'create stop file', 'package']);
gulp.task('release : unpacked', ['populate unpacked folder', 'create start file', 'create stop file']);

gulp.task('package', () => {
    let exec = require('child_process').exec;
    exec('pkg ./server/src/main.js --out-dir ' + destFolder, (err, stdout, stderr) => {
        console.log(stdout);
        console.log(stderr);
    });
});


