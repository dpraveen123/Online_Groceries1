import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addToCart, updateCartProductCount } from "../../store/actions/shop";
import ProductCard from '../../components/ProductCard';
import SecondaryLayout from '../../Layouts/SecondaryLayout';
import EmptyCategoryPageContent from '../../components/EmptyCategoryPageContent';
import '../../components/css/Vegetables.css';
import firebase from '../../store/reducers/firebase'
var db = firebase.firestore();
class AdminChangeStock extends Component {
    state = { products: [], cost: 0, stock: 0 }

    componentDidMount = () => {



        db.collection("products")
            .get()
            .then(querySnapshot => {
                var x = []
                // this is the data fetched from firebase
                const data = querySnapshot.docs.map(doc => {
                    const d = doc.data()
                    x = x.concat({ id: doc.id, data: doc.data() })

                    // console.log("data is",doc.data())
                    return { ...d, doc_id: doc.id }
                });
                data1 = x;
                console.log("products are", x)
                this.setState({ products: x })
            })
    }

    updateStock = (l) => {
        console.log("id is", l);
        console.log("cost is", this.state.cost, "stock", this.state.stock);
        if (this.state.cost != 0) {
            db.collection("products").doc(l).update({
                price: this.state.cost,
                // quantity: this.state.stock
            });
        }
        if (this.state.stock != 0) {
            db.collection("products").doc(l).update({
                // price: this.state.cost,
                quantity: this.state.stock
            });
        }


    }
    render() {

        let products = <EmptyCategoryPageContent />;

        if (this.state.products.length > 0) {
            products = this.state.products
                .map(product => {
                    // console.log("product id is", product.id);
                    let productInCart = this.props.cartProductsProp.find(cartProd => product.id === cartProd.id)

                    return (
                        <div>
                            <ProductCard
                                key={product.data.id}
                                productName={product.data.name}
                                productPrice={product.data.price}
                                productDiscountPrice={product.data.discount_price}
                                productSale={product.data.sale}
                                productImage={product.data.img}
                                productCount={productInCart ? productInCart.count : 0}
                                productCategory={product.category}
                                productQuantity={product.quantity}

                                activeCartProd={this.props.activeCartProd == product.id ? true : false}
                                currency={this.props.usedCurrencyProp}
                                updateProductCount={(value) => this.props.updateCartProductCountProp(value, product.id)}
                                addToCart={() => this.props.addProductToCartProp(product.id, product.quantity)}
                            />
                       
                            <form >

                                <div style={{ float: 'left' }}>
                                    <label >
                                        Cost :
                                        <input type="number" style={{ width: '50%' }} name="cost" placeholder={product.data.price} onChange={(e) => {
                                            console.log("cost is", e.target.value);
                                            this.setState({ cost: e.target.value })
                                        }} />
                                    </label>
                                </div>
                                <div style={{ float: 'right' }}>
                                    <label >
                                        Stock:
                                        <input type="number" style={{ width: '50%' }} name="stock" placeholder={product.data.quantity} onChange={(e) => { this.setState({ stock: e.target.value }) }} />
                                    </label>
                                </div>
                            </form>
                            <button style={{ backgroundColor: '#E40046', color: 'white', borderColor: 'none', borderRadius: 5 }} onClick={() => this.updateStock(product.id)}>Save Changes</button>
                            <div style={{ height: '10%' }}>

</div>
                        </div>

                    )
                })
        }
        return (<div className="css-11zk6ke">
            <section className="vegetables">
                <header className="css-1wu2h8j">
                    <h1>
                        Vegetables
                    </h1>
                </header>
            </section>


            <div id="category" className="css-vz0s8c">
                <div className="main">
                    <div className="content">
                        <div className="products">
                            {products}
                        </div>
                    </div>
                </div>


            </div>

        </div>
        )
    }
}
var data1 = [];
const mapStateToProps = state => {

    return {
        productsProps:
        {


        },
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

AdminChangeStock.propTypes = {
    productsProps: PropTypes.array.isRequired,
    usedCurrencyProp: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminChangeStock);