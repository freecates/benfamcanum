import React from 'react'
import Head from 'next/head'
import Styles from './Styles'

const GlobalHead = () => (
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1" />
        <meta name="theme-color" content="#64bc58" />
        <link rel="icon" href="/static/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="apple-mobile-web-app-capable" content="yes"/>
        <meta name="apple-mobile-web-app-status-bar-style" content="default"/>
        <meta name="apple-mobile-web-app-title" content="Beneficios Familias Numerosas"/>
        <link rel="apple-touch-icon" href="/static/icons/android-chrome-192x192.png"/>
        <meta name="msapplication-TileImage" content="/static/icons/android-chrome-192x192.png"/>
        <meta name="msapplication-TileColor" content="#64bc58"/>
        <script async="true" defer="true" src="/static/intersection-observer.js"
          type="text/javascript"></script>
        <Styles />
      </Head>
  )
  
  export default GlobalHead