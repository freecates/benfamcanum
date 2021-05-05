import fetch from 'isomorphic-unfetch';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { IntlProvider } from 'react-intl';
import Layout from '@components/MyLayout.js';

const OfertasGrandesMarcasCaByMarca = props => {
  return (
    <Layout>
      <Head>
        <title>Ofertes de la Marca {props.marca.name} per a famílies nombroses</title>
      </Head>
      <nav aria-label="Ets aquí:" role="navigation">
        <ul className="breadcrumbs">
          <li>
            <Link href="/ca-ES">
              <a>Inici</a>
            </Link>
          </li>
          <li>
            <Link href="/ca-ES/grans-marques">
              <a>Ofertes grans marques</a>
            </Link>
          </li>
          <li>
            <span className="show-for-sr">Actual: </span> {props.marca.name}
          </li>
        </ul>
      </nav>
      <section>
        <h1>Ofertes de {props.marca.name}</h1>
        <IntlProvider defaultLocale="ca">
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <td />
                  <td />
                  <td>Oferta</td>
                  <td />
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <p className="align-center">
                      {props.marcaAcf ? (
                        <img
                          src={props.marcaAcf.acf.logo_de_la_marca.url}
                          width={props.marcaAcf.acf.logo_de_la_marca.width}
                          height={props.marcaAcf.acf.logo_de_la_marca.height}
                          loading={'lazy'}
                        />
                      ) : (
                        <img
                          src={
                            'https://benfamcanumpics.famnum.now.sh/static/96/' +
                            props.marca.slug +
                            '-familias-numerosas.png'
                          }
                          width={'96'}
                          height={'96'}
                          loading={'lazy'}
                        />
                      )}
                    </p>
                  </td>
                  <td>
                    <p className="align-center">{props.marca.name}</p>
                  </td>
                  <td>
                    <div>
                      {props.marca.description.split('\n').map((item, key) => {
                        return (
                          <p key={key}>
                            <span dangerouslySetInnerHTML={{ __html: item }} />
                          </p>
                        );
                      })}
                    </div>
                  </td>
                  <td>
                    <p className="align-center">
                      <Link href={`/ca-ES/mmca/${props.marca.term_id}/${props.marca.slug}`}>
                        <a
                          title={'Ver ' + props.marca.name + ' en el mapa'}
                          className="button small"
                        >
                          {'Ver ' + props.marca.name + ' en el mapa'}
                        </a>
                      </Link>
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </IntlProvider>
      </section>
      <style jsx>{`
        .breadcrumbs {
          margin-bottom: 1em;
        }
        h1,
        .align-center {
          text-align: center;
        }
        h1,
        h2,
        h3 {
          color: #cb5599;
        }
        table thead {
          background: none;
        }
        table tbody tr td a {
          margin: 0;
        }
        table tbody tr td a.button {
          background: #d86525;
        }
        table tbody tr td a.button:hover {
          background: #aa4e1c;
        }
        @media screen and (max-width: 768px) {
          table tbody td {
            padding: 0.5rem 0.1rem 0.5rem 0.1rem;
          }
        }
        @media only screen and (max-width: 760px),
          (min-device-width: 768px) and (max-device-width: 1000px) {
          table,
          thead,
          tbody,
          th,
          td,
          tr {
            display: block;
          }
          thead tr {
            position: absolute;
            top: -9999px;
            left: -9999px;
          }
          td {
            border: none;
            border-bottom: 1px solid #eee;
            position: relative;
            padding-left: 50%;
          }
          td:before {
            position: absolute;
            top: 6px;
            left: 6px;
            width: 45%;
            padding-right: 10px;
            white-space: nowrap;
          }
          td:nth-of-type(3):before {
            content: 'Oferta';
          }
          td:nth-of-type(3) div {
            margin-top: 2em;
          }
        }
        @media screen and (min-width: 1024px) {
          .table-scroll table {
            width: 100%;
          }
          table tbody tr td {
            border-top: 1px solid #000000;
          }
          tbody tr td:nth-of-type(1) {
            width: 96px;
          }
          tbody tr td:nth-of-type(2) {
            width: 200px;
          }
          tbody tr td:nth-of-type(4) {
            width: 150px;
          }
        }
        nav a {
          color: #00add9;
        }
      `}</style>
    </Layout>
  );
};

export async function getStaticPaths() {
  const res = await fetch('https://gestorbeneficis.fanoc.org/wp-json/lanauva/v1/marca');
  const marques = await res.json();

  const paths = marques.map(m => `/ca-ES/m-o-g-m-ca/${m.id}/${m.slug}`);

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const res = await fetch(
    `https://gestorbeneficis.fanoc.org/wp-json/lanauva/v1/marca/${params.id}`
  );
  const marca = await res.json();

  const res2 = await fetch(`https://gestorbeneficis.fanoc.org/wp-json/acf/v3/marca/${params.id}`);
  const marcaAcf = await res2.json();

  return { props: { marca, marcaAcf }, revalidate: 1 };
}

export default OfertasGrandesMarcasCaByMarca;
