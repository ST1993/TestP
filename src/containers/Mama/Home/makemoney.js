import React, { Component } from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import _ from 'underscore';
import * as utils from 'utils';
import * as plugins from 'plugins';
import * as constants from 'constants';
import { If } from 'jsx-control-statements';
import { connect } from 'react-redux';
import { Header } from 'components/Header';
import { Loader } from 'components/Loader';
import { Image } from 'components/Image';
import * as mamaDetailAction from 'actions/mama/mamaDetailInfo';

import './makemoney.scss';

const actionCreators = _.extend(mamaDetailAction);

@connect(
  state => ({
    mamaBaseInfo: state.mamaDetailInfo,
  }),
  dispatch => bindActionCreators(actionCreators, dispatch),
)
export default class MakemoneyTab extends Component {
  static propTypes = {
    children: React.PropTypes.array,
    dispatch: React.PropTypes.func,
    mamaBaseInfo: React.PropTypes.any,
    fetchMamaFortune: React.PropTypes.func,
    fetchMamaWebCfg: React.PropTypes.func,
  };

  static contextTypes = {
    router: React.PropTypes.object,
  };

  constructor(props, context) {
    super(props);
    context.router;
  }

  state = {

    sticky: false,
    hasMore: false,

  }

  componentWillMount() {
    this.props.fetchMamaFortune();
    this.props.fetchMamaWebCfg();
  }

  componentDidMount() {
    this.addScrollListener();
  }

  componentWillReceiveProps(nextProps) {
    const { mamaBaseInfo } = nextProps;

    if (mamaBaseInfo.mamaFortune.isLoading || mamaBaseInfo.mamaWebCfg.isLoading) {
      utils.ui.loadingSpinner.show();
    } else {
      utils.ui.loadingSpinner.hide();
    }
  }

  componentWillUnmount() {
    this.removeScrollListener();
  }

  onScroll = (e) => {
  }

  onLeftBtnClick = (e) => {
    if (utils.detector.isApp()) {
      plugins.invoke({
        method: 'callNativeBack',
      });
      return;
    }
    this.context.router.goBack();
  }

  onMakemoneyClick = (e) => {
    const { id } = e.currentTarget.dataset;
    const { mamaFortune } = this.props.mamaBaseInfo;
      switch (id) {
        case '1':
          this.context.router.push('/');
          break;
        case '2':
          this.context.router.push('/mama/everydaypush?mm_linkid=' + ((mamaFortune.success && mamaFortune.data.mama_fortune) ? mamaFortune.data.mama_fortune.mama_id : ''));
          break;
        case '3':
          this.context.router.push('/mama/commission');
          break;
        case '4':
          // this.context.router.push('/mama/invited');
          window.location.href = '/mall/boutiqueinvite?num=365&share=1';
          break;
        default:
      }
    e.preventDefault();
  }

  addScrollListener = () => {
    window.addEventListener('scroll', this.onScroll);
  }

  removeScrollListener = () => {
    window.removeEventListener('scroll', this.onScroll);
  }

  renderActivities(activities) {
    return (
      <ul className="margin-bottom-lg">
        {activities.map((activity, index) => {
          return (
            <a href={activity.act_link} key={activity.id}>
              <li className="row no-margin margin-top-xs">
                <Image className="col-xs-12 no-padding" src={activity.act_img} key={index}/>
              </li>
            </a>
          );
        })}
      </ul>
    );
  }

  render() {
    const { mamaFortune, mamaWebCfg } = this.props.mamaBaseInfo;
    const activityData = this.props.mamaBaseInfo.mamaWebCfg.success ? this.props.mamaBaseInfo.mamaWebCfg.data.results[0].mama_activities : [];
    return (
      <div className="col-xs-12 no-padding">
        <div className="content makemoney-container">
          <div className="row carryout bottom-border">
            <div className="col-xs-6 week-carryout">
              <p className="col-xs-12 text-center">本周收益</p>
              <p className="col-xs-12 text-center">{(mamaFortune.success && mamaFortune.data) ? mamaFortune.data.mama_fortune.extra_figures.week_duration_total : 0}</p>
            </div>
            <div className="col-xs-6 week-carryout">
              <p className="text-center">今日收益</p>
              <p className="text-center">{(mamaFortune.success && mamaFortune.data) ? mamaFortune.data.mama_fortune.extra_figures.today_carry_record : 0}</p>
            </div>
          </div>
          <div className="bottom-border cat4">
            <div className="col-xs-3 makemoney-cat" data-id={1} onClick={this.onMakemoneyClick}>
              <div className="mama-shop-icon text-center" />
              <p className=" text-center">分享店铺</p>
            </div>
            <div className="col-xs-3 makemoney-cat" data-id={2} onClick={this.onMakemoneyClick}>
              <div className="mama-push-icon text-center" />
              <p className=" text-center">每日推送</p>
            </div>
            <div className="col-xs-3 makemoney-cat" data-id={3} onClick={this.onMakemoneyClick}>
              <div className="mama-select-icon text-center" />
              <p className=" text-center">选品佣金</p>
            </div>
            <div className="col-xs-3 makemoney-cat" data-id={4} onClick={this.onMakemoneyClick}>
              <div className="mama-invite-icon" />
              <p className=" text-center">邀请开店</p>
            </div>
          </div>
        </div>
        { this.renderActivities(activityData) }
      </div>
    );
  }
}
