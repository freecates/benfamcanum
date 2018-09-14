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

const HeaderHome = () => (
  <div style={{ marginBottom: 20 }}>
      <GlobalHead />
      <div className='fade-in'>
        <div className='bg-white'>
          <section>
            <NavBarBenFamNum />
          </section>
        </div>
        <div>
          <img src='/static/bg-body-familias-numerosas.jpg' />
        </div>
          <section className='section-data'>
            <div className='section-a'>
              <h1 className='icones-prestacions align-center'>
                  <Link prefetch href="/beneficios"><a title='Ofertas comerciales para familias numerosas'><strong>Ofertas y descuentos</strong></a></Link>
              </h1>
            </div>
            <div className='section-b'>
              <h1 className='icones-prestacions align-center'>
                  <Link prefetch href="/prestaciones"><a title='Prestaciones para familias numerosas'><strong>Ayudas públicas</strong></a></Link>
              </h1>
            </div>
          </section>
      </div>

      
        <style jsx>{`
          a {
            color:#000000;
            text-transform:uppercase;
            transition: all 0.5s ease-in-out;
          }
          a:hover {
            color:#333333;
            text-decoration:none;
          }
          .bg-white {
            background:#ffffff;
          }
          ul,section {
            max-width:70rem;
            margin:0 auto;
            width:100%;
          }
          ul.vertical.menu.align-center li {
            text-align:center;
          }
          p {
            color:#000000;
          }
          .align-center {
            text-align:center;
          }
          .menu>li {
            vertical-align:bottom;
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
          .section-a, .section-b {
            padding: 1rem;
            background:#cb5599;
            margin:1em;
          }
          @media screen and (min-width: 320px) {
          header {
              padding:0;
            }
            .icones-prestacions img {
                padding:0 0 1em 0;
            }
          }
          @media screen and (min-width: 768px) {
          header {
              padding:0;
            }
            .icones-prestacions img {
                padding:4rem 2em 1em 0;
            }              
            .section-data {
              display: -ms-flexbox;
              display: flex;
              -ms-flex-wrap: wrap;
                  flex-wrap: wrap;
              align-items:center;
            }
            .section-a, .section-b {
              width: 45%;
              max-width:42rem;
            }
          }
          @media screen and (min-width: 1360px) {
            .section-a, .section-b {
              padding: 2rem 5rem;
            }  
          }
        `}</style>

    </div>
)

export default HeaderHome
