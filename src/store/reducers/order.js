import * as actionTypes from '../actions/actionTypes';

const initialState = {
    orders: [],
    loading: false,
    purchased: false 
}
const reducer = (state = initialState, action)=> {
    switch(action.type){
        //Handling the order related dispatching
        case actionTypes.FETCH_ORDERS_START: 
            return {
                ...state, 
                loading: true
            }
        case actionTypes.FETCH_ORDERS_SUCCESS: 
            return {
                ...state,
                orders: action.orders, 
                loading: false,

            }
        case actionTypes.FETCH_ORDERS_FAIL: 
            return {
                ...state, 
                loading: false
            }
        //The http request is sent so make sure the loading has been initialized
        case actionTypes.PURCHASE_INIT: 
            return {
                ...state, 
                purchased: false
            }
        case actionTypes.PURCHASE_BURGER_START:
            return {
                ...state,
                loading: true
            }
        //Make sure loading has stopped
        case actionTypes.PURCHASE_BURGER_FAIL:
            return {
                ...state,
                loading: false

            }
        //Loading stopped, push order information to the state
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            //Here I create my object that is responsible for taking in data passed on by action
            const orderNew = {
                ...action.orderData,
                id: action.orderId
            }
            return {
                ...state,
                loading: false,
                orders: state.orders.concat(orderNew),
                purchased: true
            }   
        default:
            return state; 
    }
}
export default reducer;