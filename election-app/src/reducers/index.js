import { combineReducers } from 'redux'
import {metaMaskInstalled,isUserLogin,accounts,web3Object} from './metamask'


const rootReducer = combineReducers({
    metaMaskInstalled,isUserLogin,accounts,web3Object
})

export default rootReducer;