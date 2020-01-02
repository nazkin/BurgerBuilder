import React from 'react';
import classes from './Burger.css';
import BurgerIngredients from './Ingredients/BurgerIngredients';

    const burger = (props)=> {
    //Transform an object into an array of key, value pairs 

        let ingredientsArr = Object.keys(props.ingredients)
                    .map(ingredient => {
                        return [...Array(props.ingredients[ingredient])]
                        .map((_, i)=>{
                            return <BurgerIngredients key={ingredient+i} type={ingredient} />;
                        });
                    })
                    .reduce((arr, el)=>{
                        return arr.concat(el);
                    },[]);
        if(ingredientsArr.length === 0){
            ingredientsArr = <h3>Please Select Your Ingredients!!!</h3> ;
        }

        return (<div className={classes.Burger}>
                   <BurgerIngredients type = "bread-top" /> 
                        {ingredientsArr}
                   <BurgerIngredients type = "bread-bottom" /> 
                </div>);
    }

export default burger;