import React from "react";
import axios from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from "@material-ui/core/TextField";
import Button  from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles"; 


const styles = theme => ({
    hidden : {        
        display: 'none'
    }    
});

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
            fileName    :   ""  ,
            open        :   false
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
            
            this.setState(
                this.state ={
                file        : null,
                username    : "",
                birthday    : "",
                gender      : "",
                job         : "",
                fileName    : "",
                open        : false
            });            
            //3초 후에 다시 부모 Rrefresh 함수호출
            setTimeout(()=>{this.props.stateRefresh()}, (2*1000));

        })
        .catch(err => console.log("addCustomer ERR",err));
    }

    //Modal Open
    handleClickOpen =  () =>{        
        this.setState({open : true});
    }

    //Modal Close
    handleClickClose =  () =>{
        this.setState(
            this.state ={
            file        : null,
            username    : "",
            birthday    : "",
            gender      : "",
            job         : "",
            fileName    : "",
            open        : false
        });            
    }

    render(){
        
        const {classes} = this.props;        
        return(
            <div>
                <Button variant="contained" color="primary" onClick={this.handleClickOpen} >
                    고객추가하기
                </Button>

                <Dialog open={this.state.open} onClose={this.handleClickClose}>
                    <DialogTitle>고객추가</DialogTitle>
                    <DialogContent>                                    
                    <input className={classes.hidden}  accept="image/*" id="raised-button-file"  type="file"  file={this.state.file} valu ={this.state.fileName} onChange={this.handleFileChnge}/>                    
                    
                    <label htmlFor="raised-button-file">
                        <Button variant="contained" name="file" color="primary" component="span" >
                            {this.state.fileName ==="" ? "프로필 이미지 선택" : this.state.fileName}
                        </Button>                        
                    </label>
                    <br/>
                     <TextField label="이름"        type="text"  name="username"     username={this.state.username} value={this.state.username} onChange={this.handleValueChnge}/><br/>                    
                     <br/>
                     <TextField label="생년월일"    type="text"  name="birthday"     birthday={this.state.birthday} value={this.state.birthday} onChange={this.handleValueChnge}/><br/>
                     <br/>
                     <TextField label="성별"        type="text"  name="gender"       birthday={this.state.gender} value ={this.state.gender} onChange={this.handleValueChnge}/><br/>
                     <br/>
                     <TextField label="직업"        type="text"  name="job"          job={this.state.job} value ={this.state.job} onChange={this.handleValueChnge}/><br/>



                    </DialogContent >
                    <DialogActions>
                    
                    <Button variant="contained" color="primary" onClick={this.handleFormSumbit}>저장</Button>
                    <Button variant="outlined" color="primary" onClick={this.handleClickClose}>닫기</Button>

                    </DialogActions>
                </Dialog>


            </div>


            // <div>
            //     <form onSubmit={this.handleFormSumbit}>
            //         <h1>Customer add</h1>
            //         프로필이미지 :  <input type="file"   name="file"         file={this.state.file} valu ={this.state.fileName} onChange={this.handleFileChnge}/><br/>
            //         이름 :          <input type="text"  name="username"     username={this.state.username} value={this.state.username} onChange={this.handleValueChnge}/><br/>                    
            //         생년월일 :      <input type="text"  name="birthday"     birthday={this.state.birthday} value={this.state.birthday} onChange={this.handleValueChnge}/><br/>
            //         성별 :          <input type="text"  name="gender"       birthday={this.state.gender} value ={this.state.gender} onChange={this.handleValueChnge}/><br/>
            //         직업 :          <input type="text"  name="job"          job={this.state.job} value ={this.state.job} onChange={this.handleValueChnge}/><br/>
            //         <button type="submit">추가하기</button>
            //     </form>
            // </div>    
        )
    }
}

export default withStyles(styles) (CustomerAdd);


