import fetch from 'isomorphic-unfetch';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '../../../components/MyLayout.js';
import Fallback from '../../../components/Fallback';
import SeoHead from '../../../components/SeoHead';
import Custom404 from '../../404';

const Prestacion = props => {
  const { isFallback } = useRouter();

  if (!isFallback && !props.prestacion) {
    return <Custom404 />;
  }
  if (isFallback) {
    return <Fallback breadCrumb={'Prestaciones'} />;
  }
  if (props.prestacion === '404') {
    return <Fallback notFound breadCrumb={'Prestaciones'} />;
  }
  return (
    <Layout>
      <SeoHead seo={props.prestacion} />
      <nav aria-label="Estás aquí:" role="navigation">
        <ul className="breadcrumbs">
          <li>
            <Link href="/">
              <a>Inicio</a>
            </Link>
          </li>
          <li>
            <Link href="/prestaciones">
              <a>Prestaciones</a>
            </Link>
          </li>
          {props.prestacion.acf.nivel_administrativo_de_la_prestacion_publica == 'Municipal' ? (
            <li>
              <Link href="/municipios-prestaciones">
                <a>Municipios</a>
              </Link>
            </li>
          ) : (
            ''
          )}
          {props.prestacion.acf.nivel_administrativo_de_la_prestacion_publica == 'Autonómico' ? (
            <li>
              <Link href="/comunidades-prestaciones">
                <a>Comunidades</a>
              </Link>
            </li>
          ) : (
            ''
          )}
          {props.prestacion.acf.nivel_administrativo_de_la_prestacion_publica == 'Estatal' ? (
            <li>
              <Link href="/prestaciones-estatales">
                <a>Estatales</a>
              </Link>
            </li>
          ) : (
            ''
          )}
          {props.prestacion.acf.nivel_administrativo_de_la_prestacion_publica == 'Municipal' ? (
            <li>
              <Link
                href={`/pm/${props.prestacion.acf.localidad.term_id}/${props.prestacion.acf.localidad.slug}`}
              >
                <a>
                  <span dangerouslySetInnerHTML={{ __html: props.prestacion.acf.localidad.name }} />
                </a>
              </Link>
            </li>
          ) : (
            ''
          )}
          {props.prestacion.acf.nivel_administrativo_de_la_prestacion_publica == 'Autonómico' ? (
            <li>
              <Link
                href={`/prestaciones-comunidad`}
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
              dangerouslySetInnerHTML={{ __html: props.prestacion.acf.nombre_de_la_prestacion }}
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
              dangerouslySetInnerHTML={{ __html: props.prestacion.acf.nombre_de_la_prestacion }}
            />
          </h1>

          {props.prestacion.acf.nivel_administrativo_de_la_prestacion_publica == 'Municipal' ? (
            <p className="location">
              <small>
                <Link
                  as={`/p-m/${props.prestacion.acf.localidad.term_id}/${props.prestacion.acf.localidad.slug}`}
                  href={`/prestaciones-municipio?localidad=${props.prestacion.acf.localidad.term_id}`}
                >
                  <a title={'Ver todas las prestaciones de ' + props.prestacion.acf.localidad.name}>
                    <span
                      dangerouslySetInnerHTML={{ __html: props.prestacion.acf.localidad.name }}
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
                  href={`/prestaciones-comunida`}
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
              <strong>Tipo de prestación: </strong>:{' '}
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
                    <a target="_blank">Más información</a>
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

  const paths = prestacion.map(p => `/pr/${p.id}/${p.slug}`);

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
