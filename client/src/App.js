import './App.css';
import { Component} from 'react';
import Customer from './components/Customer';
import CustomerAdd from './components/CustomerAdd';
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import {withStyles} from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import SearchAppBar from "./components/SearchAppBar"
import axios from 'axios'


const apiUrl = "http://localhost:5000/api";

const styles =theme => ({
  root:{
    width:'100%'
    
    
  },
  paper:{
    marginLeft : 18,
    marginRight : 18,
  },
  progress :{
    //margin: theme.spacing.unit * 2,    
  }
});

class App extends Component{

  constructor(props){
    super(props);

    this.state= {
      customers : [],
      customersOrg : [],
      completed : 0     , 
      searchKeyword : ""
    }
  }

  stateRefresh =()=>{
    
    this.setState({
      customers : [],
      customersOrg : [],
      completed : 0,
      searchKeyword : ""
    });

    this.callApi()
    .catch(err => console.log("componentDidMount ERR",err));
    
  }

  componentDidMount =() =>{
    this.timer = setInterval(this.progress,100);
    this.callApi()
    .catch(err => console.log("componentDidMount ERR",err));
  }

  //서버 API 호출yar
  callApi = async () => {
    axios.get( `${apiUrl}/customers`)
    .then((response)=> {
        this.setState({customers : response.data});
        this.setState({customersOrg : response.data});
        
        //console.log("response.data" ,response.data);
        //console.log("callApi customers" , this.state.customers);
      }      
    )
    .catch(err => console.log("callApi ERR",err));
  }

  progress =() => {
    const {completed} = this.state;
    this.setState({completed : completed >= 100 ? 0 : completed+1});    
  } 


  editEventHandler = (e) => {
    console.log(e.target.value);
    console.log("editEventHandler" ,e.target.value);    
    const data = this.state.customersOrg.filter((c) => { return c.name.indexOf(e.target.value) > -1 ; })
    //console.log("data" ,data);

   this.setState({customers : data});
  }


  render(){
    
    const {classes } = this.props;

    return (
          <div>
            
            <SearchAppBar customers={this.state.customers} editEventHandler={this.editEventHandler}></SearchAppBar>

            <Paper className={classes.root}>
              
              <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                    <TableCell>pk</TableCell>
                    <TableCell>image</TableCell>
                    <TableCell>name</TableCell>
                    <TableCell>birthday</TableCell>
                    <TableCell>gender</TableCell>
                    <TableCell>job</TableCell>
                    <TableCell>delete button</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {
                
                  this.state.customers ?
                  this.state.customers.map( c => {
                  
                  return (
                        <Customer
                          seqno     ={c._id}
                          key       ={c._id} 
                          id        ={c._id}
                          image     ={c.image}    
                          name      ={c.name}
                          birthday  ={c.birthday} 
                          gender    ={c.gender} 
                          job={c.job}
                          stateRefresh = {this.stateRefresh}
                        >
                        </Customer>
                  )
                }) :  <TableRow>
                      <TableCell colSpan="6" align='center'>
                        <CircularProgress className={classes.progress} variant="determinate" value={this.state.completed}></CircularProgress>
                      </TableCell>
                      </TableRow>  
              }
              </TableBody>
            </Table>
          </Paper>

          <CustomerAdd stateRefresh={this.stateRefresh} ></CustomerAdd>
        </div>

    );
  }
}

export default withStyles(styles)(App) ;