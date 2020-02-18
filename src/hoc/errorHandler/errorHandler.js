import React, {Component} from 'react'
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux';
/**
* @author
* @function errorHandler
**/

const errorHandler = (ErrComponent,axios) => {
  return class extends Component{
    state = {
        error: null
    }
    componentWillMount(){
        this.interceptorReq = axios.interceptors.request.use(req => {
            this.setState({
                error: null
            });
            return req;
        });
        this.interceptorRes = axios.interceptors.response.use(res=> res, error => {
            this.setState({
                error: error
            });
        });
    }
    componentWillUnmount(){
        axios.interceptors.request.eject(this.interceptorReq);
        axios.interceptors.response.eject(this.interceptorRes);
    }
        
    errorConfirmationHandler = ()=> {
        this.setState({
            error: null
        });
    }
  
      render(){
          return(
            <Aux>
                <Modal
                 modalClosed={this.errorConfirmationHandler}
                 show = {this.state.error}>
                    {this.state.error ? this.state.error.message : null}
                </Modal>
                <ErrComponent {...this.props}/>
            </Aux>
          )
      }
  }
}    

      
 

 

export default errorHandler;