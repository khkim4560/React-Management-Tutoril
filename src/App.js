
import './App.css';
import { Component } from 'react';
import Customer from './components/Customer';
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import {withStyles} from "@material-ui/core/styles";


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
                      >
                      </Customer>
                )
              })
            }
            </TableBody>
          </Table>
        </Paper>

    );
  }
}

export default withStyles(styles)(App) ;
