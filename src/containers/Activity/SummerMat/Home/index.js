import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from 'actions/activity/summerMat';
import * as utils from 'utils';
import { Header } from 'components/Header';
import { Toast } from 'components/Toast';
import { Image } from 'components/Image';

@connect(
  state => ({
    summerMat: state.summerMat,
  }),
  dispatch => bindActionCreators(actionCreators, dispatch),
)
export default class Home extends Component {

  static propTypes = {
    summerMat: React.PropTypes.any,
    isLoading: React.PropTypes.bool,
    location: React.PropTypes.object,
    signUp: React.PropTypes.func,
    fetchUserInfo: React.PropTypes.func,
  };

  static contextTypes = {
    router: React.PropTypes.object,
  };

  constructor(props, context) {
    super(props);
    context.router;
  }

  componentWillMount() {
    this.props.fetchUserInfo();
  }

  componentWillReceiveProps(nextProps) {
    const administratorId = this.props.location.query.id || '';
    const { summerMat } = nextProps;
    if (summerMat.signUp.success && summerMat.signUp.data) {
      this.context.router.push(`/activity/summer/mat/success?id=${administratorId}`);
    } else if (summerMat.error) {
      Toast.show('' + summerMat.data);
    }
    if (summerMat.fetchUserInfo.error) {
      Toast.show(summerMat.fetchUserInfo.data[0]);
    } else if (summerMat.fetchUserInfo.success && summerMat.fetchUserInfo.data && summerMat.fetchUserInfo.data.join === true) {
      window.location.href = summerMat.fetchUserInfo.data.url;
    }
  }

  onSignUpClick = (e) => {
    const administratorId = this.props.location.query.id || '';
    this.props.signUp(administratorId);
    e.preventDefault();
  }

  render() {
    return (
      <div>
        <Header title="7月抢凉席活动" leftIcon="icon-angle-left" onLeftBtnClick={this.context.router.goSmartBack} hide={utils.detector.isApp()} />
        <div className="content">
          <Image className="col-xs-12 no-padding" src={'//og224uhh3.qnssl.com/mall/activity/summerMat/v2/top.png'} quality={90} />
          <div className="row" onClick={this.onSignUpClick}>
            <Image className="col-xs-12 no-padding" src={'//og224uhh3.qnssl.com/mall/activity/summerMat/v2/signUpBtn.png'} quality={90} />
          </div>
          <Image className="col-xs-12 no-padding" src={'//og224uhh3.qnssl.com/mall/activity/summerMat/v2/footer.png'} quality={90} />
        </div>
      </div>
    );
  }
}
