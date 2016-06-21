import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Header } from 'components/Header';
import { WechatPopup } from 'components/WechatPopup';
import * as utils from 'utils';
import * as actionCreators from 'actions/order/redpacket';

import './index.scss';

@connect(
  state => ({
    redpacket: state.redpacket,
  }),
  dispatch => bindActionCreators(actionCreators, dispatch),
)
export default class Success extends Component {

  static propTypes = {
    prefixCls: React.PropTypes.string,
    params: React.PropTypes.object,
    fetchRedpacket: React.PropTypes.func,
  };

  static contextTypes = {
    router: React.PropTypes.object,
  };

  static defaultProps = {
    prefixCls: 'order-success',
  };

  constructor(props, context) {
    super(props);
    context.router;
  }

  state = {
    sharePopupActive: false,
  }

  componentWillMount() {
    const { params } = this.props;
    this.props.fetchRedpacket(params.tid);
  }

  onViewOrderBtnClick = (e) => {
    const { params } = this.props;
    this.context.router.push(`/od.html?id=${params.tradeId}`);
  }

  onShareRedpacketBtnClick = (e) => {
    if (utils.detector.isWechat()) {
      this.setState({ sharePopupActive: true });
      return;
    }
  }

  onCloseBtnClick = (e) => {
    this.setState({ sharePopupActive: false });
  }

  render() {
    const { prefixCls } = this.props;
    return (
      <div className={`${prefixCls}`}>
        <Header title="支付成功" leftIcon="icon-angle-left" onLeftBtnClick={this.context.router.goBack}/>
        <div className="content content-white-bg">
          <div className="text-center padding-top-lg padding-bottom-lg">
            <i className="icon-order-succeed icon-6x icon-yellow"></i>
            <p className="font-xlg font-weight-600">支付成功!</p>
            <p className="font-grey margin-bottom-xs">您的订单已发至仓库，请等待发货</p>
            <button className="button button-stable" type="button" onClick={this.onViewOrderBtnClick}>查看订单</button>
          </div>
          <div className="redpacket-container text-center">
            <div className="redpacket">
              <img src="http://7xogkj.com1.z0.glb.clouddn.com/mall/redpacket-bg.jpg" />
              <div>
                <p className="font-white redpacket-count"><span>恭喜你获得</span><span className="font-30">15</span><span>个红包</span></p>
                <p className="font-yellow">分享红包给好友可抵扣在线支付金额</p>
                <button className="button button-energized font-md col-xs-10 col-xs-offset-1" type="button" onClick={this.onShareRedpacketBtnClick}>分享领取红包</button>
              </div>
            </div>
          </div>
        </div>
        <WechatPopup active={this.state.sharePopupActive} onCloseBtnClick={this.onCloseBtnClick}/>
      </div>
    );
  }

}