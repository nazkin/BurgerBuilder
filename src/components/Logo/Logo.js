import React from 'react';
import Logo from '../../assets/images/burger-logo.png';
import classes from './Logo.css';

const logo = (props) => (
    <div className={classes.Logo}>
        <img src={Logo} alt="brand-logo"></img>
    </div>
)

export default logo;