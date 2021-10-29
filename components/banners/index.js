import React from 'react';
import styles from './banners.module.css';

const Banners = ({ data }) => {
  return (
    <>
      {data.map((d, index) => (
        <React.Fragment key={index}>
          {d.acf.banner_grande_728x90 ? (
            <p className={`${styles.banner} ${styles.dk}`}>
              <a href={d.acf.url_de_destino_del_banner} target="_blank">
                <img
                  src={d.acf.banner_grande_728x90.sizes.large}
                  width={728}
                  height={90}
                  loading={'lazy'}
                />
              </a>
            </p>
          ) : null}
          {d.acf.baner_movil ? (
            <p className={`${styles.banner} ${styles.mb}`}>
              <a href={d.acf.url_de_destino_del_banner} target="_blank">
                <img
                  src={d.acf.baner_movil.sizes.large}
                  width={320}
                  height={100}
                  loading={'lazy'}
                />
              </a>
            </p>
          ) : null}
          {d.acf.baner_movil_320x100 ? (
            <p className={`${styles.banner} ${styles.mb}`}>
              <a href={d.acf.url_de_destino_del_banner} target="_blank">
                <img
                  src={d.acf.baner_movil_320x100.sizes.large}
                  width={320}
                  height={100}
                  loading={'lazy'}
                />
              </a>
            </p>
          ) : null}
        </React.Fragment>
      ))}
    </>
  );
};

export default Banners;
