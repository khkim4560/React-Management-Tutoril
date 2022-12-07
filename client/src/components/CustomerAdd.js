import React from "react";
import axios from 'axios'

const apiUrl = "http://localhost:5000/api";

class CustomerAdd extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            file        :   null,
            username    :   "",
            birthday    :   "",
            gender      :   "",
            job         :   "" ,
            fileName    :   "" 
        }
    }

    handleFormSumbit = (e)=>{
        e.preventDefault();
        this.addCustomer();
    }

    handleFileChnge = (e)=>{                
        e.preventDefault();
        let nextState ={};
        nextState["file"] = e.target.files[0]; 
        nextState["fileName"] = e.target.value;        
        this.setState(nextState);        
        console.log(this.state);
    }

    handleValueChnge = (e)=>{
        e.preventDefault();
        
        let nextState ={};        
        let name    = e.target.name;
        let value   = e.target.value;        
        
        nextState[name] = value;    
        
        this.setState(nextState);        
    }


    addCustomer = ()=>{
        
        const url = `${apiUrl}/customers`; 

        const formData = new FormData();
        formData.append("image"         ,this.state.file);
        formData.append("name"          ,this.state.username);
        formData.append("birthday"      ,this.state.birthday);
        formData.append("gender"        ,this.state.gender);
        formData.append("job"           ,this.state.job);
        
        const config ={
            headers : {
                "content-type" : "multipart/form-data"
            }
        }

        //console.log("addCustomer 시작")
        //console.log("formData"      , formData);
        //console.log("config"        , config);
        
        axios.post(url, formData,   config)
        .then((res)=>{
            //console.log(res.data);
            this.props.stateRefresh();            
            this.setState(
                this.state ={
                file        : null,
                username    : "",
                birthday    : "",
                gender      : "",
                job         : "",
                fileName    : "" 
            });            
        })
        .catch(err => console.log("addCustomer ERR",err));
    }

    render(){
        return(
            <div>
                <form onSubmit={this.handleFormSumbit}>
                    <h1>Customer add</h1>
                    프로필이미지 :  <input type="file"   name="file"         file={this.state.file} valu ={this.state.fileName} onChange={this.handleFileChnge}/><br/>
                    이름 :          <input type="text"  name="username"     username={this.state.username} value={this.state.username} onChange={this.handleValueChnge}/><br/>                    
                    생년월일 :      <input type="text"  name="birthday"     birthday={this.state.birthday} value={this.state.birthday} onChange={this.handleValueChnge}/><br/>
                    성별 :          <input type="text"  name="gender"       birthday={this.state.gender} value ={this.state.gender} onChange={this.handleValueChnge}/><br/>
                    직업 :          <input type="text"  name="job"          job={this.state.job} value ={this.state.job} onChange={this.handleValueChnge}/><br/>
                    <button type="submit">추가하기</button>
                </form>
            </div>    
        )
    }
}

export default CustomerAdd;


