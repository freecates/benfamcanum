import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Link from 'next/link';
import { IntlProvider } from 'react-intl';
import Layout from '@components/MyLayout.js';
import Gallery from '@components/gallery/index.js';
import BrandsGallery from '@components/brandsgallery/index.js';
import Banners from '@components/banners';
import Fallback from '@components/Fallback.js';
import BrandsGalleryInsurances from '@components/brandsgalleryinsurances';
import Custom404 from '../../../../../404';

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

const PostsByCategoryComunidad = props => {
  const { isFallback } = useRouter();
  if (!isFallback && !props.posts) {
    return <Custom404 />;
  }
  if (isFallback) {
    return <Fallback breadCrumb={'Beneficis'} />;
  }
  if (props.post === '404') {
    return <Fallback breadCrumb={'Beneficis'} notFound />;
  }
  return (
    <section>
      {props.posts.length == 0 ? (
        <Layout>
          <Head>
            <title>Beneficis - Ofertes per sectors - Comunitat</title>
          </Head>
          <nav aria-label="Ets aquí:" role="navigation">
            <ul className="breadcrumbs">
              <li>
                <Link href="/ca-ES">
                  <a>Inici</a>
                </Link>
              </li>
              <li>
                <Link href="/ca-ES/beneficis">
                  <a>Ofertes per a famílies</a>
                </Link>
              </li>
              <li>
                <Link href="/ca-ES/ofertes-per-sectors">
                  <a>Ofertes per sectors</a>
                </Link>
              </li>
              <li>
                <span className="show-for-sr">Actual: </span> Comunitat
              </li>
            </ul>
          </nav>
          <section>
            <h1>
              Actualment no hi ha ofertes amb empreses locals d'aquesta Comunitat per a aquest
              sector
            </h1>
            <p className="align-center">
              Si us plau, escull{' '}
              <Link href="/ca-ES/ofertes-per-sectors">
                <a>un altre sector</a>
              </Link>
              .
            </p>
            {props.uniquemarcas.length >= 1 ? (
              <React.Fragment>
                <h3 className="align-center">
                  Si t'ho estimes més pots consulta les ofertes estatals de{' '}
                  <strong>{props.marcasofertas[0].categoria_del_beneficio.name}</strong> a{' '}
                  <strong>{props.marcasofertas[0].comunidad_autonoma.name}</strong>.
                </h3>
                <BrandsGallery data={props.marcasofertas} />
              </React.Fragment>
            ) : null}
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
      ) : (
        <Layout>
          <Head>
            <title>
              Beneficis - {props.posts[0].categoria_de_la_prestacion.name} -{' '}
              {props.posts[0].comunidad_autonoma}
            </title>
          </Head>
          <nav aria-label="Ets aquí:" role="navigation">
            <ul className="breadcrumbs">
              <li>
                <Link href="/ca-ES">
                  <a>Inici</a>
                </Link>
              </li>
              <li>
                <Link href="/ca-ES/beneficis">
                  <a>Ofertes per a famílies</a>
                </Link>
              </li>
              <li>
                <Link href="/ca-ES/ofertes-per-sectors">
                  <a>Ofertes per sectors</a>
                </Link>
              </li>
              <li>
                <span className="show-for-sr">Actual: </span>{' '}
                {props.posts[0].categoria_de_la_prestacion.name} -{' '}
                {props.posts[0].comunidad_autonoma}
              </li>
            </ul>
          </nav>
          <section>
            <Banners data={props.banners} />
            <h1>
              <img
                src={
                  'https://benfamcanumpics-famnum.vercel.app/static/96/' +
                  props.posts[0].categoria_de_la_prestacion.slug +
                  '-familias-numerosas.png'
                }
                width={'96'}
                height={'96'}
                loading={'lazy'}
              />
              <br />
              Beneficis de {props.posts[0].categoria_de_la_prestacion.name} a{' '}
              {props.posts[0].comunidad_autonoma}
            </h1>

            <section id="select-city">
              <div className="wrapper">
                <p className="align-center">On vols gaudir del benefici? Selecciona la localitat</p>

                <SelectCity
                  inputClass="city"
                  inputValue="Cercar el millor descompte"
                  options={props.posts
                    .reduce((ciutats, post) => {
                      if (post.localidad_del_beneficio == false) {
                        return ciutats;
                      }
                      ciutats[post.localidad_del_beneficio.term_id] = {
                        slug: post.localidad_del_beneficio.slug,
                        key: post.localidad_del_beneficio.term_id,
                        value: post.categoria_de_la_prestacion
                          ? `/ca-ES/c-l/${post.categoria_de_la_prestacion.term_id}/${post.categoria_de_la_prestacion.slug}/${post.localidad_del_beneficio.term_id}/${post.localidad_del_beneficio.slug}`
                          : '',
                        label: post.categoria_de_la_prestacion
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

            <IntlProvider defaultLocale="ca">
              <section>
                {props.posts[0].categoria_de_la_prestacion.term_id === 6 ? (
                  <div className={'brands-gallery-wrapper'}>
                    <BrandsGalleryInsurances />
                  </div>
                ) : null}
                <div className={'brands-gallery-wrapper'}>
                  {props.uniquemarcas.length >= 1 ? (
                    <BrandsGallery data={props.marcasofertas} logos={props.marcasWithLogo} />
                  ) : null}
                  {props.marcascaofertas.length >= 1 ? (
                    <BrandsGallery
                      data={props.marcascaofertas}
                      type={'ca'}
                      logos={props.marcasCaWithLogo}
                    />
                  ) : null}
                </div>

                <section>
                  <hr />
                  {props.ofertasonlines.length >= 1 ? (
                    <div className="promo">
                      <p className="align-center">
                        Si s'ho estima més, també pot veure les{' '}
                        <Link
                          href={`/ca-ES/c-o-o/${props.ofertasonlines[0].categoria_de_la_oferta.term_id}/${props.ofertasonlines[0].categoria_de_la_oferta.slug}`}
                        >
                          <a
                            className="label alert file-label"
                            title={
                              'Clica aquí per veure totes les ofertes online de ' +
                              props.ofertasonlines[0].categoria_de_la_oferta.name
                            }
                          >
                            ofertes on line de {props.ofertasonlines[0].categoria_de_la_oferta.name}
                          </a>
                        </Link>
                      </p>
                    </div>
                  ) : (
                    ''
                  )}
                </section>

                <p className="align-center clear">
                  ... O accedeix directament a qualsevol de les fitxes
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

export async function getStaticPaths() {
  const slug2 = 'cataluna';
  const id2 = '8143';

  const paths = [
    { params: { id: '4', slug: 'alimentacion', slug2: slug2, id2: id2 } },
    { params: { id: '5', slug: 'alojamiento', slug2: slug2, id2: id2 } },
    { params: { id: '7', slug: 'banca', slug2: slug2, id2: id2 } },
    { params: { id: '17', slug: 'carburantes', slug2: slug2, id2: id2 } },
    { params: { id: '2', slug: 'educacion', slug2: slug2, id2: id2 } },
    { params: { id: '3', slug: 'hogar', slug2: slug2, id2: id2 } },
    { params: { id: '16', slug: 'idiomas', slug2: slug2, id2: id2 } },
    { params: { id: '26', slug: 'libros', slug2: slug2, id2: id2 } },
    { params: { id: '8', slug: 'moda', slug2: slug2, id2: id2 } },
    { params: { id: '9', slug: 'ocio-y-turismo', slug2: slug2, id2: id2 } },
    { params: { id: '14', slug: 'otros', slug2: slug2, id2: id2 } },
    { params: { id: '10', slug: 'salud', slug2: slug2, id2: id2 } },
    { params: { id: '6', slug: 'seguros', slug2: slug2, id2: id2 } },
    { params: { id: '11', slug: 'servicios', slug2: slug2, id2: id2 } },
    { params: { id: '12', slug: 'vehiculos', slug2: slug2, id2: id2 } }
  ];

  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  const sid = params.id;
  const comunidad = params.slug2;
  const caid = params.id2;

  const res = await fetch(
    `https://gestorbeneficis.fanoc.org/wp-json/lanauva/v1/beneficios?_embed&categoria_del_beneficio=${sid}&comunidad=${comunidad}`
  );
  const posts = await res.json();

  const res2 = await fetch(
    `https://gestorbeneficis.fanoc.org/wp-json/lanauva/v1/ofertas_grandes_marc?_embed&categoria_de_la_oferta_grande_marc=${sid}&comunidad=${caid}&sim-model=id-marca`
  );
  const almostuniquemarcas = await res2.json();
  const marcasofertas = almostuniquemarcas.filter(x => x.marca != null && x.marca != '');
  const marcasOfertasId = marcasofertas.map(a => a.marca.term_id);

  const res3 = await fetch(
    `https://gestorbeneficis.fanoc.org/wp-json/lanauva/v1/of_gr_m_ca?_embed&categoria_de_la_of_gr_m_ca=${sid}&comunidad=${caid}&sim-model=id-marca-comunidad`
  );
  const almostuniquecamarcas = await res3.json();
  const marcascaofertas = almostuniquecamarcas.filter(x => x.marca != null && x.marca != '');
  const marcasCaOfertasId = marcascaofertas.map(a => a.marca.term_id);

  const res6 = await fetch(`https://gestorbeneficis.fanoc.org/wp-json/acf/v3/marca?per_page=100`);
  const marcasAcf = await res6.json();
  const marcasWithLogo = marcasAcf.filter(x => marcasOfertasId.includes(x.id));
  const marcasCaWithLogo = marcasAcf.filter(x => marcasCaOfertasId.includes(x.id));

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

  const res5 = await fetch(
    `https://gestorbeneficis.fanoc.org/wp-json/lanauva/v1/ofertas_online?categoria_de_la_oferta=${sid}`
  );
  const ofertasonlines = await res5.json();

  const uniquemarcas = [
    ...new Set(marcasofertas.map(({ marca }) => (marca != null ? marca.name : '')))
  ];
  const uniquecamarcas = [...new Set(marcascaofertas.map(({ marca }) => marca && marca.name))];

  if (!posts.data) {
    return {
      props: {
        posts,
        marcasofertas,
        marcascaofertas,
        uniquemarcas,
        uniquecamarcas,
        banners,
        caid,
        sid,
        ofertasonlines,
        marcasWithLogo,
        marcasCaWithLogo
      },
      revalidate: 1
    };
  } else {
    return { props: { posts: '404' } };
  }
}

export default PostsByCategoryComunidad;
