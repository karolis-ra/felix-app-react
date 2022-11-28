import React from 'react';
import './index.css';
import Visa from '../../images/visa.png';
import Mastercard from '../../images/mastercard.png';
import Amex from '../../images/amex.png';
import Discover from '../../images/discover.png';

class Footer extends React.Component {
  render() {
    return (
      <footer className="Footer">
        <div className="Copyright">
          {' '}
          We care about your entertainment. Copyright © 2019–2021 felix.com
        </div>
        <div className="Icons-wrap">
          <img src={Visa} />
          <img src={Mastercard} />
          <img src={Amex} />
          <img src={Discover} />
        </div>
      </footer>
    );
  }
}

export default Footer;
