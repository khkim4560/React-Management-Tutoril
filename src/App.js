
import './App.css';
import { Component } from 'react';
import Customer from './components/Customer';

const customers =
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
];





class App extends Component{
  render(){
    return (
        <div>

        {
          customers.map( c => {
            return (
              <Customer
                key       ={c.key}
                id        ={c.id}
                image     ={c.image}
                name      ={c.name}
                birthday  ={c.birthday}
                gender    ={c.gender}
                job       ={c.job}        
            ></Customer>
            )
          })        
        }



      </div>
    );
  }
}

export default App;
