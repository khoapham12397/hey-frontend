import { api } from '../api/api';
import { message } from 'antd';

export const TOP_UP = 'wallet.TOP_UP'
export const TRANSFER = 'wallet.TRANSFER'
export const BALANCE = 'wallet.BALANCE'
export const REGISTER = 'wallet.REGISTER'
export const REGISTER_WALLET_POPUP_STATE = 'wallet.REGISTER_WALLET_POPUP_STATE'
export const TOPUP_POPUP_STATE = 'wallet.TOPUP_POPUP_STATE'
export const PIN_POPUP_STATE = 'wallet.PIN_POPUP_STATE'
export const TRANSFER_POPUP_STATE = 'wallet.TRANSFER_POPUP_STATE'
export const CHANGE_REQUEST = 'wallet.CHANGE_REQUEST'
export const CHANGE_TRANSFER = 'wallet.CHANGE_TRANSFER'

export function changeRequest(request){
    return function(dispatch){
        dispatch(requestAction(request))
    }
}

function requestAction(request){
    return {type:CHANGE_REQUEST, request }
}

export function changeTransfer(transfer){
    return function(dispatch){
        dispatch(changeTransferAction(transfer));
    }
}

function changeTransferAction(transfer){
    return {type: CHANGE_TRANSFER, transfer}
}

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

function topUpAction(result) {
    message.success(result.data.message);
    return {
        type: TOP_UP,
        amount: result.data.amount,
    };
}

export function topUpWallet(topUp) {
    return function(dispatch) {
        return callTopUpApi(topUp).then(result => {
            dispatch(topUpAction(result.data,));
        });
    };   
}

function callTopUpApi(topUp) {
    var promise = new Promise(function(resolve, reject) {
        api.post(`/api/wallet/protected/topup`, topUp)
            .then(res => {
                resolve(res);
        })
    });
    return promise;
}

function transferAction(result) {
    if (result.data.message)
        message.success(result.data.message);
    return {
        type: TRANSFER,
        amount: result.data.amount,
    };
}

export function transferWallet(transfer) {
    return function(dispatch) {
        return callTransferApi(transfer).then(result => {
            console.log(JSON.stringify(result))
            dispatch(transferAction(result.data));
        });
    };   
}

function callTransferApi(transfer) {
    console.log(transfer)
    var promise = new Promise(function(resolve, reject) {
        api.post(`/api/wallet/protected/sendP2P`, transfer)
            .then(res => {
                resolve(res);
        })
    });
    return promise;
}

export function changeStateRegisterWalletPopup(state){
    return {type: REGISTER_WALLET_POPUP_STATE, popupstate: state}
}

export function changeStateTopUpWalletPopup(state){
    return {type: TOPUP_POPUP_STATE, popupstate: state}
}

export function changeStatePinPopup(state){
    return {type: PIN_POPUP_STATE, popupstate: state}
}

export function changeStateTransferPopup(state){
    return {type: TRANSFER_POPUP_STATE, popupstate: state}
}