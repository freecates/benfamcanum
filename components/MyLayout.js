import { useEffect } from 'react';
import { initGA, logPageView } from '../utils/analytics';
import Footer from './Footer';
import Header from './Header';
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

export default function Layout(props) {
  useEffect(() => {
    if (!window.GA_INITIALIZED) {
      initGA();
      window.GA_INITIALIZED = true;
    }
    logPageView();
  });

  return (
    <React.Fragment>
      <React.Fragment>
        {props.layout ||
          (props.bgmapa !== true && (
            <div style={layoutStyle} className="fade-in">
              <Header withbg ruta={props.ruta} />
              <main style={mainStyle}>{props.children}</main>
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
        {props.layout && (
          <div style={layoutStyle} className={'layout' in props && 'layout'}>
            <Header ruta={props.ruta} />
            <main style={mainStyle}>{props.children}</main>
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
        {props.bgmapa && (
          <div style={layoutStyle} className={'bgmapa' in props && 'bgmapa'}>
            <Header withbg ruta={props.ruta} />
            <main style={mainStyle}>{props.children}</main>
          </div>
        )}
        <Footer ruta={props.ruta} />
      </React.Fragment>
      <React.Fragment>
        <Styles />
      </React.Fragment>
    </React.Fragment>
  );
}
