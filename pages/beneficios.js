import fetch from 'isomorphic-unfetch';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '@components/MyLayout.js';
import Promotions from '@components/Promotions.js';

const Beneficios = props => {
  return (
    <Layout>
      <Head>
        <title>Ofertas para familias numerosas</title>
      </Head>
      <div>
        <nav aria-label="Estás aquí:" role="navigation">
          <ul className="breadcrumbs">
            <li>
              <Link href="/">
                <a>Inicio</a>
              </Link>
            </li>
            <li>
              <span className="show-for-sr">Actual: </span> Ofertas para familias numerosas
            </li>
          </ul>
        </nav>
        <section className="call-to-action">
          <div className="icones-prestacions">
            <div className="icona">
              <Link href="/ofertas-por-sectores">
                <a>
                  <img
                    src="/static/icona-ofertas-por-sectores-familias-numerosas.png"
                    width="192"
                    height="192"
                    loading={'lazy'}
                  />
                  <div className="text-icona">Ofertas por sectores</div>
                </a>
              </Link>
            </div>
            <div className="icona">
              <Link href={`/comunidad`}>
                <a>
                  <img
                    src="/static/icona-ofertas-por-poblacion-familias-numerosas.png"
                    width="192"
                    height="192"
                    loading={'lazy'}
                  />
                  <div className="text-icona">Ofertas por población</div>
                </a>
              </Link>
            </div>
            <div className="icona">
              <Link href="/ofertas-on-line">
                <a>
                  <img
                    src="/static/icona-ofertas-online-familias-numerosas.png"
                    width="192"
                    height="192"
                    loading={'lazy'}
                  />
                  <div className="text-icona">Ofertas online</div>
                </a>
              </Link>
            </div>
            <div className="icona">
              <Link href="/ofertas-en-el-mapa">
                <a>
                  <img
                    src="/static/icona-ofertas-en-el-mapa-familias-numerosas.png"
                    width="192"
                    height="192"
                    loading={'lazy'}
                  />
                  <div className="text-icona">Ofertas en el mapa</div>
                </a>
              </Link>
            </div>
            <br className="clear" />
            <Promotions data={props.promociones} />
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
        .dk {
          display: none;
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
          .dk {
            display: block;
          }
          .mb {
            display: none;
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
};

export async function getStaticProps() {
  const res = await fetch(`https://gestorbeneficis.fanoc.org/wp-json/wp/v2/promociones`);
  const promociones = await res.json();

  return {
    props: { promociones, 
      revalidate: 1 }
  };
}

export default Beneficios;
