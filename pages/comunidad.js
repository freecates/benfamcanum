import fetch from 'isomorphic-unfetch';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Link from 'next/link';
import { IntlProvider } from 'react-intl';
import Layout from '../components/MyLayout.js';
import BrandsGallery from '../components/BrandsGallery';
import Gallery from '../components/Gallery';
import Banners from '../components/Banners.js';

const SelectCity = dynamic(import('../components/SelectCity'), {
  loading: () => (
    <div>
      <p style={{ textAlign: 'center' }}>
        <img src="/static/rolling.gif" />
      </p>
    </div>
  )
});

const today = Date.now();
const todayISO = new Date(today).toISOString();

const PostByComunidad = props => {
  return (
    <section>
      {props.posts.length == 0 ? (
        <Layout>
          <Head>
            <title>Beneficios - Comunidad</title>
          </Head>
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
                <span className="show-for-sr">Actual: </span> Comunidad
              </li>
            </ul>
          </nav>
          <section>
            <h1>Actualmente no existen ofertas para familias en esta Comunidad</h1>
            <p className="align-center">
              Por favor, escoge{' '}
              <Link href="/beneficios">
                <a>otra</a>
              </Link>
              .
            </p>
          </section>
          <style jsx>{`
            .breadcrumbs {
              margin-bottom: 1em;
            }
            h1,
            .align-center {
              text-align: center;
            }
            h1 {
              color: #cb5599;
            }
            a:hover {
              text-decoration: underline;
            }
            nav a {
              color: #00add9;
            }
          `}</style>
        </Layout>
      ) : (
        <Layout>
          <Head>
            <title>Beneficios Familias Numerosas - {props.posts[0].comunidad_autonoma}</title>
          </Head>
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
                <span className="show-for-sr">Actual: </span> {props.posts[0].comunidad_autonoma}
              </li>
            </ul>
          </nav>
          <section>
            <Banners data={props.banners} section={'2'} />
            <h1>{props.posts[0].comunidad_autonoma}</h1>

            <section id="select-city">
              <div className="wrapper">
                <p className="align-center">
                  ¿Dónde quieres disfrutar del beneficio? Selecciona la localidad
                </p>

                <SelectCity
                  inputClass="city"
                  inputValue="Buscar el mejor descuento"
                  options={props.posts
                    .reduce((ciutats, post) => {
                      if (post.localidad_del_beneficio == false) {
                        return ciutats;
                      }
                      ciutats[post.localidad_del_beneficio.term_id] = {
                        slug: post.localidad_del_beneficio.slug,
                        key: post.localidad_del_beneficio.term_id,
                        value: post.localidad_del_beneficio
                          ? `/l/${post.localidad_del_beneficio.term_id}/${post.localidad_del_beneficio.slug}`
                          : '',
                        label: post.localidad_del_beneficio
                          ? `${post.localidad_del_beneficio.name}`
                          : ''
                      };
                      return ciutats;
                    }, [])
                    .sort((a, b) => {
                      if (a.slug < b.slug) return -1;
                      if (a.slug > b.slug) return 1;
                      return 0;
                    })}
                />
              </div>
            </section>

            <IntlProvider defaultLocale="es">
              <section>
                {props.marcasofertas.length >= 1 ? (
                  <BrandsGallery data={props.marcasofertas} />
                ) : null}
                {props.marcascaofertas.length >= 1 ? (
                  <BrandsGallery data={props.marcascaofertas} />
                ) : null}
                <p className="align-center">
                  ... O si lo prefieres accede directamente a cualquiera de las fichas
                </p>

                <Gallery data={props.posts} />
              </section>
            </IntlProvider>
          </section>
          {props.uniquemarcas.length >= 2 && props.uniquecamarcas.length >= 1 && (
            <style jsx>{`
              .national-gallery {
                background: #eeeeee;
                margin-top: 1em !important;
                padding-top: 0.75em !important;
              }
              .national-gallery:last-child {
                margin-bottom: 1em !important;
              }
              .breadcrumbs {
                margin-bottom: 1em;
              }
              h1,
              .align-center {
                text-align: center;
              }
              h1 {
                color: #cb5599;
              }
              .dk {
                display: none;
              }
              .promo {
                margin-top: 1em;
              }
              .gallery {
                display: -ms-flexbox;
                display: flex;
                -ms-flex-wrap: wrap;
                flex-wrap: wrap;
                padding: 5px;
              }
              ul {
                list-style-type: none !important;
                margin-left: 0;
                margin: 0 auto !important;
              }
              a {
                color: inherit !important;
              }
              a:hover {
                text-decoration: underline;
              }
              nav a {
                color: #00add9;
              }
              .benefit {
                width: 150px;
              }
              .gallery-label {
                position: relative;
                margin-top: -40px;
                margin-right: 5px;
                float: right;
                text-align: center;
                background: #f18903 !important;
              }
              .titulo-oferta {
                color: #ff0000;
              }
              @media screen and (min-width: 320px) {
                .gallery {
                  width: 100%;
                }
                .benefit {
                  margin: 5px;
                }
              }
              @media screen and (max-width: 375px) {
                .benefit {
                  width: 124px;
                }
              }
              @media screen and (min-width: 360px) {
                .gallery {
                  width: 90%;
                }
              }
              @media screen and (min-width: 768px) {
                .gallery {
                  width: 90%;
                }
                .benefit {
                  width: 200px;
                  margin: 7.5px;
                }
                .dk {
                  display: block;
                }
                .mb {
                  display: none;
                }
              }
              @media screen and (min-width: 1024px) {
                .gallery {
                  width: 100%;
                }
                .benefit {
                  width: 220px;
                  margin: 10px;
                }
              }
              @media screen and (min-width: 1160px) {
                .benefit {
                  width: 245px;
                }
              }
              .fade-in {
                animation-name: fadeIn;
                animation-duration: 1.3s;
                animation-timing-function: cubic-bezier(0, 0, 0.4, 1);
                animation-fill-mode: forwards;
              }
            `}</style>
          )}
        </Layout>
      )}
    </section>
  );
};

export async function getStaticProps() {
  const caid = '8143';

  const res = await fetch(
    `https://gestorbeneficis.fanoc.org/wp-json/lanauva/v1/beneficios?_embed&comunidad=Catalu`
  );
  const posts = await res.json();

  const res2 = await fetch(
    `https://gestorbeneficis.fanoc.org/wp-json/lanauva/v1/ofertas_grandes_marc?_embed&comunidad=8143&sim-model=id-marca`
  );
  const almostuniquemarcas = await res2.json();
  const marcasofertas = almostuniquemarcas.filter(x => x.marca != null);

  const res3 = await fetch(
    `https://gestorbeneficis.fanoc.org/wp-json/lanauva/v1/of_gr_m_ca?_embed&comunidad=8143&sim-model=id-marca-comunidad`
  );
  const almostuniquecamarcas = await res3.json();
  const marcascaofertas = almostuniquecamarcas.filter(x => x.marca != null);

  const res4 = await fetch(`https://gestorbeneficis.fanoc.org/wp-json/wp/v2/banners?per_page=100`);
  const banners = await res4.json();

  const uniquemarcasnotfiltered = [
    ...new Set(marcasofertas.map(({ marca }) => (marca != null ? marca.name : '')))
  ];
  const uniquecamarcasnotfiltered = [
    ...new Set(marcascaofertas.map(({ marca }) => marca && marca.name))
  ];

  const uniquemarcas = uniquemarcasnotfiltered.filter(Boolean);
  const uniquecamarcas = uniquecamarcasnotfiltered.filter(Boolean);

  return {
    props: { posts, banners, marcasofertas, marcascaofertas, caid, uniquemarcas, uniquecamarcas },
    revalidate: 1
  };
}

export default PostByComunidad;
