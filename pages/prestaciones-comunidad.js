import fetch from 'isomorphic-unfetch';
import Head from 'next/head';
import Link from 'next/link';
import { IntlProvider } from 'react-intl';
import Layout from '../components/MyLayout.js';

const PrestacionesComunidad = props => (
  <Layout ruta={props.ruta}>
    <Head>
      <title>
        Prestaciones Familias Numerosas - {props.prestaciones[0].comunidad_autonoma.name}
      </title>
    </Head>
    <nav aria-label="Estás aquí:" role="navigation">
      <ul className="breadcrumbs">
        <li>
          <Link href="/">
            <a>Inicio</a>
          </Link>
        </li>
        <li>
          <Link href="/prestaciones">
            <a>Prestaciones</a>
          </Link>
        </li>
        <li>
          <span className="show-for-sr">Actual: </span> Comunidad:{' '}
          {props.prestaciones[0].comunidad_autonoma.name}
        </li>
      </ul>
    </nav>
    <section>
      <h1>Prestaciones públicas en {props.prestaciones[0].comunidad_autonoma.name}</h1>
      <IntlProvider defaultLocale="es">
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <td />
                <td>Tipo de prestación</td>
                <td />
                <td />
              </tr>
            </thead>
            {props.prestaciones
              .sort((a, b) => {
                if (
                  a.categoria_de_la_prestacion_publica.slug <
                  b.categoria_de_la_prestacion_publica.slug
                ) {
                  return -1;
                }
                if (
                  a.categoria_de_la_prestacion_publica.slug >
                  b.categoria_de_la_prestacion_publica.slug
                ) {
                  return 1;
                }
                return 0;
              })
              .map((prestacion, index) => (
                <tbody key={index}>
                  <tr>
                    <td width="64">
                      <img
                        src={
                          'https://benfamcanumpics.famnum.now.sh/static/32/' +
                          prestacion.categoria_de_la_prestacion_publica.slug +
                          '-prestaciones-familias-numerosas.png'
                        }
                      />
                    </td>
                    <td width="200">{prestacion.categoria_de_la_prestacion_publica.name}</td>
                    <td>
                      <span dangerouslySetInnerHTML={{ __html: prestacion.name }} />.{' '}
                      {prestacion.nombre_de_la_prestacion ? (
                        <span>{prestacion.nombre_de_la_prestacion}</span>
                      ) : (
                        ''
                      )}
                    </td>
                    <td width="150">
                      <Link
                        as={`/pr/${prestacion.ID}/${prestacion.slug}`}
                        href={`/prestacion?id=${prestacion.ID}`}
                      >
                        <a
                          title={'Acceder a la ficha de ' + prestacion.name}
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

export async function getStaticProps() {
  const res = await fetch(`https://gestorbeneficis.fanoc.org/wp-json/lanauva/v1/prestaciones?_embed&nivel=Autonomico&comunidad=8143`);
  const prestaciones = await res.json();

  return { props: { prestaciones }, revalidate: 1 };
}

export default PrestacionesComunidad;
