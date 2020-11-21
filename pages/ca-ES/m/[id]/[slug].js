import fetch from 'isomorphic-unfetch';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { IntlProvider } from 'react-intl';
import Layout from '../../../../components/MyLayout.js';
import Custom404 from '../../../404';

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

const Fallback = ({ ruta, notFound }) => {
  return (
    <Layout ruta={ruta}>
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
        </ul>
      </nav>
      <section>
        <div className={'file'}>
          <h1>{notFound ? 'Oferta no trobada' : '... Loading'}</h1>
        </div>
      </section>
    </Layout>
  );
};

const MapByCategory = props => {
  const { isFallback } = useRouter();
  if ((!isFallback && !props.markers)) {
    return <Custom404 ruta={props.ruta} />;
  }
  if (isFallback) {
    return <Fallback ruta={props.ruta} />;
  }
  if (props.markers === '404') {
    return <Fallback ruta={props.ruta} notFound />;
  }
  return (
    <Layout ruta={props.ruta}>
    <Head>
      <title>
        Beneficis Famílies Nombroses - {props.markers[0].categoria_de_la_prestacion.name}
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
          {props.markers[0].categoria_de_la_prestacion.name}
        </li>
      </ul>
    </nav>
    <section>
      <h1>
        <img
          src={`https://benfamcanumpics.famnum.now.sh/static/96/${props.markers[0].categoria_de_la_prestacion.slug}-familias-numerosas.png`}
        />
        <br />
        {props.markers[0].categoria_de_la_prestacion.name}
      </h1>
      <p className="align-center">
        <small>
          <Link
            href={`/ca-ES/c/${props.markers[0].categoria_de_la_prestacion.term_id}/${props.markers[0].categoria_de_la_prestacion.slug}`}
          >
            <a>veure llistat</a>
          </Link>
        </small>
      </p>
      <IntlProvider defaultLocale="ca">
        <div style={{ width: '100%', height: '500px' }}>
          <GoogleMapReact
            bootstrapURLKeys={{
              key: 'AIzaSyCpb701GdEKst5BwD_bw7gzIc7vR65_f90'
            }}
            center={CENTER}
            zoom={ZOOM}
          >
            {props.markers.map((marker, index) => (
              <MarkerComponent
                key={index}
                lat={marker.lat.includes(',') || marker.lat.includes('!') ? '' : marker.lat}
                lng={marker.lon.includes(',') || marker.lon.includes('!') ? '' : marker.lon}
                text={
                  <a
                    href={`/ca-ES/p/${marker.ID}/${marker.slug}`}
                  >
                      <span>
                        <img
                          src={
                            'https://benfamcanumpics.famnum.now.sh/static/32/' +
                            props.markers[0].categoria_de_la_prestacion.slug +
                            '-familias-numerosas.png'
                          }
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
)};

export async function getStaticPaths() {
  const res = await fetch('https://gestorbeneficis.fanoc.org/wp-json/lanauva/v1/categoria_del_beneficio');
  const categories = await res.json();

  const paths = categories.map(c => `/ca-ES/m/${c.id}/${c.slug}`);

  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  const res = await fetch(
    `https://gestorbeneficis.fanoc.org/wp-json/lanauva/v1/beneficios?_embed&categoria_del_beneficio=${params.id}`
  );
  const markers = await res.json();

  if (!markers.data) {
    return { props: { markers }, revalidate: 1 };
  } else {
    return { props: { markers: '404' } };
  }
}

export default MapByCategory;
