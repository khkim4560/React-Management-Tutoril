const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.port || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//접급 URL
var cors = require('cors')
app.use(cors());

//연결테스트
// app.get("/api/:id",(req, res)=>{
//     const q = req.params
//     res.send({message : `Hello Express!${q.id}`});    
// });

//연결테스트2
//  app.get("/api/hello",(req, res)=>{
//      const q = req.params
//      res.send({message : `Hello Express!`});    
//  });


//연결테스트3
app.get("/api/customers",(req, res)=> {
        res.send(
            
            [
              {
                'key'       : 1,
                'id'        : 'ghdrlfehd',
                'image'     : 'https://placeimg.com/200/200/1',
                'name'      : '홍길동',
                'birthday'  : '961222',
                'gender'    : '남자',
                'job'       : '대학생'
              },
              {
                'key'       : 2,
                'id'        : 'dlrlfehd',
                'image'     : 'https://placeimg.com/200/200/2',
                'name'      : '이길동',
                'birthday'  : '961231',
                'gender'    : '남자',
                'job'       : '개발자'
              }
              ,
              {
                'key'       : 3,
                'id'        : 'rlarlfehd',
                'image'     : 'https://placeimg.com/200/200/3',
                'name'      : '김길동',
                'birthday'  : '961201',
                'gender'    : '남자',
                'job'       : '디자이너'
              }
              ,
              {
                'key'       : 4,
                'id'        : 'rlarlfehd',
                'image'     : 'https://placeimg.com/200/200/3',
                'name'      : '김길동',
                'birthday'  : '961201',
                'gender'    : '남자',
                'job'       : '디자이너'
              }
            ]
        );    
});


 //문자안에 변수를 출력 할 수 있음.
app.listen(port,()=> console.log(`Listening on port ${port}}`));
