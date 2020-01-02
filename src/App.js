import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import BurgaBuilda from './containers/BurgaBuilda/BurgaBuilda';


class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <BurgaBuilda />
        </Layout>
      </div>
    );
  }
}

export default App;
