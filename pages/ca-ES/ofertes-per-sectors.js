import fetch from 'isomorphic-unfetch';
import Head from 'next/head';
import Link from 'next/link';
import { IntlProvider } from 'react-intl';
import Layout from '@components/MyLayout.js';
import Banners from '@components/banners/index.js';

const today = Date.now();
const todayISO = new Date(today).toISOString();

const OfertasPorSectores = props => {
  return (
    <Layout>
      <Head>
        <title>Ofertes per a famílies nombroses per sectors</title>
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
              <a>Ofertes per a famílies nombroses</a>
            </Link>
          </li>
          <li>
            <span className="show-for-sr">Actual: </span> Sectors
          </li>
        </ul>
      </nav>
      <IntlProvider defaultLocale="ca">
        <main>
          <section>
            <Banners data={props.banners} />
            <ul className="gallery">
              {props.ofertasporsectores.map((ofertasporsectore, index) => (
                <li className="item align-center" key={index}>
                  <Link
                    href={`/ca-ES/c-ca/${ofertasporsectore.term_id}/${ofertasporsectore.slug}/cataluna/8143`}
                  >
                    <a title={'Clica aquí para ver todas las ofertas de ' + ofertasporsectore.name}>
                      <img
                        src={
                          'https://benfamcanumpics-famnum.vercel.app/static/96/' +
                          ofertasporsectore.slug +
                          '-familias-numerosas.png'
                        }
                        width="96"
                        height={'96'}
                        loading={'lazy'}
                      />
                      <br />
                      <span
                        dangerouslySetInnerHTML={{
                          __html: ofertasporsectore.name
                        }}
                      />
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </main>
      </IntlProvider>
      <style jsx>{`
        a,
        li {
          color: #000000 !important;
        }
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
    'https://gestorbeneficis.fanoc.org/wp-json/lanauva/v1/categoria_del_beneficio'
  );
  const ofertasporsectores = await res.json();

  const res2 = await fetch(`https://gestorbeneficis.fanoc.org/wp-json/wp/v2/banners?per_page=100`);
  const AlmostBanners = await res2.json();

  const banners = AlmostBanners.filter(
    d =>
      d.acf.fecha_de_finalizaciion_de_la_promocion > todayISO &&
      d.acf.la_publicidad_es_de_ca == true &&
      d.acf.seccion_principal == '1'
  );

  return { props: { ofertasporsectores, banners }, revalidate: 1 };
}

export default OfertasPorSectores;
