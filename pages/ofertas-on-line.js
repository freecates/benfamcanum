import Head from 'next/head'
import Layout from '../components/MyLayout.js'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'
import {IntlProvider, FormattedDate} from 'react-intl'

const OfertasOnLine = (props) => (
  <Layout>
    <Head>
      <title>Ofertas On Line para familias numerosas</title>
    </Head>
    <IntlProvider defaultLocale='ca'>
      <main>
        <h1>Ofertas On Line</h1>
        <section>
          <h2 className='align-center'>Selecciona la categoría de tu interés</h2>
          <ul className='gallery'>
          {props.ofertasonlines.reduce((categories, ofertasonline) => {
            if (ofertasonline.categoria_de_la_oferta == false) {
              return categories
            }
            categories[ofertasonline.categoria_de_la_oferta.term_id] =
            (
            <span key={ofertasonline.categoria_de_la_oferta.term_id}>            
            <li className='item align-center'>
              <Link prefetch as={`/c-o-o/${ofertasonline.categoria_de_la_oferta.term_id}/${ofertasonline.categoria_de_la_oferta.slug}`} href={`/category-ofertas-on-line?id=${ofertasonline.categoria_de_la_oferta.term_id}`}>
                <a title={'Clica aquí para ver todas las ofertas online de ' + ofertasonline.categoria_de_la_oferta.name}><img src={'/static/' + ofertasonline.categoria_de_la_oferta.slug +'-familias-numerosas.png'} /><br/><span dangerouslySetInnerHTML={ {__html: ofertasonline.categoria_de_la_oferta.name} } /></a>
              </Link>
            </li>
            </span>
            )
            return categories
        },[])}
        </ul>

        </section>
      </main>
    </IntlProvider>
        <style jsx>{`
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
          a {
            color:inherit;
          }
          a:hover {
            text-decoration:underline;
          }
          a.blue {
            color:#3f3fff;
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
            }
          }
          @media screen and (max-width: 375px) {              
            .item {
              width: 124px;
            }
          }
          @media screen and (min-width: 360px) {   
            .gallery {
              width: 90%;
            }
          }
          @media screen and (min-width: 768px) {   
            .gallery {
              max-width: 70%;
              width:500px;
            }
          .item {
              width: 150px;
            }
          }
        `}</style>
  </Layout>
)

OfertasOnLine.getInitialProps = async function() {
  const res = await fetch('https://gestorbeneficios.familiasnumerosas.org/wp-json/lanauva/v1/ofertas_online?sim-model=categoria')
  const ofertasonlines = await res.json()

  console.log(`Ofertas On Line data fetched. Count: ${ofertasonlines.length}`)

  return { ofertasonlines }
}

export default OfertasOnLine