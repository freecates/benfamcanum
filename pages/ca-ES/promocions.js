import fetch from 'isomorphic-unfetch';
import Head from 'next/head';
import Link from 'next/link';
import { FormattedDate, IntlProvider } from 'react-intl';
import Layout from '../../components/MyLayout.js';

const today = Date.now();
const todayISO = new Date(today).toISOString();

const Promocions = props => (
  <Layout ruta={props.ruta}>
    <Head>
      <title>Promocions per a famílies nombroses</title>
    </Head>
    <nav aria-label="Ets aquí:" role="navigation">
      <ul className="breadcrumbs">
        <li>
          <Link  href="/ca-ES">
            <a>Inici</a>
          </Link>
        </li>
        <li>
          <Link  href="/ca-ES/beneficis">
            <a>Ofertes per a famílies</a>
          </Link>
        </li>
        <li>
          <span className="show-for-sr">Actual: </span> Promocions
        </li>
      </ul>
    </nav>
    <section>
      <h1>Promocions</h1>
      <IntlProvider defaultLocale="ca">
        {props.promociones[0].acf.fecha_de_finalizaciion_de_la_promocion > todayISO ? (
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <td />
                  <td />
                  <td>Promoció</td>
                  <td />
                </tr>
              </thead>
              {props.promociones
                .sort((a, b) => {
                  if (a.slug < b.slug) {
                    return -1;
                  }
                  if (a.slug > b.slug) {
                    return 1;
                  }
                  return 0;
                })
                .map((promocione, index) => (
                  <tbody key={index}>
                    <tr>
                      <td width="64">
                        <img
                          src={
                            'https://benfamcanumpics.famnum.now.sh/static/32/' +
                            promocione.acf.categoria_de_la_promocion.slug +
                            '-familias-numerosas.png'
                          }
                        />
                      </td>
                      <td width="200">{promocione.acf.categoria_de_la_promocion.name}</td>
                      <td>
                        <span
                          dangerouslySetInnerHTML={{
                            __html: promocione.acf.nombre_de_la_empresa
                          }}
                        />{' '}
                        |{' '}
                        <span>
                          Vàlida fins el
                          <strong>
                            {' '}
                            <FormattedDate
                              value={promocione.acf.fecha_de_finalizaciion_de_la_promocion}
                              day="numeric"
                              month="long"
                              year="numeric"
                            />
                          </strong>
                        </span>
                      </td>
                      <td width="150">
                        <Link
                          
                          as={`/ca-ES/pro/${promocione.id}/${promocione.slug}`}
                          href={`/ca-ES/promocio?id=${promocione.id}`}
                        >
                          <a
                            title={'Accedir a la fitxa de ' + promocione.acf.nombre_de_la_empresa}
                            className="button small"
                          >
                            Veure detall
                          </a>
                        </Link>
                      </td>
                    </tr>
                  </tbody>
                ))}
            </table>
          </div>
        ) : (
          <h2 className="align-center">Ho sentim. Cap oferta en curs en aquests moments.</h2>
        )}
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

Promocions.getInitialProps = async function(context) {
  const res = await fetch(`https://gestorbeneficis.fanoc.org/wp-json/wp/v2/promociones`);
  const promociones = await res.json();

  console.log(`Promocions data fetched. Count: ${promociones.length}`);
  console.log(
    `La data de la promoció és ${promociones[0].acf.fecha_de_finalizaciion_de_la_promocion} i la data d'avui és ${todayISO}`
  );

  return { promociones };
};

export default Promocions;
