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
             elementtype: 'input',
             elementconfig: {
                 type: 'email',
                 placeholder: 'Enter Email'
             },
             value: "",
             validation: {
                 required: true,
                 isEmail: true
             },
             valid: false, 
             touched: false
         },
         password: {
            elementtype: 'input',
            elementconfig: {
                type: 'password',
                placeholder: 'Enter Password'
            },
            value: "",
            validation: {
                required: true,
                minLength: 6
            },
            valid: false, 
            touched: false
        }
     }
 }
 checkValidity(value, rules) {
    let isValid = true;
    if (!rules) {
        return true;
    }
    
    if (rules.required) {
        isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
        isValid = value.length >= rules.minLength && isValid
    }

    if (rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid
    }

    if (rules.isEmail) {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        isValid = pattern.test(value) && isValid
    }

    if (rules.isNumeric) {
        const pattern = /^\d+$/;
        isValid = pattern.test(value) && isValid
    }

    return isValid;
}

inputChangedHandler = (event, controlName)=> {
    const updateControl = {
        ...this.state.controls,
        [controlName]: {
            ...this.state.controls[controlName],
            value: event.target.value,
            valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
            touched: true
        }
    }
    this.setState({controls: updateControl});
}

submitHandler  = (event)=> {
    event.preventDefault();
    this.props.onAuth(this.state.controls.email, this.state.controls.password);
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
            elementtype = {formElement.config.elementtype}
            elementconfig = {formElement.config.elementconfig}
            value = {formElement.config.value}
            invalid = {!formElement.config.valid}
            shouldValidate = {formElement.config.validation}
            touched = {formElement.config.touched}
            changed = {(event)=> this.inputChangedHandler(event, formElement.id)}
        />
    ))
  return(
   <div className = {classes.Auth}>
       <form onSubmit={this.submitHandler}>
           {form}
           <Button  btnType='Success'>Submit</Button>
       </form>
   </div>
    )
   }
 }

const mapDispatchToProps = dispatch =>{
    return {
        onAuth: (email,password)=> dispatch(actions.auth(email,password))
    }
}


export default connect(null, mapDispatchToProps)(Auth);