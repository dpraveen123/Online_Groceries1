import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import AdminOrderProduct from '../../components/Order/AdminOrderProducts';
import AdminProductTotals from '../../components/Order/AdminProductTotals';
import PropTypes from 'prop-types';
// import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from '../../store/reducers/firebase'
class SpecificOrder extends Component {
    constructor(props){
        super(props);
    }
    false
    state = { isSignedIn: false,data:[],productData:{},orderPrice:'' ,products:[]}
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
      console.log("props isssss",this.props.productProps)
    //   console.log(this.props.match.params.order_id,"is id")
      firebase.firestore().collection('razorpay_orders').doc(this.props.match.params.order_id).get().then(l=>{
        // console.log(l.data().cart,"is llllll")
        this.state.data=[]
        this.setState({data:this.state.data})
        this.state.data=l.data().cart;
        this.setState({data:this.state.data})
        this.state.orderPrice=l.data().price;
        this.setState({orderPrice:this.state.orderPrice})
        console.log("the lenght is",this.state.data.length,this.state.orderPrice
        )
    })
    const db = firebase.firestore();
       db.collection("products")
            .get()
            .then(querySnapshot => {
                var x = []
                // this is the data fetched from firebase
                const data = querySnapshot.docs.map(doc => {
                    const d = doc.data()
                    x = x.concat({id:doc.id,data:doc.data()})
                    // console.log("data is",doc.data())
                    return { ...d, doc_id: doc.id }
                });
                console.log("products are",x)
                this.setState({products:x})
            })
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ isSignedIn: !!user })
    })
  }   
    productCountHandler = (field_value, product_id) => {
        this.props.updateCartProductCountProp(field_value, product_id)
    };
     orderProducts=()=>{

     }
     getProductData=(id)=>{
         console.log("getted product data")
         firebase.firestore().collection('products').doc(id).get().then(l=>{
            console.log("l.data() is",l.data())
        })
     }
    render() {
        let orderContent = null;
      

        if (this.state.data) {
            let orderPriceCountArray = [];
            let orderProducts = this.state.data
                .map((productsInOrder) => {
                    // fetch product information from source based on id
                    // product information can also be stored in state
                    // let productFromStore;
                    // this.state.products.map(l=>{
                    //     // console.log("l .id s are",l.id,productsInOrder.doc_id)
                    //     if(l.id===productsInOrder.doc_id){
                    //         // productFromStore=l;
                    //         this.state.productData={}
                    //         this.state.productData=l
                    //         this.setState({productData:this.state.productData})
                    //     //    alert("found")
                    //     }
                    // })
                    let productFromStore = this.state.products.find(product => product.id == productsInOrder.doc_id);
                    console.log("found",productFromStore)
                    // console.log(productFromStore,"prosuct from store")
                    // orderPriceCountArray.push({
                    //         price: productFromStore.quantity > 0 ?
                    //             Math.round(productFromStore.price ) : 0,
                    //         count: productsInOrder.count
                    //     }
                    // );
                   if(productFromStore!=undefined){
                    return (
                        <AdminOrderProduct
                            key={productFromStore.data.id}
                            productName={productFromStore.data.name}
                            productCategory={productFromStore.data.category}
                            productPhoto={productFromStore.data.img}
                            productPrice={Math.round(productFromStore.data.price)}
                            productCount={productsInOrder.count}
                            currency={this.props.usedCurrencyProp}
                        />
                    )
                   }
                });

            let orderTotals = <AdminProductTotals
                subtotal={orderPriceCountArray.reduce((acc, el) => acc + (el.price * el.count), 0)}
                vat={this.props.vatProp}
                currency={this.props.usedCurrencyProp}
                shoppingTotal={this.state.orderPrice}
            />;

            orderContent = (
                
                <React.Fragment>
                
                    {orderProducts}
                    {orderTotals}
                </React.Fragment>
            )
        }
         else {
            orderContent = <h5 className={'shop-empty-cart'}>Invalid Order ID. <Link to={'/orders'}>Go back to My Orders.</Link>
            </h5>;
        }

        return (<div>
            {this.state.isSignedIn ?(
            <div className="container shop-container py-4">
                <div className={'p-4 shop-div'}>
                    {orderContent}
                </div>
            </div>):(
                <div>
                <StyledFirebaseAuth 
                uiConfig={this.uiConfig}
                firebaseAuth={firebase.auth()}/>
                </div>
            )
            }
        </div>
        )
        // let orderContent = null;
        // let orderPriceCountArray = [];
        // if (this.state.data===1) {
        //     console.log("hehehehehhehehhe")
        //     let orderPriceCountArray = [];
        //     let orderProducts = this.state.data
        //         .map((productsInOrder) => {
        //             // console.log("id are",productsInOrder)
        //             // fetch product information from source based on id
        //             // product information can also be stored in state
        //             // let this.state.productData = this.props.productProps.find(product => product.id === productsInOrder.id);
        //             firebase.firestore().collection('products').doc(productsInOrder.doc_id).get().then(l=>{
        //                 // console.log(l.data(),"is llllll")
        //                 // this.setState({data:l.data().cart})
        //                 // this.state.productData=l.data()
        //                 this.state.productData=l.data()
        //                 this.setState({productData:this.state.productData})
        //                 // this.state.orderPrice=l.data().price;
        //                 // this.setState({orderPrice:this.state.orderPrice})
        //                 orderPriceCountArray.push({
        //                     price: this.state.productData.quantity > 0 ?
        //                         Math.round(this.state.productData.price ) : 0,
        //                     count: productsInOrder.count
        //                 }
        //             );
        //             })
                    
        //             return (
        //                 <AdminOrderProduct
        //                     key={productsInOrder.id}
        //                     productName={this.state.productData.name}
        //                     productCategory={this.state.productData.category}
        //                     productPhoto={this.state.productData.img}
        //                     productPrice={Math.round(this.state.productData.price)}
        //                     productCount={productsInOrder.count}
        //                     currency={this.props.usedCurrencyProp}
        //                 />
        //             )
        //         });

        //     let orderTotals = <AdminProductTotals
        //         subtotal={orderPriceCountArray.reduce((acc, el) => acc + (el.price * el.count), 0)}
        //         vat={this.props.vatProp}
        //         currency={this.props.usedCurrencyProp}
        //         shoppingTotal={this.state.orderPrice}
        //     />;

        //     orderContent = (
                
        //         <React.Fragment>
                
        //             {orderProducts}
        //             {orderTotals}
        //         </React.Fragment>
        //     )
        // }
        //  else {
        //     orderContent = <h5 className={'shop-empty-cart'}>Invalid Order ID. <Link to={'/orders'}>Go back to My Orders.</Link>
        //     </h5>;
        // }
   
        // return (<div>
        //     {this.state.isSignedIn ?(
        //     <div className="container shop-container py-4">
        //         <div className={'p-4 shop-div'}>
        //             {/* {orderContent} */}
        //             {
        //                 this.state.data.map((productsInOrder)=>{
        //                     console.log("hiii")

        //                     // firebase.firestore().collection('products').doc(productsInOrder.doc_id).get().then(l=>{
        //                     //     console.log("l.data() is",l.data())
        //                     //     this.setState(
        //                     //         {productData:l.data()}
        //                     //     )
        //                          // this.setState({data:l.data().cart})
        //                         // this.state.productData=l.data()
        //                         // this.state.productData=l.data()
        //                         // this.setState({productData:this.state.productData})
        //                         // this.state.orderPrice=l.data().price;
        //                         // this.setState({orderPrice:this.state.orderPrice})
        //                     //     orderPriceCountArray.push({
        //                     //         price: this.state.productData.quantity > 0 ?
        //                     //             Math.round(this.state.productData.price ) : 0,
        //                     //         count: productsInOrder.count
        //                     //     }
        //                     // );
        //                     // })
        //                     // console.log("data in specifi order",productsInOrder)
        //                 // firebase.firestore().collection('products').doc(productsInOrder.doc_id).get().then(l=>{
        //                 //         console.log(l.data(),"is llllll")
        //                     //     // this.setState({data:l.data().cart})
        //                     //     // this.state.productData=l.data()
        //                     //     this.state.productData=l.data()
        //                     //     this.setState({productData:this.state.productData})
        //                     //     // this.state.orderPrice=l.data().price;
        //                     //     // this.setState({orderPrice:this.state.orderPrice})
        //                     //     orderPriceCountArray.push({
        //                     //         price: this.state.productData.quantity > 0 ?
        //                     //             Math.round(this.state.productData.price ) : 0,
        //                     //         count: productsInOrder.count
        //                     //     }
        //                     // );
        //                 //     })
        //                     return(
        //                         <div>hello</div>
        //                     )
        //                 })
        //                 // this.state.data.map((productsInOrder) => {
        //                 //     // console.log("id are",productsInOrder)
        //                 //     // fetch product information from source based on id
        //                 //     // product information can also be stored in state
        //                 //     // let this.state.productData = this.props.productProps.find(product => product.id === productsInOrder.id);
        //                     // firebase.firestore().collection('products').doc(productsInOrder.doc_id).get().then(l=>{
        //                     //     console.log(l.data(),"is llllll")
        //                     //     // this.setState({data:l.data().cart})
        //                     //     // this.state.productData=l.data()
        //                     //     this.state.productData=l.data()
        //                     //     this.setState({productData:this.state.productData})
        //                     //     // this.state.orderPrice=l.data().price;
        //                     //     // this.setState({orderPrice:this.state.orderPrice})
        //                     //     orderPriceCountArray.push({
        //                     //         price: this.state.productData.quantity > 0 ?
        //                     //             Math.round(this.state.productData.price ) : 0,
        //                     //         count: productsInOrder.count
        //                     //     }
        //                     // );
        //                     // })
                            
        //                 //     return (
        //                 //         <AdminOrderProduct
        //                 //             key={productsInOrder.id}
        //                 //             productName={this.state.productData.name}
        //                 //             productCategory={this.state.productData.category}
        //                 //             productPhoto={this.state.productData.img}
        //                 //             productPrice={Math.round(this.state.productData.price)}
        //                 //             productCount={productsInOrder.count}
        //                 //             currency={this.props.usedCurrencyProp}
        //                 //         />
        //                 //     )
        //                 // })
        //             }
        //         </div>
        //     </div>):(
        //         <div>
        //         <StyledFirebaseAuth 
        //         uiConfig={this.uiConfig}
        //         firebaseAuth={firebase.auth()}/>
        //         </div>
        //     )
        //     }
        // </div>
        // )
    }
}

const mapStateToProps = (state,ownProps) => {
    let order_id = ownProps.match.params.order_id
    let order = state.orders.find(spec_order=>spec_order.doc_id==order_id)
    // console.log("specific orders",order,order_id)
    //  firebase.firestore().collection('razorpay_orders').doc(order_id).get().then(l=>{
    //      console.log(l.data().cart,"is llllll")
    //  })
    return {
        doc_id: ownProps.match.params.order_id,
        productProps: state.products,
        orderProductsProp: order?order['cart']:null,
        price:order?order.price:null,
        vatProp: state.vat,
        usedCurrencyProp: state.usedCurrency
    }
};

const mapDispatchToProps = (dispatch) => {
    return {

    }
};

SpecificOrder.propTypes = {
    orderProductsProp: PropTypes.array.isRequired,
    productProps: PropTypes.array.isRequired,
    vatProp: PropTypes.number,
    usedCurrencyProp: PropTypes.object.isRequired
};


export default connect(mapStateToProps, mapDispatchToProps)(SpecificOrder);
// import React, { Component } from 'react';

// class AdminSpecificOrder extends Component {
    
//     render() {
//         alert("frim specific order  ")
//         return (
//             <div>
//                <div>hell hello world</div>
             
//             </div>
//         );
//     }
// }

// export default AdminSpecificOrder;