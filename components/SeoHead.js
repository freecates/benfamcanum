import Head from 'next/head';

const SeoHead = ({ seo, ruta }) => {
  const caSiteTitle = ruta.includes('/ca-ES/') ? `Famílies Nombroses` : '';
  const esSiteTitle = !ruta.includes('/ca-ES/') ? `Familias Numerosas` : '';
  const caURL = ruta.includes('/ca-ES/') ? `/ca-ES/` : '';
  const esURL = !ruta.includes('/ca-ES/') ? `/` : '';
  const prURL = ruta.includes('/pr/') ? `pr/${seo.id}/${seo.slug}` : '';
  const pURL = ruta.includes('/p/') ? `p/${seo.id}/${seo.slug}` : '';
  const ogmURL = ruta.includes('/ogm/') ? `ogm/${seo.id}/${seo.slug}` : '';
  const proURL = ruta.includes('/pro/') ? `pro/${seo.id}/${seo.slug}` : '';

  return (
    <Head>
      {seo.acf.nombre_del_establecimiento ? (
        <title>{`${seo.acf.nombre_del_establecimiento} - ${caSiteTitle || esSiteTitle}`}</title>
      ) : null}
      {seo.acf.nombre_de_la_empresa ? (
        <title>{`${seo.acf.nombre_de_la_empresa} - ${caSiteTitle || esSiteTitle}`}</title>
      ) : null}
      {seo.acf.nombre_de_la_prestacion ? (
        <title>{`${seo.acf.nombre_de_la_prestacion} - ${caSiteTitle || esSiteTitle}`}</title>
      ) : null}
      {seo.acf.telefono ? <link rel="stylesheet" href="/static/custom.css" /> : null}

      <meta property="og:url" content={(caURL || esURL) + (prURL || pURL || ogmURL || proURL)} />
      <meta property="og:type" content="article" />
      <meta property="og:title" content={seo.acf.nombre_del_establecimiento} />
      {seo.acf.descripcion_de_la_promocion ? (
        <>
          <meta
            property="og:description"
            content={seo.acf.descripcion_de_la_promocion}
          />
          <meta name="description" content={seo.acf.descripcion_de_la_promocion} />
        </>
      ) : null}
      {seo.acf.descripcion_de_la_oferta_oferta_socios ? (
        <>
          <meta
            property="og:description"
            content={seo.acf.descripcion_de_la_oferta_oferta_socios}
          />
          <meta name="description" content={seo.acf.descripcion_de_la_oferta_oferta_socios} />
        </>
      ) : null}
      {seo.acf.descripcion_de_la_oferta_oferta_general ? (
        <>
          <meta
            property="og:description"
            content={seo.acf.descripcion_de_la_oferta_oferta_general}
          />
          <meta name="description" content={seo.acf.descripcion_de_la_oferta_oferta_general} />
        </>
      ) : null}
      {seo.acf.imagen_destacada_de_la_oferta_socios_large ? (
        <meta
          property="og:image"
          content={seo.acf.imagen_destacada_de_la_oferta_socios_large.sizes.large}
        />
      ) : null}
      {seo.acf.imagen_destacada_de_la_oferta_general_large ? (
        <meta
          property="og:image"
          content={seo.acf.imagen_destacada_de_la_oferta_general_large.sizes.large}
        />
      ) : null}
      <meta property="og:image:width" content="1024" />
      <meta property="og:image:height" content="1024" />

      {seo.acf.imagen_destacada_de_la_oferta_socios_large ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `
            {
              "@context": "http://schema.org",
              "@type": "Product",
              "description": "${seo.acf.descripcion_de_la_oferta_oferta_socios}",
              "name": "${seo.acf.nombre_del_establecimiento}",
              "image": "${seo.acf.imagen_destacada_de_la_oferta_socios_large.sizes.large}",
              "offers": {
                "@type": "Offer",
                "availability": "http://schema.org/InStock",
                "price": "${seo.acf.titulo_de_la_oferta_oferta_socios}",
                "priceCurrency": "EUR"
              }
            }`
          }}
        />
      ) : null}

      {seo.acf.imagen_destacada_de_la_oferta_general_large ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `
            {
              "@context": "http://schema.org",
              "@type": "Product",
              "description": "${seo.acf.descripcion_de_la_oferta_oferta_general}",
              "name": "${seo.acf.nombre_del_establecimiento}",
              "image": "${seo.acf.imagen_destacada_de_la_oferta_general_large.sizes.large}",
              "offers": {
                "@type": "Offer",
                "availability": "http://schema.org/InStock",
                "price": "${seo.acf.titulo_de_la_oferta_oferta_general}",
                "priceCurrency": "EUR"
              }
            }`
          }}
        />
      ) : null}
    </Head>
  );
};

export default SeoHead;
