import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/MyLayout.js';

const Prestacions = props => (
  <Layout layout ruta={props.ruta}>
    <Head>
      <title>Prestacions Famílies Nombroses</title>
    </Head>
    <nav aria-label="Ets aquí:" role="navigation">
      <ul className="breadcrumbs">
        <li>
          <Link href="/ca-ES">
            <a>Inici</a>
          </Link>
        </li>
        <li>
          <span className="show-for-sr">Actual: </span> Prestacions oficiales
        </li>
      </ul>
    </nav>
    <section className="call-to-action">
      <p className="icones-prestacions">
        <Link href="/ca-ES/municipis-prestacions">
          <a>
            <img src="/static/icona-prestacions-municipals-familias-numerosas.png" />
          </a>
        </Link>
        <Link href="/ca-ES/prestaciones-comunidad?comunidad=8143" as="/ca-ES/p-c/8143/cataluna">
          <a>
            <img src="/static/icona-prestacions-autonomiques-familias-numerosas.png" />
          </a>
        </Link>
        <Link href="/ca-ES/prestacions-estatals">
          <a>
            <img src="/static/icona-prestacions-estatals-familias-numerosas.png" />
          </a>
        </Link>
      </p>
    </section>
    <style jsx>{`
      .breadcrumbs {
        margin: -2rem 0 1rem 0;
      }
      .call-to-action {
        text-align: center;
        margin: 0 auto;
        color: #ffffff;
      }
      @media screen and (min-width: 320px) {
        .call-to-action {
          width: 100%;
        }
        .icones-prestacions img {
          padding: 0 0 1em 0;
        }
      }
      @media screen and (min-width: 360px) {
        .call-to-action {
          width: 90%;
        }
      }
      @media screen and (min-width: 768px) {
        .call-to-action {
          width: 93%;
        }
        .icones-prestacions img {
          padding: 0 2em 1em 0;
        }
      }
      @media screen and (min-width: 1366px) {
        .call-to-action {
          width: 70%;
        }
      }
    `}</style>
  </Layout>
);
export default Prestacions;
