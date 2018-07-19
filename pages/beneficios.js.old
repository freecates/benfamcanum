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

const today = Date.now();
const todayISO = new Date(today).toISOString();

const Localidades = (props) => (
  <Layout layout>
    <Head>
      <title>Ofertas</title>
    </Head>
    <div>
    <nav aria-label="Estás aquí:" role="navigation">
    <ul className="breadcrumbs">
        <li><Link prefetch href="/"><a>Inicio</a></Link></li>
        <li>
        <span className="show-for-sr">Actual: </span> Ofertas para familias numerosas 
        </li>
    </ul>
    </nav>
    <section className='call-to-action'>
        <div className='icones-prestacions'>
            <div className='icona'>
              <Link prefetch href="/ofertas-por-sectores"><a><img src='/static/icona-ofertas-por-sectores-familias-numerosas.png'/><div className='text-icona'>Ofertas por sectores</div></a></Link>
            </div>
            <div className='icona'> 
              <img src='/static/icona-ofertas-por-poblacion-familias-numerosas.png'/><div className='text-icona city-text'>Ofertas por población<br/>          
                <SelectCity
                  inputClass= 'city'
                  inputClass2= 'green'
                  inputValue= 'Ver'
                  options={props.beneficios.reduce((ciutats, beneficio) => {
                  if (beneficio.localidad_del_beneficio == false) {
                    return ciutats
                  }
                    ciutats[beneficio.localidad_del_beneficio.term_id] =
                    {
                      slug: beneficio.localidad_del_beneficio.slug,
                      key: beneficio.localidad_del_beneficio.term_id,
                      value: beneficio.localidad_del_beneficio ? `/localidad?localidad=${beneficio.localidad_del_beneficio.term_id}` : '',
                      label: beneficio.localidad_del_beneficio ? `${beneficio.localidad_del_beneficio.name}` : ''
                    }
                    return ciutats
              },[]).sort((a,b) => {
                if (a.slug < b.slug)
                  return -1;
                if (a.slug > b.slug)
                  return 1;
                return 0;
                })} /></div>
            </div>
            <div className='icona'> 
              <Link prefetch href="/ofertas-on-line"><a><img src='/static/icona-ofertas-online-familias-numerosas.png'/><div className='text-icona'>Ofertas online</div></a></Link>
            </div>
            <div className='icona'> 
              <Link prefetch href="/ofertas-en-el-mapa"><a><img src='/static/icona-ofertas-en-el-mapa-familias-numerosas.png'/><div className='text-icona'>Ofertas en el mapa</div></a></Link>
            </div>
            <br className='clear' />
            {props.promociones[0].acf.fecha_de_finalizaciion_de_la_promocion > todayISO ?
              <div className='promo'>
                <h4 className='align-center'><span className='label alert file-label'><Link prefetch href='/promociones'><a>Mira aquí promociones que te<br/>pueden interesar</a></Link></span></h4>
              </div>
              : ''}
        </div>
    </section>
    </div>
        <style jsx>{`
          h2 {
            color:#391f92;
            text-align:center;
          }
          .align-center {
            text-align:center;
          }
          a, li {
              color:#ffffff!important;
          }
          .promo {
            margin-top:2em;
          }
          .file-label {
            background:#cc0033!important;
            color:#ffffff;
            font-weight:400;
            font-size:1.25rem;
            white-space:normal;
          }
          .file-label a {
            color:#ffffff!important;
          }
          .file-label a:hover {
            text-decoration:none;
          }
          .breadcrumbs {
              margin:-2rem 0 1rem 0;
          }
          .call-to-action {
              text-align:center;
              margin:1em auto;
              color:#ffffff;
          }
          .call-to-action .icona {
            position:relative;
            float:left;
          }
          .clear {
            clear:both;
          }        
          .call-to-action .text-icona {
              left: 0;
              position:absolute;
              text-align:center;
              top: 65px;
              width: 100%
              font-size:1em;
          }        
          .call-to-action .text-icona.city-text {
              top: 35px;
              font-size:.9em;
          }
          @media screen and (min-width: 320px) {   
              .call-to-action {
              width: 69%;
              }
              .icones-prestacions img {
                  margin:0 0 1em 0;
              }
          }
          @media screen and (min-width: 360px) {   
              .call-to-action {
              width: 60%;
              }
          }
          @media screen and (min-width: 411px) {   
              .call-to-action {
              width: 52%;
              }
          }
          @media screen and (min-width: 768px) {   
              .call-to-action {
              width: 71%;
              }        
              .call-to-action .text-icona {
                  font-size:1.15em;
                  top: 100px;
              }
              .call-to-action .text-icona.city-text {
                font-size:1.1em;
                top: 85px;
              }
              .icones-prestacions img {
                  margin:2em;
              }
            }
            @media screen and (min-width: 1024px) {   
                .call-to-action {
                width: 53%;
                }
              }
            @media screen and (min-width: 1360px) {   
                .call-to-action {
                width: 95%;
                }
              }
        `}</style>
  </Layout>
)

Localidades.getInitialProps = async function() {
  const res = await fetch('https://gestorbeneficios.familiasnumerosas.org/wp-json/lanauva/v1/beneficios?sim-model=localidad-categoria')
  const res2 = await fetch(`https://gestorbeneficios.familiasnumerosas.org/wp-json/wp/v2/promociones`)
  const beneficios = await res.json()
  const promociones = await res2.json()

  console.log(`Ofertas data fetched. Count: ${beneficios.length}, ${promociones.length}`)

  return { beneficios, promociones }
}

export default Localidades