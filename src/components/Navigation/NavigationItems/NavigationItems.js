import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
 <ul className={classes.NavigationItems}>
     {props.isAuth ?<NavigationItem link="/">BurgaBuilda</NavigationItem>:null}
     {props.isAuth ? <NavigationItem link="/orders">Orders</NavigationItem>: null}
     {!props.isAuth? <NavigationItem link="/auth">Auth</NavigationItem>
                            :<NavigationItem link="/logout">Logout</NavigationItem>}
 </ul>
       

)

export default navigationItems;