import fetch from 'isomorphic-unfetch';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import FontAwesome from 'react-fontawesome';
import { generateShareIcon, ShareButtons } from 'react-share';
import Layout from '../../../components/MyLayout.js';
import SeoHead from '../../../components/SeoHead';
import Fallback from '../../../components/Fallback';
import Custom404 from '../../404';

const MapaDeGoogle = dynamic(import('../../../components/MapaDeGoogle'), {
  loading: () => (
    <div>
      <p style={{ textAlign: 'center' }}>
        <img src="/static/rolling.gif" />
      </p>
    </div>
  )
});

const IsMember = dynamic(import('../../../components/IsMember'), {
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

const Post = props => {
  const { pathname, isFallback } = useRouter();
  if (!isFallback && !props.post) {
    return <Custom404 />;
  }
  if (isFallback) {
    return <Fallback breadCrumb={'Beneficios'} />;
  }
  if (props.post === '404') {
    return <Fallback notFound breadCrumb={'Beneficios'} />;
  }
  return (
    <Layout>
      <SeoHead seo={props.post} />
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
            <Link
              as={`/c-ca/${props.post.categoria_del_beneficio}/${props.post._embedded['wp:term'][0][0].slug}/${props.post.acf.comunidad_autonoma}/8143`}
              href={`/category-comunidad?sid=${props.post.categoria_del_beneficio}&comunidad=${props.post.acf.comunidad_autonoma}&caid=8143`}
            >
              <a>{props.post._embedded['wp:term'][0][0].name}</a>
            </Link>
          </li>
          <li>
            <span className="show-for-sr">Actual: </span>{' '}
            <span dangerouslySetInnerHTML={{ __html: props.post.acf.nombre_del_establecimiento }} />
          </li>
        </ul>
      </nav>

      <section>
        <div className="file">
          <h1>
            <img
              src={
                'https://benfamcanumpics.famnum.now.sh/static/96/' +
                props.post._embedded['wp:term'][0][0].slug +
                '-familias-numerosas.png'
              }
              width={'96'}
              height={'96'}
              loading={'lazy'}
            />
            <br />
            <span
              dangerouslySetInnerHTML={{ __html: props.post.acf.nombre_del_establecimiento }}
            />{' '}
            {props.post.acf.descripcion_de_la_oferta_oferta_socios ? (
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
              <span dangerouslySetInnerHTML={{ __html: props.post.acf.direccion }} />.{' '}
              <span>{props.post.acf.codigo_postal}</span>,{' '}
              <Link
                href={`/l/${props.post.acf.localidad_del_beneficio.term_id}/${props.post.acf.localidad_del_beneficio.slug}`}
              >
                <a
                  title={
                    'Ver todos los beneficios de ' + props.post.acf.localidad_del_beneficio.name
                  }
                >
                  <span
                    dangerouslySetInnerHTML={{
                      __html: props.post.acf.localidad_del_beneficio.name
                    }}
                  />
                </a>
              </Link>
            </span>
          </h4>
          <h4 className="location dont-break-out">
            <span>
              {props.post.acf.telefono ? (
                <span>
                  <a href={'tel:' + props.post.acf.telefono}>{props.post.acf.telefono}</a>
                </span>
              ) : (
                ''
              )}
              {props.post.acf.telefono_m ? (
                <span>
                  {' '}
                  | <a href={'tel:' + props.post.acf.telefono_}>{props.post.acf.telefono_m}</a>
                </span>
              ) : (
                ''
              )}
              {props.post.acf.correo_electronico_del_establecimiento ? (
                <span>
                  .{' '}
                  <a href={'mailto:' + props.post.acf.correo_electronico_del_establecimiento}>
                    <FontAwesome
                      name="envelope"
                      style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)', color: '#666666' }}
                    />
                  </a>{' '}
                </span>
              ) : (
                ''
              )}
              {props.post.acf.twitter_del_establecimiento ? (
                <span>
                  |{' '}
                  <a href={'https://twitter.com/' + props.post.acf.twitter_del_establecimiento}>
                    <FontAwesome
                      name="twitter-square"
                      style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)', color: '#666666' }}
                    />
                  </a>
                </span>
              ) : (
                ''
              )}{' '}
              {props.post.acf.facebook_del_establecimiento ? (
                <span>
                  |{' '}
                  <a href={props.post.acf.facebook_del_establecimiento}>
                    <FontAwesome
                      name="facebook-square"
                      style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)', color: '#666666' }}
                    />
                  </a>
                </span>
              ) : (
                ''
              )}{' '}
              {props.post.acf.sitio_web_del_establecimiento ? (
                <span>
                  |{' '}
                  <a title="Visita la web" href={props.post.acf.sitio_web_del_establecimiento}>
                    <FontAwesome
                      name="globe"
                      style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)', color: '#666666' }}
                    />
                  </a>
                </span>
              ) : (
                ''
              )}
            </span>
          </h4>

          <p className="category">
            <strong>Categoria</strong>:{' '}
            <Link
              as={`/c-ca/${props.post.categoria_del_beneficio}/${props.post._embedded['wp:term'][0][0].slug}/${props.post.acf.comunidad_autonoma}/8143`}
              href={`/category-comunidad?sid=${props.post.categoria_del_beneficio}&comunidad=${props.post.acf.comunidad_autonoma}&caid=8143`}
            >
              <a
                title={
                  'Ver todos los beneficios de la categoría ' +
                  props.post._embedded['wp:term'][0][0].name
                }
              >
                {props.post._embedded['wp:term'][0][0].name}
              </a>
            </Link>
          </p>

          {props.post.acf.lat ? (
            <MapaDeGoogle lat={props.post.acf.lat} lng={props.post.acf.lon} />
          ) : (
            ''
          )}

          <div className="file-data">
            <div className="file-img">
              {props.post.acf.imagen_destacada_de_la_oferta_socios_large ? (
                <p className="fade-in">
                  <img
                    className="img-file"
                    width={'1024'}
                    height={'1024'}
                    loading={'lazy'}
                    src={props.post.acf.imagen_destacada_de_la_oferta_socios_large.sizes.large}
                    alt={props.post.acf.titulo_de_la_oferta_oferta_socios}
                  />
                </p>
              ) : null}

              {props.post.acf.imagen_destacada_de_la_oferta_general_large ? (
                <p className="fade-in">
                  <img
                    className="img-file"
                    width={'1024'}
                    height={'1024'}
                    loading={'lazy'}
                    src={props.post.acf.imagen_destacada_de_la_oferta_general_large.sizes.large}
                    alt={props.post.acf.titulo_de_la_oferta_general}
                  />
                </p>
              ) : null}
            </div>

            <div className="file-content">
              {props.post.acf.como_conseguir_la_oferta_oferta_socios ? (
                <h1 className="align-none">
                  <a href="#how-to-get-it">
                    <span className="label alert file-label">
                      EXCLUSIVO SOCIOS.
                      <br /> Introduce tu usuario y contraseña de asociado para saber como obtener
                      esta oferta
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

              {props.post.acf.titulo_de_la_oferta_oferta_socios ? (
                <h4>{props.post.acf.titulo_de_la_oferta_oferta_socios}</h4>
              ) : (
                ''
              )}

              {props.post.acf.descripcion_de_la_oferta_oferta_socios ? (
                <p
                  className="dont-break-out"
                  dangerouslySetInnerHTML={{
                    __html: props.post.acf.descripcion_de_la_oferta_oferta_socios
                  }}
                />
              ) : (
                ''
              )}

              {props.post.acf.titulo_de_la_oferta_oferta_general ? (
                <h4>{props.post.acf.titulo_de_la_oferta_oferta_general}</h4>
              ) : (
                ''
              )}

              {props.post.acf.descripcion_de_la_oferta_oferta_general ? (
                <p
                  className="dont-break-out"
                  dangerouslySetInnerHTML={{
                    __html: props.post.acf.descripcion_de_la_oferta_oferta_general
                  }}
                />
              ) : (
                ''
              )}

              {props.post.acf.texto_descriptivo_adicional_con_enlace ? (
                <p>
                  {' '}
                  <Link href={props.post.acf.enlace_con_informacion_adicional_de_la_oferta}>
                    <a
                      title={props.post.acf.texto_descriptivo_adicional_con_enlace}
                      target="_blank"
                    >
                      <span className="label alert file-label-additional">
                        {props.post.acf.texto_descriptivo_adicional_con_enlace}
                      </span>
                    </a>
                  </Link>
                </p>
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
                    url={'https://beneficios.fanoc.org/p/' + props.post.id + '/' + props.post.slug}
                    className="Post__some-network__share-button"
                  >
                    <FacebookIcon size={32} round />
                  </FacebookShareButton>
                </div>

                <div className="Post__some-network">
                  <TwitterShareButton
                    url={'https://beneficios.fanoc.org/p/' + props.post.id + '/' + props.post.slug}
                    title={
                      props.post.acf.nombre_del_establecimiento +
                      ':' +
                      ' ' +
                      props.post.acf.titulo_de_la_oferta_oferta_socios
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
                    url={'https://beneficios.fanoc.org/p/' + props.post.id + '/' + props.post.slug}
                    title={
                      props.post.acf.nombre_del_establecimiento +
                      ':' +
                      ' ' +
                      props.post.acf.titulo_de_la_oferta_oferta_socios
                    }
                    className="Post__some-network__share-button"
                  >
                    <LinkedinIcon size={32} round />
                  </LinkedinShareButton>
                </div>

                <div className="Post__some-network">
                  <EmailShareButton
                    url={'https://beneficios.fanoc.org/p/' + props.post.id + '/' + props.post.slug}
                    subject={
                      props.post.acf.nombre_del_establecimiento +
                      ':' +
                      ' ' +
                      props.post.acf.titulo_de_la_oferta_oferta_socios
                    }
                    body={
                      'Échale un vistazo a esta oferta: ' +
                      props.post.acf.nombre_del_establecimiento +
                      ':' +
                      ' ' +
                      props.post.acf.titulo_de_la_oferta_oferta_socios +
                      ' ' +
                      'https://beneficios.fanoc.org/p/' +
                      props.post.id +
                      '/' +
                      props.post.slug
                    }
                    className="Post__some-network__share-button"
                  >
                    <EmailIcon size={32} round />
                  </EmailShareButton>
                </div>
              </div>

              {props.post.acf.como_conseguir_la_oferta_oferta_socios ? (
                <div id="how-to-get-it">
                  <IsMember
                    ruta={pathname}
                    dataOK={
                      <div
                        dangerouslySetInnerHTML={{
                          __html: props.post.acf.como_conseguir_la_oferta_oferta_socios
                        }}
                      />
                    }
                    ID={props.post.slug + '-' + props.post.id}
                    Title={props.post.title.rendered}
                    URL={'p/' + props.post.id + '/' + props.post.slug}
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
        .align-center {
          text-align: center;
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
        .file-label,
        .file-label-additional {
          background: #f18903 !important;
          color: #ffffff;
          font-weight: bold;
          font-size: 1rem;
          white-space: normal;
        }
        .file-label-additional {
          background: #e0e4e8 !important;
          color: #000000 !important;
        }
        a .file-label,
        a .file-label-additional {
          color: #ffffff !important;
          cursor: pointer;
        }
        a:hover .file-label,
        a:hover .file-label-additional {
          text-decoration: none;
        }
        a .file-label-additional {
          color: #000000 !important;
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
  const res = await fetch('https://gestorbeneficis.fanoc.org/wp-json/wp/v2/beneficios/');
  const posts = await res.json();

  const paths = posts.map(p => `/p/${p.id}/${p.slug}`);

  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  const res = await fetch(
    `https://gestorbeneficis.fanoc.org/wp-json/wp/v2/beneficios/${params.id}?_embed`
  );

  const post = await res.json();

  if (!post.data) {
    return { props: { post }, revalidate: 1 };
  } else {
    return { props: { post: '404' } };
  }
}

export default Post;
