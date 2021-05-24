import fetch from 'isomorphic-unfetch';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import Link from 'next/link';
import FontAwesome from 'react-fontawesome';
import { generateShareIcon, ShareButtons } from 'react-share';
import Layout from '@components/MyLayout.js';
import Fallback from '@components/Fallback';
import SeoHead from '@components/SeoHead';
import Custom404 from '../../404';

const MapaDeGoogle = dynamic(import('@components/MapaDeGoogle'), {
  loading: () => (
    <div>
      <p style={{ textAlign: 'center' }}>
        <img src="/static/rolling.gif" />
      </p>
    </div>
  )
});

const IsMember = dynamic(import('@components/IsMember'), {
  loading: () => (
    <div>
      <p style={{ textAlign: 'center' }}>
        <img src="/static/rolling.gif" />
      </p>
    </div>
  )
});

const {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  EmailShareButton
} = ShareButtons;

const FacebookIcon = generateShareIcon('facebook');
const TwitterIcon = generateShareIcon('twitter');
const LinkedinIcon = generateShareIcon('linkedin');
const EmailIcon = generateShareIcon('email');

const OfertaGranMarca = props => {
  const { pathname, isFallback } = useRouter();
  if (!isFallback && !props.ofertagranmarca) {
    return <Custom404 />;
  }
  if (isFallback) {
    return <Fallback breadCrumb={'Grans marques'} />;
  }
  if (props.ofertagranmarca === '404') {
    return <Fallback notFound breadCrumb={'Grans marques'} />;
  }
  return (
    <Layout>
      <SeoHead seo={props.ofertagranmarca} />
      <nav aria-label="Ets aquí:" role="navigation">
        <ul className="breadcrumbs">
          <li>
            <Link href="/ca-ES">
              <a>Inici</a>
            </Link>
          </li>
          <li>
            <Link href="/ca-ES/grans-marques">
              <a>Ofertes grans marques</a>
            </Link>
          </li>
          <li>
            <Link
              as={`/ca-ES/mm/${props.ofertagranmarca.marca}/${props.ofertagranmarca._embedded['wp:term'][3][0].slug}`}
              href={`/ca-ES/mapa-de-la-marca?id=${props.ofertagranmarca.marca}`}
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
                'https://benfamcanumpics-famnum.vercel.app/static/96/' +
                props.ofertagranmarca._embedded['wp:term'][3][0].slug +
                '-familias-numerosas.png'
              }
              width={'96'}
              height={'96'}
              loading={'lazy'}
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
                  EXCLUSIU
                  <br /> SOCIS
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
              />
              . <span>{props.ofertagranmarca.acf.codigo_postal}</span>,{' '}
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
              {props.ofertagranmarca.acf.correo_electronico_del_establecimiento ? (
                <span>
                  .{' '}
                  <a
                    href={
                      'mailto:' + props.ofertagranmarca.acf.correo_electronico_del_establecimiento
                    }
                  >
                    <FontAwesome
                      name="envelope"
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
                props.ofertagranmarca.acf.facebook_del_establecimiento.includes('facebook.com') ? (
                  <span>
                    |{' '}
                    <a href={props.ofertagranmarca.acf.facebook_del_establecimiento}>
                      <FontAwesome
                        name="facebook-square"
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
                  <Link href={props.ofertagranmarca.acf.sitio_web_del_establecimiento}>
                    <a>
                      <FontAwesome
                        name="external-link-square"
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
              href={`/ca-ES/mm/${props.ofertagranmarca.marca}/${props.ofertagranmarca.acf.marca.slug}`}
            >
              <a
                title={`Veure totes les ofertes de ${props.ofertagranmarca._embedded['wp:term'][3][0].name} al mapa`}
              >
                {' '}
                <img
                  src="/static/icona-mapa-familias-numerosas.png"
                  width={'30'}
                  height={'33'}
                  loading={'lazy'}
                />
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
              {props.ofertagranmarca.acf.imagen_destacada_de_la_oferta_socios_large ? (
                <p className="fade-in">
                  <img
                    className="img-file"
                    width={'1024'}
                    height={'1024'}
                    loading={'lazy'}
                    src={
                      props.ofertagranmarca.acf.imagen_destacada_de_la_oferta_socios_large.sizes
                        .large
                    }
                    alt={props.ofertagranmarca.acf.titulo_de_la_oferta_oferta_socios}
                  />
                </p>
              ) : null}

              {props.ofertagranmarca.acf.imagen_destacada_de_la_oferta_general_large ? (
                <p className="fade-in">
                  <img
                    className="img-file"
                    width={'1024'}
                    height={'1024'}
                    loading={'lazy'}
                    src={
                      props.ofertagranmarca.acf.imagen_destacada_de_la_oferta_general_large.sizes
                        .large
                    }
                    alt={props.ofertagranmarca.acf.titulo_de_la_oferta_general}
                  />
                </p>
              ) : null}
            </div>

            <div className="file-content">
              {props.ofertagranmarca.acf.oferta_exclusiva_socios == true ? (
                <h1 className="align-none">
                  <a href="#how-to-get-it">
                    <span className="label alert file-label">
                      EXCLUSIU SOCIS.
                      <br /> Introdueix el teu usuari i contrasenya d'associat per saber com obtenir
                      aquesta oferta
                      <br />
                      <FontAwesome
                        name="check-circle-o"
                        size="2x"
                        style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
                      />
                    </span>
                  </a>
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
                  {props.ofertagranmarca.acf.marca.description.split('\n').map((item, key) => {
                    return (
                      <p key={key}>
                        <span dangerouslySetInnerHTML={{ __html: item }} />
                      </p>
                    );
                  })}
                </div>
              ) : (
                ''
              )}

              <div className="social-share-icons">
                <div className="Post__some-network">
                  <p>
                    <small>Comparteix:</small>
                  </p>
                </div>

                <div className="Post__some-network">
                  <FacebookShareButton
                    url={
                      'https://beneficios.fanoc.org/ogm/' +
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
                      'https://beneficios.fanoc.org/ogm/' +
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
                    via="familianombrosa"
                    className="Post__some-network__share-button"
                  >
                    <TwitterIcon size={32} round />
                  </TwitterShareButton>
                </div>

                <div className="Post__some-network">
                  <LinkedinShareButton
                    url={
                      'https://beneficios.fanoc.org/pgm/' +
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
                      'https://beneficios.fanoc.org/ogm/' +
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
                      props.ofertagranmarca.acf.titulo_de_la_oferta_oferta_socios +
                      ' ' +
                      'https://beneficios.fanoc.org/ogm/' +
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
                    ruta={pathname}
                    dataOK={
                      <div
                        dangerouslySetInnerHTML={{
                          __html:
                            props.ofertagranmarca.acf.como_conseguir_la_oferta_exclusica_socios
                        }}
                      />
                    }
                    ID={props.ofertagranmarca.slug + '-' + props.ofertagranmarca.id}
                    Title={props.ofertagranmarca.title.rendered}
                    URL={'ogm/' + props.ofertagranmarca.id + '/' + props.ofertagranmarca.slug}
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
          color: #cb5599;
        }
        h1 small {
          color: #ffffff;
          font-weight: bold;
        }
        a {
          color: #00add9 !important;
        }
        .file-label {
          background: #f18903 !important;
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
  );
};

export async function getStaticPaths() {
  const res = await fetch('https://gestorbeneficis.fanoc.org/wp-json/wp/v2/ofertas_grandes_marc/');
  const ofertes = await res.json();

  const paths = ofertes.map(o => `/ca-ES/ogm/${o.id}`);

  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  const res = await fetch(
    `https://gestorbeneficis.fanoc.org/wp-json/wp/v2/ofertas_grandes_marc/${params.id}?_embed`
  );

  const ofertagranmarca = await res.json();

  if (!ofertagranmarca.data) {
    return { props: { ofertagranmarca }, revalidate: 1 };
  } else {
    return { props: { ofertagranmarca: '404' } };
  }
}

export default OfertaGranMarca;
