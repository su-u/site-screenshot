const gulp = require("gulp");
const ejs = require("gulp-ejs");
const fs = require('fs');
var rename = require('gulp-rename');

gulp.task('ejs', function(callback){
    // JSONファイル読み込み
    const json = JSON.parse(fs.readFileSync('./src/data.json'));
    gulp.src('src/ejs/*.ejs')
        .pipe(ejs(json,{"ext": ".html"}))
        .pipe(rename("index.html"))
        .pipe(gulp.dest('./dist'));
    callback();
});