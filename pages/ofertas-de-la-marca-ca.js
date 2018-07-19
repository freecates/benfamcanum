import Head from 'next/head'
import Layout from '../components/MyLayout.js'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'
import {IntlProvider, FormattedDate} from 'react-intl'

const OfertasGrandesMarcasByMarcaCa = (props) => (
  <Layout>
    <Head>
      <title>Ofertas de la Marca {props.granmarcacaofertas.name} para familias numerosas</title>
    </Head>
    <nav aria-label="Estás aquí:" role="navigation">
      <ul className="breadcrumbs">
        <li><Link prefetch href="/"><a>Inicio</a></Link></li>
        <li><a href="javascript:history.back()">Ofertas</a></li>
        <li>
          <span className="show-for-sr">Actual: </span> {props.granmarcacaofertas.name} 
        </li>
      </ul>
    </nav>
    <section>
      <h1>Ofertas de {props.granmarcacaofertas.name}</h1>
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
                <td><p className='align-center'><img src={'/static/' + props.granmarcacaofertas.slug +'-familias-numerosas.png'} /></p></td>
                <td><p className='align-center'>{ props.granmarcacaofertas.name}</p></td>
                <td>
                    <div>
                      {props.granmarcacaofertas.description.split('\n').map((item, key) => {
                        return <p key={key}><span dangerouslySetInnerHTML={ {__html: item} } /></p>
                      })}
                    </div>
                </td>
                <td>
                  <p className='align-center'>
                    <Link prefetch as={`/mmca/${props.granmarcacaofertas.term_id}/${props.granmarcacaofertas.slug}`} href={`/mapa-de-la-marca-ca?id=${props.granmarcacaofertas.term_id}`}>
                      <a title={'Ver ' + props.granmarcacaofertas.name + ' en el mapa'} className='button small'>{'Ver ' + props.granmarcacaofertas.name + ' en el mapa'}</a>
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

OfertasGrandesMarcasByMarcaCa.getInitialProps = async function(context) {
  const { id } = context.query
  const res = await fetch(`https://gestorbeneficios.familiasnumerosas.org/wp-json/lanauva/v1/marca/${id}`)
  const granmarcacaofertas = await res.json()

  console.log(`Ofertas de la Marca data fetched. Count: ${granmarcacaofertas.length}`)

  return { granmarcacaofertas }
}

export default OfertasGrandesMarcasByMarcaCa