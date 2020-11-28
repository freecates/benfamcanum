import fetch from 'isomorphic-unfetch';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { FormattedDate, IntlProvider } from 'react-intl';
import { generateShareIcon, ShareButtons } from 'react-share';
import Layout from '../../../../components/MyLayout.js';
import Fallback from '../../../../components/Fallback';
import SeoHead from '../../../../components/SeoHead';
import Custom404 from '../../../404';

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

const Promocion = props => {
  const { isFallback } = useRouter();

  if (!isFallback && !props.promocion) {
    return <Custom404 ruta={props.ruta} />;
  }
  if (isFallback) {
    return <Fallback ruta={props.ruta} breadCrumb={'Beneficis'} />;
  }
  if (props.promocion === '404') {
    return <Fallback ruta={props.ruta} notFound breadCrumb={'Beneficis'} />;
  }
  return (
    <Layout ruta={props.ruta}>
    <SeoHead seo={props.promocion} ruta={props.ruta} />
      <nav aria-label="Ets aquí:" role="navigation">
        <ul className="breadcrumbs">
          <li>
            <Link href="/ca-ES">
              <a>Inici</a>
            </Link>
          </li>
          <li>
            <Link href="/ca-ES/beneficis">
              <a>Ofertes comercials</a>
            </Link>
          </li>
          <li>
            <Link href="/ca-ES/promocions">
              <a>Promocions</a>
            </Link>
          </li>
          <li>
            <span className="show-for-sr">Actual: </span>{' '}
            <span
              dangerouslySetInnerHTML={{
                __html: props.promocion.acf.nombre_de_la_empresa
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
                'https://benfamcanumpics.famnum.now.sh/static/96/' +
                props.promocion._embedded['wp:term'][0][0].slug +
                '-familias-numerosas.png'
              }
            />
            <br />
            <span
              dangerouslySetInnerHTML={{
                __html: props.promocion.acf.nombre_de_la_empresa
              }}
            />
          </h1>

          <h4 className="location dont-break-out">
            <span>
              {props.promocion.acf.web_de_la_empresa ? (
                <span>
                  <Link href={props.promocion.acf.web_de_la_empresa}>
                    <a>Accedeix al seu web</a>
                  </Link>
                </span>
              ) : (
                ''
              )}
            </span>
          </h4>

          <div className="file-data">
            <div className="file-content">
              <h4 className="align-center">
                <span className="label alert file-label">Promoció!</span>
              </h4>

              {props.promocion.acf.descripcion_de_la_promocion ? (
                <p
                  className="dont-break-out"
                  dangerouslySetInnerHTML={{
                    __html: props.promocion.acf.descripcion_de_la_promocion
                  }}
                />
              ) : (
                ''
              )}

              <p>
                Vàlida fins el{' '}
                <IntlProvider defaultLocale="ca">
                  <strong>
                    <FormattedDate
                      value={props.promocion.acf.fecha_de_finalizaciion_de_la_promocion}
                      day="numeric"
                      month="long"
                      year="numeric"
                    />
                  </strong>
                </IntlProvider>
              </p>

              <div className="social-share-icons">
                <div className="Post__some-network">
                  <p>
                    <small>Comparteix:</small>
                  </p>
                </div>

                <div className="Post__some-network">
                  <FacebookShareButton
                    url={
                      'https://beneficios.fanoc.org/p/' +
                      props.promocion.id +
                      '/' +
                      props.promocion.slug
                    }
                    className="Post__some-network__share-button"
                  >
                    <FacebookIcon size={32} round />
                  </FacebookShareButton>
                </div>

                <div className="Post__some-network">
                  <TwitterShareButton
                    url={
                      'https://beneficios.fanoc.org/p/' +
                      props.promocion.id +
                      '/' +
                      props.promocion.slug
                    }
                    title={
                      props.promocion.acf.nombre_de_la_empresa +
                      ':' +
                      ' ' +
                      props.promocion.acf.titulo_de_la_oferta_oferta_socios
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
                      'https://beneficios.fanoc.org/p/' +
                      props.promocion.id +
                      '/' +
                      props.promocion.slug
                    }
                    title={
                      props.promocion.acf.nombre_de_la_empresa +
                      ':' +
                      ' ' +
                      props.promocion.acf.titulo_de_la_oferta_oferta_socios
                    }
                    className="Post__some-network__share-button"
                  >
                    <LinkedinIcon size={32} round />
                  </LinkedinShareButton>
                </div>

                <div className="Post__some-network">
                  <EmailShareButton
                    url={
                      'https://beneficios.fanoc.org/p/' +
                      props.promocion.id +
                      '/' +
                      props.promocion.slug
                    }
                    subject={
                      props.promocion.acf.nombre_de_la_empresa +
                      ':' +
                      ' ' +
                      props.promocion.acf.titulo_de_la_oferta_oferta_socios
                    }
                    body={
                      'Échale un vistazo a esta oferta: ' +
                      props.promocion.acf.nombre_de_la_empresa +
                      ':' +
                      ' ' +
                      props.promocion.acf.titulo_de_la_oferta_oferta_socios +
                      ' ' +
                      'https://beneficios.fanoc.org/p/' +
                      props.promocion.id +
                      '/' +
                      props.promocion.slug
                    }
                    className="Post__some-network__share-button"
                  >
                    <EmailIcon size={32} round />
                  </EmailShareButton>
                </div>
              </div>
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
        }
        .file-label a {
          color: #ffffff !important;
        }
        .file-label a:hover {
          text-decoration: none;
        }
        .button.button-green {
          color: #ffffff !important;
          background: #009933;
        }
        .button.button-green:hover {
          background: #007e2a;
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
          .file-content {
            width: 85%;
            margin: 0 auto;
          }
        }
        @media screen and (min-width: 1024px) {
          #how-to-get-it,
          .file-label {
            max-width: 70%;
          }
        }
        h1,
        .category,
        .location,
        .file-label,
        .align-center {
          text-align: center;
        }
      `}</style>
    </Layout>
  );
};

export async function getStaticPaths() {
  const res = await fetch('https://gestorbeneficis.fanoc.org/wp-json/wp/v2/promociones');
  const promocions = await res.json();

  const paths = promocions.map(p => `/ca-ES/pro/${p.id}/${p.slug}`);

  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  const res = await fetch(
    `https://gestorbeneficis.fanoc.org/wp-json/wp/v2/promociones/${params.id}?_embed`
  );
  const promocion = await res.json();

  if (!promocion.data) {
    return { props: { promocion }, revalidate: 1 };
  } else {
    return { props: { promocion: '404' } };
  }
}

export default Promocion;
