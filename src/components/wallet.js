import React from 'react';
import { Card } from 'antd';
import {LoadingOutlined} from '@ant-design/icons'
import CustomAvatar from '../components/custom-avatar';
import RegisterWallet from "./registerWallet";
import {connect} from 'react-redux';
import {getBalance} from "../actions/walletAction";

class Wallet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        menuaction: 3,
        }
    }

    static getDerivedStateFromProps(props, state) {
        props.getBalance();
        return {balance: props.balance}
    }

    render() {
        console.log(this.state.balance)
        return (
            <div className="d-flex flex-column full-height justify-content-center">
            {
                {
                    undefined: <LoadingOutlined style={{ fontSize: 30, color: "#0000FF" }} />,
                    null: <RegisterWallet/>,
                }[this.state.balance] ||
                (
                <div className="site-card-border-less-wrapper" style={{padding: 5, background: "#FFFFFF"}}>
                    <Card title="Balance amount:" style={{ maxwidth: 300 }}>
                        <p>{this.state.balance}đ</p>
                    </Card>
                </div>)
            }
            </div>
        )
    }
};


function mapStateToProps(state) {
  return {
    balance: state.walletReducer.balance,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getBalance() {
      dispatch(getBalance())
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Wallet);
