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
      <header className='fade-in'>
        <section>
          <NavBarBenFamNum />
        </section>
        <section className='section-data'>
          <div className='section-a'>
            <p className='icones-prestacions align-center'>
                <Link prefetch href="/prestaciones"><a title='Prestaciones para familias numerosas'><img alt='Icono prestaciones públicas para familias numerosas' src='/static/icona-prestacions-publiques-familias-numerosas.png'/></a></Link>
            </p>
            <p>Desde este apartado podrás acceder a toda la información sobre las prestaciones que como familia numerosa te ofrece el gobierno central, autonómico o municipal</p>
          </div>
          <div className='section-b'>
            <p className='icones-prestacions align-center'>
                <Link prefetch href="/beneficios"><a title='Ofertas comerciales para familias numerosas'><img alt='Icono ofertas comerciales para familias numerosas' src='/static/icona-ofertas-familias-numerosas.png'/></a></Link>
            </p>
            <p>Ser familia numerosa te ofrece muchos descuentos y servicios exclusivos, en este apartado podrás seleccionar el tipo de servicio que necesitas y las ventajas que te ofrecen las empresas</p>
          </div>
        </section>
      </header>

      
        <style jsx>{`
          a {
            color:#ffffff;
          }
          a:hover {
            color:#ffffff;
            text-decoration:underline;
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
            color:#ffffff;
          }
          .align-center {
            text-align:center;
          }
          .menu>li {
            vertical-align:bottom;
          }
          header {
            background: url('/static/bg-body-familias-numerosas.jpg');
            background-size: cover;
            background-repeat: no-repeat;
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
          }
          @media screen and (min-width: 320px) {
          header {
              padding:.25em;
            }
            .icones-prestacions img {
                padding:0 0 1em 0;
            }
          }
          @media screen and (min-width: 768px) {
          header {
              padding:.5em;
            }
            .icones-prestacions img {
                padding:4rem 2em 1em 0;
            }              
            .section-data {
              display: -ms-flexbox;
              display: flex;
              -ms-flex-wrap: wrap;
                  flex-wrap: wrap;
              align-items:start;
            }
            .section-a, .section-b {
              width: 50%;
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
