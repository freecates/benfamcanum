import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Link from 'next/link';
import { IntlProvider } from 'react-intl';
import Layout from '../../../../../components/MyLayout.js';
import Gallery from '../../../../../components/Gallery.js';
import BrandsGallery from '../../../../../components/BrandsGallery.js';
import Banners from '../../../../../components/Banners';
import Fallback from '../../../../../components/Fallback.js';
import Custom404 from '../../../../404';

const today = Date.now();
const todayISO = new Date(today).toISOString();

const SelectCity = dynamic(import('../../../../../components/SelectCity'), {
  loading: () => (
    <div>
      <p style={{ textAlign: 'center' }}>
        <img src="/static/rolling.gif" />
      </p>
    </div>
  )
});

const PostsByCategoryComunidad = props => {
  const { isFallback } = useRouter();
  if (!isFallback && !props.posts) {
    return <Custom404 />;
  }
  if (isFallback) {
    return <Fallback breadCrumb={'Beneficios'} />;
  }
  if (props.post === '404') {
    return <Fallback breadCrumb={'Beneficios'} notFound />;
  }
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
            <Banners data={props.banners} />
            <h1>
              <img
                src={
                  'https://benfamcanumpics.famnum.now.sh/static/96/' +
                  props.posts[0].categoria_de_la_prestacion.slug +
                  '-familias-numerosas.png'
                }
                width="96"
                height="96"
                loading={'lazy'}
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
                          ? `/c-l/${post.categoria_de_la_prestacion.term_id}/${post.categoria_de_la_prestacion.slug}/${post.localidad_del_beneficio.term_id}/${post.localidad_del_beneficio.slug}`
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
                              loading={'lazy'}
                            />
                          </a>
                        </Link>
                      </p>
                    </li>
                    <li>
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
                              loading={'lazy'}
                            />
                          </a>
                        </Link>
                      </p>
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

export async function getStaticPaths() {
  const slug2 = 'cataluna';
  const id2 = '8143';

  const paths = [
    { params: { id: '4', slug: 'alimentacion', slug2: slug2, id2: id2 } },
    { params: { id: '5', slug: 'alojamiento', slug2: slug2, id2: id2 } },
    { params: { id: '7', slug: 'banca', slug2: slug2, id2: id2 } },
    { params: { id: '17', slug: 'carburantes', slug2: slug2, id2: id2 } },
    { params: { id: '2', slug: 'educacion', slug2: slug2, id2: id2 } },
    { params: { id: '3', slug: 'hogar', slug2: slug2, id2: id2 } },
    { params: { id: '16', slug: 'idiomas', slug2: slug2, id2: id2 } },
    { params: { id: '26', slug: 'libros', slug2: slug2, id2: id2 } },
    { params: { id: '8', slug: 'moda', slug2: slug2, id2: id2 } },
    { params: { id: '9', slug: 'ocio-y-turismo', slug2: slug2, id2: id2 } },
    { params: { id: '14', slug: 'otros', slug2: slug2, id2: id2 } },
    { params: { id: '10', slug: 'salud', slug2: slug2, id2: id2 } },
    { params: { id: '6', slug: 'seguros', slug2: slug2, id2: id2 } },
    { params: { id: '11', slug: 'servicios', slug2: slug2, id2: id2 } },
    { params: { id: '12', slug: 'vehiculos', slug2: slug2, id2: id2 } }
  ];

  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  const sid = params.id;
  const comunidad = params.slug2;
  const caid = params.id2;

  const res = await fetch(
    `https://gestorbeneficis.fanoc.org/wp-json/lanauva/v1/beneficios?_embed&categoria_del_beneficio=${sid}&comunidad=${comunidad}`
  );
  const posts = await res.json();

  const res2 = await fetch(
    `https://gestorbeneficis.fanoc.org/wp-json/lanauva/v1/ofertas_grandes_marc?_embed&categoria_de_la_oferta_grande_marc=${sid}&comunidad=${caid}&sim-model=id-marca`
  );
  const almostuniquemarcas = await res2.json();
  const marcasofertas = almostuniquemarcas.filter(x => x.marca != null && x.marca != '');

  const res3 = await fetch(
    `https://gestorbeneficis.fanoc.org/wp-json/lanauva/v1/of_gr_m_ca?_embed&categoria_de_la_of_gr_m_ca=${sid}&comunidad=${caid}&sim-model=id-marca-comunidad`
  );
  const almostuniquecamarcas = await res3.json();
  const marcascaofertas = almostuniquecamarcas.filter(x => x.marca != null && x.marca != '');

  const res4 = await fetch(
    `https://gestorbeneficis.fanoc.org/wp-json/wp/v2/banners_sectoriales?per_page=100`
  );
  const AlmostBanners = await res4.json();

  const banners = AlmostBanners.filter(
    x =>
      x.acf.fecha_de_finalizaciion_de_la_promocion > todayISO &&
      x.acf.la_publicidad_es_de_ca == true &&
      x.acf.comunidad_autonoma.name == posts[0].comunidad_autonoma &&
      x.acf.sector_del_banner.term_id == sid
  );

  const res5 = await fetch(
    `https://gestorbeneficis.fanoc.org/wp-json/lanauva/v1/ofertas_online?categoria_de_la_oferta=${sid}`
  );
  const ofertasonlines = await res5.json();

  const uniquemarcas = [
    ...new Set(marcasofertas.map(({ marca }) => (marca != null ? marca.name : '')))
  ];
  const uniquecamarcas = [...new Set(marcascaofertas.map(({ marca }) => marca && marca.name))];

  if (!posts.data) {
    return {
      props: {
        posts,
        marcasofertas,
        marcascaofertas,
        uniquemarcas,
        uniquecamarcas,
        banners,
        caid,
        sid,
        ofertasonlines
      },
      revalidate: 1
    };
  } else {
    return { props: { posts: '404' } };
  }
}

export default PostsByCategoryComunidad;
