import React from 'react';

const Styles = () => (
  <section>
    <link rel="stylesheet" type="text/css" href="/static/nprogress.css" />
    <link
      rel="preload"
      href="/static/bootstrap.min.css"
      as="style"
      onload="this.onload=null;this.rel='stylesheet'"
    />
    <noscript>
      <link rel="stylesheet" href="/static/bootstrap.min.css" />
    </noscript>
    <link
      rel="preload"
      href="/static/foundation.min.css"
      as="style"
      onload="this.onload=null;this.rel='stylesheet'"
    />
    <noscript>
      <link rel="stylesheet" href="/static/foundation.min.css" />
    </noscript>
    <link
      href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
      as="style"
      onload="this.onload=null;this.rel='stylesheet'"
      rel="preload"
      integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN"
      crossOrigin="anonymous"
    />
    <noscript>
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
        integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN"
        crossOrigin="anonymous"
      />
    </noscript>
    <link
      rel="preload"
      href="/static/global.css"
      as="style"
      onload="this.onload=null;this.rel='stylesheet'"
    />
    <noscript>
      <link rel="stylesheet" href="/static/global.css" />
    </noscript>
    <script async="true" defer="true" src="/static/cssrelpreload.js" type="text/javascript" />
  </section>
);

export default Styles;
