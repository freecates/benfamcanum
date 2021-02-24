import fetch from 'isomorphic-unfetch';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Link from 'next/link';
import { IntlProvider } from 'react-intl';
import Layout from '@components/MyLayout.js';
import BrandsGallery from '@components/brandsgallery';
import Gallery from '@components/gallery';
import Banners from '@components/banners/index.js';

const today = Date.now();
const todayISO = new Date(today).toISOString();

const SelectCity = dynamic(import('@components/SelectCity'), {
  loading: () => (
    <div>
      <p style={{ textAlign: 'center' }}>
        <img src="/static/rolling.gif" />
      </p>
    </div>
  )
});

const PostByComunidad = props => {
  return (
    <section>
      {props.posts.length == 0 ? (
        <Layout>
          <Head>
            <title>Beneficios - Comunidad</title>
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
                <span className="show-for-sr">Actual: </span> Comunidad
              </li>
            </ul>
          </nav>
          <section>
            <h1>Actualmente no existen ofertas para familias en esta Comunidad</h1>
            <p className="align-center">
              Por favor, escoge{' '}
              <Link href="/beneficios">
                <a>otra</a>
              </Link>
              .
            </p>
          </section>
          <style jsx>{`
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
            a:hover {
              text-decoration: underline;
            }
            nav a {
              color: #00add9;
            }
          `}</style>
        </Layout>
      ) : (
        <Layout>
          <Head>
            <title>Beneficios Familias Numerosas - {props.posts[0].comunidad_autonoma}</title>
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
                <span className="show-for-sr">Actual: </span> {props.posts[0].comunidad_autonoma}
              </li>
            </ul>
          </nav>
          <section>
            <Banners data={props.banners} />
            <h1>{props.posts[0].comunidad_autonoma}</h1>

            <section id="select-city">
              <div className="wrapper">
                <p className="align-center">
                  ¿Dónde quieres disfrutar del beneficio? Selecciona la localidad
                </p>

                <SelectCity
                  inputClass="city"
                  inputValue="Buscar el mejor descuento"
                  options={props.posts
                    .reduce((ciutats, post) => {
                      if (post.localidad_del_beneficio == false) {
                        return ciutats;
                      }
                      ciutats[post.localidad_del_beneficio.term_id] = {
                        slug: post.localidad_del_beneficio.slug,
                        key: post.localidad_del_beneficio.term_id,
                        value: post.localidad_del_beneficio
                          ? `/l/${post.localidad_del_beneficio.term_id}/${post.localidad_del_beneficio.slug}`
                          : '',
                        label: post.localidad_del_beneficio
                          ? `${post.localidad_del_beneficio.name}`
                          : ''
                      };
                      return ciutats;
                    }, [])
                    .sort((a, b) => {
                      if (a.slug < b.slug) return -1;
                      if (a.slug > b.slug) return 1;
                      return 0;
                    })}
                />
              </div>
            </section>

            <IntlProvider defaultLocale="es">
              <section>
                <div className={'brands-gallery-wrapper'}>
                  {props.uniquemarcas.length >= 1 ? (
                    <BrandsGallery data={props.marcasofertas} logos={props.marcasWithLogo} />
                  ) : null}
                  {props.marcascaofertas.length >= 1 ? (
                    <BrandsGallery data={props.marcascaofertas} logos={props.marcasCaWithLogo} type={'ca'} />
                  ) : null}
                </div>
                <p className="align-center">
                  ... O si lo prefieres accede directamente a cualquiera de las fichas
                </p>

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
      )}
    </section>
  );
};

export async function getStaticProps() {
  const caid = '8143';

  const res = await fetch(
    `https://gestorbeneficis.fanoc.org/wp-json/lanauva/v1/beneficios?_embed&comunidad=Catalu`
  );
  const posts = await res.json();

  const res2 = await fetch(
    `https://gestorbeneficis.fanoc.org/wp-json/lanauva/v1/ofertas_grandes_marc?_embed&comunidad=8143&sim-model=id-marca`
  );
  const almostuniquemarcas = await res2.json();
  const marcasofertas = almostuniquemarcas.filter(x => x.marca != null);

  const res3 = await fetch(
    `https://gestorbeneficis.fanoc.org/wp-json/lanauva/v1/of_gr_m_ca?_embed&comunidad=8143&sim-model=id-marca-comunidad`
  );
  const almostuniquecamarcas = await res3.json();
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

  const res4 = await fetch(`https://gestorbeneficis.fanoc.org/wp-json/wp/v2/banners?per_page=100`);
  const AlmostBanners = await res4.json();

  const banners = AlmostBanners.filter(
    d =>
      d.acf.fecha_de_finalizaciion_de_la_promocion > todayISO &&
      d.acf.la_publicidad_es_de_ca == true &&
      d.acf.seccion_principal == '2'
  );

  return {
    props: {
      posts,
      marcasofertas,
      marcascaofertas,
      caid,
      uniquemarcas,
      uniquecamarcas,
      marcasWithLogo,
      marcasCaWithLogo,
      banners
    },
    revalidate: 1
  };
}

export default PostByComunidad;
