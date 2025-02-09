import React from 'react';
import classes from './Order.module.css';

const order = (props) => {
    const ingredients = [];
    for (let ingredientsName in props.ingredients){
        ingredients.push({name: ingredientsName, amount: props.ingredients[ingredientsName]})
    }
    const ingredientOutput = ingredients.map(ig => (
        <span key={ig.name} style={{
            textTransform: 'capitalize',
            display: 'inline-block',
            margin: '0 8px',
            border: '1px solid #ccc',
            padding: '5px'
        }}>{ig.name} ({ig.amount})</span>
    ));
    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredientOutput}</p>
            <p><strong>Total price: {props.price}</strong></p>
        </div>
    );
}

export default order;