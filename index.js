var express = require('express');
var app = express();
// var http = require('http').createServer(app);
var http = require('http');
var bodyParser = require('body-parser');                        // Get information from HTML POST method
var methodOverride = require('method-override');                // simulate DELETE and PUT
var cors = require('cors');                                     // CORS for allowing API's
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/"; //url to connect to mongodb
var mongoresult = null;//instance for mongodb connection
const fileUpload = require('express-fileupload')
const path = require('path')
const fs = require('fs');
MongoClient.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(res=>{
    var dbase = res.db("YmirAssignment");
    mongoresult=dbase;
}).catch( errconn => {
    console.log("Error:",errconn);
});
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());
app.use(cors());
app.use(fileUpload());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
 });
 var server = app.listen(3000, () => console.log(`server running on port: 3000`));
 app.use(express.static(__dirname + '/staticfiles'));
// Import the Google Cloud client library
const vision = require('@google-cloud/vision');
const client = new vision.ImageAnnotatorClient();
var fileName = "staticfiles/1.jpg";
getTextFromImage();
async function getTextFromImage() {
    const [result] = await client.documentTextDetection(fileName);
const fullTextAnnotation = result.fullTextAnnotation;
console.log(`Full text: ${fullTextAnnotation.text}`);
// fullTextAnnotation.pages.forEach(page => {
//   page.blocks.forEach(block => {
//     console.log(`Block confidence: ${block.confidence}`);
//     block.paragraphs.forEach(paragraph => {
//       console.log(`Paragraph confidence: ${paragraph.confidence}`);
//       paragraph.words.forEach(word => {
//         const wordText = word.symbols.map(s => s.text).join('');
//         console.log(`Word text: ${wordText}`);
//         console.log(`Word confidence: ${word.confidence}`);
//         word.symbols.forEach(symbol => {
//           console.log(`Symbol text: ${symbol.text}`);
//           console.log(`Symbol confidence: ${symbol.confidence}`);
//         });
//       });
//     });
//   });
// });
}