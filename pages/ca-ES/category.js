import fetch from 'isomorphic-unfetch';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Link from 'next/link';
import Observer from 'react-intersection-observer';
import { IntlProvider } from 'react-intl';
import Layout from '../../components/MyLayout.js';

const SelectCity = dynamic(import('../../components/SelectCity'), {
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

const PostsByCategory = props => (
  <Layout ruta={props.ruta}>
    <Head>
      <title>Beneficis Famílies Nombroses - {props.posts[0].categoria_de_la_prestacion.name}</title>
    </Head>
    <nav aria-label="Ets aquí:" role="navigation">
      <ul className="breadcrumbs">
        <li>
          <Link prefetch href="/ca-ES">
            <a>Inici</a>
          </Link>
        </li>
        <li>
          <Link prefetch href="/ca-ES/beneficis">
            <a>Ofertes per a famílies</a>
          </Link>
        </li>
        <li>
          <Link prefetch href="/ca-ES/ofertes-per-sectors">
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
            banner.acf.sector_del_banner.term_id == props.sid ? (
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
                      <img src={banner.acf.baner_movil_320x100.sizes.large} />
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
        />
        <br />
        {props.posts[0].categoria_de_la_prestacion.name}
      </h1>
      <p className="align-center">
        <small>
          <Link
            prefetch
            as={`/ca-ES/m/${props.posts[0].categoria_de_la_prestacion.term_id}/${
              props.posts[0].categoria_de_la_prestacion.slug
            }`}
            href={`/ca-ES/mapa?id=${props.posts[0].categoria_de_la_prestacion.term_id}`}
          >
            <a>
              <img src="/static/icona-mapa-familias-numerosas.png" /> veure al mapa
            </a>
          </Link>
        </small>
      </p>

      <section id="select-city">
        <div className="wrapper">
          <p className="align-center">On vols gaudir del benefici? Selecciona la CA</p>

          <SelectCity
            inputClass="comunidad"
            ruta={props.ruta}
            inputValue="Cercar el millor descompte"
            options={[
              {
                slug: 'catalunya',
                key: 8143,
                value: `/ca-ES/category-comunidad?sid=${
                  props.posts[0].categoria_de_la_prestacion.term_id
                }&comunidad=Catalu&caid=8143`,
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
                <Observer
                  threshold={1}
                  triggerOnce={true}
                  render={() => (
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
                  )}
                />
              </li>
            </ul>
          ) : (
            ''
          )}
          {props.marcasofertas.length >= 1 ? (
            <ul className="gallery national-gallery">
              {props.marcasofertas.reduce((marcas, marcasoferta) => {
                if (marcasoferta.marca == false) {
                  return marcas;
                }
                marcas[marcasoferta.marca.term_id] = (
                  <span key={marcasoferta.marca.term_id}>
                    <li className="benefit align-center">
                      <Link
                        prefetch
                        as={`/ca-ES/m-o-g-m/${marcasoferta.marca.term_id}/${
                          marcasoferta.marca.slug
                        }`}
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
                    </li>
                  </span>
                );
                return marcas;
              }, [])}
            </ul>
          ) : (
            ''
          )}
        </section>
      </IntlProvider>
      <section>
        <hr />
        {props.ofertasonlines.length >= 1 ? (
          <div className="promo">
            <p className="align-center">
              Si s'ho estime més, també por veure les{' '}
              <Link
                prefetch
                as={`/ca-ES/c-o-o/${props.ofertasonlines[0].categoria_de_la_oferta.term_id}/${
                  props.ofertasonlines[0].categoria_de_la_oferta.slug
                }`}
                href={`/ca-ES/category-ofertas-on-line?id=${
                  props.ofertasonlines[0].categoria_de_la_oferta.term_id
                }`}
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
    </section>
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
  </Layout>
);

PostsByCategory.getInitialProps = async function(context) {
  const { sid } = context.query;
  const res = await fetch(
    `https://gestorbeneficis.fanoc.org/wp-json/lanauva/v1/beneficios?_embed&categoria_del_beneficio=${sid}`
  );
  const posts = await res.json();

  const res2 = await fetch(
    `https://gestorbeneficis.fanoc.org/wp-json/lanauva/v1/ofertas_grandes_marc?_embed&categoria_de_la_oferta_grande_marc=${sid}&sim-model=id-marca`
  );
  const marcasofertas = await res2.json();

  const res3 = await fetch(
    `https://gestorbeneficis.fanoc.org/wp-json/lanauva/v1/ofertas_online?categoria_de_la_oferta=${sid}`
  );
  const ofertasonlines = await res3.json();

  const res4 = await fetch(`https://gestorbeneficis.fanoc.org/wp-json/wp/v2/banners_sectoriales`);
  const banners = await res4.json();

  console.log(
    `Posts data fetched. Count: ${posts.length}, ${marcasofertas.length}, ${
      ofertasonlines.length
    }, ${banners.length}`
  );

  return { posts, marcasofertas, ofertasonlines, banners, sid };
};

export default PostsByCategory;
