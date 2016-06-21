import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'underscore';
import { Link } from 'react-router';
import classnames from 'classnames';
import * as utils from 'utils';
import * as constants from 'constants';
import { If } from 'jsx-control-statements';
import { Loader } from 'components/Loader';
import { Header } from 'components/Header';
import { Timer } from 'components/Timer';
import { Product } from 'components/Product';
import { Image } from 'components/Image';
import { ShopBag } from 'components/ShopBag';
import * as actionCreators from 'actions/home/product';

const requestAction = {
  child: 'childlist',
  lady: 'ladylist',
};

const title = {
  child: '潮童专区',
  lady: '时尚女装',
};

@connect(
  state => ({
    product: {
      data: state.products.data,
      isLoading: state.products.isLoading,
      error: state.products.error,
      success: state.products.success,
    },
  }),
  dispatch => bindActionCreators(actionCreators, dispatch),
)
export default class List extends Component {
  static propTypes = {
    params: React.PropTypes.any,
    fetchProduct: React.PropTypes.func,
    product: React.PropTypes.any,
  };

  static contextTypes = {
    router: React.PropTypes.object,
  };

  constructor(props, context) {
    super(props);
    context.router;
  }

  state = {
    hasMore: true,
    pageIndex: 0,
    pageSize: 20,
  }

  componentWillMount() {
    const { pageIndex, pageSize } = this.state;
    const { params } = this.props;
    this.props.fetchProduct(requestAction[params.type], pageIndex + 1, pageSize);
  }

  componentDidMount() {
    this.addScrollListener();
  }

  componentWillReceiveProps(nextProps) {
    let count = 0;
    let size = 0;
    if (nextProps.product.success) {
      count = nextProps.product.data.count;
      size = nextProps.product.data.results.length;
      this.setState({ pageIndex: Math.round(size / this.state.pageSize) });
      this.setState({ hasMore: count > size });
    }
  }

  componentDidUpdate() {

  }

  componentWillUnmount() {
    this.removeScrollListener();
    this.setState({ pageIndex: 0 });
  }

  onItemClick = (e) => {
    const dataSet = e.currentTarget.dataset;
    window.location.href = `/mall/product/details/${dataSet.modelid}`;
  }

  onScroll = (e) => {
    const { pageSize, pageIndex, activeTab } = this.state;
    const { fetchProduct, product, params } = this.props;
    const scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
    const documentHeight = utils.dom.documnetHeight();
    const windowHeight = utils.dom.windowHeight();
    if (scrollTop === documentHeight - windowHeight && !this.props.product.isLoading && this.state.hasMore) {
      fetchProduct(requestAction[params.type], pageIndex + 1, pageSize);
    }
  }

  addScrollListener = () => {
    window.addEventListener('scroll', this.onScroll);
  }

  removeScrollListener = () => {
    window.removeEventListener('scroll', this.onScroll);
  }

  render() {
    const { product, params } = this.props;
    const products = product.data.results || [];
    return (
      <div className="product-list">
        <Header title={title[params.type]} leftIcon="icon-angle-left" onLeftBtnClick={this.context.router.goBack} hide={utils.detector.isApp()}/>
        <div className="content content-white-bg">
          <div className="product-list clearfix">
          <div className="margin-top-xxs"></div>
            {products.map((item) => {
              return <Product key={item.model_id} product={item} onItemClick = {this.onItemClick} />;
            })}
          </div>
          {product.isLoading ? <Loader/> : null}
          <ShopBag />
        </div>
      </div>
    );
  }
}
