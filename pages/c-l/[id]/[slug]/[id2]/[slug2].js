import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { IntlProvider } from 'react-intl';
import Layout from '@components/MyLayout.js';
import Gallery from '@components/gallery/index.js';
import BrandsGallery from '@components/brandsgallery/index.js';
import Banners from '@components/banners';
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
            <div className={'brands-gallery-wrapper'}>
              {props.uniquemarcas.length >= 1 ? <BrandsGallery data={props.marcasofertas} /> : null}
              {props.marcacasofertas.length >= 1 ? (
                <BrandsGallery data={props.marcacasofertas} type={'ca'} />
              ) : null}
            </div>
            <Gallery data={props.posts} />
          </section>
        </IntlProvider>
      </section>
      <style jsx>{`
        .clear {
          clear: both;
        }
        .file-label {
          background: #f18903 !important;
          color: #ffffff !important;
          font-weight: 400;
          font-size: 0.9rem;
          white-space: normal;
        }
        .file-label:hover {
          background: #b66502 !important;
          text-decoration: none;
          cursor: pointer;
        }
        .breadcrumbs {
          margin-bottom: 1em;
        }
        h1,
        .align-center {
          text-align: center;
        }
        .dk {
          display: none;
        }
        .promo {
          margin-top: 1em;
        }
        h1 {
          color: #cb5599;
        }
        nav a {
          color: #00add9;
        }
        @media screen and (min-width: 768px) {
          .dk {
            display: block;
          }
          .mb {
            display: none;
          }
        }
        .brands-gallery-wrapper {
          margin-top: 1em !important;
          margin-bottom: 1em !important;
        }
      `}</style>
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
