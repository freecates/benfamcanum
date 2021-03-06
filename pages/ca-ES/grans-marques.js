import fetch from 'isomorphic-unfetch';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { IntlProvider } from 'react-intl';
import Layout from '@components/MyLayout.js';

const GRandesMarcas = props => {
  return (
    <Layout>
      <Head>
        <title>Ofertes grans marques - Famílies Nombroses</title>
      </Head>
      <IntlProvider defaultLocale="ca">
        <main>
          <h1>Ofertes grans marques</h1>
          <section>
            <ul className="gallery">
              {props.marcas.map((g, index) => (
                <li className="item align-center" key={index}>
                  <Link href={`/ca-ES/m-o-g-m/${g.id}/${g.slug}`}>
                    <a title={'Clica aquí per veure les ofertes de ' + g.name}>
                      {props.marcasAcf && props.marcasAcf.length ? (
                        props.marcasAcf
                          .filter(x => x.id === g.term_id)
                          .map(l => (
                            <img
                              key={l.id}
                              src={l.acf.logo_de_la_marca.url}
                              width={l.acf.logo_de_la_marca.width}
                              height={l.acf.logo_de_la_marca.height}
                              loading={'lazy'}
                            />
                          ))
                      ) : (
                        <img
                          src={
                            'https://benfamcanumpics-famnum.vercel.app/static/96/' +
                            g.slug +
                            '-familias-numerosas.png'
                          }
                          height={'96'}
                          width={'96'}
                          loading={'lazy'}
                        />
                      )}
                      <br />
                      <span dangerouslySetInnerHTML={{ __html: g.name }} />
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
};

export async function getStaticProps() {
  const res = await fetch('https://gestorbeneficis.fanoc.org/wp-json/lanauva/v1/marca');
  const marcas = await res.json();

  const res6 = await fetch(`https://gestorbeneficis.fanoc.org/wp-json/acf/v3/marca?per_page=100`);
  const marcasAcf = await res6.json();

  return {
    props: { marcas, marcasAcf }
  };
}

export default GRandesMarcas;
