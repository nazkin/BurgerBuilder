import React from 'react'
import classes from './Input.css';
/**
* @author
* @function input
**/

const input = (props) => {
    let inputElement = null;
    switch (props.inputtype){
        case ('input'):
            inputElement = <input className={classes.InputElement}
                                  value = {props.value}
                                  {...props.elementconfig}
                                  onChange={props.changed}
                                  />;
            break;
        case ('textarea'):
            inputElement = <textarea className={classes.InputElement}
                                     value = {props.value}
                                     {...props.elementconfig}
                                     onChange={props.changed}
                                     />;
            break;
        case ('select'):
            inputElement = <select className={classes.InputElement}
                                   value ={props.value}
                                    onChange={props.changed}
                                   >
                                {props.elementconfig.options.map(opt=>(
                                     <option key={opt.value} value={opt.value}>
                                         {opt.displayvalue}
                                     </option>
                                ))}
                            </select>;
            break;
        default:
            inputElement = <input className={classes.InputElement}
                                  value = {props.value}
                                  {...props.elementconfig}
                                  onChange={props.changed}
                                  />;
    }
  
    return(
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
   )

 }

export default input