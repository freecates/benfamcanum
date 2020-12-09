import dynamic from 'next/dynamic';
import Link from 'next/link';
import Layout from '@components/MyLayout.js';
import { useRouter } from 'next/router';

const IsSearch = dynamic(import('@components/IsSearch'), {
  loading: () => (
    <div>
      <p style={{ textAlign: 'center' }}>
        <img src="/static/rolling.gif" />
      </p>
    </div>
  )
});

const Cercador = () => {
  const { pathname } = useRouter();
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
            <span className="show-for-sr">Actual: </span>Cercador
          </li>
        </ul>
      </nav>
      <IsSearch ruta={pathname} />
    </Layout>
  );
};

export default Cercador;
