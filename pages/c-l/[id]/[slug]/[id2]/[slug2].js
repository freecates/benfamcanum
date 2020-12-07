import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { IntlProvider } from 'react-intl';
import Layout from '@components/MyLayout.js';
import Gallery from '@components/Gallery.js';
import BrandsGallery from '@components/BrandsGallery.js';
import Banners from '@components/Banners';
import Fallback from '@components/Fallback.js';

const today = Date.now();
const todayISO = new Date(today).toISOString();

const PostsByCategoryLocalidad = props => {
  const { isFallback } = useRouter();
  if (!isFallback && !props.posts) {
    return <Custom404 />;
  }
  if (isFallback) {
    return <Fallback breadCrumb={'Beneficios'} />;
  }
  if (props.post === '404') {
    return <Fallback breadCrumb={'Beneficios'} notFound />;
  }
  return (
    <Layout>
      <Head>
        <title>
          Beneficios - {props.posts[0].categoria_de_la_prestacion.name} -{' '}
          {props.posts[0].localidad_del_beneficio.name}
        </title>
      </Head>
      <nav aria-label="Estás aquí:" role="navigation">
        <ul className="breadcrumbs">
          <li>
            <Link href="/">
              <a>Inicio</a>
            </Link>
          </li>
          <li>
            <Link href="/beneficios">
              <a>Ofertas para familias</a>
            </Link>
          </li>
          <li>
            <Link
              href={`/c/${props.posts[0].categoria_de_la_prestacion.term_id}/${props.posts[0].categoria_de_la_prestacion.slug}`}
            >
              <a>{props.posts[0].categoria_de_la_prestacion.name}</a>
            </Link>
          </li>
          <li>
            <Link
              href={`/c-ca/${props.posts[0].categoria_de_la_prestacion.term_id}/${props.posts[0].categoria_de_la_prestacion.slug}/cataluna/8143`}
            >
              <a>{props.posts[0].comunidad_autonoma}</a>
            </Link>
          </li>

          <li>
            <span className="show-for-sr">Actual: </span>{' '}
            {props.posts[0].localidad_del_beneficio.name}
          </li>
        </ul>
      </nav>
      <section>
        <Banners data={props.banners} />
        <h1>
          Beneficios de {props.posts[0].categoria_de_la_prestacion.name} en{' '}
          {props.posts[0].localidad_del_beneficio.name}
        </h1>
        <p className="align-center">
          <small>
            <Link
              href={`/m-c-l/${props.posts[0].categoria_de_la_prestacion.term_id}/${props.posts[0].categoria_de_la_prestacion.slug}/${props.posts[0].localidad_del_beneficio.term_id}/${props.posts[0].localidad_del_beneficio.slug}`}
            >
              <a>
                <img
                  src="/static/icona-mapa-familias-numerosas.png"
                  height={'30'}
                  width={'33'}
                  loading={'lazy'}
                />{' '}
                ver en el mapa
              </a>
            </Link>
          </small>
        </p>
        <IntlProvider defaultLocale="es">
          <section>
            {props.uniquemarcas.length >= 1 ? <BrandsGallery data={props.marcasofertas} /> : null}
            {props.marcacasofertas.length >= 1 ? (
              <BrandsGallery data={props.marcacasofertas} type={'ca'} />
            ) : null}
            <Gallery data={props.posts} />
          </section>
        </IntlProvider>
      </section>
      {props.uniquemarcas.length >= 2 && props.uniquecamarcas.length >= 1 ? (
        <style jsx>{`
          .national-gallery {
            background: #eeeeee;
            margin-top: 1em !important;
            margin-bottom: 1em !important;
            padding-top: 0.75em !important;
          }
          @media screen and (max-width: 1023px) {
            .national-gallery {
              margin-top: 1em !important;
              margin-bottom: 0 !important;
            }
            section ul.national-gallery:nth-child(2) {
              margin-bottom: 1em !important;
              margin-top: 0 !important;
            }
          }
          .breadcrumbs {
            margin-bottom: 1em;
          }
          .dk {
            display: none;
          }
          .promo {
            margin-top: 1em;
          }
          h1,
          .align-center {
            text-align: center;
          }
          h1 {
            color: #cb5599;
          }
          .gallery {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-wrap: wrap;
            flex-wrap: wrap;
            padding: 5px;
          }
          ul {
            list-style-type: none !important;
            margin-left: 0;
            margin: 0 auto !important;
          }
          a {
            color: inherit !important;
          }
          a:hover {
            text-decoration: underline;
          }
          nav a {
            color: #00add9;
          }
          .benefit {
            width: 150px;
          }
          .gallery-label {
            position: relative;
            margin-top: -40px;
            margin-right: 5px;
            float: right;
            text-align: center;
            background: #f18903 !important;
          }
          .titulo-oferta {
            color: #ff0000;
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
            .national-gallery.gallery {
              width: 50%;
              float: left;
            }
            .benefit {
              width: 220px;
              margin: 0 10px;
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
        `}</style>
      ) : (
        <style jsx>{`
          .national-gallery {
            background: #eeeeee;
            margin-top: 1em !important;
            padding-top: 0.75em !important;
          }
          .national-gallery:last-child {
            margin-bottom: 1em !important;
          }
          .breadcrumbs {
            margin-bottom: 1em;
          }
          h1,
          .align-center {
            text-align: center;
          }
          h1 {
            color: #cb5599;
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
            list-style-type: none !important;
            margin-left: 0;
            margin: 0 auto !important;
          }
          a {
            color: inherit !important;
          }
          a:hover {
            text-decoration: underline;
          }
          nav a {
            color: #00add9;
          }
          .benefit {
            width: 150px;
          }
          .gallery-label {
            position: relative;
            margin-top: -40px;
            margin-right: 5px;
            float: right;
            text-align: center;
            background: #f18903 !important;
          }
          .titulo-oferta {
            color: #ff0000;
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
              margin: 0 10px;
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
        `}</style>
      )}
    </Layout>
  );
};

export async function getStaticPaths() {
  const res = await fetch(
    'https://gestorbeneficis.fanoc.org/wp-json/lanauva/v1/beneficios?_embed&per_page=100'
  );
  const categoriesLocalidad = await res.json();

  const paths = categoriesLocalidad.map(
    cl =>
      `/c-l/${cl.categoria_de_la_prestacion.term_id}/${cl.categoria_de_la_prestacion.slug}/${cl.localidad_del_beneficio.term_id}/${cl.localidad_del_beneficio.slug}`
  );

  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  const sid = params.id;
  const localidad = params.id2;

  const res = await fetch(
    `https://gestorbeneficis.fanoc.org/wp-json/lanauva/v1/beneficios?_embed&categoria_del_beneficio=${sid}&localidad=${localidad}`
  );
  const posts = await res.json();
  const res2 = await fetch(
    `https://gestorbeneficis.fanoc.org/wp-json/lanauva/v1/ofertas_grandes_marc?_embed&categoria_de_la_oferta_grande_marc=${sid}&localidad=${localidad}&sim-model=id-marca`
  );
  const almostuniquemarcas = await res2.json();
  const marcasofertas = almostuniquemarcas.filter(x => x.marca != null && x.marca != '');

  const res3 = await fetch(
    `https://gestorbeneficis.fanoc.org/wp-json/lanauva/v1/of_gr_m_ca?_embed&categoria_de_la_of_gr_m_ca=${sid}&localidad=${localidad}&sim-model=id-marca`
  );

  const almostuniquecamarcas = await res3.json();
  const marcacasofertas = almostuniquecamarcas.filter(x => x.marca != null && x.marca != '');

  const res4 = await fetch(
    `https://gestorbeneficis.fanoc.org/wp-json/wp/v2/banners_sectoriales?per_page=100`
  );
  const AlmostBanners = await res4.json();

  const banners = AlmostBanners.filter(
    x =>
      x.acf.fecha_de_finalizaciion_de_la_promocion > todayISO &&
      x.acf.la_publicidad_es_de_ca == true &&
      x.acf.comunidad_autonoma.name == posts[0].comunidad_autonoma &&
      x.acf.sector_del_banner.term_id == sid
  );
  const uniquemarcas = [
    ...new Set(marcasofertas.map(({ marca }) => (marca != null ? marca.name : '')))
  ];
  const uniquecamarcas = [
    ...new Set(marcacasofertas.map(({ marca }) => (marca != null ? marca.name : '')))
  ];

  if (!posts.data) {
    return {
      props: {
        posts,
        marcasofertas,
        marcacasofertas,
        uniquemarcas,
        uniquecamarcas,
        banners,
        sid
      },
      revalidate: 1
    };
  } else {
    return { props: { posts: '404' } };
  }
}

export default PostsByCategoryLocalidad;
