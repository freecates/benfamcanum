import fetch from 'isomorphic-unfetch';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Link from 'next/link';
import { IntlProvider } from 'react-intl';
import Layout from '../../components/MyLayout.js';
import Gallery from '../../components/Gallery.js';
import BrandsGallery from '../../components/BrandsGallery.js';
import Banners from '../../components/Banners';

const today = Date.now();
const todayISO = new Date(today).toISOString();

const SelectCity = dynamic(import('../../components/SelectCity'), {
  loading: () => (
    <div>
      <p style={{ textAlign: 'center' }}>
        <img src="/static/rolling.gif" />
      </p>
    </div>
  )
});

const PostsByCategoryComunidad = props => {
  return (
    <section>
      {props.posts.length == 0 ? (
        <Layout>
          <Head>
            <title>Beneficis - Ofertes per sectors - Comunitat</title>
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
                <Link href="/ca-ES/ofertes-per-sectors">
                  <a>Ofertes per sectors</a>
                </Link>
              </li>
              <li>
                <span className="show-for-sr">Actual: </span> Comunitat
              </li>
            </ul>
          </nav>
          <section>
            <h1>
              Actualment no hi ha ofertes amb empreses locals d'aquesta Comunitat per a aquest
              sector
            </h1>
            <p className="align-center">
              Si us plau, escull{' '}
              <Link href="/ca-ES/ofertes-per-sectors">
                <a>un altre sector</a>
              </Link>
              .
            </p>
            {props.uniquemarcas.length >= 1 ? (
              <React.Fragment>
                <h3 className="align-center">
                  Si t'ho estimes més pots consulta les ofertes estatals de{' '}
                  <strong>{props.marcasofertas[0].categoria_del_beneficio.name}</strong> a{' '}
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
              Beneficis - {props.posts[0].categoria_de_la_prestacion.name} -{' '}
              {props.posts[0].comunidad_autonoma}
            </title>
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
                <Link href="/ca-ES/ofertes-per-sectors">
                  <a>Ofertes per sectors</a>
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
                width={'96'}
                height={'96'}
                loading={'lazy'}
              />
              <br />
              Beneficis de {props.posts[0].categoria_de_la_prestacion.name} a{' '}
              {props.posts[0].comunidad_autonoma}
            </h1>

            <section id="select-city">
              <div className="wrapper">
                <p className="align-center">On vols gaudir del benefici? Selecciona la localitat</p>

                <SelectCity
                  inputClass="city"
                  inputValue="Cercar el millor descompte"
                  options={props.posts
                    .reduce((ciutats, post) => {
                      if (post.localidad_del_beneficio == false) {
                        return ciutats;
                      }
                      ciutats[post.localidad_del_beneficio.term_id] = {
                        slug: post.localidad_del_beneficio.slug,
                        key: post.localidad_del_beneficio.term_id,
                        value: post.categoria_de_la_prestacion
                          ? `/ca-ES/category-localidad?sid=${post.categoria_de_la_prestacion.term_id}&localidad=${post.localidad_del_beneficio.term_id}`
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

            <IntlProvider defaultLocale="ca">
              <section>
                {props.posts[0].categoria_de_la_prestacion.term_id === 6 ? (
                  <ul className="gallery national-gallery">
                    <li>
                      <p className="fade-in align-center">
                        <Link href="https://www.colectivosubica.com/familiamassegura/">
                          <a
                            title="Federación Española Famílies Nombroses / Ubica, correduría de seguros"
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
                    </li>
                    <li>
                      <p className="fade-in align-center">
                        <Link href="https://www.colectivosubica.com/familiamassegura/">
                          <a
                            title="Federación Española Famílies Nombroses / Ubica, correduría de seguros"
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
                        Si s'ho estima més, també pot veure les{' '}
                        <Link
                          href={`/ca-ES/c-o-o/${props.ofertasonlines[0].categoria_de_la_oferta.term_id}/${props.ofertasonlines[0].categoria_de_la_oferta.slug}`}
                        >
                          <a
                            className="label alert file-label"
                            title={
                              'Clica aquí per veure totes les ofertes online de ' +
                              props.ofertasonlines[0].categoria_de_la_oferta.name
                            }
                          >
                            ofertes on line de {props.ofertasonlines[0].categoria_de_la_oferta.name}
                          </a>
                        </Link>
                      </p>
                    </div>
                  ) : (
                    ''
                  )}
                </section>

                <p className="align-center clear">
                  ... O accedeix directament a qualsevol de les fitxes
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
