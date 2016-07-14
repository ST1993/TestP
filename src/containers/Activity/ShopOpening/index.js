import React, { Component } from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'underscore';
import { Image } from 'components/Image';
import { Checkbox } from 'components/Checkbox';
import { Input } from 'components/Input';
import { Toast } from 'components/Toast';
import * as verifyCodeAction from 'actions/user/verifyCode';
import * as mamaInfoAction from 'actions/activity/mamaInfo';
import * as mamaOrderAction from 'actions/activity/mamaOrder';
import * as mamaChargeAction from 'actions/activity/mamaCharge';

import './index.scss';

const banner = 'http://7xogkj.com1.z0.glb.clouddn.com/mall/opening-shop-banner.jpg';
const actionCreators = _.extend(verifyCodeAction, mamaInfoAction, mamaOrderAction, mamaChargeAction);

@connect(
  state => ({
    verifyCode: state.verifyCode,
    mamaInfo: state.mamaInfo,
    mamaOrder: state.mamaOrder,
    mamaCharge: state.mamaCharge,
  }),
  dispatch => bindActionCreators(actionCreators, dispatch),
)
export default class OpeningShop extends Component {
  static propTypes = {
    children: React.PropTypes.array,
    fetchVerifyCode: React.PropTypes.func,
    verify: React.PropTypes.func,
    resetVerifyState: React.PropTypes.func,
    resetFetchState: React.PropTypes.func,
    fetchMamaInfo: React.PropTypes.func,
    fetchMamaOrder: React.PropTypes.func,
    fetchMamaCharge: React.PropTypes.func,
    mamaInfo: React.PropTypes.obejct,
    mamaOrder: React.PropTypes.obejct,
    mamaCharge: React.PropTypes.obejct,
  };

  static contextTypes = {
    router: React.PropTypes.object,
  };

  constructor(props, context) {
    super(props);
    context.router;
  }

  state = {
    phone: '',
    code: '',
  }

  componentWillMount() {
    this.props.fetchMamaInfo();
    this.props.fetchMamaOrder();
  }

  componentWillReceiveProps(nextProps) {
    const { fetch, verify } = nextProps.verifyCode;
    if ((fetch.success || fetch.error) && !fetch.isLoading && !this.state.verifyCode) {
      Toast.show(fetch.data.msg);
    }
    if ((verify.success || verify.error) && !verify.isLoading && !this.state.password) {
      Toast.show(verify.data.msg);
    }
  }

  onPhoneChange = (val) => {
    this.setState({ phone: val });
  }

  onVerifyCodeChange = (e) => {
    this.setState({ code: e.target.value });
  }

  onVerifyCodeBlur = () => {
    this.props.resetFetchState();
    this.props.verify(this.state.phone, this.state.code, 'bind');
  }

  onGetVerifyCodeBtnClick = () => {
    this.props.fetchVerifyCode(this.state.phone, 'bind');
  }

  onShowPayPopupClick = () => {

  }

  onChargeClick = () => {
    const mamaOrder = this.props.mamaOrder.data || {};
    this.props.fetchMamaCharge({
      product_id: mamaOrder.product.id,
      sku_id: mamaOrder.normal_skus[2].id,
      payment: mamaOrder.payinfos[3].total_payment,
      channel: this.state.payChannel,
      num: 1,
      post_fee: 0,
      discount_fee: 0,
      uuid: mamaOrder.uuid,
      total_fee: mamaOrder.payinfos[3].total_payment,
      success_url: '',
      cancel_url: '',
    });
  }

  render() {
    return (
      <div className="col-xs-12 col-sm-8 col-sm-offset-2 no-padding content-white-bg opening-shop">
        <Image style={{ width: '100%' }} src={banner} />
        <Input type="number" placeholder="请输入手机号" onChange={this.onPhoneChange}/>
        <div className="row no-margin password-box bottom-border margin-bottom-xs">
          <input className="col-xs-8" type="number" placeholder="请输入验证码" onChange={this.onVerifyCodeChange} onBlur= {this.onVerifyCodeBlur} />
          <button className="col-xs-4 button button-sm button-light" type="button" onClick={this.onGetVerifyCodeBtnClick}>获取验证码</button>
        </div>
        <div className="row no-margin text-center margin-bottom-xs">
          <button className="col-xs-10 col-xs-offset-1 button button-energized" onClick={this.onShowPayPopupClick}>马上一元开店</button>
        </div>
        <div className="row no-margin text-center margin-bottom-xs">
          <Checkbox className="margin-bottom-xs" checked>同意一元体验15天</Checkbox>
          <Link to="/activity/shop/agreement">小鹿妈妈服务条款！</Link>
        </div>
      </div>
    );
  }
}