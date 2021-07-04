import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addToCart, updateCartProductCount } from "../../store/actions/shop";
import ProductCard from "../../components/ProductCard";
import SecondaryLayout from "../../Layouts/SecondaryLayout";
import EmptyCategoryPageContent from  '../../components/EmptyCategoryPageContent';
import '../../components/css/Milks.css';
import {NavLink} from "react-router-dom";
class Milk extends Component {
    render() {
        let products = <EmptyCategoryPageContent />;

        if (this.props.productsProps.length > 0) {
            products = this.props.productsProps
                .map(product => {
                    let productInCart = this.props.cartProductsProp.find(cartProd => product.id === cartProd.id)

                    return (

                        <ProductCard
                            key={product.id}
                            productName={product.name}
                            productPrice={product.price}
                            productDiscountPrice={product.discount_price}
                            productSale={product.sale}
                            productImage={product.img}
                            productCount={productInCart ? productInCart.count : 0}
                            productCategory={product.category}
                            productQuantity={product.quantity}

                            activeCartProd={this.props.activeCartProd == product.id ? true : false}
                            currency={this.props.usedCurrencyProp}
                            updateProductCount={(value) => this.props.updateCartProductCountProp(value, product.id)}
                            addToCart={() => this.props.addProductToCartProp(product.id, product.quantity)}

                        />


                    )
                })
        }
        return (<div className="css-11zk6ke">
        <section className="Milk">
       <header className="css-1wu2h8j">
        <h1>
         Milk
        </h1>
    </header>
     </section> 
     
                       <div id="category" className="css-vz0s8c">
                           <h4>Please select any one of the subscription :)</h4>
               {/* <div className="main">
       <div className="content">
       <div className="products"> */}
                <div className="row">
                    <div className="col-sm-4 text-left" style={{ marginTop: 30, cursor: 'pointer' }} >
                        <NavLink to={{
                            pathname: "/Milk/subscription",
                            aboutProps: {
                                type: "Daily",
                                url: "https://firebasestorage.googleapis.com/v0/b/online-groceries-d4d42.appspot.com/o/download%20(1).jpg?alt=media&token=f94c75ac-30cd-406d-94cc-601ac7276b15"
                            }
                        }} >
                            <img src="https://firebasestorage.googleapis.com/v0/b/online-groceries-d4d42.appspot.com/o/download%20(1).jpg?alt=media&token=f94c75ac-30cd-406d-94cc-601ac7276b15"></img>

                        </NavLink>
                    </div>
                    <div className="col-sm-4 text-left" style={{ marginTop: 30, cursor: 'pointer' }}>
                        <NavLink to={{
                            pathname: "/Milk/subscription",
                            aboutProps: {
                                type: "Weekly",
                                url: 'https://firebasestorage.googleapis.com/v0/b/online-groceries-d4d42.appspot.com/o/download%20(3).jpg?alt=media&token=d22b6c6d-1912-4ac3-88b8-eb71b6ab7d8f'
                            }
                        }}>
                            <img src="https://firebasestorage.googleapis.com/v0/b/online-groceries-d4d42.appspot.com/o/download%20(3).jpg?alt=media&token=d22b6c6d-1912-4ac3-88b8-eb71b6ab7d8f"></img>

                        </NavLink>

                    </div>
                    <div className="col-sm-4 text-left" style={{ marginTop: 30, cursor: 'pointer' }}>
                        <NavLink to={{
                            pathname: "/Milk/subscription",
                            aboutProps: {
                                type: "Monthly",
                                url: "https://firebasestorage.googleapis.com/v0/b/online-groceries-d4d42.appspot.com/o/download%20(2).jpg?alt=media&token=2b714c2b-d3b7-43c6-a155-2b4b1c9797e8"
                            }
                        }}>
                            <img src="https://firebasestorage.googleapis.com/v0/b/online-groceries-d4d42.appspot.com/o/download%20(2).jpg?alt=media&token=2b714c2b-d3b7-43c6-a155-2b4b1c9797e8"></img>

                        </NavLink>

                    </div>
                </div>
            </div>
            {/* {products} */}
            {/* </div> */}
            {/* // </div>
                // </div>
                // </div> */}


        </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        productsProps: state.products.filter(product => product.category === 'milk'),
        usedCurrencyProp: state.usedCurrency,
        cartProductsProp: state.cart,
        activeCartProd: state.activeProduct
    }
};

const mapDispatchToProps = dispatch => {
    return {
        addProductToCartProp: (productId, productQuantity) => dispatch(addToCart(productId, productQuantity)),
        updateCartProductCountProp: (value, productId) => dispatch(updateCartProductCount(Number(value), productId))
    }
};

Milk.propTypes = {
    productsProps: PropTypes.array.isRequired,
    usedCurrencyProp: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Milk);