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
var lastImageId;
MongoClient.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(res=>{
    var dbase = res.db("YmirAssignment");
    mongoresult=dbase;
    mongoresult.collection("ImagesAndText").find({}).limit(1).sort({_id:-1}).toArray((Err,resultArray) => {
        if(resultArray.length > 0) {
            lastImageId = resultArray[0].imageId + 1;
        }
        else {
            lastImageId = 100001;
        }
        console.log(lastImageId);
    })
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
//var fileName = "staticfiles/1.jpg";
//getTextFromImage();
async function getTextFromImage(fileName) {
    const [result] = await client.documentTextDetection(fileName);
const fullTextAnnotation = result.fullTextAnnotation;
return fullTextAnnotation.text;
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
app.post('/saveUserDetails', (request,result) => {
    var email = request.body.email;
    var name = request.body.username;
    var password = request.body.password;
    mongoresult.collection("users").find({email:email}).toArray((err,res) => {
        if(res.length > 0) {
            result.status(202).json(
                {
                    success:false,
                    reason:"This Email is Already Registered"
                });
        }
        else {
            mongoresult.collection("users").insertOne(
                {
                    email:email,
                    username:name,
                    password:password
                }).then(res => {
                    result.status(200).json(
                        {
                            success:true,
                            message:"Registration Success"
                        });
                }).catch(err => {
                    result.status(402).json(
                        {
                            success:false,
                            message:err
                        });
                })
        }
    });
});
app.get('/userLogin', (request,result) => {
    var email = request.query.email;
    var password = request.query.password;
    mongoresult.collection("users").find({email:email}).toArray((err,res) => {
        if(res.length > 0 ) {
            console.log(password);
            if(res[0].password == password) {
                result.status(202).json(
                    {
                        success:true,
                        message:"Login Success",
                        username:res.username
                    });
            }
            else {
                result.status(202).json(
                    {
                        success:false,
                        message:"Invalid Password"
                    });
            }
        }
        else {
            result.status(202).json(
                {
                    success:false,
                    message:"Email not registered"
                });
        }
    });
});
app.get('/getHistoryData', (request,result) => {
    var email = req.query.email;
    mongoresult.collection("ImagesAndText").find({email:email}).toArray((err,res) => {
        result.status(200).json(
            {
                message:"Data Retrieval Success",
                data: res
            });
    });
});
app.post('/getTextFromFile',(request,result) => {
    var imageFile = request.files.uploadedImage;
    var processedText = "";
    var email = request.body.email;
    try {
        if(Object.keys(request.files).length == 0) {
            return result.status(400).json(
                {
                    success:false,
                    message:'No files were uploaded.'
                });
        }
    
        if (fs.existsSync('./staticfiles')){
            var file = imageFile;
            var filPath = path.join(__dirname, `./staticfiles`, lastImageId+'.png');
            file.mv(filPath, (err) => {
                if(err){
                    return result.status(400).json(
                        {
                            success:false,
                            message:'Error while uploading the Files'
                        });
                }
            })
        } else {
            fs.mkdirSync('./staticfiles');
        }
    } catch(err){
        console.log('Error in uploading file :',err)
    }
    var gotText = getTextFromImage("./staticfiles/"+lastImageId+".png");
    gotText.then(res => {
        processedText = res;
        var insertData = {
            imageId: lastImageId,
            file: lastImageId+".png",
            text: processedText,
            email: email
        }
        mongoresult.collection("ImagesAndText").insertOne(insertData).then(res => {
            console.log("inserted");
            lastImageId = lastImageId + 1;
            result.status(200).json({
                message:"Success",
                text: processedText
            });
        }).catch(err => {
            result.status(202).json({
                message:"Error",
                err: err
            })
        })
    }).catch(err => {
        console.log(err);
        result.json("Error");
    })
    
})