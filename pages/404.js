import Link from 'next/link';
import Layout from '@components/MyLayout.js';

export default function Custom404() {
  
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
            <span className="show-for-sr">Actual: </span>Error
          </li>
        </ul>
      </nav>
      <h1>
        Se ha producido un error 404
        <br />
        <small>[Página no encontrada]</small>
      </h1>
      <h2>
        Por favor, regrese a la página de{' '}
        <Link href="/">
          <a>Inicio</a>
        </Link>
        .
      </h2>

      <style jsx>{`
        .breadcrumbs {
          margin-bottom: 1em;
        }
        a {
          color: #00add9 !important;
        }
        h1,
        h2 {
          text-align: center;
        }
      `}</style>
    </Layout>
  );
}
