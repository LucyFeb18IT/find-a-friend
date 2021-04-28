import React from "react";
import {AppBar, Grid, Paper, TextField, Toolbar,Avatar, Button, Typography, Link} from '@material-ui/core';
import {Redirect} from 'react-router-dom';
import {
    authFunctions
} from '../firebase';


const gridStyle = {
    width: "100%",
    margin: "0px"
}
const leftPaperStyle ={
    width: "100%",
    backgroundColor: "#4051B5"
}
const rightPaperStyle={
    padding:"20px",
    height:"60vh",
    width:"280px",
    margin:"20px auto"
}
const h3Style={
    color:"#FFFFFF",
    padding:"20px"

}
const buttomStyle={
    margin:"10px 0"
}

class SignUp extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            email:"",
            password:"",
            firstname:"",
            lastname:"",
            success:false,
            login: false,
            uid:null
        };
        this.handleChange= this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.redirectToLogIn= this.redirectToLogIn.bind(this);
    }

    handleChange(event){
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit(event){
        authFunctions.signUp(
            this.state.firstname,
            this.state.lastname,
            this.state.email,
            this.state.password
        );
        authFunctions.onUserActive((uid)=>{
            this.setState({success: true, uid : uid});
        });
        event.preventDefault();
    }

    redirectToLogIn(){
        this.setState({login: true});
    }

    render(){
        if(this.state.login){
            return <Redirect to='./login/'/>
        }
        if(this.state.success){
            return <Redirect to ='./home'/>    
        }
        return(
            <div>
                <AppBar position="static">
                    <Toolbar>
                        <h1>Find-A-Friend</h1>
                    </Toolbar>
                </AppBar>
                <Grid container style={gridStyle} spacing={2}>
                    <Grid item xs={9}>
                        <Paper style={leftPaperStyle}>
                            <div>
                                <h3 style={h3Style}>
                                    hello world!hello world!hello world!hello world!hello world!hello world!
                                </h3>
                                <img src ="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2151136234,3513236673&fm=26&gp=0.jpg" alt="a beautiful tree" width="60%"/>
                            </div>
                        </Paper>
                    </Grid>
                    <Grid item>
                        <Paper style={rightPaperStyle} elevation={10}>
                            <Grid align='Center'>
                                <Avatar></Avatar>
                                <h2>Sign Up</h2>
                            </Grid>
                            <form onSubmit ={this.handleSubmit}>
                                <TextField label="First name" placeholder="John" name="firstname" id="firstname" fullWidth required autoFocus onChange={this.handleChange} value={this.state.firstname}/>
                                <TextField label="Last name" placeholder="River" name="lastname" id="lastname" fullWidth required onChange={this.handleChange} value={this.state.lastname}/>
                                <TextField label="Email" placeholder="Enter Email" name="email" id="email" fullWidth required onChange={this.handleChange} value={this.state.email}/>
                                <TextField label="Password" placeholder="Enter Password" name="password" id="password" fullWidth required type="password" onChange={this.handleChange} value={this.state.password}/>
                                <Button type="submit" color="primary" variant="contained" fullWidth style={buttomStyle}>Sign Up</Button>
                            </form>
                            <Typography>
                                Already have an account?{" "}<Link href="" onClick={this.redirectToLogIn}>Log In</Link>
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        )

    }
}
export default SignUp;