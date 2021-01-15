import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from "./ContactData/ContactData";

class Checkout extends Component {
    state = {
        ingredients: null,
        price: 0
    }

    componentWillMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price= 0;
        for (let params of query.entries()){
            if (params[0]==='price'){
                price = +params[1];
            } else {
                ingredients[params[0]] = +params[1];
            }
        }
        this.setState({ingredients: ingredients, price: price});
    }

    checkoutCancelHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinueHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        return (
            <div>
                <CheckoutSummary
                    ingredients={this.state.ingredients}
                    checkoutCancelled={this.checkoutCancelHandler}
                    checkoutContinued={this.checkoutContinueHandler} />
                    <Route path={this.props.match.path + '/contact-data'}
                           render={(props) => (<ContactData ingredients={this.state.ingredients}
                                                       totalPrice={this.state.price}
                                                            {...props} />)} />
            </div>
        );
    }
}

export default Checkout;