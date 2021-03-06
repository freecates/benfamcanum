import fetch from 'isomorphic-unfetch';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Link from 'next/link';
import { IntlProvider } from 'react-intl';
import { useRouter } from 'next/router';
import Layout from '@components/MyLayout.js';

const GoogleMapReact = dynamic(import('google-map-react'), {
  loading: () => <p>carregant ...</p>
});

const markerStyle = {
  backgroundColor: '#ffffff',
  width: '50px',
  textAlign: 'center',
  padding: '.5em',
  position: 'relative',
  right: 25,
  bottom: 25,
  borderRadius: '50%'
};

const MarkerComponent = ({ text }) => <div style={markerStyle}>{text}</div>;

const ZOOM = 12;

const MapByLocalidad = props => {
  return (
    <Layout>
      <Head>
        <title>
          Beneficis Famílies Nombroses - {props.markers[0].localidad_del_beneficio.name}
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
            <span className="show-for-sr">Actual: </span>{' '}
            {props.markers[0].localidad_del_beneficio.name}
          </li>
        </ul>
      </nav>
      <section>
        <h1>Beneficis a {props.markers[0].localidad_del_beneficio.name}</h1>
        <p className="align-center">
          <small>
            <Link
              href={`/ca-ES/l/${props.markers[0].localidad_del_beneficio.term_id}/${props.markers[0].localidad_del_beneficio.slug}`}
            >
              <a
                title={
                  'Veure tots els beneficis de ' + props.markers[0].localidad_del_beneficio.name
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
              {props.nationalmarkers.map((nationalmarker, index) => (
                <MarkerComponent
                  key={index}
                  lat={
                    nationalmarker.lat.includes(',') || nationalmarker.lat.includes('!')
                      ? nationalmarker.lat.replace(',', '.')
                      : nationalmarker.lat
                  }
                  lng={
                    nationalmarker.lon.includes(',') || nationalmarker.lon.includes('!')
                      ? nationalmarker.lon.replace(',', '.')
                      : nationalmarker.lon
                  }
                  text={
                    <a href={`/ca-ES/ogm/${nationalmarker.ID}`} title={nationalmarker.name}>
                      <span>
                        <img
                          src={
                            'https://benfamcanumpics-famnum.vercel.app/static/32/' +
                            nationalmarker.marca.slug +
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
                            marker.categoria_de_la_prestacion.slug +
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

MapByLocalidad.getInitialProps = async function(context) {
  const { localidad } = context.query;
  const res = await fetch(
    `https://gestorbeneficis.fanoc.org/wp-json/lanauva/v1/beneficios?_embed&localidad=${localidad}`
  );
  const markers = await res.json();
  const res2 = await fetch(
    `https://gestorbeneficis.fanoc.org/wp-json/lanauva/v1/ofertas_grandes_marc?_embed&localidad=${localidad}`
  );
  const almosnationalmarkers = await res2.json();
  const nationalmarkers = almosnationalmarkers.filter(x => x.marca != null);

  return { markers, nationalmarkers };
};

export default MapByLocalidad;
