import * as actionTypes from './actionTypes';
import axios from 'axios';


export const authStart = ()=> {
    return{
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (token, id)=> {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: id
    }
}

export const authFail = (err)=> {
    return {
        type: actionTypes.AUTH_FAIL,
        error: err
    }
}
export const logout = ()=> {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const authTimeout = (expirationTime)=> {
    return dispatch=> {
        setTimeout(()=> {
            dispatch(logout());
        }, expirationTime * 1000)
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
                dispatch(authSuccess(response.data.idToken, response.data.localId));
                dispatch(authTimeout(response.data.expiresIn))
            })
            .catch(err=> {
                dispatch(authFail(err.response.data.error));
            });
    }
}
