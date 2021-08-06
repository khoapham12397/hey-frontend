import { TOP_UP, 
    TRANSFER, 
    BALANCE,
    REGISTER,
    CHANGE_TRANSFER,
    CHANGE_REQUEST,
    REGISTER_WALLET_POPUP_STATE,
    TOPUP_POPUP_STATE,
    PIN_POPUP_STATE,
    TRANSFER_POPUP_STATE,
} from "../actions/walletAction";

const initialState = {
    user: {},
    registerWalletPopup: false,
    topUpPopup: false,
    pinPopup: false,
    transferPopup: false,
    transfer: {name: "", avatar: "", userId: ""},
}

export default function reduce(state = initialState, action) {
    switch (action.type) {
        case CHANGE_REQUEST:
            return {
                ...state,
                request: action.request
            }
        case CHANGE_TRANSFER:
            const transfer = state.transfer;
            if (action.transfer.name)
                transfer.name = action.transfer.name
            if (action.transfer.avatar)
                transfer.avatar = action.transfer.avatar
            if (action.transfer.userId)
                transfer.userId = action.transfer.userId
            return {
                ...state,
                transfer,
            }
        case BALANCE:
            return {
                ...state,
                balance: action.balance,
            };
        case TOP_UP:
            return {
                ...state,
                balance: state.balance + action.amount,
            }
        case REGISTER:
            return {
                ...state,
                balance: action.BALANCE
            }
        case TRANSFER:
            return {
                ...state,
                balance: state.balance - action.amount,
            }
        case REGISTER_WALLET_POPUP_STATE:
            return {
                ...state,
                registerWalletPopup: action.popupstate,
            }
        case TOPUP_POPUP_STATE:
            return {
                ...state,
                topUpPopup: action.popupstate,
            }
        case PIN_POPUP_STATE:
            return {
                ...state,
                pinPopup: action.popupstate,
            }
        case TRANSFER_POPUP_STATE:
            return {
                ...state,
                transferPopup: action.popupstate,
            }
        default:
            return state;
    }
}