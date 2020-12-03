import fetch from 'isomorphic-unfetch';
import Head from 'next/head';
import Link from 'next/link';
import { IntlProvider } from 'react-intl';
import Layout from '../../../components/MyLayout.js';
import Banners from '../../../components/Banners.js';

const today = Date.now();
const todayISO = new Date(today).toISOString();

const PostsByLocalidad = props => (
  <Layout>
    <Head>
      <title>Beneficios Familias Numerosas - {props.posts[0].localidad_del_beneficio.name}</title>
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
          <Link href={`/comunidad`}>
            <a>{props.posts[0].comunidad_autonoma}</a>
          </Link>
        </li>
        <li>
          <span className="show-for-sr">Actual: </span> Localidad:{' '}
          {props.posts[0].localidad_del_beneficio.name}
        </li>
      </ul>
    </nav>
    <section>
      <Banners data={props.banner} />
      <h1>Beneficios en {props.posts[0].localidad_del_beneficio.name}</h1>
      <p className="align-center">
        <small>
          <Link
            as={`/m-l/${props.posts[0].localidad_del_beneficio.term_id}/${props.posts[0].localidad_del_beneficio.slug}`}
            href={`/mapa-localidad?localidad=${props.posts[0].localidad_del_beneficio.term_id}`}
          >
            <a>
              <img
                src="/static/icona-mapa-familias-numerosas.png"
                width={'30'}
                height={'33'}
                loading={'lazy'}
              />{' '}
              ver en el mapa
            </a>
          </Link>
        </small>
      </p>
      <IntlProvider defaultLocale="es">
        <section>
          {props.marcasofertas.length >= 1 ? (
            <ul className="gallery national-gallery">
              {props.marcasofertas.reduce((marcas, marcasoferta) => {
                if (marcasoferta.marca == false) {
                  return marcas;
                }
                marcas[marcasoferta.marca.term_id] = (
                  <span key={marcasoferta.marca.term_id}>
                    <li className="benefit align-center">
                          <p className="fade-in">
                            <Link
                              href={`/m-o-g-m/${marcasoferta.marca.term_id}/${marcasoferta.marca.slug}`}
                            >
                              <a title={'Ver todas las ofertas de ' + marcasoferta.marca.name}>
                                <img
                                  src={
                                    'https://benfamcanumpics.famnum.now.sh/static/96/' +
                                    marcasoferta.marca.slug +
                                    '-familias-numerosas.png'
                                  }
                                  width={'96'}
                                  height={'96'}
                                  loading={'lazy'}
                                />
                                <br />{' '}
                                <span
                                  dangerouslySetInnerHTML={{ __html: marcasoferta.marca.name }}
                                />
                              </a>
                            </Link>
                          </p>
                    </li>
                  </span>
                );
                return marcas;
              }, [])}
            </ul>
          ) : (
            null
          )}
          {props.marcascaofertas.length >= 1 ? (
            <ul className="gallery national-gallery">
              {props.marcascaofertas.reduce((marcas, marcascaoferta) => {
                if (marcascaoferta.marca == false) {
                  return marcas;
                }
                marcas[marcascaoferta.marca.term_id] = (
                  <span key={marcascaoferta.marca.term_id}>
                    <li className="benefit align-center">
                          <p className="fade-in">
                            <Link
                              href={`/m-o-g-m-ca/${marcascaoferta.marca.term_id}/${marcascaoferta.marca.slug}`}
                            >
                              <a title={'Ver todas la oferta de ' + marcascaoferta.marca.name}>
                                <img
                                  src={
                                    'https://benfamcanumpics.famnum.now.sh/static/96/' +
                                    marcascaoferta.marca.slug +
                                    '-familias-numerosas.png'
                                  }
                                  width={'96'}
                                  height={'96'}
                                  loading={'lazy'}
                                />
                                <br />{' '}
                                <span
                                  dangerouslySetInnerHTML={{
                                    __html: marcascaoferta.marca.name
                                  }}
                                />
                              </a>
                            </Link>
                          </p>
                    </li>
                  </span>
                );
                return marcas;
              }, [])}
            </ul>
          ) : (
            null
          )}
          <ul className="gallery">
            {props.posts.map((post, index) => (
              <li className="benefit" key={index}>
                {post.imagen_destacada_de_la_oferta_general_thumb ? (
                      <p className="fade-in">
                        <Link href={`/p/${post.ID}/${post.slug}`}>
                          <a>
                            <img
                              width={'250'}
                              height={'250'}
                              loading={'lazy'}
                              src={post.imagen_destacada_de_la_oferta_general_thumb.sizes.thumbnail}
                              alt={post.titulo_de_la_oferta_oferta_general}
                            />
                          </a>
                        </Link>
                      </p>
                ) : (
                  null
                )}

                {post.imagen_destacada_de_la_oferta_socios_thumb ? (
                      <p className="fade-in">
                        <Link href={`/p/${post.ID}/${post.slug}`}>
                          <a>
                            <img
                              width={'250'}
                              height={'250'}
                              loading={'lazy'}
                              src={post.imagen_destacada_de_la_oferta_socios_thumb.sizes.thumbnail}
                              alt={post.titulo_de_la_oferta_oferta_socios}
                            />
                            <span className="label alert gallery-label">
                              <small>
                                EXCLUSIVO
                                <br /> SOCIOS
                              </small>
                            </span>
                          </a>
                        </Link>
                      </p>
                ) : (
                  null
                )}

                <p>
                  <Link href={`/p/${post.ID}/${post.slug}`}>
                    <a dangerouslySetInnerHTML={{ __html: post.name }} />
                  </Link>
                  <br />
                  <small>{post.localidad_del_beneficio.name}</small>
                  <br />

                  {post.titulo_de_la_oferta_oferta_general ? (
                    <span className="titulo-oferta">{post.titulo_de_la_oferta_oferta_general}</span>
                  ) : (
                    ''
                  )}

                  {post.titulo_de_la_oferta_oferta_socios ? (
                    <span className="titulo-oferta">{post.titulo_de_la_oferta_oferta_socios}</span>
                  ) : (
                    ''
                  )}
                </p>
              </li>
            ))}
          </ul>
        </section>
      </IntlProvider>
    </section>
    <style jsx>{`
      .national-gallery {
        background: #eeeeee;
        margin-top: 1em !important;
        margin-bottom: 1em !important;
        padding-top: 0.75em !important;
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
          margin: 0 10px;
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

export async function getStaticPaths() {
  const res = await fetch('https://gestorbeneficis.fanoc.org/wp-json/lanauva/v1/beneficios?_embed');
  const localidades = await res.json();

  const paths = localidades.map(
    l => `/l/${l.localidad_del_beneficio.term_id}/${l.localidad_del_beneficio.slug}`
  );

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const id = params.id;

  const res = await fetch(
    `https://gestorbeneficis.fanoc.org/wp-json/lanauva/v1/beneficios?_embed&localidad=${id}`
  );
  const posts = await res.json();

  const res2 = await fetch(
    `https://gestorbeneficis.fanoc.org/wp-json/lanauva/v1/ofertas_grandes_marc?_embed&localidad=${id}`
  );
  const almostuniquemarcas = await res2.json();
  const marcasofertas = almostuniquemarcas.filter(x => x.marca != null);

  const res3 = await fetch(`https://gestorbeneficis.fanoc.org/wp-json/wp/v2/banners?per_page=100`);
  const AlmostBanners = await res3.json();

  const banners = AlmostBanners.filter(
    d =>
      d.acf.fecha_de_finalizaciion_de_la_promocion > todayISO &&
      d.acf.la_publicidad_es_de_ca == true
  );
  const [firstBanner] = banners;
  const banner = [firstBanner];

  const res4 = await fetch(
    `https://gestorbeneficis.fanoc.org/wp-json/lanauva/v1/of_gr_m_ca?_embed&localidad=${id}`
  );
  const almostuniquecamarcas = await res4.json();
  const marcascaofertas = almostuniquecamarcas.filter(x => x.marca != null);

  return { props: { posts, marcasofertas, banner, marcascaofertas } };
}

export default PostsByLocalidad;
