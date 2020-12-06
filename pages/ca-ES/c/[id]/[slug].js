import fetch from 'isomorphic-unfetch';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Link from 'next/link';
import { IntlProvider } from 'react-intl';
import Layout from '../../../../components/MyLayout.js';
import BrandsGallery from '../../../../components/BrandsGallery';

const SelectCity = dynamic(import('../../../../components/SelectCity'), {
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

const PostsByCategory = props => {
  return (
    <Layout>
      <Head>
        <title>
          Beneficis Famílies Nombroses - {props.posts[0].categoria_de_la_prestacion.name}
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
            {props.posts[0].categoria_de_la_prestacion.name}
          </li>
        </ul>
      </nav>
      <section>
        <div>
          {props.banners.map((banner, index) => (
            <React.Fragment key={index}>
              {banner.acf.fecha_de_finalizaciion_de_la_promocion > todayISO &&
              banner.acf.la_publicidad_es_de_ca != true &&
              banner.acf.sector_del_banner.term_id == props.id ? (
                <React.Fragment>
                  <p className="align-center promo dk">
                    <Link href={banner.acf.url_de_destino_del_banner}>
                      <a target="_blank">
                        <img
                          src={banner.acf.banner_grande_728x90.sizes.large}
                          width={'728'}
                          height={'90'}
                          loading={'lazy'}
                        />
                      </a>
                    </Link>
                  </p>
                  <p className="align-center promo mb">
                    <Link href={banner.acf.url_de_destino_del_banner}>
                      <a target="_blank">
                        <img
                          src={banner.acf.baner_movil_320x100.sizes.large}
                          width={'320'}
                          height={'100'}
                          loading={'lazy'}
                        />
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
        <h1>
          <img
            src={
              'https://benfamcanumpics.famnum.now.sh/static/96/' +
              props.posts[0].categoria_de_la_prestacion.slug +
              '-familias-numerosas.png'
            }
            width={'96'}
            height={'96'}
          />
          <br />
          {props.posts[0].categoria_de_la_prestacion.name}
        </h1>
        <p className="align-center">
          <small>
            <Link
              href={`/ca-ES/m/${props.posts[0].categoria_de_la_prestacion.term_id}/${props.posts[0].categoria_de_la_prestacion.slug}`}
            >
              <a>
                <img
                  src="/static/icona-mapa-familias-numerosas.png"
                  width={'30'}
                  height={'33'}
                  loading={'lazy'}
                />{' '}
                veure al mapa
              </a>
            </Link>
          </small>
        </p>

        <section id="select-city">
          <div className="wrapper">
            <p className="align-center">On vols gaudir del benefici? Selecciona la CA</p>

            <SelectCity
              inputClass="comunidad"
              inputValue="Cercar el millor descompte"
              options={[
                {
                  slug: 'catalunya',
                  key: 8143,
                  value: `/ca-ES/${props.posts[0].categoria_de_la_prestacion.term_id}/Catalu/8143`,
                  label: 'Catalunya'
                }
              ]}
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
            ) : (
              ''
            )}
            {props.uniquemarcas.length >= 1 ? (
              <BrandsGallery data={props.marcasofertas} type={'ca'} />
            ) : null}
          </section>
        </IntlProvider>
        <section>
          <hr />
          {props.ofertasonlines.length >= 1 ? (
            <div className="promo">
              <p className="align-center">
                Si s'ho estime més, també pot veure les{' '}
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
          ) : null}
        </section>
      </section>
      {props.posts.length >= 2 && (
        <style jsx>{`
          .national-gallery {
            background: #eeeeee;
            margin-top: 1em !important;
            margin-bottom: 1em !important;
            padding-top: 0.75em !important;
          }
          .dk {
            display: none;
          }
          @media screen and (min-width: 768px) {
            .wrapper {
              width: 80%;
              margin: 0 auto;
            }
            .dk {
              display: block;
            }
            .mb {
              display: none;
            }
          }
          @media screen and (min-width: 1024px) {
            .wrapper {
              width: 50%;
            }
          }
          .promo {
            margin-top: 1em;
          }
          .file-label {
            background: #f18903 !important;
            color: #ffffff;
            font-weight: 400;
            font-size: 0.9rem;
            white-space: normal;
          }
          .file-label:hover {
            background: #960025 !important;
            text-decoration: none;
            cursor: pointer;
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
      )}
    </Layout>
  );
};

export async function getStaticPaths() {
  const res = await fetch(
    'https://gestorbeneficis.fanoc.org/wp-json/lanauva/v1/categoria_del_beneficio'
  );
  const categories = await res.json();

  const paths = categories.map(c => `/ca-ES/c/${c.term_id}/${c.slug}`);

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const id = params.id;

  const res = await fetch(
    `https://gestorbeneficis.fanoc.org/wp-json/lanauva/v1/beneficios?_embed&categoria_del_beneficio=${id}`
  );
  const posts = await res.json();

  const res2 = await fetch(
    `https://gestorbeneficis.fanoc.org/wp-json/lanauva/v1/ofertas_grandes_marc?_embed&categoria_de_la_oferta_grande_marc=${id}&sim-model=id-marca`
  );
  const almostuniquemarcas = await res2.json();
  const marcasofertas = almostuniquemarcas.filter(x => x.marca !== null);

  const res3 = await fetch(
    `https://gestorbeneficis.fanoc.org/wp-json/lanauva/v1/ofertas_online?categoria_de_la_oferta=${id}`
  );
  const ofertasonlines = await res3.json();

  const res4 = await fetch(
    `https://gestorbeneficis.fanoc.org/wp-json/wp/v2/banners_sectoriales?per_page=100`
  );
  const banners = await res4.json();

  const uniquemarcas = [
    ...new Set(
      marcasofertas.map(({ marca }) =>
        marca !== null && marca.name !== undefined ? marca.name : ''
      )
    )
  ];

  return { props: { posts, marcasofertas, uniquemarcas, ofertasonlines, banners, id } };
}

export default PostsByCategory;
