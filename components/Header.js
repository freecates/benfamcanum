import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import NProgress from 'nprogress'
import Router from 'next/router'
import GlobalHead from './GlobalHead'
import NavBarBenFamNum from './NavBarBenFamNum'

Router.onRouteChangeStart = (url) => {
  console.log(`Loading: ${url}`)
  NProgress.start()
}
Router.onRouteChangeComplete = () => NProgress.done()
Router.onRouteChangeError = () => NProgress.done()

const Header = (props) => (
  <div style={{ marginBottom: 20 }}>
    <GlobalHead />
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
            background: url('/static/bg-body-familias-numerosas.jpg');
            background-size: cover;
            background-repeat: no-repeat;
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

    </div>
)

export default Header
