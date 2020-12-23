import fetch from 'isomorphic-unfetch';
import SeoHead from '@components/SeoHead';
import Link from 'next/link';
import { useRouter } from 'next/router';
import FontAwesome from 'react-fontawesome';
import { generateShareIcon, ShareButtons } from 'react-share';
import IsMember from '@components/IsMember.js';
import Layout from '@components/MyLayout.js';
import Fallback from '@components/Fallback';
import Custom404 from '../../404';

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

const OfertaOnLine = props => {
  const { pathname, isFallback } = useRouter();

  if (!isFallback && !props.ofertaonline) {
    return <Custom404 />;
  }
  if (isFallback) {
    return <Fallback breadCrumb={'Ofertas Online'} />;
  }
  if (props.ofertaonline === '404') {
    return <Fallback notFound breadCrumb={'Ofertas Online'} />;
  }
  return (
    <Layout>
      <SeoHead seo={props.ofertaonline} />
      <nav aria-label="Estás aquí:" role="navigation">
        <ul className="breadcrumbs">
          <li>
            <Link href="/">
              <a>Inicio</a>
            </Link>
          </li>
          <li>
            <Link href="/beneficios">
              <a>Ofertas para familias</a>
            </Link>
          </li>
          <li>
            <Link href="/ofertas-on-line">
              <a>Ofertas On Line</a>
            </Link>
          </li>
          <li>
            <Link
              href={`/c-o-o/${props.ofertaonline.acf.categoria_de_la_oferta.term_id}/${props.ofertaonline._embedded['wp:term'][0][0].slug}`}
            >
              <a>{props.ofertaonline._embedded['wp:term'][0][0].name}</a>
            </Link>
          </li>
          <li>
            <span className="show-for-sr">Actual: </span>{' '}
            <span
              dangerouslySetInnerHTML={{
                __html: props.ofertaonline.acf.nombre_del_establecimiento
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
                props.ofertaonline._embedded['wp:term'][0][0].slug +
                '-familias-numerosas.png'
              }
              width={'96'}
              height={'96'}
              loading={'lazy'}
            />
            <br />
            <span
              dangerouslySetInnerHTML={{
                __html: props.ofertaonline.acf.nombre_del_establecimiento
              }}
            />{' '}
            {props.ofertaonline.acf.descripcion_de_la_oferta_online_exclusiva_socios ? (
              <span className="label alert file-label">
                <small>
                  EXCLUSIVO
                  <br /> SOCIOS
                </small>
              </span>
            ) : (
              ''
            )}
          </h1>

          <h4 className="location dont-break-out">
            <span>
              {props.ofertaonline.acf.url_de_la_oferta_online ? (
                <span>
                  <Link href={props.ofertaonline.acf.url_de_la_oferta_online}>
                    <a>Accede a su web</a>
                  </Link>
                </span>
              ) : (
                ''
              )}
            </span>
          </h4>

          <p className="category">
            <small>
              <strong>Categoria</strong>:{' '}
              <Link
                href={`/c-o-o/${props.ofertaonline.acf.categoria_de_la_oferta.term_id}/${props.ofertaonline._embedded['wp:term'][0][0].slug}`}
              >
                <a
                  title={
                    'Ver todas las ofertas de la categoría ' +
                    props.ofertaonline._embedded['wp:term'][0][0].name
                  }
                >
                  {props.ofertaonline._embedded['wp:term'][0][0].name}
                </a>
              </Link>
            </small>
          </p>

          <div className="file-data">
            <div className="file-img">
              {props.ofertaonline.acf.imagen_destacada_de_la_oferta_socios_large ? (
                <p>
                  <img
                    className="img-file"
                    width={'1024'}
                    height={'1024'}
                    loading={'lazy'}
                    src={
                      props.ofertaonline.acf.imagen_destacada_de_la_oferta_socios_large.sizes.large
                    }
                    alt={props.ofertaonline.acf.titulo_de_la_oferta_online_exclusiva_socios}
                  />
                </p>
              ) : (
                null
              )}

              {props.ofertaonline.acf.imagen_destacada_de_la_oferta_general_large ? (
                <p>
                  <img
                    className="img-file"
                    width={'1024'}
                    height={'1024'}
                    loading={'lazy'}
                    src={
                      props.ofertaonline.acf.imagen_destacada_de_la_oferta_general_large.sizes.large
                    }
                    alt={props.ofertaonline.acf.titulo_de_la_oferta_general}
                  />
                </p>
              ) : (
                null
              )}
            </div>

            <div className="file-content">
              {props.ofertaonline.acf.como_conseguir_la_oferta_online_exclusiva_socios ? (
                <h1>
                  <span className="label alert file-label">
                    <a href="#how-to-get-it">
                      EXCLUSIVO SOCIOS.
                      <br />
                      MIRA COMO CONSEGUIR ESTA OFERTA
                    </a>
                    <br />
                    <FontAwesome
                      name="check-circle-o"
                      size="2x"
                      style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
                    />
                  </span>
                </h1>
              ) : (
                null
              )}

              {props.ofertaonline.acf.titulo_de_la_oferta_online_exclusiva_socios ? (
                <h4>{props.ofertaonline.acf.titulo_de_la_oferta_online_exclusiva_socios}</h4>
              ) : (
                null
              )}

              {props.ofertaonline.acf.descripcion_de_la_oferta_online_exclusiva_socios ? (
                <p
                  className="dont-break-out"
                  dangerouslySetInnerHTML={{
                    __html: props.ofertaonline.acf.descripcion_de_la_oferta_online_exclusiva_socios
                  }}
                />
              ) : (
                null
              )}

              {props.ofertaonline.acf.titulo_de_la_oferta_general_online ? (
                <h4>{props.ofertaonline.acf.titulo_de_la_oferta_general_online}</h4>
              ) : (
                null
              )}

              {props.ofertaonline.acf.descripcion_de_la_oferta_general_online ? (
                <p
                  className="dont-break-out"
                  dangerouslySetInnerHTML={{
                    __html: props.ofertaonline.acf.descripcion_de_la_oferta_general_online
                  }}
                />
              ) : (
                null
              )}

              {props.ofertaonline.acf.texto_descriptivo_adicional_con_enlace ? (
                <p>
                  <a href={props.ofertaonline.acf.enlace_con_informacion_adicional_de_la_oferta}>
                    {props.ofertaonline.acf.texto_descriptivo_adicional_con_enlace}
                  </a>
                </p>
              ) : null}

              <div className="social-share-icons">
                <div className="Post__some-network">
                  <p>
                    <small>Comparte:</small>
                  </p>
                </div>

                <div className="Post__some-network">
                  <FacebookShareButton
                    url={`https://beneficios.fanoc.org/oo/${props.ofertaonline.id}/${props.ofertaonline.slug}
                  `}
                    className="Post__some-network__share-button"
                  >
                    <FacebookIcon size={32} round />
                  </FacebookShareButton>
                </div>

                <div className="Post__some-network">
                  <TwitterShareButton
                    url={`https://beneficios.fanoc.org/oo/${props.ofertaonline.id}/${props.ofertaonline.slug}
                  `}
                    title={`${props.ofertaonline.acf.nombre_del_establecimiento}: ${
                      !props.ofertaonline.acf.titulo_de_la_oferta_general_online
                        ? props.ofertaonline.acf.titulo_de_la_oferta_online_exclusiva_socios
                        : props.ofertaonline.acf.titulo_de_la_oferta_general_online
                    }
                  `}
                    hashtags={['beneficiosfamiliasnumerosas']}
                    via="familianombrosa"
                    className="Post__some-network__share-button"
                  >
                    <TwitterIcon size={32} round />
                  </TwitterShareButton>
                </div>

                <div className="Post__some-network">
                  <LinkedinShareButton
                    url={`https://beneficios.fanoc.org/oo/${props.ofertaonline.id}/${props.ofertaonline.slug}
                  `}
                    title={`${props.ofertaonline.acf.nombre_del_establecimiento}: ${
                      !props.ofertaonline.acf.titulo_de_la_oferta_general_online
                        ? props.ofertaonline.acf.titulo_de_la_oferta_online_exclusiva_socios
                        : props.ofertaonline.acf.titulo_de_la_oferta_general_online
                    }
                  `}
                    className="Post__some-network__share-button"
                  >
                    <LinkedinIcon size={32} round />
                  </LinkedinShareButton>
                </div>

                <div className="Post__some-network">
                  <EmailShareButton
                    url={`https://beneficios.fanoc.org/oo/${props.ofertaonline.id}/${props.ofertaonline.slug}
                  `}
                    subject={`${props.ofertaonline.acf.nombre_del_establecimiento}: ${
                      !props.ofertaonline.acf.titulo_de_la_oferta_general_online
                        ? props.ofertaonline.acf.titulo_de_la_oferta_online_exclusiva_socios
                        : props.ofertaonline.acf.titulo_de_la_oferta_general_online
                    }
                  `}
                    body={`Échale un vistazo a esta oferta: ${
                      props.ofertaonline.acf.nombre_del_establecimiento
                    }: ${
                      !props.ofertaonline.acf.titulo_de_la_oferta_general_online
                        ? props.ofertaonline.acf.titulo_de_la_oferta_online_exclusiva_socios
                        : props.ofertaonline.acf.titulo_de_la_oferta_general_online
                    } [https://beneficios.fanoc.org/oo/${props.ofertaonline.id}/${
                      props.ofertaonline.slug
                    }]
                  `}
                    className="Post__some-network__share-button"
                  >
                    <EmailIcon size={32} round />
                  </EmailShareButton>
                </div>
              </div>
              {props.ofertaonline.acf.como_conseguir_la_oferta_online_exclusiva_socios ? (
                <div id="how-to-get-it">
                  <IsMember
                    ruta={pathname}
                    dataOK={
                      <div
                        dangerouslySetInnerHTML={{
                          __html:
                            props.ofertaonline.acf.como_conseguir_la_oferta_online_exclusiva_socios
                        }}
                      />
                    }
                    ID={props.ofertaonline.slug + '-' + props.ofertaonline.id}
                    Title={props.ofertaonline.title.rendered}
                    URL={'oo/' + props.ofertaonline.id + '/' + props.ofertaonline.slug}
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
          .file-img {
            width: 35%;
            margin: 5px 20px;
          }
          .file-content {
            width: 45%;
            margin: 5px 20px;
          }
        }
        @media screen and (min-width: 1024px) {
          .file-content {
            width: 55%;
          }
          #how-to-get-it,
          .file-label {
            max-width: 70%;
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
        .file-label,
        .align-center {
          text-align: center;
        }
      `}</style>
    </Layout>
  );
};

export async function getStaticPaths() {
  const res = await fetch(
    'https://gestorbeneficis.fanoc.org/wp-json/lanauva/v1/ofertas_online?sim-model=categoria'
  );
  const ofertes = await res.json();

  const paths = ofertes.map(o => `/oo/${o.ID}/${o.slug}`);

  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  const res = await fetch(
    `https://gestorbeneficis.fanoc.org/wp-json/wp/v2/ofertas_online/${params.id}?_embed`
  );

  const ofertaonline = await res.json();

  if (!ofertaonline.data) {
    return { props: { ofertaonline }, revalidate: 1 };
  } else {
    return { props: { ofertaonline: '404' } };
  }
}

export default OfertaOnLine;
