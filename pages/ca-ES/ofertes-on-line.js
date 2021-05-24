import fetch from 'isomorphic-unfetch';
import Head from 'next/head';
import Link from 'next/link';
import { IntlProvider } from 'react-intl';
import Layout from '@components/MyLayout.js';
import Banners from '@components/banners/index.js';

const today = Date.now();
const todayISO = new Date(today).toISOString();

const OfertasOnLine = props => {
  return (
    <Layout>
      <Head>
        <title>Ofertes On Line per a famílies nombroses</title>
      </Head>
      <IntlProvider defaultLocale="ca">
        <main>
          <Banners data={props.banners} />
          <h1>Ofertes On Line</h1>
          <section>
            <h2 className="align-center">Selecciona la categoria del teu interés</h2>
            <ul className="gallery">
              {props.ofertasonlines.reduce((categories, ofertasonline) => {
                if (
                  ofertasonline.categoria_de_la_oferta == false ||
                  ofertasonline.categoria_de_la_oferta == null
                ) {
                  return categories;
                }
                categories[ofertasonline.categoria_de_la_oferta.term_id] = (
                  <span key={ofertasonline.categoria_de_la_oferta.term_id}>
                    <li className="item align-center">
                      <Link
                        href={`/ca-ES/c-o-o/${ofertasonline.categoria_de_la_oferta.term_id}/${ofertasonline.categoria_de_la_oferta.slug}`}
                      >
                        <a
                          title={
                            'Clica aquí per veure totes les ofertes online de ' +
                            ofertasonline.categoria_de_la_oferta.name
                          }
                        >
                          <img
                            src={
                              'https://benfamcanumpics-famnum.vercel.app/static/96/' +
                              ofertasonline.categoria_de_la_oferta.slug +
                              '-familias-numerosas.png'
                            }
                            width={'96'}
                            height={'96'}
                            loading={'lazy'}
                          />
                          <br />
                          <span
                            dangerouslySetInnerHTML={{
                              __html: ofertasonline.categoria_de_la_oferta.name
                            }}
                          />
                        </a>
                      </Link>
                    </li>
                  </span>
                );
                return categories;
              }, [])}
            </ul>
          </section>
        </main>
      </IntlProvider>
      <style jsx>{`
        h1 {
          color: #cb5599;
          text-align: center;
        }
        .align-center {
          text-align: center;
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
        a.blue {
          color: #00add9;
          text-decoration: underline;
        }
        p {
          margin-top: 2rem;
        }
        .item {
          width: 150px;
        }
        @media screen and (min-width: 320px) {
          .gallery {
            width: 100%;
          }
          .item {
            margin: 5px;
          }
        }
        @media screen and (max-width: 375px) {
          .item {
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
            max-width: 70%;
            width: 500px;
          }
          .item {
            width: 150px;
          }
        }
      `}</style>
    </Layout>
  );
};

export async function getStaticProps() {
  const res = await fetch(
    'https://gestorbeneficis.fanoc.org/wp-json/lanauva/v1/ofertas_online?sim-model=categoria'
  );
  const ofertasonlines = await res.json();

  const res2 = await fetch(`https://gestorbeneficis.fanoc.org/wp-json/wp/v2/banners?per_page=100`);
  const AlmostBanners = await res2.json();

  const banners = AlmostBanners.filter(
    d =>
      d.acf.fecha_de_finalizaciion_de_la_promocion > todayISO &&
      d.acf.la_publicidad_es_de_ca == true &&
      d.acf.seccion_principal == '3'
  );

  return { props: { ofertasonlines, banners }, revalidate: 1 };
}

export default OfertasOnLine;
