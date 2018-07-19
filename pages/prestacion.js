import Head from 'next/head'
import Layout from '../components/MyLayout.js'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import fetch from 'isomorphic-unfetch'

const Prestacion =  (props) => (
    <Layout>
      <Head>
        {props.prestacion.acf.nombre_de_la_prestacion ? <title dangerouslySetInnerHTML={ {__html: props.prestacion.acf.nombre_de_la_prestacion + " - Familias Numerosas"} } /> : ''}
        {props.prestacion.acf.telefono ? <link rel="stylesheet" href="/static/custom.css" /> : '' }
        
      </Head>
      <nav aria-label="Estás aquí:" role="navigation">
        <ul className="breadcrumbs">
          <li><Link prefetch href="/"><a>Inicio</a></Link></li>
          <li><Link prefetch href="/prestaciones"><a>Prestaciones</a></Link></li>{props.prestacion.acf.nivel_administrativo_de_la_prestacion_publica == 'Municipal' ? <li><Link prefetch href="/municipios-prestaciones"><a>Municipios</a></Link></li> : ''}
          {props.prestacion.acf.nivel_administrativo_de_la_prestacion_publica == 'Autonómico' ? <li><Link prefetch href="/comunidades-prestaciones"><a>Comunidades</a></Link></li> : ''}{props.prestacion.acf.nivel_administrativo_de_la_prestacion_publica == 'Estatal' ? <li><Link prefetch href="/prestaciones-estatales"><a>Estatales</a></Link></li> : ''}{props.prestacion.acf.nivel_administrativo_de_la_prestacion_publica == 'Municipal' ? <li><Link prefetch as={`/p-m/${props.prestacion.acf.localidad.term_id}/${props.prestacion.acf.localidad.slug}`} href={`/prestaciones-municipio?localidad=${props.prestacion.acf.localidad.term_id}`}><a><span dangerouslySetInnerHTML={ {__html: props.prestacion.acf.localidad.name} } /></a></Link></li> : ''}
          {props.prestacion.acf.nivel_administrativo_de_la_prestacion_publica == 'Autonómico' ? <li><Link prefetch as={`/p-c/${props.prestacion.acf.comunidad_autonoma.term_id}/${props.prestacion.acf.comunidad_autonoma.slug}`} href={`/prestaciones-comunidad?comunidad=${props.prestacion.acf.comunidad_autonoma.term_id}`}><a><span dangerouslySetInnerHTML={ {__html: props.prestacion.acf.comunidad_autonoma.name} } /></a></Link></li> : ''}
          <li>
            <span className="show-for-sr">Actual: </span> <span dangerouslySetInnerHTML={ {__html: props.prestacion.acf.nombre_de_la_prestacion} } />
          </li>
        </ul>
      </nav>

      <section>

        <div className='file'>
            
            <h1><img src={'/static/' + props.prestacion._embedded['wp:term'][0][0].slug +'-prestaciones-familias-numerosas.png'} /><br/><span dangerouslySetInnerHTML={ {__html: props.prestacion.acf.nombre_de_la_prestacion} } /></h1>
           
            {props.prestacion.acf.nivel_administrativo_de_la_prestacion_publica == 'Municipal' ? <p className='location'><small><Link prefetch as={`/p-m/${props.prestacion.acf.localidad.term_id}/${props.prestacion.acf.localidad.slug}`} href={`/prestaciones-municipio?localidad=${props.prestacion.acf.localidad.term_id}`}><a title={'Ver todas las prestaciones de ' + props.prestacion.acf.localidad.name}><span dangerouslySetInnerHTML={ {__html: props.prestacion.acf.localidad.name} } /></a></Link></small></p> : ''}
           
            {props.prestacion.acf.nivel_administrativo_de_la_prestacion_publica == 'Autonómico' ? <p className='location'><small><Link prefetch as={`/p-c/${props.prestacion.acf.comunidad_autonoma.term_id}/${props.prestacion.acf.comunidad_autonoma.slug}`} href={`/prestaciones-comunidad?comunidad=${props.prestacion.acf.comunidad_autonoma.term_id}`}><a title={'Ver todas las prestaciones de ' + props.prestacion.acf.comunidad_autonoma.name}><span dangerouslySetInnerHTML={ {__html: props.prestacion.acf.comunidad_autonoma.name} } /></a></Link></small></p> : ''}

            <p className='category'><small><strong>Tipo de prestación: </strong>: {props.prestacion._embedded['wp:term'][0][0].name}</small></p>

          <div className='file-data'>

            <div className='file-img'> 

            {props.prestacion.acf.logo_de_la_localidad ? 
            
              <p><img className='img-file' width='1024' src={props.prestacion.acf.logo_de_la_localidad.sizes.large} alt={props.prestacion.acf.titulo_de_la_oferta_general} /></p> : ''}

            </div>

            <div className='file-content'>
              
              {props.prestacion.acf.descripcion_de_la_prestacion ? <p dangerouslySetInnerHTML={ {__html: props.prestacion.acf.descripcion_de_la_prestacion} }/> : '' }

              {props.prestacion.acf.enlace_de_interes ? <p className='callout align-center'><Link href={props.prestacion.acf.enlace_de_interes}><a target='_blank'>Más información</a></Link></p> : ''}

            </div>
          
          </div>  

        </div>

      </section>
        
      <style jsx>{`
        .breadcrumbs {
          margin-bottom:1em;
        }
        .file {
          en max-width:1024px;
          margin:0 auto;
        }
        h1 {
          color:#391f92;
        }
        h1 small {
          color:#ffffff;
        }
        a {
          color:#3f3fff!important;
        }
        .align-center {
          text-align:center;
        }
        .file-label {
          background:#cc0033!important;
        }
        @media screen and (min-width: 768px) {              
          .file-data {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-wrap: wrap;
                flex-wrap: wrap;
            align-items:strech;

            width: 100%;
          }
          .file-img {
            width: 35%;
            margin: 5px 20px;
          }
          .file-content {
            width: 45%;
            margin: 5px 20px;
          }
        }
        @media screen and (min-width: 1024px) {
          .file-content {
            width: 55%;
          }
        }
        @media screen and (max-width: 480px) {              
          .img-file {
            margin-left:-21px;
            max-width:111%;
          }
        }
        @media screen and (max-width: 320px) {              
          .img-file {
            margin-left:-19px;
            max-width:114%;
          }
        }
        h1, .category, .location, .file-label {
          text-align:center;
        }
      `}</style>

    </Layout>
)

Prestacion.getInitialProps = async function (context) {
  const { id } = context.query
  const res = await fetch(`https://gestorbeneficios.familiasnumerosas.org/wp-json/wp/v2/prestaciones/${id}?_embed`)
  const prestacion = await res.json()

  console.log(`Fetched prestacion: ${prestacion.title.rendered}`)

  return { prestacion }
}

export default Prestacion
