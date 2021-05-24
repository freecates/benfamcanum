import fetch from 'isomorphic-unfetch';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Link from 'next/link';
import { IntlProvider } from 'react-intl';
import Layout from '@components/MyLayout.js';
import BrandsGallery from '@components/brandsgallery';
import Banners from '@components/banners/index.js';
import BrandsGalleryInsurances from '@components/brandsgalleryinsurances';

const SelectCity = dynamic(import('@components/SelectCity'), {
  loading: () => (
    <div>
      <p style={{ textAlign: 'center' }}>
        <img src="/static/rolling.gif" />
      </p>
    </div>
  )
});

const today = Date.now();
const todayISO = new Date(today).toISOString();

const PostsByCategory = props => {
  return (
    <Layout>
      <Head>
        <title>
          Beneficis Famílies Nombroses - {props.posts[0].categoria_de_la_prestacion.name}
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
            {props.posts[0].categoria_de_la_prestacion.name}
          </li>
        </ul>
      </nav>
      <section>
        <div>
          <Banners data={props.banners} />
        </div>
        <h1>
          <img
            src={
              'https://benfamcanumpics-famnum.vercel.app/static/96/' +
              props.posts[0].categoria_de_la_prestacion.slug +
              '-familias-numerosas.png'
            }
            width={'96'}
            height={'96'}
          />
          <br />
          {props.posts[0].categoria_de_la_prestacion.name}
        </h1>
        <p className="align-center">
          <small>
            <Link
              href={`/ca-ES/m/${props.posts[0].categoria_de_la_prestacion.term_id}/${props.posts[0].categoria_de_la_prestacion.slug}`}
            >
              <a>
                <img
                  src="/static/icona-mapa-familias-numerosas.png"
                  width={'30'}
                  height={'33'}
                  loading={'lazy'}
                />{' '}
                veure al mapa
              </a>
            </Link>
          </small>
        </p>

        <section id="select-city">
          <div className="wrapper">
            <p className="align-center">On vols gaudir del benefici? Selecciona la CA</p>

            <SelectCity
              inputClass="comunidad"
              inputValue="Cercar el millor descompte"
              options={[
                {
                  slug: 'catalunya',
                  key: 8143,
                  value: `/ca-ES/${props.posts[0].categoria_de_la_prestacion.term_id}/cataluna/8143`,
                  label: 'Catalunya'
                }
              ]}
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
                <BrandsGallery data={props.marcasofertas} type={'ca'} />
              ) : null}
            </div>
          </section>
        </IntlProvider>
        <section>
          <hr />
          {props.ofertasonlines.length >= 1 ? (
            <div className="promo">
              <p className="align-center">
                Si s'ho estime més, també pot veure les{' '}
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
          ) : null}
        </section>
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
    'https://gestorbeneficis.fanoc.org/wp-json/lanauva/v1/categoria_del_beneficio'
  );
  const categories = await res.json();

  const paths = categories.map(c => `/ca-ES/c/${c.term_id}/${c.slug}`);

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const id = params.id;

  const res = await fetch(
    `https://gestorbeneficis.fanoc.org/wp-json/lanauva/v1/beneficios?_embed&categoria_del_beneficio=${id}`
  );
  const posts = await res.json();

  const res2 = await fetch(
    `https://gestorbeneficis.fanoc.org/wp-json/lanauva/v1/ofertas_grandes_marc?_embed&categoria_de_la_oferta_grande_marc=${id}&sim-model=id-marca`
  );
  const almostuniquemarcas = await res2.json();
  const marcasofertas = almostuniquemarcas.filter(x => x.marca !== null);

  const res3 = await fetch(
    `https://gestorbeneficis.fanoc.org/wp-json/lanauva/v1/ofertas_online?categoria_de_la_oferta=${id}`
  );
  const ofertasonlines = await res3.json();

  const res4 = await fetch(
    `https://gestorbeneficis.fanoc.org/wp-json/wp/v2/banners_sectoriales?per_page=100`
  );
  const AlmostBanners = await res4.json();

  const banners = AlmostBanners.filter(
    x =>
      x.acf.fecha_de_finalizaciion_de_la_promocion > todayISO &&
      x.acf.la_publicidad_es_de_ca == true &&
      x.acf.comunidad_autonoma.name == posts[0].comunidad_autonoma &&
      x.acf.sector_del_banner.term_id == id
  );

  const uniquemarcas = [
    ...new Set(
      marcasofertas.map(({ marca }) =>
        marca !== null && marca.name !== undefined ? marca.name : ''
      )
    )
  ];

  return { props: { posts, marcasofertas, uniquemarcas, ofertasonlines, banners, id } };
}

export default PostsByCategory;
