import Head from 'next/head'
import Layout from '../components/MyLayout.js'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import fetch from 'isomorphic-unfetch'
import FontAwesome from 'react-fontawesome'
import { ShareButtons, ShareCounts, generateShareIcon } from 'react-share'

const MapaDeGoogle = dynamic(import('../components/MapaDeGoogle'), {
  loading: () => (
    <div>
      <p style={{ textAlign: 'center' }}>
        <img src="/static/rolling.gif" />
      </p>
    </div>
  )
})

const IsMember = dynamic(import('../components/IsMember'), {
  loading: () => (
    <div>
      <p style={{ textAlign: 'center' }}>
        <img src="/static/rolling.gif" />
      </p>
    </div>
  )
})

const {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  EmailShareButton
} = ShareButtons

const FacebookIcon = generateShareIcon('facebook')
const TwitterIcon = generateShareIcon('twitter')
const LinkedinIcon = generateShareIcon('linkedin')
const EmailIcon = generateShareIcon('email')

const OfertaGranMarca = props => (
  <Layout>
    <Head>
      {props.ofertagranmarca.acf.nombre_del_establecimiento ? (
        <title
          dangerouslySetInnerHTML={{
            __html:
              props.ofertagranmarca._embedded['wp:term'][3][0].name +
              ' - ' +
              props.ofertagranmarca.acf.nombre_del_establecimiento +
              ' - Familias Numerosas'
          }}
        />
      ) : (
        ''
      )}
      {props.ofertagranmarca.acf.telefono ? (
        <link rel="stylesheet" href="/static/custom.css" />
      ) : (
        ''
      )}

      <meta
        property="og:url"
        content={`/ogmca/${props.ofertagranmarca.id}/${
          props.ofertagranmarca.slug
        }`}
      />
      <meta property="og:type" content="article" />
      <meta
        property="og:title"
        content={props.ofertagranmarca.acf.nombre_del_establecimiento}
      />
      {props.ofertagranmarca.acf.descripcion_de_la_oferta ? (
        <meta
          content="og:description"
          content={props.ofertagranmarca.acf.descripcion_de_la_oferta}
        />
      ) : (
        ''
      )}
      <meta
        property="og:image"
        content="/static/logo-familias-numerosas-og.png"
      />
      <meta property="og:image:width" content="1024" />
      <meta property="og:image:height" content="1024" />

      {props.ofertagranmarca.acf.descripcion_de_la_oferta ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `
        {
          "@context": "http://schema.org",
          "@type": "Product",
          "description": "${
            props.ofertagranmarca.acf.descripcion_de_la_oferta
          }",
          "name": "${props.ofertagranmarca.acf.nombre_del_establecimiento}",
          "image": "/static/logo-familias-numerosas-og.png",
          "offers": {
            "@type": "Offer",
            "availability": "http://schema.org/InStock",
            "price": "${props.ofertagranmarca.acf.titulo_de_la_oferta}",
            "priceCurrency": "EUR"
          }
        }`
          }}
        />
      ) : (
        ''
      )}
    </Head>
    <nav aria-label="Estás aquí:" role="navigation">
      <ul className="breadcrumbs">
        <li>
          <Link prefetch href="/">
            <a>Inicio</a>
          </Link>
        </li>
        <li>
          <Link prefetch href="/grandes-marcas">
            <a>Ofertas nacionales</a>
          </Link>
        </li>
        <li>
          <Link
            prefetch
            as={`/mmca/${props.ofertagranmarca.marca}/${
              props.ofertagranmarca._embedded['wp:term'][3][0].slug
            }`}
            href={`/mapa-de-la-marca-ca?id=${props.ofertagranmarca.marca}`}
          >
            <a>{props.ofertagranmarca._embedded['wp:term'][3][0].name}</a>
          </Link>
        </li>
        <li>
          <span className="show-for-sr">Actual: </span>{' '}
          <span
            dangerouslySetInnerHTML={{
              __html: props.ofertagranmarca.acf.nombre_del_establecimiento
            }}
          />
        </li>
      </ul>
    </nav>

    <section>
      <div className="file">
        <h1>
          <img
            src={
              '/static/' +
              props.ofertagranmarca._embedded['wp:term'][3][0].slug +
              '-familias-numerosas.png'
            }
          />
          <br />
          <span
            dangerouslySetInnerHTML={{
              __html: props.ofertagranmarca.acf.nombre_del_establecimiento
            }}
          />{' '}
          {props.ofertagranmarca.acf.oferta_exclusiva_socios == true ? (
            <span className="label alert file-label">
              <small>
                EXCLUSIVO<br /> SOCIOS
              </small>
            </span>
          ) : (
            ''
          )}
        </h1>

        <h4 className="location dont-break-out">
          <span>
            <span
              dangerouslySetInnerHTML={{
                __html: props.ofertagranmarca.acf.direccion
              }}
            />. <span>{props.ofertagranmarca.acf.codigo_postal}</span>,{' '}
            <span
              dangerouslySetInnerHTML={{
                __html: props.ofertagranmarca.acf.localidad_del_beneficio.name
              }}
            />
          </span>
        </h4>
        <h4 className="location dont-break-out">
          <span>
            {props.ofertagranmarca.acf.telefono ? (
              <span>
                <a href={'tel:' + props.ofertagranmarca.acf.telefono}>
                  {props.ofertagranmarca.acf.telefono}
                </a>
              </span>
            ) : (
              ''
            )}
            {props.ofertagranmarca.acf
              .correo_electronico_del_establecimiento ? (
              <span>
                .{' '}
                <a
                  href={
                    'mailto:' +
                    props.ofertagranmarca.acf
                      .correo_electronico_del_establecimiento
                  }
                >
                  <FontAwesome
                    name="envelope"
                    size="1x"
                    style={{
                      textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)',
                      color: '#666666'
                    }}
                  />
                </a>{' '}
              </span>
            ) : (
              ''
            )}
            {props.ofertagranmarca.acf.twitter_del_establecimiento ? (
              <span>
                |{' '}
                <a href={props.ofertagranmarca.acf.twitter_del_establecimiento}>
                  <FontAwesome
                    name="twitter-square"
                    size="1x"
                    style={{
                      textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)',
                      color: '#666666'
                    }}
                  />
                </a>
              </span>
            ) : (
              ''
            )}{' '}
            {props.ofertagranmarca.acf.facebook_del_establecimiento ? (
              props.ofertagranmarca.acf.facebook_del_establecimiento.includes(
                'facebook.com'
              ) ? (
                <span>
                  |{' '}
                  <a
                    href={
                      props.ofertagranmarca.acf.facebook_del_establecimiento
                    }
                  >
                    <FontAwesome
                      name="facebook-square"
                      size="1x"
                      style={{
                        textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)',
                        color: '#666666'
                      }}
                    />
                  </a>
                </span>
              ) : (
                <span>
                  |{' '}
                  <a
                    href={
                      'https://www.facebook.com/' +
                      props.ofertagranmarca.acf.facebook_del_establecimiento
                    }
                  >
                    <FontAwesome
                      name="facebook-square"
                      size="1x"
                      style={{
                        textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)',
                        color: '#666666'
                      }}
                    />
                  </a>
                </span>
              )
            ) : (
              ''
            )}{' '}
            {props.ofertagranmarca.acf.sitio_web_del_establecimiento ? (
              <span>
                |{' '}
                <Link
                  href={props.ofertagranmarca.acf.sitio_web_del_establecimiento}
                >
                  <a>
                    <FontAwesome
                      name="external-link-square"
                      size="1x"
                      style={{
                        textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)',
                        color: '#666666'
                      }}
                    />
                  </a>
                </Link>
              </span>
            ) : (
              ''
            )}
          </span>
        </h4>

        <p className="category">
          <Link
            prefetch
            as={`/mmca/${props.ofertagranmarca.categoria_del_beneficio}/${
              props.ofertagranmarca._embedded['wp:term'][3][0].slug
            }`}
            href={`/mapa-de-la-marca-ca?id=${props.ofertagranmarca.marca}`}
          >
            <a
              title={
                'Ver todas las ofertas ' +
                props.ofertagranmarca._embedded['wp:term'][3][0].name +
                ' en el mapa'
              }
            >
              {' '}
              <img src="/static/icona-mapa-familias-numerosas.png" />
            </a>
          </Link>
        </p>

        {props.ofertagranmarca.acf.lat ? (
          <MapaDeGoogle
            lat={
              props.ofertagranmarca.acf.lat.includes(',') ||
              props.ofertagranmarca.acf.lat.includes('!')
                ? props.ofertagranmarca.acf.lat.replace(',', '.')
                : props.ofertagranmarca.acf.lat
            }
            lng={
              props.ofertagranmarca.acf.lon.includes(',') ||
              props.ofertagranmarca.acf.lon.includes('!')
                ? props.ofertagranmarca.acf.lon.replace(',', '.')
                : props.ofertagranmarca.acf.lon
            }
          />
        ) : (
          ''
        )}

        <div className="file-data">
          <div className="file-img">
            {props.ofertagranmarca.acf
              .imagen_destacada_de_la_oferta_socios_large ? (
              <Observer
                threshold={1}
                triggerOnce={true}
                render={() => (
                  <p className="fade-in">
                    <img
                      className="img-file"
                      width="1024"
                      src={
                        props.ofertagranmarca.acf
                          .imagen_destacada_de_la_oferta_socios_large.sizes
                          .large
                      }
                      alt={
                        props.ofertagranmarca.acf
                          .titulo_de_la_oferta_oferta_socios
                      }
                    />
                  </p>
                )}
              />
            ) : (
              ''
            )}

            {props.ofertagranmarca.acf
              .imagen_destacada_de_la_oferta_general_large ? (
              <Observer
                threshold={1}
                triggerOnce={true}
                render={() => (
                  <p className="fade-in">
                    <img
                      className="img-file"
                      width="1024"
                      src={
                        props.ofertagranmarca.acf
                          .imagen_destacada_de_la_oferta_general_large.sizes
                          .large
                      }
                      alt={
                        props.ofertagranmarca.acf.titulo_de_la_oferta_general
                      }
                    />
                  </p>
                )}
              />
            ) : (
              ''
            )}
          </div>

          <div className="file-content">
            {props.ofertagranmarca.acf.oferta_exclusiva_socios == true ? (
              <h1 className="align-none">
                <Link href="#how-to-get-it">
                  <a>
                    <span className="label alert file-label">
                      EXCLUSIVO SOCIOS.<br /> Introduce tu usuario y contraseña
                      de asociado para saber como obtener esta oferta<br />
                      <FontAwesome
                        name="check-circle-o"
                        size="2x"
                        style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
                      />
                    </span>
                  </a>
                </Link>
              </h1>
            ) : (
              ''
            )}

            {props.ofertagranmarca.acf.titulo_de_la_oferta ? (
              <h4>{props.ofertagranmarca.acf.titulo_de_la_oferta}</h4>
            ) : (
              ''
            )}

            {props.ofertagranmarca.acf.marca.description ? (
              <div>
                {props.ofertagranmarca.acf.marca.description
                  .split('\n')
                  .map((item, key) => {
                    return (
                      <p key={key}>
                        <span dangerouslySetInnerHTML={{ __html: item }} />
                      </p>
                    )
                  })}
              </div>
            ) : (
              ''
            )}

            <div className="social-share-icons">
              <div className="Post__some-network">
                <p>
                  <small>Comparte:</small>
                </p>
              </div>

              <div className="Post__some-network">
                <FacebookShareButton
                  url={
                    'https://beneficiosfamiliasnumerosas.org/ogm/' +
                    props.ofertagranmarca.id +
                    '/' +
                    props.ofertagranmarca.slug
                  }
                  className="Post__some-network__share-button"
                >
                  <FacebookIcon size={32} round />
                </FacebookShareButton>
              </div>

              <div className="Post__some-network">
                <TwitterShareButton
                  url={
                    'https://beneficiosfamiliasnumerosas.org/ogm/' +
                    props.ofertagranmarca.id +
                    '/' +
                    props.ofertagranmarca.slug
                  }
                  title={
                    props.ofertagranmarca.acf.nombre_del_establecimiento +
                    ':' +
                    ' ' +
                    props.ofertagranmarca.acf.titulo_de_la_oferta_oferta_socios
                  }
                  hashtags={['beneficiosfamiliasnumerosas']}
                  via="famnumerosas"
                  className="Post__some-network__share-button"
                >
                  <TwitterIcon size={32} round />
                </TwitterShareButton>
              </div>

              <div className="Post__some-network">
                <LinkedinShareButton
                  url={
                    'https://beneficiosfamiliasnumerosas.org/pgm/' +
                    props.ofertagranmarca.id +
                    '/' +
                    props.ofertagranmarca.slug
                  }
                  title={
                    props.ofertagranmarca.acf.nombre_del_establecimiento +
                    ':' +
                    ' ' +
                    props.ofertagranmarca.acf.titulo_de_la_oferta_oferta_socios
                  }
                  className="Post__some-network__share-button"
                >
                  <LinkedinIcon size={32} round />
                </LinkedinShareButton>
              </div>

              <div className="Post__some-network">
                <EmailShareButton
                  url={
                    'https://beneficiosfamiliasnumerosas.org/ogm/' +
                    props.ofertagranmarca.id +
                    '/' +
                    props.ofertagranmarca.slug
                  }
                  subject={
                    props.ofertagranmarca.acf.nombre_del_establecimiento +
                    ':' +
                    ' ' +
                    props.ofertagranmarca.acf.titulo_de_la_oferta_oferta_socios
                  }
                  body={
                    'Échale un vistazo a esta oferta: ' +
                    props.ofertagranmarca.acf.nombre_del_establecimiento +
                    ':' +
                    ' ' +
                    props.ofertagranmarca.acf
                      .titulo_de_la_oferta_oferta_socios +
                    ' ' +
                    'https://beneficiosfamiliasnumerosas.org/ogm/' +
                    props.ofertagranmarca.id +
                    '/' +
                    props.ofertagranmarca.slug
                  }
                  className="Post__some-network__share-button"
                >
                  <EmailIcon size={32} round />
                </EmailShareButton>
              </div>
            </div>

            {props.ofertagranmarca.acf.oferta_exclusiva_socios == true ? (
              <div id="how-to-get-it">
                <IsMember
                  dataOK={
                    <div
                      dangerouslySetInnerHTML={{
                        __html:
                          props.ofertagranmarca.acf
                            .como_conseguir_la_oferta_exclusica_socios
                      }}
                    />
                  }
                  ID={
                    props.ofertagranmarca.slug + '-' + props.ofertagranmarca.id
                  }
                  Title={props.ofertagranmarca.title.rendered}
                  URL={
                    'ogm/' +
                    props.ofertagranmarca.id +
                    '/' +
                    props.ofertagranmarca.slug
                  }
                />
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
    </section>

    <style jsx>{`
      .Post__some-network {
        vertical-align: top;
        display: inline-block;
        margin-right: 20px;
        text-align: center;
      }
      .social-share-icons {
        margin-bottom: 1.5rem;
      }
      .breadcrumbs {
        margin-bottom: 1em;
      }
      .file {
        max-width: 1024px;
        margin: 0 auto;
      }
      h1 {
        color: #391f92;
      }
      h1 small {
        color: #ffffff;
        font-weight: bold;
      }
      a {
        color: #3f3fff !important;
      }
      .file-label {
        background: #cc0033 !important;
        color: #ffffff;
        font-weight: bold;
        font-size: 1rem;
        white-space: normal;
      }
      a .file-label {
        color: #ffffff !important;
        cursor: pointer;
      }
      a:hover .file-label {
        text-decoration: none;
      }
      .margin-invert {
        margin-bottom: 2rem;
        margin-top: -1rem;
      }
      .dont-break-out {
        overflow-wrap: break-word;
        word-wrap: break-word;
        -ms-hyphens: auto;
        -moz-hyphens: auto;
        -webkit-hyphens: auto;
        hyphens: auto;
      }
      @media screen and (min-width: 768px) {
        .file-data {
          display: -ms-flexbox;
          display: flex;
          -ms-flex-wrap: wrap;
          flex-wrap: wrap;
          align-items: stretch;

          width: 100%;
        }
        .file-img {
          width: 35%;
          margin: 5px 20px;
        }
        .file-content {
          width: 85%;
          margin: 5px 20px;
        }
        #how-to-get-it,
        .file-label {
          max-width: 60%;
          margin: 0 auto;
        }
      }
      @media screen and (min-width: 1024px) {
        .file-content {
          width: 95%;
        }
        #how-to-get-it,
        .file-label {
          max-width: 40%;
        }
      }
      @media screen and (max-width: 480px) {
        .img-file {
          margin-left: -21px;
          max-width: 111%;
        }
      }
      @media screen and (max-width: 320px) {
        .img-file {
          margin-left: -19px;
          max-width: 114%;
        }
      }
      h1,
      .category,
      .location,
      .file-label {
        text-align: center;
      }
      .align-none {
        text-align: unset;
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
    `}</style>
  </Layout>
)

OfertaGranMarca.getInitialProps = async function(context) {
  const { id } = context.query
  const res = await fetch(
    `https://gestorbeneficios.familiasnumerosas.org/wp-json/wp/v2/of_gr_m_ca/${id}?_embed`
  )
  const ofertagranmarca = await res.json()

  console.log(`Fetched ofertagranmarca: ${ofertagranmarca.title.rendered}`)

  return { ofertagranmarca }
}

export default OfertaGranMarca
