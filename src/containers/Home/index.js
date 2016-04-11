import React, { Component } from 'react';
import { Header } from 'components/Header';

export class Home extends Component {
  static propTypes = {
    children: React.PropTypes.any,
  };

  constructor(props) {
    super(props);
  }

  rightBtnClick = () => {

  };

  leftBtnClick = () => {

  };

  render() {
    return (
      <section>
        <Header title="小鹿美美" leftIcon="icon-angle-up" rightIcon="" />
        {this.props.children}
      </section>
    );
  }
}
