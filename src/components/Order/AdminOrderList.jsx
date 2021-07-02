import React from 'react';
import PropTypes from 'prop-types';
import {Button} from 'react-bootstrap'
import firebase from 'firebase';
import axios from 'axios'
const AdminorderList = (props) => {
   function clicked(){
         console.log("button clikced")
     }
    console.log("props from Adminorderlist",props.userUid)
    // let currencyKeys = Object.keys(props.currency);
    // let currencyName = props.currency[currencyKeys[1]];
    return (
        <React.Fragment>
            <div className="row" >
                <div className="col">
                    <div className="row" style={{cursor:'pointer'}} onClick={()=>{console.log("clickeed");props.hist.push(`/orders/${props.orderId}`)}}>
                        <div className="col-sm-4 col-md-5 shop-cart-product-details">
                            <h5 className="shop-cart-name text-capitalize">Order ID:{props.orderId}</h5>
                            {props.paymentId && <h5 className="shop-cart-name text-capitalize">Payment ID:{props.paymentId}</h5>}
                            <h5 className="shop-cart-name text-capitalize">Mode:{props.mode}</h5>
                        </div>
                        <div className="col-sm-4 col-md-3">
                            <div className="row">
                                <div className="col-sm-6 text-left">
                                    <h6 className={'shop-cart-item-price'}>
                                       Rs.
                                         {props.orderPrice.toLocaleString()}    
                                    </h6>
                                    <h6 className={'shop-cart-item-price'}>
                                        {props.date}
                                    </h6>
                                </div>
                            </div>
                            
                        </div>
                        {/* .....................adreesss.................. */}
                        <div className="col-sm-4 col-md-3">
                            <div className="row">
                                <div className="col-sm-6 text-left">
                                    <h6 className={'shop-cart-item-price'}>
                                       Customer Details:
                                      {/* number:{props.adress.mobile} */}
                                         {/* {props.orderPrice.toLocaleString()}     */}
                                    </h6>
                                    <hr></hr>
                                    <h6 className={'shop-cart-item-price'}>
                                        {/* {props.date} */}
                                        name:{props.adress.firstName+props.adress.secondName}

                                    </h6>
                                    <h6 className={'shop-cart-item-price'}>
                                        {/* {props.date} */}
                                      mobile:{props.adress.mobile}
                                    </h6>
                                    <h6 className={'shop-cart-item-price'}>
                                        {/* {props.date} */}
                                      address:{props.adress.address}
                                    </h6>
                                </div>
                            </div>
                            
                        </div>                      
                    </div>
                    <div>
                        {/* <div>hehehehe</div> */}
                            <div>
                                <h5 style={{float:'left'}}>Are you delivered:</h5>
                                <Button variant="primary"  style={{marginTop:-5,marginLeft:10}} 
                                onClick={()=>{
                                    console.log("cliked brooo",)
                                  
                                    if(props.mode==='onDelivery'){
                                        firebase.firestore().collection('users').doc(props.userUid).collection('orders').doc(props.orderId).update({
                                            isPaid:1,
                                            isDelivered:1
                                        })
                                        firebase.firestore().collection('razorpay_orders').doc(props.orderId).update({
                                            isPaid:1,
                                            isDelivered:1
                                        }).then(l=>{
                                            props.CheckOrders();
                                        })
                                        let url = 'https://us-central1-online-groceries-d4d42.cloudfunctions.net/payment/onDelivery'  //paste the url here
                                        let url1 = 'http://localhost:4000/create_order'
                                        axios.post(url, {orderId:props.orderId}).then(r => {
                        
                                            if (r.data.code == 200) {
                                                let order_id = r.data.order_id
                                                // alert("changing stock")
                                                // func(order_id, order['price'])
                                            } else {
                                                // alert("Error placing the order")
                                            }
                                        })
                                    }else{
                                        firebase.firestore().collection('razorpay_orders').doc(props.orderId).update({
                                            isDelivered:1
                                        }).then(l=>{
                                            props.CheckOrders();
                                        })
                                        firebase.firestore().collection('users').doc(props.userUid).collection('orders').doc(props.orderId).update({
                                            isDelivered:1
    
                                        })
                                     
                                    }
                                }}
                                >Yes</Button>
                                
                            </div>
                            </div> 
                </div>
                
            </div>
            <hr/>
        </React.Fragment>
    )
};

AdminorderList.propTypes = {

    orderPrice: PropTypes.number.isRequired,
    orderId: PropTypes.number.isRequired,
   
};

export default AdminorderList;