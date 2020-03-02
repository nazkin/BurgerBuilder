import React, { Component } from 'react';
import classes from './Layout.css';
import Aux from '../../hoc/Aux';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import { connect } from 'react-redux';


class Layout extends Component {
    constructor(props){
        super(props); 
    }

    state = {
        showSideDrawer: false
    }

    closeSideDrawerHandler = () => {
        this.setState({showSideDrawer: false})
    }
    drawerToggleHandler = () => {
        this.setState(prevState => {
            return {
                showSideDrawer: !prevState.showSideDrawer
            };
        });
    }

    render() {
      return(
            <Aux>
                <Toolbar
                    isAuth= {this.props.isAuthenticated}
                    toggleClicked = {this.drawerToggleHandler}/>
                <SideDrawer
                    isAuth={this.props.isAuthenticated}
                    open={this.state.showSideDrawer}
                    closed = {this.closeSideDrawerHandler} />
                <main className = {classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );

    }
}

const mapStateToProps = (state)=> {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout);
