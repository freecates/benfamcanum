import Link from 'next/link';
import Layout from '@components/MyLayout.js';

function Error({ statusCode }) {
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
      <h1>Error</h1>
      <h2>
        {statusCode ? (
          <span>
            Se ha producido un error <strong>{statusCode}</strong> en el servidor
          </span>
        ) : (
          'Se ha producido un error en el cliente'
        )}
      </h2>

      <p>Quizás el recurso solicitado no se enuentra disponible temporalmente</p>

      <p>
        Por favor, regrese a la página de{' '}
        <Link href="/">
          <a>Inicio</a>
        </Link>
        .
      </p>

      <p>
        Si el error persiste, póngase en contacto con{' '}
        <a href="mailto:info@fanoc.org">info@fanoc.org</a>
      </p>

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

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
