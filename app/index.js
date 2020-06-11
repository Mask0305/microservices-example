const app = require("express")();
const appid = process.env.APPID;
const request = require('request');
const path = require('path');

/*********解析Html字串************** */
var bodyParser = require("body-parser");
app.use(bodyParser.json({limit:'10mb',extended:true}));
app.use(bodyParser.urlencoded({ limit:'10mb',extended: true}));
/****************************** */

/*****************/
app.use(function(req, res, next) {
    //res.header("Content-Type", "application/x-www-form-urlencoded");
    res.header("Access-Control-Allow-Origin", "*"); //允許跨域
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    res.header('Access-Control-Request-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    //res.header('Access-Control-Allow-Credentials', 'true');   //允許攜帶cookie
   next();
 });
/*****************/

const absolutePath = path.join(__dirname, '/view/index.html')
app.get("/", function(req,res){
    res.sendFile(absolutePath);
});
const JSbsolutePath = path.join(__dirname, '/view/js/font.js')
app.get("/js/font.js",function(req,res){
    res.sendFile(JSbsolutePath);
})

app.post("/getdata",function(req,res){
    let stationId =req.body.stationId;
    let nowTime =req.body.nowTime;
    let oldTime = req.body.oldTime;
        var url = 'https://opendata.cwb.gov.tw/api/v1/rest/datastore/C-B0025-001?Authorization=CWB-43558814-9388-4929-B00C-CD1FB6383C5D&format=JSON&stationId='+stationId+'&timeFrom='+oldTime+'&timeTo='+nowTime;
    //https://opendata.cwb.gov.tw/api/v1/rest/datastore/C-B0025-001?Authorization=CWB-43558814-9388-4929-B00C-CD1FB6383C5D&format=JSON&stationId=467490&timeFrom=2020-06-07&timeTo=2020-06-10

    request(url,function(err,reson,body){
    console.log('request success !');
    let result = JSON.parse(body);
    let len = result.records.location[0].stationObsTimes.stationObsTime.length
    let resData = new Array();
    for(var i=0;i<=len-1;i++){
        resData.push({
            'stationID':result.records.location[0].station.stationID,
            'dataTime':result.records.location[0].stationObsTimes.stationObsTime[i].dataDate,
            'stationName':result.records.location[0].station.stationName,
            'precipitation':result.records.location[0].stationObsTimes.stationObsTime[i].weatherElements.precipitation
        });
    }
    res.json(resData);
    //  res.json(result);
    })
})

// app.get("/app1", (req,res) => 
// res.send(`appid: ${appid} app1 page: says hello!`))
 
// app.get("/app2", (req,res) => 
// res.send(`appid: ${appid} app2 page: says hello!`))
 
// app.get("/admin", (req,res) => 
// res.send(`appid: ${appid} ADMIN page: very few people should see this`))


 
app.listen(appid, ()=>console.log(`${appid} is listening on ${appid}`))
// var server = app.listen(5000,'0.0.0.0',function(){
//     console.log('Node Server is running in port 5000...');
// })
