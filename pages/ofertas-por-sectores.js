import Head from 'next/head'
import Layout from '../components/MyLayout.js'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'
import {IntlProvider, FormattedDate} from 'react-intl'

const OfertasPorSectores = (props) => (
  <Layout layout>
    <Head>
      <title>Ofertas para familias numerosas por sectores</title>
    </Head>
    <nav aria-label="Estás aquí:" role="navigation">
    <ul className="breadcrumbs">
        <li><Link prefetch href="/"><a>Inicio</a></Link></li>
        <li><Link prefetch href="/beneficios"><a>Ofertas para familias numerosas</a></Link></li>
        <li>
        <span className="show-for-sr">Actual: </span> Sectores 
        </li>
    </ul>
    </nav>
    <IntlProvider defaultLocale='ca'>
      <main>
        <section>
          <ul className='gallery'>
          {props.ofertasporsectores.map((ofertasporsectore, index) => (           
            <li className='item' key={index}>
              <Link prefetch as={`/c/${ofertasporsectore.term_id}/${ofertasporsectore.slug}`} href={`/category?sid=${ofertasporsectore.term_id}`}>
                <h3><a title={'Clica aquí para ver todas las ofertas de ' + ofertasporsectore.name}><img src={'/static/' + ofertasporsectore.slug +'-familias-numerosas.png'} width='64'/> <span dangerouslySetInnerHTML={ {__html: ofertasporsectore.name} } /></a></h3>
              </Link>
            </li>
            ))}
        </ul>

        </section>
      </main>
    </IntlProvider>
        <style jsx>{`
          a, li {
              color:#ffffff!important;
          }
          h1 {
            color:#391f92;
            text-align:center;
          }
          .align-center {
            text-align:center;
          }
          .gallery {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-wrap: wrap;
                flex-wrap: wrap;
            padding: 5px;
          }
          ul {
            list-style-type:none;
            margin-left:0;
            margin:0 auto!important;
          }
          a:hover {
            text-decoration:underline;
          }
          p {
            margin-top:2rem;
          }
          .item {
            width: 150px;
          }
          @media screen and (min-width: 320px) {   
            .gallery {
              width: 100%;
            }              
            .item {
              margin: 5px;
              width:280px;
            }
          }
          @media screen and (min-width: 360px) {   
            .gallery {
              width: 70%;
            }
          }
          @media screen and (min-width: 768px) {   
            .gallery {
              width: 90%;
            }
          }
          @media screen and (min-width: 1360px) {  
            .gallery {
              width: 100%;
            } 
          .item {
              width: 255px;
            }
          }
        `}</style>
  </Layout>
)

OfertasPorSectores.getInitialProps = async function() {
  const res = await fetch('https://gestorbeneficios.familiasnumerosas.org/wp-json/lanauva/v1/categoria_del_beneficio')
  const ofertasporsectores = await res.json()

  console.log(`Ofertas Por Sectores data fetched. Count: ${ofertasporsectores.length}`)

  return { ofertasporsectores }
}

export default OfertasPorSectores