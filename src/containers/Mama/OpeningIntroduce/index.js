import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'underscore';
import * as utils from 'utils';
import * as constants from 'constants';
import { Link } from 'react-router';
import { Image } from 'components/Image';
import { Header } from 'components/Header';
import * as fetchMamaQrcodeAction from 'actions/mama/mamaQrcode';

import './index.scss';

const actionCreators = _.extend(fetchMamaQrcodeAction);

@connect(
  state => ({
    mamaQrcode: state.mamaQrcode,
  }),
  dispatch => bindActionCreators(actionCreators, dispatch),
)
export default class OpeningIntroduce extends Component {
  static propTypes = {
    mamaQrcode: React.PropTypes.object,
    fetchMamaQrcode: React.PropTypes.func,
  };

  static contextTypes = {
    router: React.PropTypes.object,
  };

  constructor(props, context) {
    super(props);
    context.router;
  }

  componentWillMount() {
    const mamaLinkId = utils.cookie.getCookie('mm_linkid');
    if (mamaLinkId && (mamaLinkId !== undefined)) {
      this.props.fetchMamaQrcode(mamaLinkId);
    }
  }

  componentDidMount() {
    document.body.style.backgroundColor = '#FFCB00';
  }

  componentWillReceiveProps(nextProps) {

  }

  componentWillUnmount() {
    document.body.style.backgroundColor = '';
  }

  onBtnClick = (e) => {
    const mamaLinkId = utils.cookie.getCookie('mm_linkid');
    const { type } = e.currentTarget.dataset;
    const { protocol, host } = window.location;
    window.location.href = `${protocol}//${host}/rest/v1/users/weixin_login/?next=/mall/mcf.html?mama_id=${mamaLinkId}`;
  }

  /* <Image src={`http://7xkyoy.com1.z0.glb.clouddn.com//mall/mama/open/v2/zeroopeninfo.png`} quality={80}/> */
  render() {
    return (
      <div>
        <Header title="开店介绍" leftIcon="icon-angle-left" onLeftBtnClick={this.context.router.goBack} />
          <div className="content open-introduce-container">
            <Image src={`http://7xkyoy.com1.z0.glb.clouddn.com//mall/mama/open/v2/zeroopenbanner.png`} quality={80}/>
            <Image className="qrcode" src ={this.props.mamaQrcode ? this.props.mamaQrcode.data.qrcode_link : ''} />
            <div >
              <h>-----------------------------0元开店步骤---------------------------</h>
              <ul>
              <li className="col-xs-offset-1 margin-right-xs info" >长按上面图片，在微信中会出现识别此二维码选项，点击识别此二维码即可关注小鹿美美公众号并自动生成店铺。在公众号右下角
                 “我的收入”》“开店二维码”获得您的二维码，转发二维码给朋友们加入即可获得邀请奖。扫码的朋友同时是您的粉丝。</li>
              <li className="col-xs-offset-1 margin-right-xs info" >首次提现2-6元，轻松秒到。在小鹿美美公众号右下角“我的收入”》“累计受益”首次提现，
                 更多收益提现请下载小鹿美美APP，发每日特卖到朋友圈，可获得8-30%订单佣金提成。</li>
              </ul>
            </div>
            <div className="row no-margin">
              <button className="col-xs-10 col-xs-offset-1 margin-top-xs margin-bottom-xs button button-energized" type="button" data-type="2" onClick={this.onBtnClick}>成为正式会员</button>
            </div>
          </div>
      </div>
    );
  }
}
