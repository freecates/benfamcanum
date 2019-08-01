import dynamic from 'next/dynamic';
import Link from 'next/link';
import Layout from '../../components/MyLayout.js';

const MapaDeGoogle = dynamic(import('../../components/MapaDeGoogle'), {
  loading: () => <p>carregant ...</p>
});

const Contacto = () => (
  <Layout ruta={props.ruta}>
    <nav aria-label="Ets aquí:" role="navigation">
      <ul className="breadcrumbs">
        <li>
          <Link prefetch href="/ca-ES">
            <a>Inici</a>
          </Link>
        </li>
        <li>
          <span className="show-for-sr">Actual: </span>Contacte
        </li>
      </ul>
    </nav>
    <h1>Associació de Famílies Nombroses de Catalunya - FANOC</h1>
    <p>
      C/ Balmes, 92 4t 1ªB
      <br />
      08008 Barcelona
      <br />
      <Link href="mailto:info@fanoc.org">
        <a>info@fanoc.org</a>
      </Link>
    </p>
    <MapaDeGoogle lat="41.3914434" lng="2.1578962" ruta={props.ruta} />

    <style jsx>{`
      .breadcrumbs {
        margin-bottom: 1em;
      }
      a {
        color: #00add9 !important;
      }
    `}</style>
  </Layout>
);

export default Contacto;
