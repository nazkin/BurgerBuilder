import React from 'react';
import classes from './ToggleMenu.css';

const toggleMenu = (props) => (
        <div className={classes.ToggleMenu} onClick = {props.clicked}>
          =Menu=
        </div>
)

export default toggleMenu;