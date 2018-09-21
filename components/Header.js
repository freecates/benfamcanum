import React from 'react'
import NProgress from 'nprogress'
import Router from 'next/router'
import GlobalHead from './GlobalHead'
import NavBarBenFamNum from './NavBarBenFamNum'
import NavBarExternal from './NavBarExternal'
import MediaQuery from 'react-responsive'

Router.onRouteChangeStart = (url) => {
  console.log(`Loading: ${url}`)
  NProgress.start()
}
Router.onRouteChangeComplete = () => NProgress.done()
Router.onRouteChangeError = () => NProgress.done()

const Header = (props) => (
  <React.Fragment>
  <GlobalHead />
  <MediaQuery minDeviceWidth={768}>
  <NavBarExternal/>
  </MediaQuery>
  <div style={{ marginBottom: 20 }}>
    <header className={ 'withbg' in props && 'withbg'}>
      <section>
        <NavBarBenFamNum />
      </section>
    </header>
        <style jsx>{`
          ul,section {
            max-width:70rem;
            margin:0 auto;
            width:100%;
          }
          header.withbg {
            /*background: url('/static/bg-body-familias-numerosas.jpg');
            background-size: cover;
            background-position:center;
            background-repeat: no-repeat;*/
          }
          @media screen and (min-width: 320px) {
          header {
              padding:.25em;
            }
          }
          @media screen and (min-width: 768px) {
          header {
              padding:.5em;
            }
          }
        `}</style>

    </div></React.Fragment>
)

export default Header
