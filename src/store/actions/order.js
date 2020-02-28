import * as actionTypes from '../actions/actionTypes';
import axios from '../../axiosrequests';

export const purchaseBurgerSuccess = (id, data)=> {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: data
    }
}

export const purchaseBurgerFail = (error)=> {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    }
}
export const purchaseBurgerStart = ()=> {
    return{
        type: actionTypes.PURCHASE_BURGER_START
    }
}
export const purchaseBurger = (orderData)=> { 
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post('/order.json', orderData)
        .then(response => {
            dispatch(purchaseBurgerSuccess(response.data, orderData));
        })
        .catch(err=> {
            dispatch(purchaseBurgerFail(err));
            console.log(err);
        });
    }
}
export const purchaseInit = ()=> {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}


export const fetchOrdersSuccess = (orders)=> {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
}


export const fetchOrdersFail = (err)=> {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: err
    }
}
export const fetchOrdersStart=()=> {
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
}
export const fetchOrders = ()=> {
    return dispatch => {
        dispatch(fetchOrdersStart());
        axios.get('/order.json')
        .then(res=>{
            const fetchedOrders=[];
            for (let key in res.data){
                fetchedOrders.push({
                   ...res.data[key],
                   id: key 
                });
            }
            dispatch(fetchOrdersSuccess(fetchedOrders));
        }).catch(err=> {
           dispatch(fetchOrdersFail(err));   
        });
    }
}

