import Link from 'next/link';
import Layout from '../components/MyLayout.js';

export default class Error extends React.Component {
  static getInitialProps({ res, err }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null;
    return { statusCode };
  }

  render() {
    return (
      <Layout ruta={this.props.ruta}>
        <nav aria-label="Estás aquí:" role="navigation">
          <ul className="breadcrumbs">
            <li>
              <Link prefetch href="/">
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
          {this.props.statusCode ? (
            <span>
              Se ha producido un error <strong>{this.props.statusCode}</strong> en el servidor
            </span>
          ) : (
            'Se ha producido un error en el cliente'
          )}
        </h2>

        <p>Quizás el recurso solicitado no se enuentra disponible temporalmente</p>

        <p>
          Por favor, regrese a la página de{' '}
          <Link prefetch href="/">
            <a>Inicio</a>
          </Link>
          .
        </p>

        <p>
          Si el error persiste, póngase en contacto con{' '}
          <Link href="mailto:info@fanoc.org">
            <a>info@fanoc.org</a>
          </Link>
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
}
