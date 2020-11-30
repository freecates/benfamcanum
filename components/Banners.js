const Banners = ({ data, section }) => {
  const today = Date.now();
  const todayISO = new Date(today).toISOString();
  return (
    <>
      {data.map((d, index) => (
        <React.Fragment key={index}>
          {d.acf.fecha_de_finalizaciion_de_la_promocion > todayISO &&
          d.acf.la_publicidad_es_de_ca == true &&
          d.acf.seccion_principal == section ? (
            <React.Fragment>
              <p className="align-center promo dk">
                <a href={d.acf.url_de_destino_del_banner} target="_blank">
                  <img
                    src={d.acf.banner_grande_728x90.sizes.large}
                    width={728}
                    height={90}
                    loading={'lazy'}
                  />
                </a>
              </p>
              <p className="align-center promo mb">
                <a href={d.acf.url_de_destino_del_banner} target="_blank">
                  <img
                    src={d.acf.baner_movil.sizes.large}
                    width={320}
                    height={100}
                    loading={'lazy'}
                  />
                </a>
              </p>
            </React.Fragment>
          ) : null}
        </React.Fragment>
      ))}
      <style jsx>{`
        .align-center {
          text-align: center;
        }
        a {
          color: #ffffff !important;
        }
        .promo {
          margin-top: 2em;
        }
        .mb {
          display: block;
        }
        .dk {
          display: none;
        }
        @media screen and (min-width: 768px) {
          .dk {
            display: block;
          }
          .mb {
            display: none;
          }
        }
      `}</style>
    </>
  );
};

export default Banners;
