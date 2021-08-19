import { api } from '../api/api';
import { message } from 'antd';
import { nodeName } from 'jquery';

export const TOP_UP = 'wallet.TOP_UP'
export const TRANSFER = 'wallet.TRANSFER'
export const BALANCE = 'wallet.BALANCE'
export const REGISTER = 'wallet.REGISTER'
export const CHANGE_REQUEST = 'wallet.CHANGE_REQUEST'
export const CHANGE_TRANSFER = 'wallet.CHANGE_TRANSFER'
export const SEND_LUCKY_MONEY = 'wallet.SEND_LUCKY_MONEY'
export const RECEIVE_LUCKY_MONEY = 'wallet.RECEIVE_LUCKY_MONEY'

export const REGISTER_WALLET_POPUP_STATE = 'wallet.REGISTER_WALLET_POPUP_STATE'
export const TOPUP_POPUP_STATE = 'wallet.TOPUP_POPUP_STATE'
export const PIN_POPUP_STATE = 'wallet.PIN_POPUP_STATE'
export const TRANSFER_POPUP_STATE = 'wallet.TRANSFER_POPUP_STATE'
export const LUCKY_MONEY_POPUP_STATE = 'wallet.LUCKY_MONEY_POPUP_STATE'
export const NONE = "wallet.NONE"

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
    if ('data' in result){
        message.success("Transfer successful");
        return {
            type: TRANSFER,
            amount: result.data.amount,
        };
    }else{
        message.error(result.error)
        return {
            type: "NONE",
            amount: 0,
        }
    }
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

function sendLuckyMoneyAction(result) {
    try {
        console.log(result.data)
        message.success(`Sent ${result.data.totalAmount}đ lucky money to the group`);
        return {
            type: SEND_LUCKY_MONEY,
            amount: result.data.totalAmount,
        };
    } catch (error) {
        message.error(error)
        return {
            type: "NONE",
            amount: 0,
        }
    }
}

export function sendLuckyMoney(luckyMoney) {
    return function(dispatch) {
        return callSendLuckyMoneyApi(luckyMoney).then(result => {
            console.log(JSON.stringify(result))
            dispatch(sendLuckyMoneyAction(result.data));
        });
    };   
}

function callSendLuckyMoneyApi(luckyMoney) {
    var promise = new Promise(function(resolve, reject) {
        api.post(`/api/wallet/protected/sendPresent`, luckyMoney)
            .then(res => {
                resolve(res);
        })
    });
    return promise;
}

export function changeStateRegisterWalletPopup(state){
    return {type: REGISTER_WALLET_POPUP_STATE, popupState: state}
}

export function changeStateTopUpWalletPopup(state){
    return {type: TOPUP_POPUP_STATE, popupState: state}
}

export function changeStatePinPopup(state){
    return {type: PIN_POPUP_STATE, popupState: state}
}

export function changeStateTransferPopup(state){
    return {type: TRANSFER_POPUP_STATE, popupState: state}
}

export function changeStateLuckyMoneyPopup(state){
    return {type: LUCKY_MONEY_POPUP_STATE, popupState: state}
}