import fetch from 'isomorphic-unfetch';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { IntlProvider } from 'react-intl';
import Layout from '@components/MyLayout.js';

const GoogleMapReact = dynamic(import('google-map-react'), {
  loading: () => <p>carregant ...</p>
});

const markerStyle = {
  'background-color': '#ffffff',
  width: '50px',
  'text-align': 'center',
  padding: '.5em',
  position: 'relative',
  right: 25,
  bottom: 25,
  'border-radius': '50%'
};

const MarkerComponent = ({ text }) => <div style={markerStyle}>{text}</div>;

const ZOOM = 12;

const MapByCategoryLocalidad = props => {
  return (
    <Layout>
      <Head>
        <title>
          Beneficis Famílies Nombroses - {props.markers[0].categoria_de_la_prestacion.name} -{' '}
          {props.markers[0].localidad_del_beneficio.name}
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
            <Link
              href={`/ca-ES/m/${props.markers[0].categoria_de_la_prestacion.term_id}/${props.markers[0].categoria_de_la_prestacion.slug}`}
            >
              <a>{props.markers[0].categoria_de_la_prestacion.name}</a>
            </Link>
          </li>
          <li>
            <span className="show-for-sr">Actual: </span>{' '}
            {props.markers[0].localidad_del_beneficio.name}
          </li>
        </ul>
      </nav>
      <section>
        <h1>
          <img
            src={
              'https://benfamcanumpics-famnum.vercel.app/static/96/' +
              props.markers[0].categoria_de_la_prestacion.slug +
              '-familias-numerosas.png'
            }
            width={'96'}
            height={'96'}
            loading={'lazy'}
          />
          <br />
          {props.markers[0].categoria_de_la_prestacion.name} -{' '}
          {props.markers[0].localidad_del_beneficio.name}
        </h1>
        <p className="align-center">
          <small>
            <Link
              href={`/ca-ES/c-l/${props.markers[0].categoria_de_la_prestacion.term_id}/${props.markers[0].categoria_de_la_prestacion.slug}/${props.markers[0].localidad_del_beneficio.term_id}/${props.markers[0].localidad_del_beneficio.slug}`}
            >
              <a
                title={
                  'Ver los beneficios de ' +
                  props.markers[0].categoria_de_la_prestacion.name +
                  ' en ' +
                  props.markers[0].localidad_del_beneficio.name
                }
              >
                veure llistat
              </a>
            </Link>
          </small>
        </p>
        <IntlProvider defaultLocale="ca">
          <div style={{ width: '100%', height: '500px' }}>
            <GoogleMapReact
              bootstrapURLKeys={{
                key: 'AIzaSyCpb701GdEKst5BwD_bw7gzIc7vR65_f90'
              }}
              center={[
                props.markers[0].lat.includes(',') || props.markers[0].lat.includes('!')
                  ? 41.3948976
                  : Number(props.markers[0].lat),
                props.markers[0].lon.includes(',') || props.markers[0].lon.includes('!')
                  ? 2.0787282
                  : Number(props.markers[0].lon)
              ]}
              zoom={ZOOM}
            >
              {props.markers.map((marker, index) => (
                <MarkerComponent
                  key={index}
                  lat={marker.lat.includes(',') || marker.lat.includes('!') ? '' : marker.lat}
                  lng={marker.lon.includes(',') || marker.lon.includes('!') ? '' : marker.lon}
                  text={
                    <a href={`/ca-ES/p/${marker.ID}/${marker.slug}`} title={marker.name}>
                      <span>
                        <img
                          src={
                            'https://benfamcanumpics-famnum.vercel.app/static/32/' +
                            props.markers[0].categoria_de_la_prestacion.slug +
                            '-familias-numerosas.png'
                          }
                          width={'32'}
                          height={'32'}
                          loading={'lazy'}
                        />
                      </span>
                    </a>
                  }
                />
              ))}
            </GoogleMapReact>
          </div>
        </IntlProvider>
      </section>
      <style jsx>{`
        .breadcrumbs {
          margin-bottom: 1em !important;
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
          margin-top: -45px;
          margin-right: 10px;
          float: right;
          text-align: center;
          background: #f18903 !important;
        }
        .titulo-oferta {
          color: #ff0000;
        }
        .marker {
          width: 50px;
          background-color: #ffffff;
          text-align: center;
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
          }
        }
        @media screen and (min-width: 1366px) {
          .gallery {
            width: 82%;
          }
        }
      `}</style>
    </Layout>
  );
};

export async function getStaticPaths() {
  const res = await fetch('https://gestorbeneficis.fanoc.org/wp-json/lanauva/v1/beneficios?_embed');
  const localidades = await res.json();

  const paths = localidades.map(
    l =>
      `/ca-ES/m-c-l/${l.categoria_de_la_prestacion.term_id}/${l.categoria_de_la_prestacion.slug}/${l.localidad_del_beneficio.term_id}/${l.localidad_del_beneficio.slug}`
  );

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const id = params.id;
  const localidad = params.id2;
  const res = await fetch(
    `https://gestorbeneficis.fanoc.org/wp-json/lanauva/v1/beneficios?_embed&categoria_del_beneficio=${id}&localidad=${localidad}`
  );
  const markers = await res.json();
  if (markers.errors) {
    console.error(markers.errors);
    throw new Error('Failed to fetch API');
  }
  return { props: { markers } };
}

export default MapByCategoryLocalidad;
