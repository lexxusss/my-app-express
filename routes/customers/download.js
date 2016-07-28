var express      = require('express');
var router       = express.Router();
var json2csv     = require('json2csv');
var json2xls     = require('json2xls');
var excelbuilder = require('msexcel-builder');
var Excel        = require('exceljs');

var dataFromApi = {firstData: 'First Data', secondData: 'Second Data'};

var resultCSV = json2csv({data: dataFromApi});
var resultXLS = json2xls({data: dataFromApi});


var workbook = new Excel.Workbook(dataFromApi);
// var sheet = workbook.addWorksheet('Data from API');
// workbook.commit();


var response = 'File CSV: <br/>' + resultCSV + '<br/>' + 'File XLS: <br/>' + resultXLS;

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('<b>There is download customers page</b><br/>: ' + response);
});

module.exports = router;
