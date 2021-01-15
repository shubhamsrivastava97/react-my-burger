import React, {Component} from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
class Orders extends Component {
    state={
        orders: [],
        loading: false
    }

    componentDidMount() {
        axios.get('/orders')
            .then(res => {
                const fetchedOrders = [];
                console.log(res);
                for (let order of res.data){
                    console.log(order);
                    let orderId = order.orderId;
                    let totalPrice = order.totalPrice;
                    delete order.orderId;
                    delete order.totalPrice;
                    fetchedOrders.push({
                        ingredients: {...order},
                        id: orderId,
                        totalPrice: totalPrice
                    });
                }
                this.setState({orders: fetchedOrders, loading: false})
            })
            .catch(err => {
                this.setState({loading: false});
            });
    }

    render() {
        return (
            <div>
                {this.state.orders.map(order => (
                    <Order key={order.id}
                        ingredients={order.ingredients}
                        price={+order.totalPrice} />
                ))}
            </div>
        );
    }
}
export default withErrorHandler(Orders, axios);