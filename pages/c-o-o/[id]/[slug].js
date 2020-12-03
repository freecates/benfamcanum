import fetch from 'isomorphic-unfetch';
import Head from 'next/head';
import Link from 'next/link';
import { IntlProvider } from 'react-intl';
import Layout from '../../../components/MyLayout.js';

const OfertasOnLineByCategory = props => (
  <Layout>
    <Head>
      <title>Ofertas On Line - {props.ofertasonlines[0].categoria_de_la_oferta.name}</title>
    </Head>
    <nav aria-label="Estás aquí:" role="navigation">
      <ul className="breadcrumbs">
        <li>
          <Link  href="/">
            <a>Inicio</a>
          </Link>
        </li>
        <li>
          <Link  href="/beneficios">
            <a>Ofertas para familias</a>
          </Link>
        </li>
        <li>
          <Link  href="/ofertas-on-line">
            <a>Ofertas On Line</a>
          </Link>
        </li>
        <li>
          <span className="show-for-sr">Actual: </span> Categoría:{' '}
          {props.ofertasonlines[0].categoria_de_la_oferta.name}
        </li>
      </ul>
    </nav>
    <section>
      <h1>Ofertas On Line en {props.ofertasonlines[0].categoria_de_la_oferta.name}</h1>
      <IntlProvider defaultLocale="es">
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
                        width={'32'}
                        height={'32'}
                        loading={'lazy'}
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
                        
                        href={`/oo/${ofertasonline.ID}/${ofertasonline.slug}`}
                      >
                        <a
                          title={
                            'Acceder a la ficha de ' + ofertasonline.nombre_del_establecimiento
                          }
                          className="button small"
                        >
                          Acceder a la ficha
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

export async function getStaticPaths() {
  const res = await fetch('https://gestorbeneficis.fanoc.org/wp-json/lanauva/v1/ofertas_online?sim-model=categoria');
  const ofertes = await res.json();

  const paths = ofertes.map((o) => `/c-o-o/${o.categoria_de_la_oferta.term_id}/${o.categoria_de_la_oferta.slug}`);

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const res = await fetch(`https://gestorbeneficis.fanoc.org/wp-json/lanauva/v1/ofertas_online?categoria_de_la_oferta=${params.id}`);

  const ofertasonlines = await res.json();

  return { props: { ofertasonlines } };
}

export default OfertasOnLineByCategory;
