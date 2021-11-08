import React, {Component} from 'react';
import MenuListItem from '../menu-list-item';
import { connect } from 'react-redux';
import WithRestoService from '../hoc';
import {menuLoaded, menuRequested, addedToCart} from '../../actions';
import Spinner from '../spinner'; 

import './menu-list.scss';

class MenuList extends Component {
    componentDidMount() {
        this.props.menuRequested();
        
        const {RestoService} = this.props;
        RestoService.getMenuItems()
        .then(res => this.props.menuLoaded(res));
        // передаем данные из сервера в redux-store
    }

    render() {
        // получаем данные уже из redux-store
        const {menuItems, loading, addedToCart} = this.props;

        if(loading) {
            return <Spinner/>
        }
        return (
            <ul className="menu__list">
                {
                 menuItems.map(menuItem => {
                    return <MenuListItem 
                        key={menuItem.id} 
                        menuItem={menuItem}
                        onAddToCart={() => addedToCart(menuItem.id)}
                        />
                 })
                }   
            </ul>
        )
    }
};

// говорим компоненту MenuList какие именно свойства из нашего state он будет получать для своей работы
const mapStateToProps = (state) => {
    return {
       menuItems: state.menu,
       loading: state.loading 
    }
};

// const mapDispatchToProps = (dispatch) => {
//     return {
//         menuLoaded: (newMenu) => {
//             dispatch(menuLoaded(newMenu))
//         }
//     }
// }
// или просто так:

const mapDispatchToProps = {
    menuLoaded, 
    menuRequested,
    addedToCart
}

// из компонента отправляем данные в redux-store с помощью WithRestoService
// чтобы связать компонент MenuList с redux используем connect()
export default WithRestoService()(connect(mapStateToProps, mapDispatchToProps)(MenuList));