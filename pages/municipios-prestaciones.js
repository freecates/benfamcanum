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

const MunicipiosPrestaciones = (props) => (
  <Layout layout>
    <Head>
      <title>Prestaciones Familias Numerosas - Municipios</title>
    </Head>
      <nav aria-label="Estás aquí:" role="navigation">
      <ul className="breadcrumbs">
          <li><Link prefetch href="/"><a>Inicio</a></Link></li>
          <li><Link prefetch href="/prestaciones"><a>Prestaciones ofciales</a></Link></li>
          <li>
          <span className="show-for-sr">Actual: </span> Municipios con prestaciones 
          </li>
      </ul>
      </nav>

    <div className='wrapper'>
      
      <IntlProvider defaultLocale='ca'>

        <SelectCity
            inputClass= 'benefit'
            localBenefit={true}
            options={props.municipios.reduce((ciutats, municipio) => {
              if (municipio.localidad == false) {
                return ciutats
              }
              ciutats[municipio.localidad.term_id] =
                {
                  slug: municipio.localidad.slug,
                  key: municipio.localidad.term_id,
                  value: municipio.localidad.term_id ? `/prestaciones-municipio?localidad=${municipio.localidad.term_id}` : '',
                  label: municipio.localidad.term_id ? `${municipio.localidad.name}` : ''
                }
                return ciutats
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

MunicipiosPrestaciones.getInitialProps = async function() {
  const res = await fetch('https://gestorbeneficios.familiasnumerosas.org/wp-json/lanauva/v1/prestaciones?_embed&nivel=Municipal')
  const municipios = await res.json()

  console.log(`MunicipiosPrestaciones data fetched. Count: ${municipios.length}`)

  return { municipios }
}

export default MunicipiosPrestaciones