import Head from 'next/head'
import Layout from '../components/MyLayout.js'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'
import Observer from 'react-intersection-observer'
import {IntlProvider, FormattedDate} from 'react-intl'

const today = Date.now()
const todayISO = new Date(today).toISOString()

const PostsByCategoryLocalidad = (props) => (
  <Layout>
    <Head>
      <title>Beneficios - {props.posts[0].categoria_de_la_prestacion.name} - {props.posts[0].localidad_del_beneficio.name}</title>
    </Head>
    <nav aria-label="Estás aquí:" role="navigation">
      <ul className="breadcrumbs">
        <li><Link prefetch href="/"><a>Inicio</a></Link></li>
        <li><Link prefetch href="/beneficios"><a>Ofertas para familias</a></Link></li>
        <li><Link prefetch as={`/c/${props.posts[0].categoria_de_la_prestacion.term_id}/${props.posts[0].categoria_de_la_prestacion.slug}`} href={`/category?id=${props.posts[0].categoria_de_la_prestacion.term_id}`}><a>{props.posts[0].categoria_de_la_prestacion.name}</a></Link></li>
        <li><Link prefetch as={`/c-ca/${props.posts[0].categoria_de_la_prestacion.term_id}/${props.posts[0].categoria_de_la_prestacion.slug}/${props.posts[0].comunidad_autonoma}/${props.marcasofertas[0].comunidad_autonoma.term_id}`} href={`/category-comunidad?sid=${props.posts[0].categoria_de_la_prestacion.term_id}&comunidad=${props.posts[0].comunidad_autonoma}&caid=${props.marcasofertas[0].comunidad_autonoma.term_id}`}><a>{props.posts[0].comunidad_autonoma}</a></Link></li>
        <li>
          <span className="show-for-sr">Actual: </span> {props.posts[0].localidad_del_beneficio.name} 
        </li>
      </ul>
    </nav>
    <section>
          <div>
            {props.banners.map((banner, index) => (
              <React.Fragment key={index}>
                {banner.acf.fecha_de_finalizaciion_de_la_promocion >
                  todayISO &&
                banner.acf.la_publicidad_es_de_ca == true &&
                banner.acf.comunidad_autonoma.name == props.posts[0].comunidad_autonoma &&
                banner.acf.sector_del_banner.term_id == props.sid ? (
                  <React.Fragment>
                    <p className="align-center promo dk">
                      <Link href={banner.acf.url_de_destino_del_banner}>
                        <a target="_blank">
                          <img
                            src={
                              banner.acf.banner_grande_728x90.sizes.large
                            }
                          />
                        </a>
                      </Link>
                    </p>
                    <p className="align-center promo mb">
                      <Link href={banner.acf.url_de_destino_del_banner}>
                        <a target="_blank">
                          <img
                            src={banner.acf.baner_movil_320x100.sizes.large}
                          />
                        </a>
                      </Link>
                    </p>
                  </React.Fragment>
                ) : (
                  ''
                )}
              </React.Fragment>
            ))}
          </div>
      <h1>Beneficios de {props.posts[0].categoria_de_la_prestacion.name} en {props.posts[0].localidad_del_beneficio.name}</h1>
      <p className='align-center'><small><Link prefetch as={`/m-c-l/${props.posts[0].categoria_de_la_prestacion.term_id}/${props.posts[0].categoria_de_la_prestacion.slug}/${props.posts[0].localidad_del_beneficio.term_id}/${props.posts[0].localidad_del_beneficio.slug}`} href={`/mapa-category-localidad?id=${props.posts[0].categoria_de_la_prestacion.term_id}&localidad=${props.posts[0].localidad_del_beneficio.term_id}`}><a><img src='/static/icona-mapa-familias-numerosas.png' /> ver en el mapa</a></Link></small></p>
      <IntlProvider defaultLocale='es'>
        <section>
          {props.uniquemarcas.length >= 1 ?
          <ul className='gallery national-gallery'>
              {props.marcasofertas.reduce((marcas, marcasoferta) => {
                if (marcasoferta.marca == false) {
                  return marcas
                }
                marcas[marcasoferta.marca.term_id] =
                (
                <span key={marcasoferta.marca.term_id}>            
                <li className='benefit align-center'>
                <Observer threshold={1} triggerOnce={true} render={() => (<p className='fade-in'>
                  <Link prefetch as={`/m-o-g-m/${marcasoferta.marca.term_id}/${marcasoferta.marca.slug}`} href={`/ofertas-de-la-marca?id=${marcasoferta.marca.term_id}`}>
                    <a title={'Ver todas las ofertas de ' + marcasoferta.marca.name}><img src={'/static/' + marcasoferta.marca.slug +'-familias-numerosas.png'} /><br/> <span dangerouslySetInnerHTML={ {__html: marcasoferta.marca.name} } /></a>
                  </Link></p>)} />
                </li>
                </span>
                )
                return marcas
            },[])}
            </ul> :'' }
          {props.marcacasofertas.length >= 1 ?
          <ul className='gallery national-gallery'>
              {props.marcacasofertas.reduce((marcas, marcacasoferta) => {
                if (marcacasoferta.marca == false) {
                  return marcas
                }
                marcas[marcacasoferta.marca.term_id] =
                (
                <span key={marcacasoferta.marca.term_id}>            
                <li className='benefit align-center'>
                <Observer threshold={1} triggerOnce={true} render={() => (<p className='fade-in'>
                  <Link prefetch as={`/m-o-g-m-ca/${marcacasoferta.marca.term_id}/${marcacasoferta.marca.slug}`} href={`/ofertas-de-la-marca-ca?id=${marcacasoferta.marca.term_id}`}>
                    <a title={'Ver todas las ofertas de ' + marcacasoferta.marca.name}><img src={'/static/' + marcacasoferta.marca.slug +'-familias-numerosas.png'} /><br/> <span dangerouslySetInnerHTML={ {__html: marcacasoferta.marca.name} } /></a>
                  </Link></p>)} />
                </li>
                </span>
                )
                return marcas
            },[])}
            </ul> :'' }
          <ul className='gallery'>
            {props.posts.map((post, index) => (
              <li className='benefit' key={index}>
                {post.imagen_destacada_de_la_oferta_general_thumb ? <Observer threshold={1} triggerOnce={true} render={() => (<p className='fade-in'><Link prefetch as={`/p/${post.ID}/${post.slug}`} href={`/post?id=${post.ID}`}><a title={'Ver la ficha de ' + post.name}><img width='250' src={post.imagen_destacada_de_la_oferta_general_thumb.sizes.thumbnail} alt={post.titulo_de_la_oferta_oferta_general} /></a></Link></p>)} /> : ''}

                {post.imagen_destacada_de_la_oferta_socios_thumb ? <Observer threshold={1} triggerOnce={true} render={() => (<p className='fade-in'><Link prefetch as={`/p/${post.ID}/${post.slug}`} href={`/post?id=${post.ID}`}><a title={'Ver la ficha de ' + post.name}><img width='250' src={post.imagen_destacada_de_la_oferta_socios_thumb.sizes.thumbnail} alt={post.titulo_de_la_oferta_oferta_socios} /><span className='label alert gallery-label'><small>EXCLUSIVO<br/> SOCIOS</small></span></a></Link></p>)} /> : ''}

                <p><Link prefetch as={`/p/${post.ID}/${post.slug}`} href={`/post?id=${post.ID}`}>
                  <a title={'Ver la ficha de ' + post.name} dangerouslySetInnerHTML={ {__html: post.name} } />
                </Link><br/>
                
                <small>{post.localidad_del_beneficio.name}</small><br />

                {post.titulo_de_la_oferta_oferta_general ?
                <span className='titulo-oferta'>{post.titulo_de_la_oferta_oferta_general}</span> : '' }

                {post.titulo_de_la_oferta_oferta_socios ?
                <span className='titulo-oferta'>{post.titulo_de_la_oferta_oferta_socios}</span> : '' }

                </p>
              </li>
            ))}
          </ul>
        </section>
      </IntlProvider>
    </section>
        {props.uniquemarcas.length >= 2 ?
          <style jsx>{`
          .national-gallery {
            background:#eeeeee;
            margin-top:1em!important;
            margin-bottom:1em!important;
            padding-top:.75em!important;
          }
          @media screen and (max-width: 1023px) {
            .national-gallery {
              margin-top:1em!important;
              margin-bottom:0!important;
            }
          section ul.national-gallery:nth-child(2) {
            margin-bottom:1em!important;
            margin-top:0!important;
          }
          }
          .breadcrumbs {
            margin-bottom:1em;
          }
          .dk {
            display: none;
          }
          .promo {
            margin-top: 1em;
          }
          h1, .align-center {
            text-align:center;
          }
          h1 {
            color:#391f92;
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
          nav a {
            color:#3f3fff;
          }
          .benefit {
            width: 150px;
          }
          .gallery-label {
            position:relative;
            margin-top:-40px;
            margin-right:5px;
            float:right;
            text-align:center;
            background:#cc0033!important;
          }
          .titulo-oferta {
            color:#ff0000;
          }
          @media screen and (min-width: 320px) {   
            .gallery {
              width: 100%;
            }              
            .benefit {
              margin: 5px;
            }
          }
          @media screen and (max-width: 375px) {              
            .benefit {
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
          .benefit {
              width: 200px;
              margin:7.5px;
            }
            .dk {
              display: block;
            }
            .mb {
              display: none;
            }
          }
          @media screen and (min-width: 1024px) {   
            .gallery {
              width: 100%;
            }  
            .national-gallery.gallery {
              width:50%;
              float:left;
            }
          .benefit {
              width: 220px;
              margin:0 10px;
            }
          }
          @media screen and (min-width: 1160px) {
          .benefit {
              width: 245px;
            }
          }
          .fade-in {
            animation-name: fadeIn;
            animation-duration: 1.3s;
            animation-timing-function: cubic-bezier(0, 0, 0.4, 1);
            animation-fill-mode: forwards;
          }
          `}</style> :
           
        <style jsx>{`
        .national-gallery {
          background:#eeeeee;
          margin-top:1em!important;
          padding-top:.75em!important;
        }
        .national-gallery:last-child {
          margin-bottom:1em!important;
        }
        .breadcrumbs {
          margin-bottom:1em;
        }
        h1, .align-center {
          text-align:center;
        }
        h1 {
          color:#391f92;
        }
        .dk {
          display: none;
        }
        .promo {
          margin-top: 1em;
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
        nav a {
          color:#3f3fff;
        }
        .benefit {
          width: 150px;
        }
        .gallery-label {
          position:relative;
          margin-top:-40px;
          margin-right:5px;
          float:right;
          text-align:center;
          background:#cc0033!important;
        }
        .titulo-oferta {
          color:#ff0000;
        }
        @media screen and (min-width: 320px) {   
          .gallery {
            width: 100%;
          }              
          .benefit {
            margin: 5px;
          }
        }
        @media screen and (max-width: 375px) {              
          .benefit {
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
        .benefit {
            width: 200px;
            margin:7.5px;
          }
          .dk {
            display: block;
          }
          .mb {
            display: none;
          }
        }
        @media screen and (min-width: 1024px) {   
          .gallery {
            width: 100%;
          }
        .benefit {
            width: 220px;
            margin:0 10px;
          }
        }
        @media screen and (min-width: 1160px) {
        .benefit {
            width: 245px;
          }
        }
        .fade-in {
          animation-name: fadeIn;
          animation-duration: 1.3s;
          animation-timing-function: cubic-bezier(0, 0, 0.4, 1);
          animation-fill-mode: forwards;
        }`}</style>
           }
  </Layout>
)

PostsByCategoryLocalidad.getInitialProps = async function(context) {
  const { sid } = context.query
  const { localidad } = context.query
  const { caid } = context.query
  const res = await fetch(`https://gestorbeneficios.familiasnumerosas.org/wp-json/lanauva/v1/beneficios?_embed&categoria_del_beneficio=${sid}&localidad=${localidad}`)
  const posts = await res.json()
  const res2 = await fetch(`https://gestorbeneficios.familiasnumerosas.org/wp-json/lanauva/v1/ofertas_grandes_marc?_embed&categoria_de_la_oferta_grande_marc=${sid}&localidad=${localidad}&sim-model=id-marca`)
  const marcasofertas = await res2.json()
  const res3 = await fetch(`https://gestorbeneficios.familiasnumerosas.org/wp-json/lanauva/v1/of_gr_m_ca?_embed&categoria_de_la_of_gr_m_ca=${sid}&localidad=${localidad}&sim-model=id-marca`)
  const marcacasofertas = await res3.json()

  const res4 = await fetch(
    `https://gestorbeneficios.familiasnumerosas.org/wp-json/wp/v2/banners_sectoriales`
  )
  const banners = await res4.json()

  console.log(`Posts data fetched. Count: ${posts.length}, ${marcasofertas.length}, ${marcacasofertas.length}, ${sid}, ${caid}`)
  const uniquemarcas = [...(new Set(marcasofertas.map(({ marca }) => marca.name)))];

  return { posts, marcasofertas, marcacasofertas, uniquemarcas, banners, sid }
}

export default PostsByCategoryLocalidad