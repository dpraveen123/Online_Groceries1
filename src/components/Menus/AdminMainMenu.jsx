import React from 'react';
import Menu from '../UI/Menu/Menu';
import AdminMenuComponent from '../Menus/AdminMenuComponent';
import PropTypes from 'prop-types';
import MenuItem from "../UI/MenuItem/MenuItem";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {faShoppingCart} from  '@fortawesome/free-solid-svg-icons';
import { NavLink, Link } from 'react-router-dom';
const AdminmainMenu = (props) => {
    return (    
        <div className="nav-1">
        <nav className="navbar navbar-expand-md navbar-light bg-light">

           <Link to="/"> <span className="navbar-brand">TamatarWala</span></Link>
            
            <NavLink to="/cart" className="nav-link active cart"> Cart <span className="badge badge-light">{props.cartItemNumber}</span></NavLink>
            <button
                className="navbar-toggler"
                onClick={props.toggleSideBar}>
                <span className="navbar-toggler-icon"></span>
            </button>
            
            <div className="collapse navbar-collapse">
                <Menu menuClasses="navbar-nav ml-auto mt-2 mt-lg-0">
                    <AdminMenuComponent cartCount={props.cartItemNumber}/>
                  
                </Menu>
            </div>
           
        </nav>
        </div>
    )
};

AdminmainMenu.propTypes = {
    toggleSideBar: PropTypes.func.isRequired,
    cartItemNumber: PropTypes.number.isRequired
};

export default AdminmainMenu;