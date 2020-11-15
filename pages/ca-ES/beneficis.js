import fetch from 'isomorphic-unfetch';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/MyLayout.js';

const SelectCity = dynamic(import('../../components/SelectCity'), {
  loading: () => <p>carregant ...</p>
});

const today = Date.now();
const todayISO = new Date(today).toISOString();

const Localidades = props => (
  <Layout layout ruta={props.ruta}>
    <Head>
      <title>Ofertes per a famílies nombroses</title>
    </Head>
    <div>
      <nav aria-label="Ets aquí:" role="navigation">
        <ul className="breadcrumbs">
          <li>
            <Link href="/ca-ES">
              <a>Inici</a>
            </Link>
          </li>
          <li>
            <span className="show-for-sr">Actual: </span> Ofertes per a famílies nombroses
          </li>
        </ul>
      </nav>
      <section className="call-to-action">
        <div className="icones-prestacions">
          <div className="icona">
            <Link href="/ca-ES/ofertes-per-sectors">
              <a>
                <img src="/static/icona-ofertas-por-sectores-familias-numerosas.png" />
                <div className="text-icona">Ofertes per sectors</div>
              </a>
            </Link>
          </div>
          <div className="icona">
            <Link as={`/ca-ES/ca/Catalu/8196`} href={`/ca-ES/comunidad?comunidad=Catalu&caid=8196`}>
              <a>
                <img src="/static/icona-ofertas-por-poblacion-familias-numerosas.png" />
                <div className="text-icona">Ofertes per població</div>
              </a>
            </Link>
          </div>
          <div className="icona">
            <Link href="/ca-ES/ofertes-on-line">
              <a>
                <img src="/static/icona-ofertas-online-familias-numerosas.png" />
                <div className="text-icona">Ofertes online</div>
              </a>
            </Link>
          </div>
          <div className="icona">
            <Link href="/ca-ES/ofertes-al-mapa">
              <a>
                <img src="/static/icona-ofertas-en-el-mapa-familias-numerosas.png" />
                <div className="text-icona">Ofertes al mapa</div>
              </a>
            </Link>
          </div>
          <br className="clear" />
          {props.promociones[0].acf.fecha_de_finalizaciion_de_la_promocion > todayISO ? (
            <div className="promo">
              <h4 className="align-center">
                <span className="label alert file-label">
                  <Link href="/ca-ES/promocions">
                    <a>
                      Mira aquí promocions que et
                      <br />
                      puguin interessar
                    </a>
                  </Link>
                </span>
              </h4>
            </div>
          ) : (
            ''
          )}
        </div>
      </section>
    </div>
    <style jsx>{`
      h2 {
        color: #cb5599;
        text-align: center;
      }
      .align-center {
        text-align: center;
      }
      a,
      li {
        color: #ffffff !important;
      }
      .breadcrumbs a,
      .breadcrumbs li {
        color: #000000 !important;
      }
      .promo {
        margin-top: 2em;
      }
      .file-label {
        background: #f18903 !important;
        color: #ffffff;
        font-weight: 400;
        font-size: 1.25rem;
        white-space: normal;
      }
      .file-label a {
        color: #ffffff !important;
      }
      .file-label a:hover {
        text-decoration: none;
      }
      .breadcrumbs {
        margin: -2rem 0 1rem 0;
      }
      .call-to-action {
        text-align: center;
        margin: 1em auto;
        color: #ffffff;
      }
      .call-to-action .icona {
        position: relative;
        float: left;
      }
      .clear {
        clear: both;
      }
      .call-to-action .text-icona {
        left: 0;
        position: absolute;
        text-align: center;
        top: 65px;
        width: 100%;
        font-size: 1em;
      }
      .call-to-action .text-icona.city-text {
        top: 35px;
        font-size: 0.9em;
      }
      @media screen and (min-width: 320px) {
        .call-to-action {
          width: 69%;
        }
        .icones-prestacions img {
          margin: 0 0 1em 0;
        }
      }
      @media screen and (min-width: 360px) {
        .call-to-action {
          width: 60%;
        }
      }
      @media screen and (min-width: 411px) {
        .call-to-action {
          width: 52%;
        }
      }
      @media screen and (min-width: 768px) {
        .call-to-action {
          width: 71%;
        }
        .call-to-action .text-icona {
          top: 100px;
        }
        .call-to-action .text-icona.city-text {
          top: 85px;
        }
        .icones-prestacions img {
          margin: 2em;
        }
      }
      @media screen and (min-width: 1024px) {
        .call-to-action {
          width: 53%;
        }
      }
      @media screen and (min-width: 1360px) {
        .call-to-action {
          width: 95%;
        }
      }
    `}</style>
  </Layout>
);

export async function getStaticProps() {
  const res2 = await fetch(`https://gestorbeneficis.fanoc.org/wp-json/wp/v2/promociones`);
  const promociones = await res2.json();

  console.log(`Ofertes data fetched. Count: ${promociones.length}`);

  return { props: { promociones } };
}

export default Localidades;
