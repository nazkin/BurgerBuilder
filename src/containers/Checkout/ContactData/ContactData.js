import React, { Component } from 'react';
import classes from "./ContactData.css";
import Button from "../../../components/UI/Button/Button";
import axios from "../../../axiosrequests";
import Spinner from "../../../components/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import {connect} from "react-redux";
/**
* @author
* @class ContactData
**/

class ContactData extends Component {
 state = {
    orderForm: {
        name: {
            inputtype: "input",
            elementconfig: {
                type: "text",
                placeholder: "Enter your name"
            }, 
            value: ""
        },       
        street: {
            inputtype: "input",
            elementconfig: {
                type: "text",
                placeholder: "Enter your street"
            },
            value: ""
        },
        zip: {
            inputtype: "input",
            elementconfig: {
                type: "text",
                placeholder: "Enter your postal code"
            },
            value: ""
        },
        Country: {
            inputtype: "input",
            elementconfig: {
                type: "text",
                placeholder: "Enter your country"
            },
            value: ""
        },       
        email:{
            inputtype: "input",
            elementconfig: {
                type: "email",
                placeholder: "Enter your email"
            },
            value: ""
        },
        deliveryMethod: {
            inputtype: "select",
            elementconfig: {
                options: [{value: "fastest", displayvalue: "Fastest"},{value: "regular", displayvalue: "Regular"}]
            },
            value:""
        }
    },
    loading: false
 }
    inputChangedHandler = (e, inputIdentity)=> {
        console.log(e.target.value);
        const formUpdatedA = {
            ...this.state.orderForm
        };
        const formUpdatedB ={
            ...formUpdatedA[inputIdentity]
        };
        formUpdatedB.value = e.target.value;
        formUpdatedA[inputIdentity]= formUpdatedB;
        this.setState({
            orderForm: formUpdatedA
        });
    }

 handleOrders = (e)=> {
    e.preventDefault();
    console.log(this.props.ingredients);

         this.setState({
            loading: true
        });
        const formData= {};
        for(let formElementId in this.state.orderForm){
            formData[formElementId] = this.state.orderForm[formElementId].value;
        }
        const orderObject = {
            price: this.props.price,
            orderData: formData
        }
        axios.post('/order.json', orderObject)
            .then(response => {
                this.setState({
                    laoding: false    
                });
                this.props.history.push("/");
            })
            .catch(err=> {
                this.setState({
                    laoding: false,             
                });
                console.log(err);
            });
 }
 render() {
        const formElementsArr = [];
        for(let key in this.state.orderForm){
            formElementsArr.push({
                id: key, 
                config: this.state.orderForm[key]
            });
        }
        let form = (
            <form onSubmit={this.handleOrders}> 
                {
                    formElementsArr.map(el=> (
                        <Input  key={el.id}
                                inputtype={el.config.inputtype}
                                elementconfig={el.config.elementconfig}
                                value={el.config.value}
                                changed={(e)=> this.inputChangedHandler(e, el.id)}/>
                    ))
                }
                <Button btnType="Success" type="submit">Order</Button>
            </form>
            );
        if(this.state.loading){
            form = <Spinner />;
        }

  return(
   <div className={classes.ContactData}>
        {form}
   </div>
    )
   }
 }
const mapStateToProps = (state)=> {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}


export default connect(mapStateToProps)(ContactData);