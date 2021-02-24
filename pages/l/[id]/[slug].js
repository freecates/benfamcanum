import fetch from 'isomorphic-unfetch';
import Head from 'next/head';
import Link from 'next/link';
import { IntlProvider } from 'react-intl';
import Layout from '@components/MyLayout.js';
import Banners from '@components/banners/index.js';
import BrandsGallery from '@components/brandsgallery';
import Gallery from '@components/gallery';

const today = Date.now();
const todayISO = new Date(today).toISOString();

const PostsByLocalidad = props => (
  <Layout>
    <Head>
      <title>Beneficios Familias Numerosas - {props.posts[0].localidad_del_beneficio.name}</title>
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
          <Link href={`/comunidad`}>
            <a>{props.posts[0].comunidad_autonoma}</a>
          </Link>
        </li>
        <li>
          <span className="show-for-sr">Actual: </span> Localidad:{' '}
          {props.posts[0].localidad_del_beneficio.name}
        </li>
      </ul>
    </nav>
    <section>
      <Banners data={props.banner} />
      <h1>Beneficios en {props.posts[0].localidad_del_beneficio.name}</h1>
      <p className="align-center">
        <small>
          <Link
            as={`/m-l/${props.posts[0].localidad_del_beneficio.term_id}/${props.posts[0].localidad_del_beneficio.slug}`}
            href={`/mapa-localidad?localidad=${props.posts[0].localidad_del_beneficio.term_id}`}
          >
            <a>
              <img
                src="/static/icona-mapa-familias-numerosas.png"
                width={'30'}
                height={'33'}
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
            {props.uniquemarcas.length >= 1 ? (
              <BrandsGallery data={props.marcasofertas} logos={props.marcasWithLogo} />
            ) : null}
            {props.uniquecamarcas.length >= 1 ? (
              <BrandsGallery data={props.marcascaofertas} logos={props.marcasCaWithLogo} />
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

export async function getStaticPaths() {
  const res = await fetch('https://gestorbeneficis.fanoc.org/wp-json/lanauva/v1/beneficios?_embed');
  const localidades = await res.json();

  const paths = localidades.map(
    l => `/l/${l.localidad_del_beneficio.term_id}/${l.localidad_del_beneficio.slug}`
  );

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const id = params.id;

  const res = await fetch(
    `https://gestorbeneficis.fanoc.org/wp-json/lanauva/v1/beneficios?_embed&localidad=${id}`
  );
  const posts = await res.json();

  const res2 = await fetch(
    `https://gestorbeneficis.fanoc.org/wp-json/lanauva/v1/ofertas_grandes_marc?_embed&localidad=${id}`
  );
  const almostuniquemarcas = await res2.json();
  const marcasofertas = almostuniquemarcas.filter(x => x.marca != null);

  const res3 = await fetch(`https://gestorbeneficis.fanoc.org/wp-json/wp/v2/banners?per_page=100`);
  const AlmostBanners = await res3.json();

  const banners = AlmostBanners.filter(
    d =>
      d.acf.fecha_de_finalizaciion_de_la_promocion > todayISO &&
      d.acf.la_publicidad_es_de_ca == true
  );
  const [firstBanner] = banners;
  const banner = [firstBanner];

  const res4 = await fetch(
    `https://gestorbeneficis.fanoc.org/wp-json/lanauva/v1/of_gr_m_ca?_embed&localidad=${id}`
  );
  const almostuniquecamarcas = await res4.json();
  const marcascaofertas = almostuniquecamarcas.filter(x => x.marca != null);

  const uniquemarcasnotfiltered = [
    ...new Set(marcasofertas.map(({ marca }) => (marca != null ? marca.name : '')))
  ];
  const uniquecamarcasnotfiltered = [
    ...new Set(marcascaofertas.map(({ marca }) => marca && marca.name))
  ];

  const uniquemarcas = uniquemarcasnotfiltered.filter(Boolean);
  const uniquecamarcas = uniquecamarcasnotfiltered.filter(Boolean);
  const marcasOfertasId = marcasofertas.map(a => a.marca.term_id);
  const marcasCaOfertasId = marcascaofertas.map(a => a.marca.term_id);

  const res5 = await fetch(`https://gestorbeneficis.fanoc.org/wp-json/acf/v3/marca?per_page=100`);
  const marcasAcf = await res5.json();
  const marcasWithLogo = marcasAcf.filter(x => marcasOfertasId.includes(x.id));
  const marcasCaWithLogo = marcasAcf.filter(x => marcasCaOfertasId.includes(x.id));

  return {
    props: {
      posts,
      marcasofertas,
      banner,
      marcascaofertas,
      uniquemarcas,
      marcasWithLogo,
      marcasCaWithLogo,
      uniquecamarcas
    }
  };
}

export default PostsByLocalidad;
