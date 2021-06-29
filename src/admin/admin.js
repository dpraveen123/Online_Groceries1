import React, { Component } from 'react';
import orderList from  "../components/Order/OrderList";
import firebase from '../store/reducers/firebase'
import PropTypes from 'prop-types';
// import 
// console.log("i am from admin")

class admin extends Component{
    constructor(props){
        super(props);
        this.state={
              data:[]
        }
    }
    componentDidMount=()=>{
        const db = firebase.firestore();

        return firebase.auth().onAuthStateChanged(user => {

            if (user) {
                return db.collection('users').doc(user.uid).collection('orders').get().then(res => {
                    const data = res.docs.map(doc => { const d = doc.data(); return { ...d, doc_id: doc.id } });
                    this.setState({data:data})
                    // dispatch(fetchOrdersSuccess(data))
                }).catch(e => {
                    // dispatch(fetchOrdersFailed())
                })
            }

        })
    }
    render()
    {  let cartContent = null;
    //   console.log("hiii and i admin garu",this.props)
       
        if (this.state.data.length>=0) {
            let orderList = this.state.data
                .map((order) => {
            console.log("xi s",order.date,order.doc_id)
                    
        return(
        <orderList
         orderPrice={Math.round(order.price)}
         orderId={order.doc_id}
         paymentId = {order.payment_id}
         date={order.date}
        //  hist={this.props.history}
        //  currency={this.props.usedCurrencyProp}
         />
                )});
                cartContent = (
                
                    <React.Fragment>
                    
                        {orderList}
    
                    </React.Fragment>
                )
                return (<div>

                    <div className="container shop-container py-4">
                        hello
                        <div className={'p-4 shop-div'}>
                            {cartContent}
                        </div>
                    </div>)
                </div>
                )
       
    }
}}
const mapStateToProps = state => {
    return {
        productProps: state.products,
        orderProductsProp: state.orders,
        vatProp: state.vat,
        usedCurrencyProp: state.usedCurrency
    }
};

const mapDispatchToProps = (dispatch) => {
    return {

    }
};

admin.propTypes = {
    orderProductsProp: PropTypes.array.isRequired,
    productProps: PropTypes.array.isRequired,
    vatProp: PropTypes.number,
    usedCurrencyProp: PropTypes.object.isRequired
};

export default admin;
// import React, { Component } from 'react';
// import orderList from  "../components/Order/OrderList";

// import PropTypes from 'prop-types';
// class admin extends Component{
//     render()
//     {  let cartContent = null;
      

//         if (this.props.orderProductsProp.length>0) {
//             let orderList = this.props.orderProductsProp
//                 .map((order) => {
                    
//         return(
//         <orderList
//          orderPrice={Math.round(order.price)}
//          orderId={order.doc_id}
//          paymentId = {order.payment_id}
//          date={order.date}
//          hist={this.props.history}
//          currency={this.props.usedCurrencyProp}/>
//                 )});
//                 cartContent = (
                
//                     <React.Fragment>
                    
//                         {orderList}
    
//                     </React.Fragment>
//                 )
//                 return (<div>

//                     <div className="container shop-container py-4">
//                         <div className={'p-4 shop-div'}>
//                             hello woeld
//                             {cartContent}
//                         </div>
//                     </div>)
//                 </div>
//                 )
       
//     }
// }}
// const mapStateToProps = state => {
//     return {
//         productProps: state.products,
//         orderProductsProp: state.orders,
//         vatProp: state.vat,
//         usedCurrencyProp: state.usedCurrency
//     }
// };

// const mapDispatchToProps = (dispatch) => {
//     return {

//     }
// };

// admin.propTypes = {
//     orderProductsProp: PropTypes.array.isRequired,
//     productProps: PropTypes.array.isRequired,
//     vatProp: PropTypes.number,
//     usedCurrencyProp: PropTypes.object.isRequired
// };

// export default admin;
