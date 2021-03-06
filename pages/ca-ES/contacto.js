import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Layout from '@components/MyLayout.js';

const MapaDeGoogle = dynamic(import('@components/MapaDeGoogle'), {
  loading: () => <p>carregant ...</p>
});

const Contacto = () => {
  return (
    <Layout>
      <nav aria-label="Ets aquí:" role="navigation">
        <ul className="breadcrumbs">
          <li>
            <Link href="/ca-ES">
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
        <a href="mailto:info@fanoc.org">info@fanoc.org</a>
      </p>
      <MapaDeGoogle lat="41.3914434" lng="2.1578962" />

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
};

export default Contacto;
