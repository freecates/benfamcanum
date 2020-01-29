import fetch from 'isomorphic-unfetch';
import Head from 'next/head';
import Link from 'next/link';
import Observer from 'react-intersection-observer';
import { IntlProvider } from 'react-intl';
import Layout from '../../components/MyLayout.js';

const today = Date.now();
const todayISO = new Date(today).toISOString();

const PostsByLocalidad = props => (
  <Layout ruta={props.ruta}>
    <Head>
      <title>Beneficis Famílies Nombroses - {props.posts[0].localidad_del_beneficio.name}</title>
    </Head>
    <nav aria-label="Ets aquí:" role="navigation">
      <ul className="breadcrumbs">
        <li>
          <Link href="/ca-ES">
            <a>Inici</a>
          </Link>
        </li>
        <li>
          <Link href="/ca-ES/beneficis">
            <a>Ofertes per a famílies</a>
          </Link>
        </li>
        <li>
          <Link
            as={`/ca-ES/ca/${props.posts[0].comunidad_autonoma}/${props.marcasofertas[0].comunidad_autonoma.term_id}`}
            href={`/ca-ES/comunidad?comunidad=${props.posts[0].comunidad_autonoma}&caid=${props.marcasofertas[0].comunidad_autonoma.term_id}`}
          >
            <a>{props.posts[0].comunidad_autonoma}</a>
          </Link>
        </li>
        <li>
          <span className="show-for-sr">Actual: </span> Localitat:{' '}
          {props.posts[0].localidad_del_beneficio.name}
        </li>
      </ul>
    </nav>
    <section>
      <div>
        {props.banners.map((banner, index) => (
          <React.Fragment key={index}>
            {banner.acf.fecha_de_finalizaciion_de_la_promocion > todayISO &&
            banner.acf.la_publicidad_es_de_ca == true &&
            banner.acf.comunidad_autonoma.name == props.posts[0].comunidad_autonoma ? (
              <React.Fragment>
                <p className="align-center promo dk">
                  <Link href={banner.acf.url_de_destino_del_banner}>
                    <a target="_blank">
                      <img src={banner.acf.banner_grande_728x90.sizes.large} />
                    </a>
                  </Link>
                </p>
                <p className="align-center promo mb">
                  <Link href={banner.acf.url_de_destino_del_banner}>
                    <a target="_blank">
                      <img src={banner.acf.baner_movil.sizes.large} />
                    </a>
                  </Link>
                </p>
              </React.Fragment>
            ) : (
              ''
            )}
          </React.Fragment>
        ))}
      </div>
      <h1>Beneficis a {props.posts[0].localidad_del_beneficio.name}</h1>
      <p className="align-center">
        <small>
          <Link
            as={`/ca-ES/m-l/${props.posts[0].localidad_del_beneficio.term_id}/${props.posts[0].localidad_del_beneficio.slug}`}
            href={`/ca-ES/mapa-localidad?localidad=${props.posts[0].localidad_del_beneficio.term_id}`}
          >
            <a>
              <img src="/static/icona-mapa-familias-numerosas.png" /> veure al mapa
            </a>
          </Link>
        </small>
      </p>
      <IntlProvider defaultLocale="ca">
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
                      <Observer
                        threshold={1}
                        triggerOnce={true}
                        render={() => (
                          <p className="fade-in">
                            <Link
                              as={`/ca-ES/m-o-g-m/${marcasoferta.marca.term_id}/${marcasoferta.marca.slug}`}
                              href={`/ca-ES/ofertas-de-la-marca?id=${marcasoferta.marca.term_id}`}
                            >
                              <a title={'Veure totes les ofertes de ' + marcasoferta.marca.name}>
                                <img
                                  src={
                                    'https://benfamcanumpics.famnum.now.sh/static/96/' +
                                    marcasoferta.marca.slug +
                                    '-familias-numerosas.png'
                                  }
                                />
                                <br />{' '}
                                <span
                                  dangerouslySetInnerHTML={{
                                    __html: marcasoferta.marca.name
                                  }}
                                />
                              </a>
                            </Link>
                          </p>
                        )}
                      />
                    </li>
                  </span>
                );
                return marcas;
              }, [])}
            </ul>
          ) : (
            ''
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
                      <Observer
                        threshold={1}
                        triggerOnce={true}
                        render={() => (
                          <p className="fade-in">
                            <Link
                              as={`/ca-ES/m-o-g-m-ca/${marcascaoferta.marca.term_id}/${marcascaoferta.marca.slug}`}
                              href={`/ca-ES/ofertas-de-la-marca-ca?id=${marcascaoferta.marca.term_id}`}
                            >
                              <a title={'Veure totes les ofertes de ' + marcascaoferta.marca.name}>
                                <img
                                  src={
                                    'https://benfamcanumpics.famnum.now.sh/static/96/' +
                                    marcascaoferta.marca.slug +
                                    '-familias-numerosas.png'
                                  }
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
                        )}
                      />
                    </li>
                  </span>
                );
                return marcas;
              }, [])}
            </ul>
          ) : (
            ''
          )}
          <ul className="gallery">
            {props.posts.map((post, index) => (
              <li className="benefit" key={index}>
                {post.imagen_destacada_de_la_oferta_general_thumb ? (
                  <Observer
                    threshold={1}
                    triggerOnce={true}
                    render={() => (
                      <p className="fade-in">
                        <Link
                          as={`/ca-ES/p/${post.ID}/${post.slug}`}
                          href={`/ca-ES/post?id=${post.ID}`}
                        >
                          <a>
                            <img
                              width="250"
                              src={post.imagen_destacada_de_la_oferta_general_thumb.sizes.thumbnail}
                              alt={post.titulo_de_la_oferta_oferta_general}
                            />
                          </a>
                        </Link>
                      </p>
                    )}
                  />
                ) : (
                  ''
                )}

                {post.imagen_destacada_de_la_oferta_socios_thumb ? (
                  <Observer
                    threshold={1}
                    triggerOnce={true}
                    render={() => (
                      <p className="fade-in">
                        <Link
                          as={`/ca-ES/p/${post.ID}/${post.slug}`}
                          href={`/ca-ES/post?id=${post.ID}`}
                        >
                          <a>
                            <img
                              width="250"
                              src={post.imagen_destacada_de_la_oferta_socios_thumb.sizes.thumbnail}
                              alt={post.titulo_de_la_oferta_oferta_socios}
                            />
                            <span className="label alert gallery-label">
                              <small>
                                EXCLUSIU <br /> SOCIS
                              </small>
                            </span>
                          </a>
                        </Link>
                      </p>
                    )}
                  />
                ) : (
                  ''
                )}

                <p>
                  <Link as={`/ca-ES/p/${post.ID}/${post.slug}`} href={`/ca-ES/post?id=${post.ID}`}>
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

PostsByLocalidad.getInitialProps = async function(context) {
  const { localidad } = context.query;
  const res = await fetch(
    `https://gestorbeneficis.fanoc.org/wp-json/lanauva/v1/beneficios?_embed&localidad=${localidad}`
  );
  const posts = await res.json();

  const res2 = await fetch(
    `https://gestorbeneficis.fanoc.org/wp-json/lanauva/v1/ofertas_grandes_marc?_embed&localidad=${localidad}`
  );
  const marcasofertas = await res2.json();

  const res3 = await fetch(`https://gestorbeneficis.fanoc.org/wp-json/wp/v2/banners`);
  const banners = await res3.json();

  const res4 = await fetch(
    `https://gestorbeneficis.fanoc.org/wp-json/lanauva/v1/of_gr_m_ca?_embed&localidad=${localidad}`
  );
  const marcascaofertas = await res4.json();

  console.log(
    `Posts data fetched. Count: ${posts.length}, ${marcasofertas.length}, ${banners.length}, ${marcascaofertas.length}`
  );

  return { posts, marcasofertas, banners, marcascaofertas };
};

export default PostsByLocalidad;