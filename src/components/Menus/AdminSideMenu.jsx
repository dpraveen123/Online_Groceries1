import React from 'react';
import Menu from '../UI/Menu/Menu';
import AdminMenuComponent from '../Menus/AdminMenuComponent';
import PropTypes from 'prop-types';
import mainMenu from "./MainMenu";

const AdminsideMenu = (props) => {
    return (
        <React.Fragment>
            <Menu menuClasses="nav flex-column">
                <AdminMenuComponent cartCount={props.cartItemNumber}/>
            </Menu>
            {/*<Backdrop showBackDrop={props.showBackDrop}/>*/}
        </React.Fragment>
    )
};

mainMenu.propTypes = {
    cartItemNumber: PropTypes.number.isRequired
};

export default AdminsideMenu;