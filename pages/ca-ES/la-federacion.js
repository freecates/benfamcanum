import Link from 'next/link';
import { useRouter } from 'next/router';
import Layout from '@components/MyLayout.js';

const LaFederacion = () => {
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
            <span className="show-for-sr">Actual: </span>La Federación
          </li>
        </ul>
      </nav>
      <h1>La Federación</h1>
      <p>
        La Associació de Famílies Nombroses de Catalunya - FANOC es una entidad sin ánimo de lucro,
        independiente y no confesional, que representa y defiende los intereses de las familias
        nombroses.
      </p>

      <p>
        Declarada Entidad De Utilidad Pública desde el año 2003, su objetivo es conseguir para estas
        familias el reconocimiento social y económico que les corresponde por su especial
        contribución a la sociedad y, en consecuencia, otorgarles facilidades en el acceso a bienes
        y servicios, tanto públicos como privados.
      </p>

      <p>
        La{' '}
        <Link href="http://www.familiasnumerosas.org/conocenos/quienes-somos/">
          <a>FANOC</a>
        </Link>{' '}
        está integrada por más de 80 Asociaciones locales, provinciales y autonómicas, que trabajan
        en cada Comunitat Autónoma, con el objetivo común de hacer valer y defender los derechos de
        las familias nombroses.
      </p>

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

export default LaFederacion;
