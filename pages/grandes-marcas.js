import fetch from 'isomorphic-unfetch';
import Head from 'next/head';
import Link from 'next/link';
import { IntlProvider } from 'react-intl';
import Layout from '../components/MyLayout.js';

const GRandesMarcas = props => (
  <Layout ruta={props.ruta}>
    <Head>
      <title>Ofertas grandes marcas - Familias Numerosas</title>
    </Head>
    <IntlProvider defaultLocale="ca">
      <main>
        <h1>Ofertas grandes marcas</h1>
        <section>
          <ul className="gallery">
            {props.grandesmarcas.map((grandesmarca, index) => (
              <li className="item align-center" key={index}>
                <Link
                  
                  as={`/m-o-g-m/${grandesmarca.id}/${grandesmarca.slug}`}
                  href={`/ofertas-de-la-marca?id=${grandesmarca.id}`}
                >
                  <a title={'Clica aquí para ver las ofertas de ' + grandesmarca.name}>
                    <img
                      src={
                        'https://benfamcanumpics.famnum.now.sh/static/96/' +
                        grandesmarca.slug +
                        '-familias-numerosas.png'
                      }
                    />
                    <br />
                    <span dangerouslySetInnerHTML={{ __html: grandesmarca.name }} />
                  </a>
                </Link>
              </li>
            ))}
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
      @media screen and (min-width: 1024px) {
        .gallery {
          max-width: 83%;
          width: 1024px;
        }
      }
      @media screen and (min-width: 1360px) {
        .gallery {
          max-width: 90%;
        }
      }
    `}</style>
  </Layout>
);

export async function getStaticProps() {
  const res = await fetch('https://gestorbeneficis.fanoc.org/wp-json/lanauva/v1/marca');
  const grandesmarcas = await res.json();

  console.log(`Ofertas On Line data fetched. Count: ${grandesmarcas.length}`);
  return {
    props: { grandesmarcas }
  };
}

export default GRandesMarcas;
