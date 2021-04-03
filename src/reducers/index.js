import { combineReducers } from 'redux';
import { userReducer } from './userReducer';
import { cartReducer } from './cartReducer';
import { drawerReducer } from './drawerReducer';

const rootReducer = combineReducers({
    user: userReducer,
    cart: cartReducer,
    drawer: drawerReducer
})

export default rootReducer;