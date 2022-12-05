import './App.css';
import { Component} from 'react';
import Customer from './components/Customer';
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import {withStyles} from "@material-ui/core/styles";
import axios from 'axios'

const styles =theme => ({
  root:{
    width:'100%',
    marginTop: theme.spacing.unit * 3,
    overflowX:"auto"
  },
  table : {
      minWidth: 1080
  }
});


class App extends Component{
  
  state= {
    customers : ""
  }
  
  componentDidMount(){
    this.callApi()
    .then(res => this.setState({customers : res}))
    .catch(err => console.log("componentDidMount ERR",err));
  }

  //서버 API 호출
  callApi = async () => {
    axios.get( 'http://localhost:5000/api/customers')
    .then( response => this.setState({customers : response.data}))
    .catch(err => console.log("callApi ERR",err));
  }

  render(){
    
    const {classes } = this.props;

    return (
          <Paper className={classes.root}>
            
            <Table className={classes.table}>
              <TableHead>
                  <TableRow>
                  <TableCell>id</TableCell>
                  <TableCell>image</TableCell>
                  <TableCell>name</TableCell>
                  <TableCell>birthday</TableCell>
                  <TableCell>gender</TableCell>
                  <TableCell>job</TableCell>
                  </TableRow>
              </TableHead>
              <TableBody>
              {
              this.state.customers ?
              this.state.customers.map( c => {
                return (
                      <Customer
                        key       ={c.key}
                        id        ={c.id}
                        image     ={c.image}
                        name      ={c.name}
                        birthday  ={c.birthday}
                        gender    ={c.gender}
                        job       ={c.job}
                      >
                      </Customer>
                )
              }) : ""
            }
            </TableBody>
          </Table>
        </Paper>

    );
  }
}

export default withStyles(styles)(App) ;