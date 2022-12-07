import React from "react";
import axios from 'axios'
import { Button } from "@material-ui/core";
const apiUrl = "http://localhost:5000/api/customers";

class CustomerDelete extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            id : this.props.id
        }
    }

    handleDeleteClick = (e)=>{
        e.preventDefault();
        this.deleteCustomer();         
    }

    deleteCustomer = ()=>{
        
        const url = `${apiUrl}/${this.state.id}`;

        const formData = new FormData();
        formData.append("id"  ,this.state.id);
        
        console.log("deleteCustomer 시작")
        console.log("formData"      , formData);
        
        
        axios.post(url,formData)
        .then((res)=>{
            //console.log(res.data);
            this.props.stateRefresh();                                    
        })
        .catch(err => console.log("deleteCustomer ERR",err));
    }

    render(){
        return(
            
            <Button style={{backgroundColor:"red",color: "yellow" }} onClick={this.handleDeleteClick}>삭제</Button>    
            
        )
    }

}

export default CustomerDelete;


