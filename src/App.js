import React, {Component} from 'react';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {closeMaxProductModal, toogleSideBar} from './store/actions/shop'
import MainLayout from './Layouts/MainLayout';
import Homepage from './containers/pages/Index';
import Vegetables from './containers/pages/Vegetables';
import Fruits from './containers/pages/Fruits';
import Herbs from './containers/pages/Herbs';
import Sale from './containers/pages/Sale';
import Cart from './containers/pages/Cart';
import Footer from './containers/pages/footer';
import Checkout from './containers/pages/Checkout';
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import './App.css';

 firebase.initializeApp({
            apiKey:"AIzaSyBEPhxyEU0oTqLR6mjiy4AJOSpmcM_DrcE",
            authDomain:"online-shop-32976.firebaseapp.com"
        })

class App extends Component {false
//      state = { isSignedIn: false }
//   uiConfig = {
//     signInFlow: "popup",
//     signInOptions: [
//       firebase.auth.GoogleAuthProvider.PROVIDER_ID,
//       firebase.auth.EmailAuthProvider.PROVIDER_ID,
//       firebase.auth.PhoneAuthProvider.PROVIDER_ID
//     ],
//     callbacks: {
//       signInSuccess: () => false
//     }
//   }

//   componentDidMount = () => {
//     firebase.auth().onAuthStateChanged(user => {
//       this.setState({ isSignedIn: !!user })
//       console.log("user", user)
//     })
//   }   
   render() {
        return (
            <div className="App">
                
                      <div>
                <MainLayout
                    storeCartCount={this.props.storeCartItemsCount}
                    showModal={this.props.showModalProp}
                    closeModalProp={this.props.closeModalProp}
                    modalMessage={this.props.modalMessageProp}
                    showSideBar={this.props.showSideNavigationProp}
                    toggleSideBar={this.props.toggleSideBarProp}>
                    
                    <Switch>
                        <Route path={'/'} exact component={Homepage}/>
                        <Route path={'/vegetables'} component={Vegetables}/>
                        <Route path={'/fruits'} component={Fruits}/>
                        <Route path={'/herbs'} component={Herbs}/>
                    
                        <Route path={'/cart'} component={Cart}/>
                        <Route path={'/checkout'} component={Checkout}/>
                        {/*always redirect to index*/}
                        <Redirect to={'/'}/>
                    </Switch>
                    <Footer/>
                </MainLayout>
                </div>
                 
                 
                

            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        storeCartItemsCount: state.cartTotal,
        showModalProp: state.productMaxShowModal,
        modalMessageProp: state.modalMessage,
        showSideNavigationProp: state.showSideNavigation
    }
};

const mapDispatchToProps = dispatch => {
    return {
        closeModalProp: () => dispatch(closeMaxProductModal()),
        toggleSideBarProp: () => dispatch(toogleSideBar())
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
