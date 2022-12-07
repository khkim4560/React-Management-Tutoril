//express 프레임웍 선언
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.port || 5000;

//mongodb 선언 
const mongoose = require('mongoose');

//파일 읽어와서 json으로  파싱
const fs = require("fs");
const data = fs.readFileSync("./database.json");
const conf = JSON.parse(data);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));



//접급 URL 모든 URL 허용
var cors = require('cors');
const { json } = require("express");
app.use(cors());

//mongodb url 
const uri = conf.mongo_db_uri;

//한번만 생성
//apiCustomers 변수 const 전역 변수로 한번만 생성 함수에서 선언하면 아래 오류 발생
//OverwriteModelError: Cannot overwrite `customers` model once compiled.
mongoose.set('strictQuery', false);
//아래 경고 메시지 처리
//[0] (node:23532) [MONGOOSE] DeprecationWarning: Mongoose: the `strictQuery` option will be switched back to `false` by default in Mongoose 7. Use `mongoose.set('strictQuery', false);
//`if you want to prepare for this change. Or use `mongoose.set('strictQuery', true);` to suppress this warning.
//[0] (Use `node --trace-deprecation ...` to show where the warning was created)
const apiCustomers = mongoose.model("customers",
{
  _id 			:'string',
  image 		:'string',  name 		  :'string',
  birthday 	:'string',  gender		:'string',
  job 		  :'string'
});

// 연결테스트 ID 값으로 조회
// app.get("/api/:id",(req, res)=>{
//     const q = req.params
//     res.send({message : `Hello Express!${q.id}`});
// });

//연결테스트2
//  app.get("/api/hello",(req, res)=>{
//      const q = req.params
//      res.send({message : `Hello Express!`});
//  });

//create_customers_mongDb(); customers 스키마 생성

const multer = require("multer");
const upload = multer({dest : "./upload"});

//연결테스트3
//mongodb 연결  조회
app.get("/api/customers",(req, res)=> {   
  find_api(req , res);
});

async function find_api(req, res){
  
  mongoose.connect(uri); 
  
  try
  {
    //조회조건
    const apiOption ={
      
    };
    
    //document find
    apiCustomers.find(apiOption ,function(err, customers) {
      if (err) {
          console.log(err);
          res.send([{error_title : "Mongodb find error"},{error_msg : err}]);
      } else {
          //mongoose.disconnect();
          //mongoose.connection.close();          
          //console.log("customers" ,JSON.stringify(customers));
          res.send(JSON.stringify(customers));
      }
    });

  } catch (error) {
    console.log("Find api error!!" , error);
    res.send([{error_title : "Find api error!!"},{error_msg : error}]);
  }
}

app.use("/image",express.static("./upload"));
app.post("/api/customers",upload.single("image"),(req,res)=>{
  let image = "./image/" + req.file.filename;
  let name = req.body.name;
  let birthday = req.body.birthday;
  let gender = req.body.gender;
  let job = req.body.job;

  try{    

    var MongoClient = require('mongodb').MongoClient;
    var url = uri;

    const custmoersJos =[
      {        
        "image"   : image,
        "name"    : name,      
        "birthday": birthday,
        "gender"  : gender,
        "job"     : job,      
      }
    ];

    MongoClient.connect(url, function(err, db) {
      
      if (err){throw err;} 
      var dbo = db.db("test");
    
      dbo.collection("customers").insertMany(custmoersJos, function(err, res) {
        
        if (err){throw err;} 
        db.close();

      });
    });

    //저장 도중 올오류가 없다면
    console.log(`post /api/customers save success`);
    res.send({
          "api_cd" : "success",
          "api_msg" : "저장되었습니다."
        }    
    );

  } catch(error){
    console.log(`post /api/customers save fail`, error);
    console.error(error);
  }
 
})

//문자안에 변수를 출력 할 수 있음.
app.listen(port,()=> 
  console.log(`Listening on port ${port}}`)
  //console.log("conf",conf);
  //console.log("conf.user",conf.user)
);
