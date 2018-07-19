import Head from 'next/head'
import Layout from '../components/MyLayout.js'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'
import FontAwesome from 'react-fontawesome'
import {ShareButtons, ShareCounts, generateShareIcon} from 'react-share'
import {IntlProvider, FormattedDate} from 'react-intl'

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

const Promocion =  (props) => (
    <Layout>
      <Head>
        {props.promocion.acf.nombre_de_la_empresa ? <title dangerouslySetInnerHTML={ {__html: props.promocion.acf.nombre_de_la_empresa + " - Familias Numerosas"} } /> : ''}

        <meta property="og:url" content={`/oo/${props.promocion.id}/${props.promocion.slug}`} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={props.promocion.acf.nombre_de_la_empresa} />
        {props.promocion.acf.descripcion_de_la_promocion ?
        <meta property="og:description" content={props.promocion.acf.descripcion_de_la_promocion} /> : ''}
        
      </Head>
      <nav aria-label="Estás aquí:" role="navigation">
        <ul className="breadcrumbs">
          <li><Link prefetch href="/"><a>Inicio</a></Link></li>
          <li><Link prefetch href="/beneficios"><a>Ofertas comerciales</a></Link></li>
          <li><Link prefetch href="/promociones"><a>Promociones</a></Link></li>
          <li>
            <span className="show-for-sr">Actual: </span> <span dangerouslySetInnerHTML={ {__html: props.promocion.acf.nombre_de_la_empresa} } />
          </li>
        </ul>
      </nav>

      <section>

        <div className='file'>
            
            <h1><img src={'/static/' + props.promocion._embedded['wp:term'][0][0].slug +'-familias-numerosas.png'} /><br/><span dangerouslySetInnerHTML={ {__html: props.promocion.acf.nombre_de_la_empresa} } /></h1>
           
            <h4 className='location dont-break-out'><span>
            {props.promocion.acf.web_de_la_empresa ? <span><Link href={props.promocion.acf.web_de_la_empresa}><a>Accede a su web</a></Link></span> : '' }</span></h4>

          <div className='file-data'>

            <div className='file-content'>

              <h4 className='align-center'><span className='label alert file-label'>¡Promoción!</span></h4>
              
              {props.promocion.acf.descripcion_de_la_promocion ? <p className='dont-break-out' dangerouslySetInnerHTML={ {__html: props.promocion.acf.descripcion_de_la_promocion} }/> : '' }

              <p>Válida hasta el <IntlProvider defaultLocale='es'>
                <strong><FormattedDate value={props.promocion.acf.fecha_de_finalizaciion_de_la_promocion} day='numeric' month='long' year='numeric' /></strong>
              </IntlProvider></p>

              <div className='social-share-icons'>

                <div className="Post__some-network"><p><small>Comparte:</small></p></div>

                <div className="Post__some-network">
                  <FacebookShareButton url={'https://beneficiosfamiliasnumerosas.org/p/' + props.promocion.id + '/' + props.promocion.slug} className="Post__some-network__share-button"><FacebookIcon size={32} round/></FacebookShareButton>
                </div>

                <div className="Post__some-network">
                  <TwitterShareButton url={'https://beneficiosfamiliasnumerosas.org/p/' + props.promocion.id + '/' + props.promocion.slug} title={props.promocion.acf.nombre_de_la_empresa + ':' + ' ' + props.promocion.acf.titulo_de_la_oferta_oferta_socios} hashtags={['beneficiosfamiliasnumerosas']} via='famnumerosas' className="Post__some-network__share-button"><TwitterIcon size={32} round/></TwitterShareButton>
                </div>

                <div className="Post__some-network">
                  <LinkedinShareButton url={'https://beneficiosfamiliasnumerosas.org/p/' + props.promocion.id + '/' + props.promocion.slug} title={props.promocion.acf.nombre_de_la_empresa + ':' + ' ' + props.promocion.acf.titulo_de_la_oferta_oferta_socios} className="Post__some-network__share-button"><LinkedinIcon size={32} round/></LinkedinShareButton>
                </div>

                <div className="Post__some-network">
                  <EmailShareButton url={'https://beneficiosfamiliasnumerosas.org/p/' + props.promocion.id + '/' + props.promocion.slug} subject={props.promocion.acf.nombre_de_la_empresa + ':' + ' ' + props.promocion.acf.titulo_de_la_oferta_oferta_socios} body={'Échale un vistazo a esta oferta: ' + props.promocion.acf.nombre_de_la_empresa + ':' + ' ' + props.promocion.acf.titulo_de_la_oferta_oferta_socios + ' ' + 'https://beneficiosfamiliasnumerosas.org/p/' + props.promocion.id + '/' + props.promocion.slug} className="Post__some-network__share-button"><EmailIcon size={32} round/></EmailShareButton>
                </div>

              </div>

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
          .file-content {
            width: 85%;
            margin: 0 auto;
          }
        }
        @media screen and (min-width: 1024px) {
          #how-to-get-it, .file-label {
          max-width: 70%;
          }
        }
        h1, .category, .location, .file-label, .align-center {
          text-align:center;
        }
      `}</style>

    </Layout>
)

Promocion.getInitialProps = async function (context) {
  const { id } = context.query
  const res = await fetch(`https://gestorbeneficios.familiasnumerosas.org/wp-json/wp/v2/promociones/${id}?_embed`)
  const promocion = await res.json()

  console.log(`Fetched promocion: ${promocion.title.rendered}`)

  return { promocion }
}

export default Promocion
