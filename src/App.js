import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import BurgaBuilda from './containers/BurgaBuilda/BurgaBuilda';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import {Route, Switch} from 'react-router-dom';
import Auth from './containers/Auth/Auth';

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
       
            <Switch>  
              <Route path="/checkout" component={Checkout} />
              <Route path="/orders" component={Orders} />
              <Route path="/auth" component={Auth} />
              <Route exact path="/" component={BurgaBuilda} /> 
            </Switch>
     
 
        </Layout>
      </div>
    );
  }
}

export default App;
