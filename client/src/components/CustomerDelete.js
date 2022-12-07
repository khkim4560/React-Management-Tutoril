import React from "react";
import axios from 'axios'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Button  from "@material-ui/core/Button";
import Typography  from "@material-ui/core/Typography";

const apiUrl = "http://localhost:5000/api/customers";

class CustomerDelete extends React.Component{
    
    constructor(props){
        super(props);
        this.state ={
            id : this.props.id,
            open: false
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


     //Modal Open
     handleClickOpen =  () =>{        
        this.setState({open : true});
    }

    //Modal Close
    handleClickClose =  () =>{
        this.setState(
            this.state ={            
            open        : false
        });            
    }


    render(){
        return(
            <div>
            <Button variant="contained" colr="secondary" onClick={this.handleClickOpen}>삭제</Button>    

            <Dialog open={this.state.open} onClose={this.handleClickClose}>
                    <DialogTitle onClose={this.handleClickClose} >
                        삭제경고
                     </DialogTitle>
                    
                    <DialogContent>                                    
                        <Typography gutterBottom>
                         선택한 고객 정보가 삭제됩니다.
                        </Typography>
                    </DialogContent >
                    
                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={this.deleteCustomer}>삭제</Button>                
                        <Button variant="outlined"  color="primary" onClick={this.handleClickClose}>닫기</Button>                    
                    </DialogActions>
                </Dialog>
            </div>   
        )
    }

}

export default CustomerDelete;