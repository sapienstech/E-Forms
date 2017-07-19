var gulp = require('gulp');
var gutil = require('gulp-util');
var runSequence = require('run-sequence');
var webpack = require("webpack");
const path = require('path');
var del = require("del");

var destFolder = 'DEMC';


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

gulp.task('populate packed folder', ['webpack server'], function () {
    gulp.src('server/data/**')
        .pipe(gulp.dest(destFolder + '/data'));


    gulp.src('server/bundle.js')
        .pipe(gulp.dest(destFolder + '/server'));

    gulp.src('server/package_files/start.*')
        .pipe(gulp.dest(destFolder ));

    gulp.src('server/package_files/stop.*')
        .pipe(gulp.dest(destFolder ));

    gulp.src('server/package_files/wis-*')
        .pipe(gulp.dest(destFolder + '/server'));


    gulp.src('node_modules/minimist/**')
        .pipe(gulp.dest(destFolder + '/node_modules/minimist'));

    gulp.src('node_modules/node-windows/**')
        .pipe(gulp.dest(destFolder + '/node_modules/node-windows'));

    gulp.src('node_modules/optimist/**')
        .pipe(gulp.dest(destFolder + '/node_modules/optimist'));

    gulp.src('node_modules/wordwrap/**')
        .pipe(gulp.dest(destFolder + '/node_modules/wordwrap'));


    gulp.src('node_modules/xml/**')
        .pipe(gulp.dest(destFolder + '/node_modules/xml'));


    gulp.src('dist/**')
        .pipe(gulp.dest(destFolder + '/dist'))

});


gulp.task('create start dev file', () => {
    let content = 'cd server \r\n node bundle.js';
    return fileGenerator("start-dev.bat", content).pipe(gulp.dest(destFolder));
});


gulp.task('release', () => {
    return runSequence('webpack server', 'populate packed folder');
});

gulp.task('default', ['populate packed folder']);

gulp.task('webpack server', done => {

    webpack({
        entry: './server/src/main.js',
        output: {
            path: path.resolve(__dirname, "server"),
            filename: 'bundle.js'
        },
        devtool: 'source-map',
        target: 'node',
        node: {
            fs: 'empty',
            net: 'empty'
        },
        module: {
            loaders: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                    query: {
                        presets: ['es2015']
                    }
                }
            ]
        }
    }, (e, s) => {
        done();
    })


});


// gulp.task('pkg', () => {
//     let exec = require('child_process').exec;
//     exec('pkg ./server/src/main.js --out-dir ' + destFolder, (err, stdout, stderr) => {
//         console.log(stdout);
//         console.log(stderr);
//     })
// });
// });
// gulp.task('populate unpacked folder', function () {
//
//     gulp.src('server/**')
//         .pipe(gulp.dest(destFolder + '/server')).on('end', function () {
//         console.log('finished copying server folder')
//     });
//
//
//     gulp.src('node_modules/**')
//         .pipe(gulp.dest(destFolder + '/node_modules')).on('end', function () {
//         console.log('finished copying node_modules folder')
//     });
//
//     gulp.src('dist/**')
//         .pipe(gulp.dest(destFolder + '/dist')).on('end', function () {
//         console.log('finished copying dist folder')
//     });
//
// });
gulp.task('dev', ['webpack server', 'populate packed folder', 'create start dev file']);
// gulp.task('release : unpacked', ['populate unpacked folder', 'create start file', 'create stop file']);
