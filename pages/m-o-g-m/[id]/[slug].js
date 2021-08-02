import fetch from 'isomorphic-unfetch';
import Head from 'next/head';
import Link from 'next/link';
import Custom404 from 'pages/404';
import Fallback from '@components/Fallback';
import { IntlProvider } from 'react-intl';
import Layout from '@components/MyLayout.js';

const OfertasGrandesMarcasByMarca = props => {
  if (!isFallback && !props.marca) {
    return <Custom404 />;
  }
  if (isFallback) {
    return <Fallback breadCrumb={'Ofertas Grandes Marcas'} />;
  }
  if (props.marca === '404') {
    return <Fallback notFound breadCrumb={'Ofertas Grandes Marcas'} />;
  }
  return (
    <Layout>
      <Head>
        <title>Ofertas de la Marca {props.marca.name} para familias numerosas</title>
      </Head>
      <nav aria-label="Ets aquí:" role="navigation">
        <ul className="breadcrumbs">
          <li>
            <Link href="/">
              <a>Inici</a>
            </Link>
          </li>
          <li>
            <Link href="/grandes-marcas">
              <a>Ofertas grandes marcas</a>
            </Link>
          </li>
          <li>
            <span className="show-for-sr">Actual: </span> {props.marca.name}
          </li>
        </ul>
      </nav>
      <section>
        <h1>Ofertas de {props.marca.name}</h1>
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
                            'https://benfamcanumpics-famnum.vercel.app/static/96/' +
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
                      <Link href={`/mm/${props.marca.term_id}/${props.marca.slug}`}>
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

  const paths = marques.map(m => `/m-o-g-m/${m.id}/${m.slug}`);

  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  const res = await fetch(
    `https://gestorbeneficis.fanoc.org/wp-json/lanauva/v1/marca/${params.id}`
  );
  const marca = await res.json();

  const res2 = await fetch(`https://gestorbeneficis.fanoc.org/wp-json/acf/v3/marca/${params.id}`);
  const marcaAcf = await res2.json();

  if (!marca.data) {
    return { props: { marca, marcaAcf }, revalidate: 1 };
  } else {
    return { props: { marca: '404' } };
  }
}

export default OfertasGrandesMarcasByMarca;
