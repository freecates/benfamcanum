import Head from 'next/head';

const SeoHead = ({ seo, ruta }) => {
    console.log('ruta ', ruta);
    const postURL = ruta.includes('/ca-ES/p/') ? `/ca-ES/p/${seo.id}/${seo.slug}` : `/p/${seo.id}/${seo.slug}`;
  return (
    <Head>
      {seo.acf.nombre_del_establecimiento ? (
        <title>{`${seo.acf.nombre_del_establecimiento} - Familias Numerosas`}</title>
      ) : null}
      {seo.acf.telefono ? <link rel="stylesheet" href="/static/custom.css" /> : null}

      <meta property="og:url" content={postURL} />
      <meta property="og:type" content="article" />
      <meta property="og:title" content={seo.acf.nombre_del_establecimiento} />
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
