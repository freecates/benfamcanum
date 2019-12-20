import fetch from 'isomorphic-unfetch';
import Head from 'next/head';
import Link from 'next/link';
import { IntlProvider } from 'react-intl';
import Layout from '../../components/MyLayout.js';

const OfertasOnLineByCategory = props => (
  <Layout ruta={props.ruta}>
    <Head>
      <title>Ofertes On Line - {props.ofertasonlines[0].categoria_de_la_oferta.name}</title>
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
          <Link href="/ca-ES/ofertes-on-line">
            <a>Ofertes On Line</a>
          </Link>
        </li>
        <li>
          <span className="show-for-sr">Actual: </span> Categoria:{' '}
          {props.ofertasonlines[0].categoria_de_la_oferta.name}
        </li>
      </ul>
    </nav>
    <section>
      <h1>Ofertes On Line a {props.ofertasonlines[0].categoria_de_la_oferta.name}</h1>
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
            {props.ofertasonlines
              .sort((a, b) => {
                if (a.slug < b.slug) {
                  return -1;
                }
                if (a.slug > b.slug) {
                  return 1;
                }
                return 0;
              })
              .map((ofertasonline, index) => (
                <tbody key={index}>
                  <tr>
                    <td width="64">
                      <img
                        src={
                          'https://benfamcanumpics.famnum.now.sh/static/32/' +
                          ofertasonline.categoria_de_la_oferta.slug +
                          '-familias-numerosas.png'
                        }
                      />
                    </td>
                    <td width="200">{ofertasonline.categoria_de_la_oferta.name}</td>
                    <td>
                      <span
                        dangerouslySetInnerHTML={{
                          __html: ofertasonline.nombre_del_establecimiento
                        }}
                      />
                    </td>
                    <td width="150">
                      <Link
                        as={`/ca-ES/oo/${ofertasonline.ID}/${ofertasonline.slug}`}
                        href={`/ca-ES/oferta-on-line?id=${ofertasonline.ID}`}
                      >
                        <a
                          title={
                            'Accedir a la fitxa de ' + ofertasonline.nombre_del_establecimiento
                          }
                          className="button small"
                        >
                          Accedir a la fitxa
                        </a>
                      </Link>
                    </td>
                  </tr>
                </tbody>
              ))}
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
      table tbody tr td {
        border-top: 1px solid #000000;
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
      @media screen and (min-width: 768px) {
        .table-scroll table {
          width: 100%;
        }
      }
      nav a {
        color: #00add9;
      }
    `}</style>
  </Layout>
);

OfertasOnLineByCategory.getInitialProps = async function(context) {
  const { id } = context.query;
  const res = await fetch(
    `https://gestorbeneficis.fanoc.org/wp-json/lanauva/v1/ofertas_online?categoria_de_la_oferta=${id}`
  );
  const ofertasonlines = await res.json();

  console.log(`Ofertes On Line data fetched. Count: ${ofertasonlines.length}`);

  return { ofertasonlines };
};

export default OfertasOnLineByCategory;
