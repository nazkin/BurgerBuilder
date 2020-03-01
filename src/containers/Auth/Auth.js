import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';
import * as actions from '../../store/actions/index';
import {connect} from 'react-redux';
/**
* @author
* @class Auth
**/

class Auth extends Component {
 state = {
     controls: {
         email: {
             inputtype: 'input',
             elementconfig: {
                 type: 'email',
                 placeholder: 'Enter Email'
             },
             value: ""

         },
         password: {
            inputtype: 'input',
            elementconfig: {
                type: 'password',
                placeholder: 'Enter Password'
            },
            value: ""

        }
     },
     isSignUp: true
 }

 authModeHandler = ()=> {
    this.setState(prevState=> {
        return {
            isSignUp: !prevState.isSignUp
        }
    });
 }

inputChangedHandler = (event, controlName)=> {
    const updateControl = {
        ...this.state.controls,
        [controlName]: {
            ...this.state.controls[controlName],
            value: event.target.value
            // valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
            // touched: true
        }
    }
    this.setState({controls: updateControl});
}

submitHandler  = (event)=> {
    event.preventDefault();
    this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp);
}
 render() {
    const formElementsArr = [];
    for(let key in this.state.controls){
        formElementsArr.push({
            id: key, 
            config: this.state.controls[key]
        });
    }

    const form = formElementsArr.map(formElement => (
        <Input 
            key= {formElement.id}
            inputtype = {formElement.config.inputtype}
            elementconfig = {formElement.config.elementconfig}
            value = {formElement.config.value}
            changed = {(event)=> this.inputChangedHandler(event, formElement.id)}
        />
    ))
  return(
   <div className = {classes.Auth}>
       <h1>{this.state.isSignUp ? 'Sign-Up Form' : 'Log-In Form'}</h1>
       <form onSubmit={this.submitHandler}>
           {form}
           <Button  btnType='Success'>Submit</Button>
       </form>
       <p>{this.state.isSignUp ? 'Already a user???' : 'Do not have an account???'}</p>
           <Button
                clicked = {this.authModeHandler}
                btnType='Danger'>{this.state.isSignUp ? 'SIGN-IN' : 'SIGN-UP'}
            </Button>
   </div>
    )
   }
 }

const mapDispatchToProps = dispatch =>{
    return {
        onAuth: (email,password, isSignup)=> dispatch(actions.auth(email,password,isSignup))
    }
}


export default connect(null, mapDispatchToProps)(Auth);