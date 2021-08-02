import { api } from '../api/api';
import { message } from 'antd';

export const TOP_UP = 'wallet.TOP_UP'
export const TRANSFER = 'wallet.TRANSFER'
export const BALANCE = 'wallet.BALANCE'
export const REGISTER = 'wallet.REGISTER'
export const REGISTER_WALLET_POPUP_STATE = 'wallet.REGISTER_WALLET_POPUP_STATE'

export function registerWallet(wallet) {
    return function(dispatch) {
        return callRegisterApi(wallet).then(result => {
            dispatch(registerAction(result.data));
        });
    }
}

export function registerAction(wallet) {
    message.success(wallet.data.message);
    return { type: REGISTER, balance: 0 };
}

function callRegisterApi(wallet) {
    var promise = new Promise(function(resolve, reject) {
        api.post(`/api/wallet/protected/registerWallet`, wallet)
            .then(res => {
                resolve(res);
            })
    });
    return promise;
}

export function balanceAction(result) {
    return {
        type: BALANCE,
        balance: result.data.balance,
    };
}

export function getBalance(wallet) {
    return function(dispatch) {
        return callGetBalanceApi(wallet).then(result => {
            dispatch(balanceAction(result.data));
        });
    };   
}

function callGetBalanceApi(wallet) {
    var promise = new Promise(function(resolve, reject) {
        api.post(`/api/wallet/protected/getBalance`)
            .then(res => {
                resolve(res);
        })
    });
    return promise;
}

export function changeStateRegisterWalletPopup(state){
    return {type: REGISTER_WALLET_POPUP_STATE, popupstate: state}
}