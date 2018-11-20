import React from 'react';
import Link from 'next/link';
import NProgress from 'nprogress';
import Router from 'next/router';
import GlobalHead from './GlobalHead';
import NavBarBenFamNum from './NavBarBenFamNum';
import NavBarExternal from './NavBarExternal';
import MediaQuery from 'react-responsive';

Router.onRouteChangeStart = url => {
  console.log(`Loading: ${url}`);
  NProgress.start();
};
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

const HeaderHome = () => (
  <React.Fragment>
    <GlobalHead />
    <MediaQuery minDeviceWidth={768}>
      <NavBarExternal />
    </MediaQuery>
    <div style={{ marginBottom: 20 }}>
      <div className="fade-in">
        <div className="bg-white">
          <section>
            <NavBarBenFamNum />
          </section>
        </div>
        <div>
          <picture>
            <source type="image/webp" srcSet="/static/bg-body-familias-numerosas.webp" />
            <img src="/static/bg-body-familias-numerosas.jpg" alt="més és més" />
          </picture>
        </div>
        <section className="section-data">
          <div className="section-a">
            <h4 className="icones-prestacions align-center">
              <Link prefetch href="/beneficios">
                <a title="Ofertas comerciales para familias numerosas">
                  <img
                    src="/static/icono-menu-fanoc-oferta.png"
                    alt="Icono Ofertas comerciales para familias numerosas"
                  />
                  <br />
                  <strong>Ofertas y descuentos</strong>
                </a>
              </Link>
            </h4>
          </div>
          <div className="section-b">
            <h4 className="icones-prestacions align-center">
              <Link prefetch href="/prestaciones">
                <a title="Prestaciones para familias numerosas">
                  <img
                    src="/static/icono-menu-fanoc-prestaciones.png"
                    alt="Icono Prestaciones para familias numerosas"
                  />
                  <br />
                  <strong>Ayudas públicas</strong>
                </a>
              </Link>
            </h4>
          </div>
        </section>
      </div>

      <style jsx>{`
        a {
          color: #000000;
          text-transform: uppercase;
          transition: all 0.5s ease-in-out;
        }
        a:hover {
          color: #333333;
          text-decoration: none;
        }
        .bg-white {
          background: #ffffff;
        }
        ul,
        section {
          max-width: 70rem;
          margin: 0 auto;
          width: 100%;
        }
        ul.vertical.menu.align-center li {
          text-align: center;
        }
        p {
          color: #000000;
        }
        .align-center {
          text-align: center;
        }
        .menu > li {
          vertical-align: bottom;
        }
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
        .section-a,
        .section-b {
          padding: 1rem;
          background: #cb5599;
          margin: 1em;
        }
        @media screen and (min-width: 320px) {
          header {
            padding: 0;
          }
          .icones-prestacions img {
            padding: 0 0 1em 0;
          }
        }
        @media screen and (min-width: 768px) {
          header {
            padding: 0;
          }
          .section-data {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-wrap: wrap;
            flex-wrap: wrap;
            align-items: center;
          }
          .section-a,
          .section-b {
            width: 45%;
            max-width: 42rem;
          }
        }
        @media screen and (min-width: 1360px) {
          .section-a,
          .section-b {
            padding: 2rem 5rem;
          }
        }
      `}</style>
    </div>
  </React.Fragment>
);

export default HeaderHome;
