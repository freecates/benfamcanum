import fetch from 'isomorphic-unfetch';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { IntlProvider } from 'react-intl';
import Layout from '@components/MyLayout.js';

const PrestacionesByMunicipio = props => {
  return (
    <Layout>
      <Head>
        <title>Prestacions Famílies Nombroses - {props.prestaciones[0].localidad.name}</title>
      </Head>
      <nav aria-label="Ets aquí:" role="navigation">
        <ul className="breadcrumbs">
          <li>
            <Link href="/ca-ES">
              <a>Inici</a>
            </Link>
          </li>
          <li>
            <Link href="/ca-ES/prestacions">
              <a>Prestacions</a>
            </Link>
          </li>
          <li>
            <Link href="/ca-ES/municipis-prestacions">
              <a>Municipis</a>
            </Link>
          </li>
          <li>
            <span className="show-for-sr">Actual: </span> Municipi:{' '}
            {props.prestaciones[0].localidad.name}
          </li>
        </ul>
      </nav>
      <section>
        <h1>
          {props.prestaciones[0].logo_de_la_localidad ? (
            <img src={props.prestaciones[0].logo_de_la_localidad.sizes.thumbnail} />
          ) : (
            ''
          )}
          <br />
          {props.prestaciones[0].localidad.name}
        </h1>
        <IntlProvider defaultLocale="ca">
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <td />
                  <td>Tipus de prestació</td>
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
                            'https://benfamcanumpics-famnum.vercel.app/static/32/' +
                            prestacion.categoria_de_la_prestacion_publica.slug +
                            '-prestaciones-familias-numerosas.png'
                          }
                          width={'32'}
                          height={'32'}
                          loading={'lazy'}
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
                        <Link href={`/ca-ES/pr/${prestacion.ID}/${prestacion.slug}`}>
                          <a
                            title={'Accedir a la fitxa de ' + prestacion.name}
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
          color: #00add9 !important;
        }
      `}</style>
    </Layout>
  );
};

export async function getStaticPaths() {
  const res = await fetch(
    'https://gestorbeneficis.fanoc.org/wp-json/lanauva/v1/prestaciones?_embed&nivel=Municipal&comunidad=8143'
  );
  const localidad = await res.json();

  const paths = localidad.map(l => `/ca-ES/pm/${l.localidad.term_id}/${l.localidad.slug}`);

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const res = await fetch(
    `https://gestorbeneficis.fanoc.org/wp-json/lanauva/v1/prestaciones?_embed&nivel=Municipal&localidad=${params.id}`
  );
  const prestaciones = await res.json();

  return { props: { prestaciones } };
}

export default PrestacionesByMunicipio;
