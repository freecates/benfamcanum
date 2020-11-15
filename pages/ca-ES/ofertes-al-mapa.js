import fetch from 'isomorphic-unfetch';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Link from 'next/link';
import { IntlProvider } from 'react-intl';
import Layout from '../../components/MyLayout.js';

const SelectCity = dynamic(import('../../components/SelectCity'), {
  loading: () => <p>carregant ...</p>
});

const Localidades = props => (
  <Layout bgmapa ruta={props.ruta}>
    <Head>
      <title>Ofertes geolocalitzades per a famílies nombroses</title>
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
            <a>Ofertes per a famílies nombroses</a>
          </Link>
        </li>
        <li>
          <span className="show-for-sr">Actual: </span> Al mapa
        </li>
      </ul>
    </nav>
    <IntlProvider defaultLocale="ca">
      <main className="bgmapa">
        <section className="padding-4x">
          <div className="wrapper wrapper-top">
            <div className="left">
              <p className="align-center no-margin-bottom padding">
                <Link as="/ca-ES/m-p" href="/ca-ES/mapa-proximidad">
                  <a className="button button-blue">Buscar a prop teu</a>
                </Link>
              </p>
            </div>
            <div className="right">
              <div className="form-component form-component-full">
                <SelectCity
                  inputClass="map"
                  options={props.beneficios
                    .reduce((ciutats, beneficio) => {
                      if (beneficio.localidad_del_beneficio == false) {
                        return ciutats;
                      }
                      ciutats[beneficio.localidad_del_beneficio.term_id] = {
                        slug: beneficio.localidad_del_beneficio.slug,
                        key: beneficio.localidad_del_beneficio.term_id,
                        value: beneficio.localidad_del_beneficio
                          ? `/ca-ES/mapa-localidad?localidad=${beneficio.localidad_del_beneficio.term_id}`
                          : '',
                        label: beneficio.localidad_del_beneficio
                          ? `${beneficio.localidad_del_beneficio.name}`
                          : ''
                      };
                      return ciutats;
                    }, [])
                    .sort((a, b) => {
                      if (a.slug < b.slug) return -1;
                      if (a.slug > b.slug) return 1;
                      return 0;
                    })}
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </IntlProvider>
    <style jsx>{`
          .bgmapa {
            background: url(/static/bg-mapa.jpg) no-repeat center center;
            background-size: contain;
            padding:2em;
            animation-name: fadeIn;
            animation-duration: 1.3s;
            animation-timing-function: cubic-bezier(0, 0, 0.4, 1);
            animation-fill-mode: forwards;
          }
          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
          .align-center {
            text-align:center;
          }
          .button {
            background:#d86525;
            color:#ffffff!important;
            text-deocration:none;
          }
          .button:hover {
            background:#aa4e1c;
            text-decoration:none;
          }
          .button-blue {
            background:#0066ff;
            width:55%;
          }
          .button-blue:hover {
            background:#0051cb;
            text-decoration:none;
          }
          .no-margin-bottom {
            margin-bottom:0;
          }
          .margin-top {
            margin-top:1rem;
          }
          .padding {
            padding:1em;
          }
          .padding-4x {
            padding:4em 2em;
          }
          a {
            color:inherit!important;
          }
          a:hover {
            text-decoration:underline;
          }
          a.blue {
            color:#00add9;
            text-decoration:underline;
          }
          p {
            margin-top:2rem;
          }
          .form-component {
            margin:0 auto;
          }
          @media screen and (min-width: 320px) {   
            .gallery, .form-component {
              width: 100%;
            }
            .form-component-full {
              width:100%;
            }              
            .item {
              margin: 5px;
            }
            .beneficio-localidad-blue, 
            .beneficio-online-yellow , 
            .beneficio-categoria-grey,
            .bg-mapa {
              margin:0;
            }
          }
          @media screen and (max-width: 375px) {              
            .item {
              width: 124px;
            }
          }
          @media screen and (min-width: 360px) {   
            .gallery, .form-component {
              width: 90%;
            }
            .form-component-full {
              width:100%;
            }
          }
          @media screen and (min-width: 768px) {   
            .gallery, .form-component {
              width: 94%;
            }
            .form-component-full {
              width:100%;
            }
          .item {
              width: 200px;
            }
          }
          @media screen and (min-width: 1024px) {                          
            .wrapper {
              display: -ms-flexbox;
              display: flex;
              -ms-flex-wrap: wrap;
                  flex-wrap: wrap;
              align-items:center;

              width: 100%;
            }
            .wrapper-top {
              align-items:baseline;
            }
            .left {
              width: 50%;
              padding:0 0 0 0;
            }
            .right {
              width: 50%;
              padding:0 0 0 0;
            }
            .beneficio-localidad-blue, 
            .beneficio-online-yellow {
              margin:0 0 0 0;
            } 
            .beneficio-categoria-grey {
              margin:0 0 0 0;
              padding:2.8em 0;
            }
            .item {
                width: 140px;
              }
            }
          }
          @media screen and (min-width: 1366px) {   
            .gallery, .form-component {
              width: 86%;
            }
            .form-component-full {
              width:100%;
            }
          }
        `}</style>
  </Layout>
);

export async function getStaticProps() {
  const res = await fetch(
    'https://gestorbeneficis.fanoc.org/wp-json/lanauva/v1/beneficios?comunidad=Catalu%C3%B1a&sim-model=localidad'
  );
  const beneficios = await res.json();

  console.log(`Ofertes data fetched. Count: ${beneficios.length}`);

  return { props: { beneficios } };
}

export default Localidades;
