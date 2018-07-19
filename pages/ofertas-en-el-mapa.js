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

const Localidades = (props) => (
  <Layout bgmapa>
    <Head>
      <title>Ofertas geolocalizadas para familias numerosas</title>
    </Head>
    <nav aria-label="Estás aquí:" role="navigation">
    <ul className="breadcrumbs">
        <li><Link prefetch href="/"><a>Inicio</a></Link></li>
        <li><Link prefetch href="/beneficios"><a>Ofertas para familias numerosas</a></Link></li>
        <li>
        <span className="show-for-sr">Actual: </span> En el mapa 
        </li>
    </ul>
    </nav>
    <IntlProvider defaultLocale='ca'>
      <main>
        <section className='padding-4x'>
          <div className='wrapper wrapper-top'>
            <div className='left'>
              <p className='align-center no-margin-bottom padding'><Link prefetch as='/m-p' href='/mapa-proximidad'><a className='button button-blue'>Buscar cerca de tí</a></Link></p>
            </div>
            <div className='right'>
              <div className='form-component form-component-full'>       
                <SelectCity
                  inputClass= 'map'
                  options={props.beneficios.reduce((ciutats, beneficio) => {
                  if (beneficio.localidad_del_beneficio == false) {
                    return ciutats
                  }
                    ciutats[beneficio.localidad_del_beneficio.term_id] =
                    {
                      slug: beneficio.localidad_del_beneficio.slug,
                      key: beneficio.localidad_del_beneficio.term_id,
                      value: beneficio.localidad_del_beneficio ? `/mapa-localidad?localidad=${beneficio.localidad_del_beneficio.term_id}` : '',
                      label: beneficio.localidad_del_beneficio ? `${beneficio.localidad_del_beneficio.name}` : ''
                    }
                    return ciutats
              },[]).sort((a,b) => {
                if (a.slug < b.slug)
                  return -1;
                if (a.slug > b.slug)
                  return 1;
                return 0;
                })} />
              </div>
            </div>
          </div>
        </section>
      </main>
    </IntlProvider>
        <style jsx>{`
          .align-center {
            text-align:center;
          }
          .button {
            background:#d86525;
            color:#ffffff;
            text-deocration:none;
          }
          .button:hover {
            background:#aa4e1c;
            text-decoration:none;
          }
          .button-blue {
            background:#0066ff;
            width:55%;
          }
          .button-blue:hover {
            background:#0051cb;
            text-decoration:none;
          }
          .no-margin-bottom {
            margin-bottom:0;
          }
          .margin-top {
            margin-top:1rem;
          }
          .padding {
            padding:1em;
          }
          .padding-4x {
            padding:4em 2em;
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
          .form-component {
            margin:0 auto;
          }
          @media screen and (min-width: 320px) {   
            .gallery, .form-component {
              width: 100%;
            }
            .form-component-full {
              width:100%;
            }              
            .item {
              margin: 5px;
            }
            .beneficio-localidad-blue, 
            .beneficio-online-yellow , 
            .beneficio-categoria-grey,
            .bg-mapa {
              margin:0;
            }
          }
          @media screen and (max-width: 375px) {              
            .item {
              width: 124px;
            }
          }
          @media screen and (min-width: 360px) {   
            .gallery, .form-component {
              width: 90%;
            }
            .form-component-full {
              width:100%;
            }
          }
          @media screen and (min-width: 768px) {   
            .gallery, .form-component {
              width: 94%;
            }
            .form-component-full {
              width:100%;
            }
          .item {
              width: 200px;
            }
          }
          @media screen and (min-width: 1024px) {                          
            .wrapper {
              display: -ms-flexbox;
              display: flex;
              -ms-flex-wrap: wrap;
                  flex-wrap: wrap;
              align-items:center;

              width: 100%;
            }
            .wrapper-top {
              align-items:baseline;
            }
            .left {
              width: 50%;
              padding:0 0 0 0;
            }
            .right {
              width: 50%;
              padding:0 0 0 0;
            }
            .beneficio-localidad-blue, 
            .beneficio-online-yellow {
              margin:0 0 0 0;
            } 
            .beneficio-categoria-grey {
              margin:0 0 0 0;
              padding:2.8em 0;
            }
            .item {
                width: 140px;
              }
            }
          }
          @media screen and (min-width: 1366px) {   
            .gallery, .form-component {
              width: 86%;
            }
            .form-component-full {
              width:100%;
            }
          }
        `}</style>
  </Layout>
)

Localidades.getInitialProps = async function() {
  const res = await fetch('https://gestorbeneficios.familiasnumerosas.org/wp-json/lanauva/v1/beneficios?sim-model=localidad')
  const beneficios = await res.json()

  console.log(`Ofertas data fetched. Count: ${beneficios.length}`)

  return { beneficios }
}

export default Localidades