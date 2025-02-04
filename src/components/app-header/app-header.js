/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import cartIcon from './shopping-cart-solid.svg';
import './app-header.scss';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';

const AppHeader = ({total}) => {
    return (
        <header className="header">
            <Link className="header__link" to="/">
                Menu
            </Link>
            <Link className="header__link" to="/cart">
                <img className="header__cart" src={cartIcon} alt="cart"></img>
                Total: {total} $
            </Link>
        </header>
    )
};

const mapStateToProps = ({total}) => {
    return {
        total: total
    }
};

export default connect(mapStateToProps)(AppHeader);