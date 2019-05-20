import Header from './Header';
import Footer from './Footer';
import ServiceWorker from '../pages/service-worker';
import { initGA, logPageView } from '../utils/analytics';
import Styles from './Styles';

const layoutStyle = {
  margin: '0 auto',
  padding: 0,
  maxWidth: '100%'
};
const mainStyle = {
  padding: 20,
  maxWidth: '70rem',
  margin: '0 auto'
};

export default class Layout extends React.Component {
  componentDidMount() {
    if (!window.GA_INITIALIZED) {
      initGA();
      window.GA_INITIALIZED = true;
    }
    logPageView();
  }
  render() {
    return (
      <React.Fragment>
        <React.Fragment>
          {this.props.layout ||
            (this.props.bgmapa !== true && (
              <div style={layoutStyle} className="fade-in">
                <Header withbg />
                <main style={mainStyle}>{this.props.children}</main>
                <style jsx>{`
                  .fade-in {
                    animation-name: fadeIn;
                    animation-duration: 1.3s;
                    animation-timing-function: cubic-bezier(0, 0, 0.4, 1);
                    animation-fill-mode: forwards;
                  }
                  @keyframes fadeIn {
                    from {
                      opacity: 0;
                    }
                    to {
                      opacity: 1;
                    }
                  }
                `}</style>
              </div>
            ))}
          {this.props.layout && (
            <div style={layoutStyle} className={'layout' in this.props && 'layout'}>
              <Header />
              <main style={mainStyle}>{this.props.children}</main>
              <style jsx>{`
                .layout {
                  /*background: url('/static/bg-body-familias-numerosas.jpg');
              background-size: contain;
              background-repeat: no-repeat;*/
                  animation-name: fadeIn;
                  animation-duration: 1.3s;
                  animation-timing-function: cubic-bezier(0, 0, 0.4, 1);
                  animation-fill-mode: forwards;
                }
                @keyframes fadeIn {
                  from {
                    opacity: 0;
                  }
                  to {
                    opacity: 1;
                  }
                }
              `}</style>
            </div>
          )}
          {this.props.bgmapa && (
            <div style={layoutStyle} className={'bgmapa' in this.props && 'bgmapa'}>
              <Header withbg />
              <main style={mainStyle}>{this.props.children}</main>
            </div>
          )}
          <Footer />
          <ServiceWorker />
        </React.Fragment>
        <React.Fragment>
          <Styles />
        </React.Fragment>
      </React.Fragment>
    );
  }
}
