import React from 'react';
import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import ToggleMenu from '../SideDrawer/ToggleMenu/ToggleMenu';

const toolbar = (props) => {
    return(
       <header className={classes.Toolbar}>
           <ToggleMenu clicked = {props.toggleClicked}/>
            <Logo height = "80%"/>
          <nav>
          <NavigationItems ></NavigationItems>    
          </nav>     
       </header>
    )
}
export default toolbar;