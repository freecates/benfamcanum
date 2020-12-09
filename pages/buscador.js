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

const Buscador = () => {
  const { pathname } = useRouter();
  return (
    <Layout>
      <nav aria-label="Estás aquí:" role="navigation">
        <ul className="breadcrumbs">
          <li>
            <Link href="/">
              <a>Inicio</a>
            </Link>
          </li>
          <li>
            <span className="show-for-sr">Actual: </span>Buscador
          </li>
        </ul>
      </nav>
      <IsSearch ruta={pathname} />
    </Layout>
  );
};

export default Buscador;
