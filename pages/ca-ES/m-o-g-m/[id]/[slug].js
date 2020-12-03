import fetch from 'isomorphic-unfetch';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { IntlProvider } from 'react-intl';
import Layout from '../../../../components/MyLayout.js';

const OfertasGrandesMarcasByMarca = props => {
  return (
    <Layout>
      <Head>
        <title>Ofertes de la Marca {props.granmarcaofertas.name} per a famílies nombroses</title>
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
            <span className="show-for-sr">Actual: </span> {props.granmarcaofertas.name}
          </li>
        </ul>
      </nav>
      <section>
        <h1>Ofertes de {props.granmarcaofertas.name}</h1>
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
                      <img
                        src={
                          'https://benfamcanumpics.famnum.now.sh/static/96/' +
                          props.granmarcaofertas.slug +
                          '-familias-numerosas.png'
                        }
                        width={'96'}
                        height={'96'}
                        loading={'lazy'}
                      />
                    </p>
                  </td>
                  <td>
                    <p className="align-center">{props.granmarcaofertas.name}</p>
                  </td>
                  <td>
                    <div>
                      {props.granmarcaofertas.description.split('\n').map((item, key) => {
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
                      <Link
                        href={`/ca-ES/mm/${props.granmarcaofertas.term_id}/${props.granmarcaofertas.slug}`}
                      >
                        <a
                          title={'Ver ' + props.granmarcaofertas.name + ' en el mapa'}
                          className="button small"
                        >
                          {'Ver ' + props.granmarcaofertas.name + ' en el mapa'}
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

  const paths = marques.map(m => `/ca-ES/m-o-g-m/${m.id}/${m.slug}`);

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const res = await fetch(
    `https://gestorbeneficis.fanoc.org/wp-json/lanauva/v1/marca/${params.id}`
  );

  const granmarcaofertas = await res.json();

  return { props: { granmarcaofertas } };
}

export default OfertasGrandesMarcasByMarca;
