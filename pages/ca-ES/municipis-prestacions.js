import fetch from 'isomorphic-unfetch';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { IntlProvider } from 'react-intl';
import Layout from '@components/MyLayout.js';

const SelectCity = dynamic(import('@components/SelectCity'), {
  loading: () => <p>carregant ...</p>
});

const MunicipiosPrestaciones = props => {
  return (
    <Layout>
      <Head>
        <title>Prestacions Famílies Nombroses - Municipis</title>
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
              <a>Prestacions oficials</a>
            </Link>
          </li>
          <li>
            <span className="show-for-sr">Actual: </span> Municipis amb prestacions
          </li>
        </ul>
      </nav>

      <div className="wrapper">
        <IntlProvider defaultLocale="ca">
          <SelectCity
            inputClass="benefit"
            inputValue="Cercar la prestació"
           
            localBenefit={true}
            options={props.municipios
              .reduce((ciutats, municipio) => {
                if (municipio.localidad == false) {
                  return ciutats;
                }
                ciutats[municipio.localidad.term_id] = {
                  slug: municipio.localidad.slug,
                  key: municipio.localidad.term_id,
                  value: municipio.localidad.term_id
                    ? `/ca-ES/pm/${municipio.localidad.term_id}/${municipio.localidad.slug}`
                    : '',
                  label: municipio.localidad.term_id ? `${municipio.localidad.name}` : ''
                };
                return ciutats;
              }, [])
              .sort((a, b) => {
                if (a.slug < b.slug) return -1;
                if (a.slug > b.slug) return 1;
                return 0;
              })}
          />
        </IntlProvider>
      </div>
      <style jsx>{`
        .breadcrumbs {
          margin: -2rem 0 1rem 0 !important;
        }
        @media screen and (min-width: 768px) {
          .wrapper {
            max-width: 80%;
            width: 390px;
            margin: 0 auto;
          }
        }
        @media screen and (min-width: 1024px) {
          .wrapper {
            max-width: 50%;
          }
        }
        h1 {
          color: #cb5599;
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
            width: 90%;
          }
          .item {
            width: 200px;
          }
        }
        @media screen and (min-width: 1366px) {
          .gallery {
            width: 82%;
          }
        }
      `}</style>
    </Layout>
  );
};

export async function getStaticProps() {
  const res = await fetch(
    'https://gestorbeneficis.fanoc.org/wp-json/lanauva/v1/prestaciones?_embed&nivel=Municipal&comunidad=8143'
  );
  const municipios = await res.json();

  return { props: { municipios }, revalidate: 60 };
}

export default MunicipiosPrestaciones;
