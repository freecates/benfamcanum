import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/MyLayout.js'

export default () => (
    <Layout>
      <nav aria-label="Estás aquí:" role="navigation">
        <ul className="breadcrumbs">
          <li><Link prefetch href="/"><a>Inicio</a></Link></li>
          <li>
            <span className="show-for-sr">Actual: </span>La Federación
          </li>
        </ul>
      </nav>
        <h1>La Federación</h1>
        <p>La Associació de Famílies Nombroses de Catalunya - FANOC es una entidad sin ánimo de lucro, independiente y no confesional, que representa y defiende los intereses de las familias numerosas.</p>

        <p>Declarada Entidad De Utilidad Pública desde el año 2003, su objetivo es conseguir para estas familias el reconocimiento social y económico que les corresponde por su especial contribución a la sociedad y, en consecuencia, otorgarles facilidades en el acceso a bienes y servicios, tanto públicos como privados.</p>

        <p>La <Link href='http://www.familiasnumerosas.org/conocenos/quienes-somos/'><a>FANOC</a></Link> está integrada por más de 80 Asociaciones locales, provinciales y autonómicas, que trabajan en cada Comunidad Autónoma, con el objetivo común de hacer valer y defender los derechos de las familias numerosas.</p>

      <style jsx>{`
        .breadcrumbs {
          margin-bottom:1em;
        }
        a {
          color:#3f3fff!important;
        }
      `}</style>
    </Layout>
)
