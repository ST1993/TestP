import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import _ from 'underscore';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { Header } from 'components/Header';
import { Footer } from 'components/Footer';
import { Input } from 'components/Input';
import * as actionCreators from 'actions/user/profile';
import { Toast } from 'components/Toast';

import './index.scss';

@connect(
  state => ({
    profile: state.profile.data,
    isLoading: state.profile.isLoading,
  }),
  dispatch => bindActionCreators(actionCreators, dispatch),
)

export default class Nickname extends Component {
  static propTypes = {
    params: React.PropTypes.object,
    children: React.PropTypes.array,
    profile: React.PropTypes.any,
    dispatch: React.PropTypes.func,
    isLoading: React.PropTypes.bool,
    error: React.PropTypes.bool,
    saveProfile: React.PropTypes.func,
    fetchProfile: React.PropTypes.func,
  };

  static contextTypes = {
    router: React.PropTypes.object,
  };

  constructor(props, context) {
    super(props);
    context.router;
  }

  state = {
    submitBtnDisabled: true,
    submitBtnPressed: false,
    changeNickname: false,
  }

  componentWillMount() {
    this.props.fetchProfile();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.success) {
      Toast.show(nextProps.profile.msg);
    }
    if (nextProps.success && nextProps.profile.rcode === 0 && this.state.bindPhone) {
      this.context.router.push('/user/profile');
    }
  }

  onBubmitBtnClick = (e) => {
    const { profile } = this.state;
    if (!profile.nick) {
      return;
    }
    this.setState({ changeNickname: true });
    this.setState({ submitBtnPressed: true });
    this.props.saveProfile(this.state.profile);
    _.delay(() => {
      this.setState({ submitBtnPressed: false });
    }, 300);
  }

  onNicknameChange = (value) => {
    const profile = this.props.profile;
    profile.nick = value;
    this.setState({
      submitBtnDisabled: false,
      profile: profile,
    });
  }

  render() {
    const props = this.props;
    const { children, profile, isLoading, error } = this.props;
    const bindPhoneBtnCls = classnames({
      ['col-xs-10 col-xs-offset-1 margin-top-xs button button-energized']: 1,
      ['pressed']: this.state.submitBtnPressed,
    });
    return (
      <div>
        <Header title="修改昵称" leftIcon="icon-angle-left" leftBtnClick={this.context.router.goBack} />
        <div className="has-header content">
          <Input className="col-xs-8" type="text" placeholder={'设置个昵称（不超过20字）'} value={profile.nick} onChange={this.onNicknameChange}/>
          <p className="col-xs-12 margin-top-xs">4-20个字符，可有中英文、数字、“_”、“—”组成</p>
          <div className="row no-margin">
            <button className={bindPhoneBtnCls} type="button" onClick={this.onBubmitBtnClick} disabled={this.state.submitBtnDisabled}>保存</button>
          </div>
          <Footer/>
        </div>
      </div>
    );
  }
}
