import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';
import * as actions from '../../store/actions/index';
import {connect} from 'react-redux';
import Spinner from '../../components/Spinner/Spinner';
import { Redirect } from 'react-router-dom'
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

    let form = formElementsArr.map(formElement => (
        <Input 
            key= {formElement.id}
            inputtype = {formElement.config.inputtype}
            elementconfig = {formElement.config.elementconfig}
            value = {formElement.config.value}
            changed = {(event)=> this.inputChangedHandler(event, formElement.id)}
        />
    ))
    if(this.props.loading){
        form = (<Spinner />);
    }
    let errorMsg = null;
    if(this.props.error){
        errorMsg = (<p>{this.props.error.message}</p>);
    }

    let authRedirect = null;
    if(this.props.isAuth){
        authRedirect = <Redirect to="/" />
    }

  return(

   <div className = {classes.Auth}>
       {authRedirect}
       {errorMsg}
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


const mapStateToProps = state=> {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuth: state.auth.token !== null
    }
} 
const mapDispatchToProps = dispatch =>{
    return {
        onAuth: (email,password, isSignup)=> dispatch(actions.auth(email,password,isSignup))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Auth);