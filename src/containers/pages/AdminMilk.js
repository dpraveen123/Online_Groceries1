import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import AdminOrderList from '../../components/Order/AdminMilkOrderList';

import PropTypes from 'prop-types';
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

class Orders extends Component {
    false
    state = { isSignedIn: false, data: [] }
    uiConfig = {
        signInFlow: "popup",
        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.EmailAuthProvider.PROVIDER_ID,
            firebase.auth.PhoneAuthProvider.PROVIDER_ID
        ],
        callbacks: {
            signInSuccess: () => false
        }
    }

    componentDidMount = () => {
        firebase.auth().onAuthStateChanged(user => {
            this.setState({ isSignedIn: !!user })
            this.OrdersAre();
        })
    }
    OrdersAre = () => {
        const db = firebase.firestore();
        return db.collection('milkSubscriptions').get().then(res => {
            var x = []
            res.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log("from milk bro", doc.id, " => ", doc.data().user_details);
                x = x.concat({ doc_id: doc.id, data: doc.data() })
            });
            // console.log("x is",x)
            this.setState({ data: x })
        })

    }


    render() {


        let cartContent = null;


        if (this.state.data.length > 0) {
            let AdminorderList = this.state.data
                .map((order) => {
                    // fetch product information from source based on id
                    // product information can also be stored in state

                    return (
                        <AdminOrderList
                            orderPrice={Math.round(order.data.price)}
                            orderId={order.doc_id}
                            paymentId={order.data.subscriptionType}
                            date={order.data.date}
                            hist={this.props.history}
                            currency={this.props.usedCurrencyProp}
                            adress={order.data.user_details}
                            userUid={order.data.user_id}
                            CheckOrders={this.OrdersAre}
                            mode={order.data.quantity}
                        />
                    )
                });



            cartContent = (

                <React.Fragment>

                    {AdminorderList}

                </React.Fragment>
            )
        } else {
            cartContent = <h5 className={'shop-empty-cart'}>You didn't get any order.
            </h5>;
        }

        return (<div>
            {this.state.isSignedIn ? (
                <div className="container shop-container py-4">
                    <div className={'p-4 shop-div'}>
                        {cartContent}
                    </div>
                </div>) : (
                <div>
                    <div className="container shop-container py-4">
                        <div className={'p-4 shop-div'}>
                            <StyledFirebaseAuth
                                uiConfig={this.uiConfig}
                                firebaseAuth={firebase.auth()} />
                        </div></div></div>
            )
            }
        </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        productProps: state.products,
        orderProductsProp: state.AdminOrders,
        vatProp: state.vat,
        usedCurrencyProp: state.usedCurrency
    }
};

const mapDispatchToProps = (dispatch) => {
    return {

    }
};

Orders.propTypes = {
    orderProductsProp: PropTypes.array.isRequired,
    productProps: PropTypes.array.isRequired,
    vatProp: PropTypes.number,
    usedCurrencyProp: PropTypes.object.isRequired
};


export default connect(mapStateToProps, mapDispatchToProps)(Orders);