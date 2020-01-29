import fetch from 'isomorphic-unfetch';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Link from 'next/link';
import { IntlProvider } from 'react-intl';
import Layout from '../../components/MyLayout.js';

const GoogleMapReact = dynamic(import('google-map-react'), {
  loading: () => (
    <div>
      <p style={{ textAlign: 'center' }}>
        <img src="/static/rolling.gif" />
      </p>
    </div>
  )
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

const CENTER = [41.3948976, 2.0787282];
const ZOOM = 7;

const MapByMarca = props => (
  <Layout ruta={props.ruta}>
    <Head>
      <title>
        Ofertes de la Marca {props.markers.length >= 1 ? props.markers[0].marca.name : ''}
        {props.camarkers.length >= 1 ? props.camarkers[0].marca.name : ''} per a famílies nombroses
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
          <Link href="/ca-ES/grans-marques">
            <a>Grans Marques</a>
          </Link>
        </li>
        <li>
          <span className="show-for-sr">Actual: </span>{' '}
          {props.markers.length >= 1 ? props.markers[0].marca.name : ''}
          {props.camarkers.length >= 1 ? props.camarkers[0].marca.name : ''}
        </li>
      </ul>
    </nav>
    <section>
      {props.markers.length >= 1 ? (
        <div>
          <h1>
            <img
              src={
                'https://benfamcanumpics.famnum.now.sh/static/96/' +
                props.markers[0].marca.slug +
                '-familias-numerosas.png'
              }
            />
            <br />
            {props.markers[0].marca.name}
          </h1>
          <p className="align-center">
            <small>
              <Link
                as={`/ca-ES/m-o-g-m/${props.markers[0].marca.term_id}/${props.markers[0].marca.slug}`}
                href={`/ca-ES/ofertas-de-la-marca?id=${props.markers[0].marca.term_id}`}
              >
                <a>veure llistat</a>
              </Link>
            </small>
          </p>
        </div>
      ) : (
        ''
      )}
      {props.camarkers.length >= 1 ? (
        <div>
          <h1>
            <img
              src={
                'https://benfamcanumpics.famnum.now.sh/static/96/' +
                props.camarkers[0].marca.slug +
                '-familias-numerosas.png'
              }
            />
            <br />
            {props.camarkers[0].marca.name}
          </h1>
          <p className="align-center">
            <small>
              <Link
                as={`/ca-ES/m-o-g-m/${props.camarkers[0].marca.term_id}/${props.camarkers[0].marca.slug}`}
                href={`/ca-ES/ofertas-de-la-marca?id=${props.camarkers[0].marca.term_id}`}
              >
                <a>veure llistat</a>
              </Link>
            </small>
          </p>
        </div>
      ) : (
        ''
      )}
      <IntlProvider defaultLocale="ca">
        <div style={{ width: '100%', height: '500px' }}>
          <GoogleMapReact
            bootstrapURLKeys={{
              key: 'AIzaSyCpb701GdEKst5BwD_bw7gzIc7vR65_f90'
            }}
            center={CENTER}
            zoom={ZOOM}
          >
            {props.markers.length >= 1
              ? props.markers.map((marker, index) => (
                  <MarkerComponent
                    key={index}
                    lat={
                      marker.lat.includes(',') || marker.lat.includes('!')
                        ? marker.lat.replace(',', '.')
                        : marker.lat
                    }
                    lng={
                      marker.lon.includes(',') || marker.lon.includes('!')
                        ? marker.lon.replace(',', '.')
                        : marker.lon
                    }
                    text={
                      <Link
                        as={`/ca-ES/ogm/${marker.ID}/${marker.slug}`}
                        href={`/ca-ES/oferta-gran-marca?id=${marker.ID}`}
                      >
                        <a title={marker.name}>
                          <span>
                            <img
                              src={
                                'https://benfamcanumpics.famnum.now.sh/static/32/' +
                                props.markers[0].marca.slug +
                                '-familias-numerosas.png'
                              }
                            />
                          </span>
                        </a>
                      </Link>
                    }
                  />
                ))
              : ''}

            {props.camarkers.length >= 1
              ? props.camarkers.map((marker, index) => (
                  <MarkerComponent
                    key={index}
                    lat={
                      marker.lat.includes(',') || marker.lat.includes('!')
                        ? marker.lat.replace(',', '.')
                        : marker.lat
                    }
                    lng={
                      marker.lon.includes(',') || marker.lon.includes('!')
                        ? marker.lon.replace(',', '.')
                        : marker.lon
                    }
                    text={
                      <Link
                        as={`/ca-ES/ogm/${marker.ID}/${marker.slug}`}
                        href={`/ca-ES/oferta-gran-marca?id=${marker.ID}`}
                      >
                        <a title={marker.name}>
                          <span>
                            <img
                              src={
                                'https://benfamcanumpics.famnum.now.sh/static/32/' +
                                props.camarkers[0].marca.slug +
                                '-familias-numerosas.png'
                              }
                            />
                          </span>
                        </a>
                      </Link>
                    }
                  />
                ))
              : ''}
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
        /c-l/8/moda/talavera%20de%20la%20reinawidth: 150px;
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

MapByMarca.getInitialProps = async function(context) {
  const { id } = context.query;
  const res = await fetch(
    `https://gestorbeneficis.fanoc.org/wp-json/lanauva/v1/ofertas_grandes_marc?marca=${id}&sim-model=name-id-slug-lat-lon-marca`
  );
  const markers = await res.json();
  const res2 = await fetch(
    `https://gestorbeneficis.fanoc.org/wp-json/lanauva/v1/of_gr_m_ca?marca=${id}&sim-model=name-id-slug-lat-lon-marca`
  );
  const camarkers = await res2.json();

  console.log(`Markers data fetched. Count: ${markers.length}, ${camarkers.length}`);

  return { markers, camarkers };
};

export default MapByMarca;