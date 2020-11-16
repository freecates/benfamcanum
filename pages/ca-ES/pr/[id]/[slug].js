import fetch from 'isomorphic-unfetch';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../../../components/MyLayout.js';
import Custom404 from '../../../404';

const Fallback = ({ ruta, notFound }) => {
  return (
    <Layout ruta={ruta}>
      <Head>
        <title>{notFound ? '404 | Prestació no trobada' : '... Loading'}</title>
      </Head>
      <nav aria-label="Estás aquí:" role="navigation">
        <ul className="breadcrumbs">
          <li>
            <Link href="/ca-ES">
              <a>Inici</a>
            </Link>
          </li>
          <li>
            <Link href="/ca-ES/prestacions">
              <a>Prestacions</a>
            </Link>
          </li>
        </ul>
      </nav>
      <section>
        <div className={'file'}>
          <h1>{notFound ? 'Prestació no trobada' : '... Loading'}</h1>
        </div>
      </section>
    </Layout>
  );
};

const Prestacion = props => {
  const { isFallback } = useRouter();

  if (!isFallback && !props.prestacion) {
    return <Custom404 ruta={props.ruta} />;
  }
  if (isFallback) {
    return <Fallback ruta={props.ruta} />;
  }
  if (props.prestacion === '404') {
    return <Fallback ruta={props.ruta} notFound />;
  }
  return (
    <Layout ruta={props.ruta}>
      <Head>
        {props.prestacion.acf.nombre_de_la_prestacion ? (
          <title
            dangerouslySetInnerHTML={{
              __html: props.prestacion.acf.nombre_de_la_prestacion + ' - Famílies Nombroses'
            }}
          />
        ) : (
          ''
        )}
        {props.prestacion.acf.telefono ? <link rel="stylesheet" href="/static/custom.css" /> : ''}
      </Head>
      <nav aria-label="Ets aquí:" role="navigation">
        <ul className="breadcrumbs">
          <li>
            <Link href="/ca-ES">
              <a>Inici</a>
            </Link>
          </li>
          <li>
            <Link href="/ca-ES/prestacions">
              <a>Prestacions</a>
            </Link>
          </li>
          {props.prestacion.acf.nivel_administrativo_de_la_prestacion_publica == 'Municipal' ? (
            <li>
              <Link href="/ca-ES/municipis-prestacions">
                <a>Municipis</a>
              </Link>
            </li>
          ) : (
            ''
          )}
          {props.prestacion.acf.nivel_administrativo_de_la_prestacion_publica == 'Autonómico' ? (
            <li>
              <Link href="/ca-ES/comunitats-prestacions">
                <a>Comunitats</a>
              </Link>
            </li>
          ) : (
            ''
          )}
          {props.prestacion.acf.nivel_administrativo_de_la_prestacion_publica == 'Estatal' ? (
            <li>
              <Link href="/ca-ES/prestacions-estatals">
                <a>Estatals</a>
              </Link>
            </li>
          ) : (
            ''
          )}
          {props.prestacion.acf.nivel_administrativo_de_la_prestacion_publica == 'Municipal' ? (
            <li>
              <Link
                href={`/ca-ES/pm/${props.prestacion.acf.localidad.term_id}/${props.prestacion.acf.localidad.slug}`}
              >
                <a>
                  <span
                    dangerouslySetInnerHTML={{
                      __html: props.prestacion.acf.localidad.name
                    }}
                  />
                </a>
              </Link>
            </li>
          ) : (
            ''
          )}
          {props.prestacion.acf.nivel_administrativo_de_la_prestacion_publica == 'Autonómico' ? (
            <li>
              <Link
                as={`/ca-ES/p-c/${props.prestacion.acf.comunidad_autonoma.term_id}/${props.prestacion.acf.comunidad_autonoma.slug}`}
                href={`/ca-ES/prestaciones-comunidad?comunidad=${props.prestacion.acf.comunidad_autonoma.term_id}`}
              >
                <a>
                  <span
                    dangerouslySetInnerHTML={{
                      __html: props.prestacion.acf.comunidad_autonoma.name
                    }}
                  />
                </a>
              </Link>
            </li>
          ) : (
            ''
          )}
          <li>
            <span className="show-for-sr">Actual: </span>{' '}
            <span
              dangerouslySetInnerHTML={{
                __html: props.prestacion.acf.nombre_de_la_prestacion
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
                props.prestacion._embedded['wp:term'][0][0].slug +
                '-prestaciones-familias-numerosas.png'
              }
            />
            <br />
            <span
              dangerouslySetInnerHTML={{
                __html: props.prestacion.acf.nombre_de_la_prestacion
              }}
            />
          </h1>

          {props.prestacion.acf.nivel_administrativo_de_la_prestacion_publica == 'Municipal' ? (
            <p className="location">
              <small>
                <Link
                  as={`/ca-ES/p-m/${props.prestacion.acf.localidad.term_id}/${props.prestacion.acf.localidad.slug}`}
                  href={`/ca-ES/prestaciones-municipio?localidad=${props.prestacion.acf.localidad.term_id}`}
                >
                  <a title={'Ver todas las prestaciones de ' + props.prestacion.acf.localidad.name}>
                    <span
                      dangerouslySetInnerHTML={{
                        __html: props.prestacion.acf.localidad.name
                      }}
                    />
                  </a>
                </Link>
              </small>
            </p>
          ) : (
            ''
          )}

          {props.prestacion.acf.nivel_administrativo_de_la_prestacion_publica == 'Autonómico' ? (
            <p className="location">
              <small>
                <Link
                  as={`/ca-ES/p-c/${props.prestacion.acf.comunidad_autonoma.term_id}/${props.prestacion.acf.comunidad_autonoma.slug}`}
                  href={`/ca-ES/prestaciones-comunidad?comunidad=${props.prestacion.acf.comunidad_autonoma.term_id}`}
                >
                  <a
                    title={
                      'Ver todas las prestaciones de ' +
                      props.prestacion.acf.comunidad_autonoma.name
                    }
                  >
                    <span
                      dangerouslySetInnerHTML={{
                        __html: props.prestacion.acf.comunidad_autonoma.name
                      }}
                    />
                  </a>
                </Link>
              </small>
            </p>
          ) : (
            ''
          )}

          <p className="category">
            <small>
              <strong>Tipus de prestació: </strong>:{' '}
              {props.prestacion._embedded['wp:term'][0][0].name}
            </small>
          </p>

          <div className="file-data">
            <div className="file-img">
              {props.prestacion.acf.logo_de_la_localidad ? (
                <p>
                  <img
                    className="img-file"
                    width="1024"
                    src={props.prestacion.acf.logo_de_la_localidad.sizes.large}
                    alt={props.prestacion.acf.titulo_de_la_oferta_general}
                  />
                </p>
              ) : (
                ''
              )}
            </div>

            <div className="file-content">
              {props.prestacion.acf.descripcion_de_la_prestacion ? (
                <p
                  dangerouslySetInnerHTML={{
                    __html: props.prestacion.acf.descripcion_de_la_prestacion
                  }}
                />
              ) : (
                ''
              )}

              {props.prestacion.acf.enlace_de_interes ? (
                <p className="callout align-center">
                  <Link href={props.prestacion.acf.enlace_de_interes}>
                    <a target="_blank">Més informació</a>
                  </Link>
                </p>
              ) : (
                ''
              )}
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .breadcrumbs {
          margin-bottom: 1em;
        }
        .file {
          enmax-width: 1024px;
          margin: 0 auto;
        }
        h1 {
          color: #cb5599;
        }
        h1 small {
          color: #ffffff;
        }
        a {
          color: #00add9 !important;
        }
        .align-center {
          text-align: center;
        }
        .file-label {
          background: #f18903 !important;
        }
        @media screen and (min-width: 768px) {
          .file-data {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-wrap: wrap;
            flex-wrap: wrap;
            align-items: strech;

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
      `}</style>
    </Layout>
  );
};

export async function getStaticPaths() {
  const res = await fetch('https://gestorbeneficis.fanoc.org/wp-json/wp/v2/prestaciones/');
  const prestacion = await res.json();

  const paths = prestacion.map(p => `/ca-ES/pr/${p.id}/${p.slug}`);

  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  const res = await fetch(
    `https://gestorbeneficis.fanoc.org/wp-json/wp/v2/prestaciones/${params.id}?_embed`
  );
  const prestacion = await res.json();

  if (!prestacion.data) {
    return { props: { prestacion }, revalidate: 1 };
  } else {
    return { props: { prestacion: '404' } };
  }
}

export default Prestacion;
