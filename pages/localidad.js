import Head from 'next/head'
import Layout from '../components/MyLayout.js'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'
import Observer from 'react-intersection-observer'
import {IntlProvider, FormattedDate} from 'react-intl'

const today = Date.now()
const todayISO = new Date(today).toISOString()

const PostsByLocalidad = (props) => (
  <Layout>
    <Head>
      <title>Beneficios Familias Numerosas - {props.posts[0].localidad_del_beneficio.name}</title>
    </Head>
    <nav aria-label="Estás aquí:" role="navigation">
      <ul className="breadcrumbs">
        <li><Link prefetch href="/"><a>Inicio</a></Link></li>
        <li><Link prefetch href="/beneficios"><a>Ofertas para familias</a></Link></li>
        <li><Link prefetch as={`/ca/${props.posts[0].comunidad_autonoma}`} href={`/comunidad?comunidad=${props.posts[0].comunidad_autonoma}`}><a>{props.posts[0].comunidad_autonoma}</a></Link></li>
        <li>
          <span className="show-for-sr">Actual: </span> Localidad: {props.posts[0].localidad_del_beneficio.name} 
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
                banner.acf.comunidad_autonoma.name == props.posts[0].comunidad_autonoma ? (
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
                            src={banner.acf.baner_movil.sizes.large}
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
      <h1>Beneficios en {props.posts[0].localidad_del_beneficio.name}</h1>
      <p className='align-center'><small><Link prefetch as={`/m-l/${props.posts[0].localidad_del_beneficio.term_id}/${props.posts[0].localidad_del_beneficio.slug}`} href={`/mapa-localidad?localidad=${props.posts[0].localidad_del_beneficio.term_id}`}><a><img src='/static/icona-mapa-familias-numerosas.png' /> ver en el mapa</a></Link></small></p>
      <IntlProvider defaultLocale='es'>
        <section>
          {props.marcasofertas.length >= 1 ?
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
          <ul className='gallery'>
            {props.posts.map((post, index) => (
              <li className='benefit' key={index}>
                {post.imagen_destacada_de_la_oferta_general_thumb ? <Observer threshold={1} triggerOnce={true} render={() => (<p className='fade-in'><Link prefetch as={`/p/${post.ID}/${post.slug}`} href={`/post?id=${post.ID}`}><a><img width='250' src={post.imagen_destacada_de_la_oferta_general_thumb.sizes.thumbnail} alt={post.titulo_de_la_oferta_oferta_general} /></a></Link></p>)} /> : ''}

                {post.imagen_destacada_de_la_oferta_socios_thumb ? <Observer threshold={1} triggerOnce={true} render={() => (<p className='fade-in'><Link prefetch as={`/p/${post.ID}/${post.slug}`} href={`/post?id=${post.ID}`}><a><img width='250' src={post.imagen_destacada_de_la_oferta_socios_thumb.sizes.thumbnail} alt={post.titulo_de_la_oferta_oferta_socios} /><span className='label alert gallery-label'><small>EXCLUSIVO<br/> SOCIOS</small></span></a></Link></p>)} /> : ''}

                <p><Link prefetch as={`/p/${post.ID}/${post.slug}`} href={`/post?id=${post.ID}`}>
                  <a dangerouslySetInnerHTML={ {__html: post.name} } />
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
        <style jsx>{`
          .national-gallery {
            background:#eeeeee;
            margin-top:1em!important;
            margin-bottom:1em!important;
            padding-top:.75em!important;
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
              margin: 7.5px;
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
          }
          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
        `}</style>
  </Layout>
)

PostsByLocalidad.getInitialProps = async function(context) {
  const { localidad } = context.query
  const res = await fetch(`https://gestorbeneficios.familiasnumerosas.org/wp-json/lanauva/v1/beneficios?_embed&localidad=${localidad}`)
  const posts = await res.json()
  const res2 = await fetch(`https://gestorbeneficios.familiasnumerosas.org/wp-json/lanauva/v1/ofertas_grandes_marc?_embed&localidad=${localidad}`)
  const marcasofertas = await res2.json()
  const res3 = await fetch(
    `https://gestorbeneficios.familiasnumerosas.org/wp-json/wp/v2/banners`
  )
  const banners = await res3.json()

  console.log(`Posts data fetched. Count: ${posts.length}, ${marcasofertas.length}, ${banners.length}`)

  return { posts, marcasofertas, banners }
}

export default PostsByLocalidad