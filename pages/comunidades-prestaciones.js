import Head from 'next/head'
import Layout from '../components/MyLayout.js'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import fetch from 'isomorphic-unfetch'
import {IntlProvider, FormattedDate} from 'react-intl'

const SelectCity = dynamic(
  import('../components/SelectCity'),
  {
    loading: () => (<p>cargando ...</p>)
  }
)

const ComunidadesPrestaciones = (props) => (
  <Layout layout>
    <Head>
      <title>Prestaciones Familias Numerosas - Comunidades</title>
    </Head>
    <nav aria-label="Estás aquí:" role="navigation">
    <ul className="breadcrumbs">
        <li><Link prefetch href="/"><a>Inicio</a></Link></li>
        <li><Link prefetch href="/prestaciones"><a>Prestaciones ofciales</a></Link></li>
        <li>
        <span className="show-for-sr">Actual: </span> Comunidades con prestaciones 
        </li>
    </ul>
    </nav>

    <div className='wrapper'>

      <IntlProvider defaultLocale='ca'>

        <SelectCity
            inputClass= 'benefit'
            options={props.comunidades.reduce((autonomies, comunidad) => {
              if (comunidad.comunidad_autonoma == false) {
                return autonomies
              }
              autonomies[comunidad.comunidad_autonoma.term_id] =
                {
                  slug: comunidad.comunidad_autonoma.slug,
                  key: comunidad.comunidad_autonoma.term_id,
                  value: comunidad.comunidad_autonoma.term_id ? `/prestaciones-comunidad?comunidad=${comunidad.comunidad_autonoma.term_id}` : '',
                  label: comunidad.comunidad_autonoma.term_id ? `${comunidad.comunidad_autonoma.name}` : ''
                }
                return autonomies
          },[]).sort((a,b) => {
            if (a.slug < b.slug)
              return -1;
            if (a.slug > b.slug)
              return 1;
            return 0;
            })} />
      </IntlProvider>
      
    </div>
        <style jsx>{`
        a, li {
            color:#ffffff!important;
        }
        .breadcrumbs {
            margin:-2rem 0 1rem 0!important;
        }
        @media screen and (min-width: 768px) {
            .wrapper {
            max-width: 80%;
            width:390px;
            margin: 0 auto;
            }
        }
        @media screen and (min-width: 1024px) {
            .wrapper {
            max-width: 50%;
            }
        }
          h1 {
            color:#391f92;
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
              width: 90%;
            }
          .item {
              width: 200px;
            }
          }
          @media screen and (min-width: 1366px) {   
            .gallery {
              width: 82%;
            }
          }
        `}</style>
  </Layout>
)

ComunidadesPrestaciones.getInitialProps = async function() {
  const res = await fetch('https://gestorbeneficios.familiasnumerosas.org/wp-json/lanauva/v1/prestaciones?_embed&nivel=Autonomico')
  const comunidades = await res.json()

  console.log(`ComunidadesPrestaciones data fetched. Count: ${comunidades.length}`)

  return { comunidades }
}

export default ComunidadesPrestaciones