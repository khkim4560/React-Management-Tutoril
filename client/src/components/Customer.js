import React from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import CustomerDelete from "./CustomerDelete";

class Customer extends React.Component{
    render(){
        
        return(
            
            // <div>
            //     <CustomerProfile id={this.props.id} name={this.props.name} image={this.props.image} />
            //     <CustomerInfo birthday={this.props.birthday} gender={this.props.gender} job={this.props.job}></CustomerInfo>
            // </div>

            <TableRow>                    
                    <TableCell>{this.props.seqno}</TableCell>
                    <TableCell><img src={this.props.image} alt="profile" width={100} height={100}></img></TableCell>
                    <TableCell>{this.props.name}</TableCell>
                    <TableCell>{this.props.birthday}</TableCell>       
                    <TableCell>{this.props.gender}</TableCell>         
                    <TableCell>{this.props.job}</TableCell>            
                    <TableCell><CustomerDelete id={this.props.id} stateRefresh={this.props.stateRefresh}></CustomerDelete></TableCell>            
            </TableRow>

            
        );
    }
}

// class CustomerProfile extends React.Component{
//     render(){
//         return(
//             <div>
//                 <img src={this.props.image} alt="profile"></img>    
//                 <h1>{this.props.name}({this.props.id})</h1>
                
                  
//             </div>
//         );
//     }
// }

// class CustomerInfo extends React.Component{
//     render(){
//         return(
//             <div>
//                 <p> {this.props.birthday}       </p>
//                 <p> {this.props.gender}         </p>
//                 <p> {this.props.job}            </p>                         
//             </div>
//         );
//     }
// }

export default Customer;