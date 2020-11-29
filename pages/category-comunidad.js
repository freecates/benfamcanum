import fetch from 'isomorphic-unfetch';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Link from 'next/link';
import Observer from 'react-intersection-observer';
import { IntlProvider } from 'react-intl';
import Layout from '../components/MyLayout.js';
import Gallery from '../components/Gallery.js';
import BrandsGallery from '../components/BrandsGallery.js';

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

const PostsByCategoryComunidad = props => {
  return (
    <section>
      {props.posts.length == 0 ? (
        <Layout>
          <Head>
            <title>Beneficios - Ofertas por sectores - Comunidad</title>
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
                <Link href="/ofertas-por-sectores">
                  <a>Ofertas por sectores</a>
                </Link>
              </li>
              <li>
                <span className="show-for-sr">Actual: </span> Comunidad
              </li>
            </ul>
          </nav>
          <section>
            <h1>
              Actualmente no existen ofertas con empresas locales de esta Comunidad para este sector
            </h1>
            <p className="align-center">
              Por favor, escoge{' '}
              <Link href="/ofertas-por-sectores">
                <a>otro sector</a>
              </Link>
              .
            </p>
            {props.uniquemarcas.length >= 1 ? (
              <React.Fragment>
                <h3 className="align-center">
                  Si lo prefieres puedes consultar las ofertas nacionales de{' '}
                  <strong>{props.marcasofertas[0].categoria_del_beneficio.name}</strong> en{' '}
                  <strong>{props.marcasofertas[0].comunidad_autonoma.name}</strong>.
                </h3>
                <BrandsGallery data={props.marcasofertas} />
              </React.Fragment>
            ) : null}
          </section>
          <style jsx>{`
            .breadcrumbs {
              margin-bottom: 1em;
            }
            .national-gallery {
              background: #eeeeee;
              margin-top: 1em !important;
              padding-top: 0.75em !important;
            }
            .national-gallery:last-child {
              margin-bottom: 1em !important;
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
          `}</style>
        </Layout>
      ) : (
        <Layout>
          <Head>
            <title>
              Beneficios - {props.posts[0].categoria_de_la_prestacion.name} -{' '}
              {props.posts[0].comunidad_autonoma}
            </title>
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
                <Link href="/ofertas-por-sectores">
                  <a>Ofertas por sectores</a>
                </Link>
              </li>
              <li>
                <span className="show-for-sr">Actual: </span>{' '}
                {props.posts[0].categoria_de_la_prestacion.name} -{' '}
                {props.posts[0].comunidad_autonoma}
              </li>
            </ul>
          </nav>
          <section>
            <div>
              {props.banners.map((banner, index) => (
                <React.Fragment key={index}>
                  {banner.acf.fecha_de_finalizaciion_de_la_promocion > todayISO &&
                  banner.acf.la_publicidad_es_de_ca == true &&
                  banner.acf.sector_del_banner.term_id == props.sid &&
                  banner.comunidad == props.caid ? (
                    <React.Fragment>
                      <p className="align-center promo dk">
                        <a href={banner.acf.url_de_destino_del_banner} target="_blank">
                          <img
                            src={banner.acf.banner_grande_728x90.sizes.large}
                            width={728}
                            height={90}
                            loading={'lazy'}
                          />
                        </a>
                      </p>
                      <p className="align-center promo mb">
                        <a href={banner.acf.url_de_destino_del_banner} target="_blank">
                          <img
                            src={banner.acf.baner_movil_320x100.sizes.large}
                            width={320}
                            height={100}
                            loading={'lazy'}
                          />
                        </a>
                      </p>
                    </React.Fragment>
                  ) : null}
                </React.Fragment>
              ))}
            </div>
            <h1>
              <img
                src={
                  'https://benfamcanumpics.famnum.now.sh/static/96/' +
                  props.posts[0].categoria_de_la_prestacion.slug +
                  '-familias-numerosas.png'
                }
                width="96"
                height="96"
              />
              <br />
              Beneficios de {props.posts[0].categoria_de_la_prestacion.name} en{' '}
              {props.posts[0].comunidad_autonoma}
            </h1>

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
                        value: post.categoria_de_la_prestacion
                          ? `/category-localidad?sid=${post.categoria_de_la_prestacion.term_id}&localidad=${post.localidad_del_beneficio.term_id}`
                          : '',
                        label: post.categoria_de_la_prestacion
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
                {props.posts[0].categoria_de_la_prestacion.term_id === 6 ? (
                  <ul className="gallery national-gallery">
                    <li>
                      <Observer
                        threshold={1}
                        triggerOnce={true}
                        render={() => (
                          <p className="fade-in align-center">
                            <Link href="https://www.colectivosubica.com/familiamassegura/">
                              <a
                                title="Federación Española Familias Numerosas / Ubica, correduría de seguros"
                                target="_blank"
                              >
                                <img
                                  className="fade-in"
                                  src="/static/01-seguros-nacionales.png"
                                  alt="Logos marcas de seguros"
                                />
                              </a>
                            </Link>
                          </p>
                        )}
                      />
                    </li>
                    <li>
                      <Observer
                        threshold={1}
                        triggerOnce={true}
                        render={() => (
                          <p className="fade-in align-center">
                            <Link href="https://www.colectivosubica.com/familiamassegura/">
                              <a
                                title="Federación Española Familias Numerosas / Ubica, correduría de seguros"
                                target="_blank"
                              >
                                <img
                                  className="fade-in"
                                  src="/static/02-seguros-nacionales.png"
                                  alt="Logos marcas de seguros"
                                />
                              </a>
                            </Link>
                          </p>
                        )}
                      />
                    </li>
                  </ul>
                ) : null}
                {props.uniquemarcas.length >= 1 ? (
                  <BrandsGallery data={props.marcasofertas} />
                ) : null}
                {props.marcascaofertas.length >= 1 ? (
                  <BrandsGallery data={props.marcascaofertas} type={'ca'} />
                ) : null}

                <section>
                  <hr />
                  {props.ofertasonlines.length >= 1 ? (
                    <div className="promo">
                      <p className="align-center">
                        Si lo prefiere, también puede ver las{' '}
                        <Link
                          href={`/c-o-o/${props.ofertasonlines[0].categoria_de_la_oferta.term_id}/${props.ofertasonlines[0].categoria_de_la_oferta.slug}`}
                        >
                          <a
                            className="label alert file-label"
                            title={
                              'Clica aquí para ver todas las ofertas online de ' +
                              props.ofertasonlines[0].categoria_de_la_oferta.name
                            }
                          >
                            ofertas on line de {props.ofertasonlines[0].categoria_de_la_oferta.name}
                          </a>
                        </Link>
                      </p>
                    </div>
                  ) : null}
                </section>

                <p className="align-center clear">
                  ... O accede directamente a cualquiera de las fichas
                </p>

                <Gallery data={props.posts} />
              </section>
            </IntlProvider>
          </section>
          {props.uniquemarcas.length >= 2 && props.uniquecamarcas.length >= 1 ? (
            <style jsx>{`
              .clear {
                clear: both;
              }
              .national-gallery {
                background: #eeeeee;
                margin-top: 1em !important;
                margin-bottom: 1em !important;
                padding-top: 0.75em !important;
              }
              .file-label {
                background: #f18903 !important;
                color: #ffffff !important;
                font-weight: 400;
                font-size: 0.9rem;
                white-space: normal;
              }
              .file-label:hover {
                background: #b66502 !important;
                text-decoration: none;
                cursor: pointer;
              }
              @media screen and (max-width: 1023px) {
                .national-gallery {
                  margin-top: 1em !important;
                  margin-bottom: 0 !important;
                }
                section ul.national-gallery:nth-child(2) {
                  margin-bottom: 1em !important;
                  margin-top: 0 !important;
                }
              }
              .breadcrumbs {
                margin-bottom: 1em;
              }
              h1,
              .align-center {
                text-align: center;
              }
              .dk {
                display: none;
              }
              .promo {
                margin-top: 1em;
              }
              h1 {
                color: #cb5599;
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
                .national-gallery.gallery {
                  width: 50%;
                  float: left;
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
            `}</style>
          ) : (
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
              .dk {
                display: none;
              }
              .promo {
                margin-top: 1em;
              }
              h1,
              .align-center {
                text-align: center;
              }
              h1 {
                color: #cb5599;
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
              .file-label {
                background: #f18903 !important;
                color: #ffffff !important;
                font-weight: 400;
                font-size: 0.9rem;
                white-space: normal;
              }
              .file-label:hover {
                background: #b66502 !important;
                text-decoration: none;
                cursor: pointer;
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
            `}</style>
          )}
        </Layout>
      )}
    </section>
  );
};

PostsByCategoryComunidad.getInitialProps = async function(context) {
  const { sid } = context.query;
  const { comunidad } = context.query;
  const comunidadEncoded = encodeURI(comunidad);
  const { caid } = context.query;
  const res = await fetch(
    `https://gestorbeneficis.fanoc.org/wp-json/lanauva/v1/beneficios?_embed&categoria_del_beneficio=${sid}&comunidad=${comunidadEncoded}`
  );
  const posts = await res.json();
  const res2 = await fetch(
    `https://gestorbeneficis.fanoc.org/wp-json/lanauva/v1/ofertas_grandes_marc?_embed&categoria_de_la_oferta_grande_marc=${sid}&comunidad=${caid}&sim-model=id-marca`
  );
  const almostuniquemarcas = await res2.json();
  const marcasofertas = almostuniquemarcas.filter(x => x.marca != null);

  const res3 = await fetch(
    `https://gestorbeneficis.fanoc.org/wp-json/lanauva/v1/of_gr_m_ca?_embed&categoria_de_la_of_gr_m_ca=${sid}&comunidad=${caid}&sim-model=id-marca-comunidad`
  );

  const almostuniquecamarcas = await res3.json();
  const marcascaofertas = almostuniquecamarcas.filter(x => x.marca != null);

  const res4 = await fetch(
    `https://gestorbeneficis.fanoc.org/wp-json/wp/v2/banners_sectoriales?per_page=100`
  );
  const banners = await res4.json();

  const res5 = await fetch(
    `https://gestorbeneficis.fanoc.org/wp-json/lanauva/v1/ofertas_online?categoria_de_la_oferta=${sid}`
  );
  const ofertasonlines = await res5.json();

  const uniquemarcasnotfiltered = [
    ...new Set(marcasofertas.map(({ marca }) => (marca != null ? marca.name : '')))
  ];
  const uniquecamarcasnotfiltered = [
    ...new Set(marcascaofertas.map(({ marca }) => marca && marca.name))
  ];

  const uniquemarcas = uniquemarcasnotfiltered.filter(Boolean);
  const uniquecamarcas = uniquecamarcasnotfiltered.filter(Boolean);

  return {
    posts,
    marcasofertas,
    marcascaofertas,
    uniquemarcas,
    uniquecamarcas,
    banners,
    caid,
    sid,
    ofertasonlines
  };
};

export default PostsByCategoryComunidad;
