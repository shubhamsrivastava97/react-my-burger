import React, {Component} from 'react';
import classes from './ContactData.module.css';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from  '../../../components/UI/Input/Input';

class ContactData extends Component{
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 3,
                    maxLength: 20
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {},
                valid: true,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Postal Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 7
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {},
                valid: true,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Email'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 3,
                    maxLength: 50
                },
                valid: false,
                touched: false
            },
            delivery: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayName: 'Fastest'},
                        {value: 'cheapest', displayName: 'Cheapest'}]
                },
                value: 'fastest',
                validation: {},
                valid: true,
                touched: false
            }
        },
        formIsValid: false,
        loading: false
    }

    checkValidity(value, rules){
        let isValid = true;
        if (rules.required)
            isValid = value.trim() !== '' && isValid;
        if (rules.minLength)
            isValid = value.length >= rules.minLength && isValid;
        if (rules.maxLength)
            isValid = value.length <= rules.maxLength && isValid;

        return isValid;
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true});
        const customerData = {};
        for (let formElementId in this.state.orderForm){
            customerData[formElementId] = this.state.orderForm[formElementId].value;
        }
        const orderData = {
                ...this.props.ingredients,
            totalPrice: this.props.totalPrice,
           // orderID: Date.now()
        };
       // customerData.customerID = orderData.orderID;
        Promise.all([
            axios.post('/Customers', customerData),
            axios.post('/orders', orderData)
                ])
            .then(response => {
                //alert('Order Successful!');
                this.setState({loading: false});
                this.props.history.push("/");
            })
            .catch(error => {
                this.setState({loading: false});
            });
    }

    inputChangeHandler = (event, formElementID) => {
        const updatedOrderForm = {...this.state.orderForm};
        const updatedFormElement = {...updatedOrderForm[formElementID]};
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[formElementID] = updatedFormElement;
        let formIsValid = true;
        for (let inputId in updatedOrderForm)
            formIsValid = updatedOrderForm[inputId].valid && formIsValid;
        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.orderForm){
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }
        let form= (
            <form>
                {formElementsArray.map(formElement => (
                    <Input key={formElement.id}
                           elementType={formElement.config.elementType}
                           elementConfig={formElement.config.elementConfig}
                           value={formElement.config.value}
                           changed={(event) => this.inputChangeHandler(event, formElement.id)}
                           valid={formElement.config.valid}
                           shouldValidate={formElement.config.validation}
                           touched={formElement.config.touched}
                    />
                ))}
                <Button btnType="Success"
                        disabled={!this.state.formIsValid}
                        clicked={this.orderHandler}>ORDER</Button>
            </form>
        );

        if (this.state.loading)
            form= <Spinner />

        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data: </h4>
                {form}
            </div>
        );
    }
}

export default ContactData;