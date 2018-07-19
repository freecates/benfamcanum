import Head from 'next/head'
import Layout from '../components/MyLayout.js'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'
import {IntlProvider, FormattedDate} from 'react-intl'

const OfertasGrandesMarcasByMarca = (props) => (
  <Layout>
    <Head>
      <title>Ofertas de la Marca {props.granmarcaofertas.name} para familias numerosas</title>
    </Head>
    <nav aria-label="Estás aquí:" role="navigation">
      <ul className="breadcrumbs">
        <li><Link prefetch href="/"><a>Inicio</a></Link></li>
        <li><Link prefetch href="/grandes-marcas"><a>Ofertas nacionales</a></Link></li>
        <li>
          <span className="show-for-sr">Actual: </span> {props.granmarcaofertas.name} 
        </li>
      </ul>
    </nav>
    <section>
      <h1>Ofertas de {props.granmarcaofertas.name}</h1>
      <IntlProvider defaultLocale='es'>
        <div className='table-scroll'>
          <table>          
            <thead>
              <tr>
                <td></td>
                <td></td>
                <td>Oferta</td>
                <td></td>
              </tr>
            </thead>            
            <tbody>
              <tr>
                <td><p className='align-center'><img src={'/static/' + props.granmarcaofertas.slug +'-familias-numerosas.png'} /></p></td>
                <td><p className='align-center'>{ props.granmarcaofertas.name}</p></td>
                <td>
                    <div>
                      {props.granmarcaofertas.description.split('\n').map((item, key) => {
                        return <p key={key}><span dangerouslySetInnerHTML={ {__html: item} } /></p>
                      })}
                    </div>
                </td>
                <td>
                  <p className='align-center'>
                    <Link prefetch as={`/mm/${props.granmarcaofertas.term_id}/${props.granmarcaofertas.slug}`} href={`/mapa-de-la-marca?id=${props.granmarcaofertas.term_id}`}>
                      <a title={'Ver ' + props.granmarcaofertas.name + ' en el mapa'} className='button small'>{'Ver ' + props.granmarcaofertas.name + ' en el mapa'}</a>
                    </Link>
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

      </IntlProvider>
    </section>
        <style jsx>{`
          .breadcrumbs {
            margin-bottom:1em;
          }
          h1, .align-center {
            text-align:center;
          }
          h1, h2, h3 {
            color:#391f92;
          }
          table thead {
            background:none;
          }
          table tbody tr td a {
            margin:0;
          }
          table tbody tr td a.button {
            background:#d86525;
          }
          table tbody tr td a.button:hover {
            background:#aa4e1c;
          }
          @media screen and (max-width: 768px) {
            table tbody td {
              padding:.5rem .1rem .5rem .1rem;
            }
          }
          @media 
          only screen and (max-width: 760px),
          (min-device-width: 768px) and (max-device-width: 1000px)  {
            table, thead, tbody, th, td, tr { 
              display: block; 
            }
            thead tr { 
              position: absolute;
              top: -9999px;
              left: -9999px;
            }
            td {
              border: none;
              border-bottom: 1px solid #eee; 
              position: relative;
              padding-left: 50%; 
            }
            td:before {
              position: absolute;
              top: 6px;
              left: 6px;
              width: 45%; 
              padding-right: 10px; 
              white-space: nowrap;
            }
            td:nth-of-type(3):before { content:"Oferta";}
            td:nth-of-type(3) div { margin-top:2em; }
          }
          @media screen and (min-width: 1024px) {
            .table-scroll table {
              width:100%;
            }
            table tbody tr td {
              border-top:1px solid #000000;
            }
            tbody tr td:nth-of-type(1) { width:96px;}
            tbody tr td:nth-of-type(2) { width:200px;}
            tbody tr td:nth-of-type(4) { width:150px;}
          }
          nav a {
            color:#3f3fff;
          }
        `}</style>
  </Layout>
)

OfertasGrandesMarcasByMarca.getInitialProps = async function(context) {
  const { id } = context.query
  const res = await fetch(`https://gestorbeneficios.familiasnumerosas.org/wp-json/lanauva/v1/marca/${id}`)
  const granmarcaofertas = await res.json()

  console.log(`Ofertas de la Marca data fetched. Count: ${granmarcaofertas.length}`)

  return { granmarcaofertas }
}

export default OfertasGrandesMarcasByMarca