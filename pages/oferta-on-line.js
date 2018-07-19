import Head from 'next/head'
import Layout from '../components/MyLayout.js'
import IsMember from '../components/IsMember.js'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'
import FontAwesome from 'react-fontawesome'
import {ShareButtons, ShareCounts, generateShareIcon} from 'react-share'

const {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  EmailShareButton,
} = ShareButtons

const FacebookIcon = generateShareIcon('facebook')
const TwitterIcon = generateShareIcon('twitter')
const LinkedinIcon = generateShareIcon('linkedin')
const EmailIcon = generateShareIcon('email')

const OfertaOnLine =  (props) => (
    <Layout>
      <Head>
        {props.ofertaonline.acf.nombre_del_establecimiento ? <title dangerouslySetInnerHTML={ {__html: props.ofertaonline.acf.nombre_del_establecimiento + " - Familias Numerosas"} }/> : ''}
        {props.ofertaonline.acf.telefono ? <link rel="stylesheet" href="/static/custom.css" /> : '' }

        <meta property="og:url" content={`/oo/${props.ofertaonline.id}/${props.ofertaonline.slug}`} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={props.ofertaonline.acf.nombre_del_establecimiento} />
        {props.ofertaonline.acf.descripcion_de_la_oferta_online_exclusiva_socios ?
        <meta property="og:description" content={props.ofertaonline.acf.descripcion_de_la_oferta_online_exclusiva_socios} /> : ''}
        {props.ofertaonline.acf.descripcion_de_la_oferta_oferta_general ? 
        <meta property="og:description" content={props.ofertaonline.acf.descripcion_de_la_oferta_oferta_general} /> : ''}
        {props.ofertaonline.acf.imagen_destacada_de_la_oferta_socios_large ?
        <meta property="og:image" content={props.ofertaonline.acf.imagen_destacada_de_la_oferta_socios_large.sizes.large} /> : ''}
        {props.ofertaonline.acf.imagen_destacada_de_la_oferta_general_large ? 
        <meta property="og:image" content={props.ofertaonline.acf.imagen_destacada_de_la_oferta_general_large.sizes.large} /> : ''}
        <meta property="og:image:width" content="1024" />
        <meta property="og:image:height" content="1024" />
        
      </Head>
      <nav aria-label="Estás aquí:" role="navigation">
        <ul className="breadcrumbs">
          <li><Link prefetch href="/"><a>Inicio</a></Link></li>
        <li><Link prefetch href="/beneficios"><a>Ofertas para familias</a></Link></li>
          <li><Link prefetch href="/ofertas-on-line"><a>Ofertas On Line</a></Link></li>
          <li><Link prefetch as={`/c-o-o/${props.ofertaonline.acf.categoria_de_la_oferta.term_id}/${props.ofertaonline._embedded['wp:term'][0][0].slug}`} href={`/category-ofertas-on-line?id=${props.ofertaonline.acf.categoria_de_la_oferta.term_id}`}><a>{props.ofertaonline._embedded['wp:term'][0][0].name}</a></Link></li>
          <li>
            <span className="show-for-sr">Actual: </span> <span dangerouslySetInnerHTML={ {__html: props.ofertaonline.acf.nombre_del_establecimiento} } />
          </li>
        </ul>
      </nav>

      <section>

        <div className='file'>
            
            <h1><img src={'/static/' + props.ofertaonline._embedded['wp:term'][0][0].slug +'-familias-numerosas.png'} /><br/><span dangerouslySetInnerHTML={ {__html: props.ofertaonline.acf.nombre_del_establecimiento} } /> {props.ofertaonline.acf.descripcion_de_la_oferta_online_exclusiva_socios ? <span className='label alert file-label'><small>EXCLUSIVO<br /> SOCIOS</small></span> : '' }</h1>
           
            <h4 className='location dont-break-out'><span>
            {props.ofertaonline.acf.url_de_la_oferta_online ? <span><Link href={props.ofertaonline.acf.url_de_la_oferta_online}><a>Accede a su web</a></Link></span> : '' }</span></h4>

            <p className='category'><small><strong>Categoria</strong>: <Link prefetch as={`/c-o-o/${props.ofertaonline.acf.categoria_de_la_oferta.term_id}/${props.ofertaonline._embedded['wp:term'][0][0].slug}`} href={`/category-ofertas-on-line?id=${props.ofertaonline.acf.categoria_de_la_oferta.term_id}`}><a title={'Ver todas las ofertas de la categoría ' + props.ofertaonline._embedded['wp:term'][0][0].name}>{props.ofertaonline._embedded['wp:term'][0][0].name}</a></Link></small></p>

          <div className='file-data'>

            <div className='file-img'>

            {props.ofertaonline.acf.imagen_destacada_de_la_oferta_socios_large ? 
            
              <p><img className='img-file' width='1024' src={props.ofertaonline.acf.imagen_destacada_de_la_oferta_socios_large.sizes.large} alt={props.ofertaonline.acf.titulo_de_la_oferta_online_exclusiva_socios} /></p> : ''}   

            {props.ofertaonline.acf.imagen_destacada_de_la_oferta_general_large ? 
            
              <p><img className='img-file' width='1024' src={props.ofertaonline.acf.imagen_destacada_de_la_oferta_general_large.sizes.large} alt={props.ofertaonline.acf.titulo_de_la_oferta_general} /></p> : ''}

            </div>

            <div className='file-content'>              

            {props.ofertaonline.acf.como_conseguir_la_oferta_online_exclusiva_socios ?
                  
                <h1><span className='label alert file-label'><Link href="#how-to-get-it"><a>EXCLUSIVO SOCIOS.<br/>MIRA COMO CONSEGUIR ESTA OFERTA</a></Link><br/><FontAwesome
                name='check-circle-o'
                size='2x'
                style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
              /></span></h1> : ''}
              
              {props.ofertaonline.acf.titulo_de_la_oferta_online_exclusiva_socios ? <h4>{props.ofertaonline.acf.titulo_de_la_oferta_online_exclusiva_socios}</h4> : '' }
              
              {props.ofertaonline.acf.descripcion_de_la_oferta_online_exclusiva_socios ? <p className='dont-break-out' dangerouslySetInnerHTML={ {__html: props.ofertaonline.acf.descripcion_de_la_oferta_online_exclusiva_socios} }/> : '' }
             
              {props.ofertaonline.acf.titulo_de_la_oferta_general_online ? <h4>{props.ofertaonline.acf.titulo_de_la_oferta_general_online}</h4> : '' }
              
              {props.ofertaonline.acf.descripcion_de_la_oferta_general_online ? <p className='dont-break-out' dangerouslySetInnerHTML={ {__html: props.ofertaonline.acf.descripcion_de_la_oferta_general_online} }/> : '' }

              <div className='social-share-icons'>

                <div className="Post__some-network"><p><small>Comparte:</small></p></div>

                <div className="Post__some-network">
                  <FacebookShareButton url={'https://beneficiosfamiliasnumerosas.org/p/' + props.ofertaonline.id + '/' + props.ofertaonline.slug} className="Post__some-network__share-button"><FacebookIcon size={32} round/></FacebookShareButton>
                </div>

                <div className="Post__some-network">
                  <TwitterShareButton url={'https://beneficiosfamiliasnumerosas.org/p/' + props.ofertaonline.id + '/' + props.ofertaonline.slug} title={props.ofertaonline.acf.nombre_del_establecimiento + ':' + ' ' + props.ofertaonline.acf.titulo_de_la_oferta_oferta_socios} hashtags={['beneficiosfamiliasnumerosas']} via='famnumerosas' className="Post__some-network__share-button"><TwitterIcon size={32} round/></TwitterShareButton>
                </div>

                <div className="Post__some-network">
                  <LinkedinShareButton url={'https://beneficiosfamiliasnumerosas.org/p/' + props.ofertaonline.id + '/' + props.ofertaonline.slug} title={props.ofertaonline.acf.nombre_del_establecimiento + ':' + ' ' + props.ofertaonline.acf.titulo_de_la_oferta_oferta_socios} className="Post__some-network__share-button"><LinkedinIcon size={32} round/></LinkedinShareButton>
                </div>

                <div className="Post__some-network">
                  <EmailShareButton url={'https://beneficiosfamiliasnumerosas.org/p/' + props.ofertaonline.id + '/' + props.ofertaonline.slug} subject={props.ofertaonline.acf.nombre_del_establecimiento + ':' + ' ' + props.ofertaonline.acf.titulo_de_la_oferta_oferta_socios} body={'Échale un vistazo a esta oferta: ' + props.ofertaonline.acf.nombre_del_establecimiento + ':' + ' ' + props.ofertaonline.acf.titulo_de_la_oferta_oferta_socios + ' ' + 'https://beneficiosfamiliasnumerosas.org/p/' + props.ofertaonline.id + '/' + props.ofertaonline.slug} className="Post__some-network__share-button"><EmailIcon size={32} round/></EmailShareButton>
                </div>

              </div>
              {props.ofertaonline.acf.como_conseguir_la_oferta_online_exclusiva_socios ?
                <div id='how-to-get-it'>
                <IsMember 
                  dataOK={<div dangerouslySetInnerHTML={ {__html: props.ofertaonline.acf.como_conseguir_la_oferta_online_exclusiva_socios} } />} 
                  ID={props.ofertaonline.slug + '-' + props.ofertaonline.id}
                  Title={props.ofertaonline.title.rendered}
                  URL={'oo/' + props.ofertaonline.id + '/' + props.ofertaonline.slug}
                />
                </div> : ''}

            </div>
          
          </div>

        </div>

      </section>
        
      <style jsx>{`     
        .Post__some-network {
          vertical-align: top;
          display: inline-block;
          margin-right: 20px;
          text-align: center;
        }
        .social-share-icons {
          margin-bottom:1.5rem;
        }
        .breadcrumbs {
          margin-bottom:1em;
        }
        .file {
          max-width:1024px;
          margin:0 auto;
        }
        h1 {
          color:#391f92;
        }
        h1 small {
          color:#ffffff;
          font-weight:bold;
        }
        a {
          color:#3f3fff!important;
        }
        .file-label {
          background:#cc0033!important;
          color:#ffffff;
          font-weight:bold;
          font-size:1rem;
        }
        .file-label a {
          color:#ffffff!important;
        }
        .file-label a:hover {
          text-decoration:none;
        }
        .button.button-green {
          color:#ffffff!important;
          background:#009933;
        }
        .button.button-green:hover {
          background:#007e2a;
        }
        .dont-break-out {          
          overflow-wrap: break-word;
          word-wrap: break-word;
          -ms-hyphens: auto;
          -moz-hyphens: auto;
          -webkit-hyphens: auto;
          hyphens: auto;
        }
        @media screen and (min-width: 768px) {              
          .file-data {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-wrap: wrap;
                flex-wrap: wrap;
            align-items:stretch;

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
          #how-to-get-it, .file-label {
          max-width: 70%;
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
        h1, .category, .location, .file-label, .align-center {
          text-align:center;
        }
      `}</style>

    </Layout>
)

OfertaOnLine.getInitialProps = async function (context) {
  const { id } = context.query
  const res = await fetch(`https://gestorbeneficios.familiasnumerosas.org/wp-json/wp/v2/ofertas_online/${id}?_embed`)
  const ofertaonline = await res.json()

  console.log(`Fetched ofertaonline: ${ofertaonline.title.rendered}`)

  return { ofertaonline }
}

export default OfertaOnLine
