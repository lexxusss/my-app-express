var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

var Excel = require('exceljs');
var excelbuilder = require('msexcel-builder');
var json2xls = require('json2xls');

var fs = require("fs");
var JSZip = require("jszip");

var zip = new JSZip();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// app.use('/customers/download', require('./routes/customers/download'));
app.get("/customers/download", function(req, res) {
    res.sendFile(__dirname + "/routes/customers/download.html");
});
app.get("/getfile", function(req, res) {

    var options = {
        useStyles: true,
        useSharedStrings: true
    };

    // var workbook = new Excel.stream.xlsx.WorkbookWriter(options);
    // workbook.zip.pipe(res);
    // var worksheet = workbook.addWorksheet("My Sheet");
    //
    // worksheet.columns = [
    //     { header: "Id", key: "id", width: 10 },
    //     { header: "Name", key: "name", width: 32 },
    //     { header: "D.O.B.", key: "DOB", width: 10 }
    // ];
    // worksheet.addRow({
    //     id: 100,
    //     name: "name",
    //     DOB: "DOB"
    // }).commit();
    //
    // worksheet.commit();
    // workbook.commit();


    var workbook = excelbuilder.createWorkbook('./', 'sample.xlsx')

    // Create a new worksheet with 10 columns and 12 rows
    var sheet1 = workbook.createSheet('sheet1', 10, 12);

    // Fill some data
    sheet1.set(1, 1, 'I am title');
    for (var i = 2; i < 5; i++)
        sheet1.set(i, 1, 'test'+i);

    // Save it
    workbook.save(function(ok){
        if (!ok)
            workbook.cancel();
        else
            console.log('congratulations, your workbook created');
    });

    return false;
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
