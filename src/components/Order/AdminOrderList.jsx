import React from 'react';
import PropTypes from 'prop-types';

const AdminorderList = (props) => {
    console.log("props from Adminorderlist",props.adress)
    // let currencyKeys = Object.keys(props.currency);
    // let currencyName = props.currency[currencyKeys[1]];
    return (
        <React.Fragment >
            <div className="row" style={{cursor:'pointer'}} onClick={()=>{console.log("clickeed");props.hist.push(`/orders/${props.orderId}`)}}>
                <div className="col">
                    <div className="row">
                        <div className="col-sm-4 col-md-5 shop-cart-product-details">
                            <h5 className="shop-cart-name text-capitalize">Order ID:{props.orderId}</h5>
                            {props.paymentId && <h5 className="shop-cart-name text-capitalize">Payment ID:{props.paymentId}</h5>}
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
                                       Adress:
                                      {/* number:{props.adress.mobile} */}
                                         {/* {props.orderPrice.toLocaleString()}     */}
                                    </h6>
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