import Head from 'next/head'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import Layout from '../components/MyLayout.js'

const IsSearch = dynamic(
  import('../components/IsSearch'),
  {
    loading: () => (<div><p style={{textAlign: 'center'}}><img src='/static/rolling.gif'/></p></div>)
  }
)

export default () => (
    <Layout>
      <nav aria-label="Estás aquí:" role="navigation">
        <ul className="breadcrumbs">
          <li><Link prefetch href="/"><a>Inicio</a></Link></li>
          <li>
            <span className="show-for-sr">Actual: </span>Buscador
          </li>
        </ul>
      </nav>
        <IsSearch/>
    </Layout>
)
