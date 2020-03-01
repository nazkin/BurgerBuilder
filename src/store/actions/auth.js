import * as actionTypes from './actionTypes';
import axios from 'axios';
export const authStart = ()=> {
    return{
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (authData)=> {
    return {
        type: actionTypes.AUTH_SUCCESS,
        authData: authData
    }
}

export const authFail = (err)=> {
    return {
        type: actionTypes.AUTH_FAIL,
        error: err
    }
}
export const auth = (email, password, isSignUp)=> {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCN7tLvaqrTUtBGUt-UApD84SoyBOIqRTI';
        
        if(!isSignUp){
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCN7tLvaqrTUtBGUt-UApD84SoyBOIqRTI'
        }
        axios.post(url, authData)
            .then(response=> {
                console.log(response);
                dispatch(authSuccess(response));
            })
            .catch(err=> {
                console.log(err);
                dispatch(authFail(err));
            });
    }
}