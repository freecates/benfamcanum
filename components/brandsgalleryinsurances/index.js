import styles from './brandsgalleryinsurances.module.css';

const BrandsGalleryInsurances = () => (
  <ul className={styles.insurances}>
    <li>
      <p className={styles.fadeIn}>
        <a
          href="https://www.colectivosubica.com/familiamassegura/"
          title="Federación Española Famílies Nombroses / Ubica, correduría de seguros"
          target="_blank"
        >
          <img
            className={styles.fadeIn}
            src="/static/01-seguros-nacionales.png"
            alt="Logos marcas de seguros"
          />
        </a>
      </p>
    </li>
    <li>
      <p className={styles.fadeIn}>
        <a
          href="https://www.colectivosubica.com/familiamassegura/"
          title="Federación Española Famílies Nombroses / Ubica, correduría de seguros"
          target="_blank"
        >
          <img
            className={styles.fadeIn}
            src="/static/02-seguros-nacionales.png"
            alt="Logos marcas de seguros"
          />
        </a>
      </p>
    </li>
  </ul>
);

export default BrandsGalleryInsurances;
