import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './brandsgallery.module.css';

const BrandsGallery = ({ data, type }) => {
  const { pathname } = useRouter();
  const langURL = !pathname.includes('/ca-ES/') ? `/` : '/ca-ES/';
  const typeURL = type && type.length ? `-${type}` : '';
  return (
    <ul className={`${styles.nationalGallery}`}>
      {data.reduce((brands, d) => {
        if (d.marca == false) {
          return brands;
        }
        brands[d.marca.term_id] = (
          <li className={`${styles.benefit}`} key={d.marca.term_id}>
            <Link href={`${langURL}m-o-g-m${typeURL}/${d.marca.term_id}/${d.marca.slug}`}>
              <a title={'Ver todas las ofertas de ' + d.marca.name}>
                <img
                  className={styles.fadeIn}
                  src={
                    'https://benfamcanumpics.famnum.now.sh/static/96/' +
                    d.marca.slug +
                    '-familias-numerosas.png'
                  }
                  width="96"
                  height="96"
                  loading={'lazy'}
                />
                <br />{' '}
                <span
                  dangerouslySetInnerHTML={{
                    __html: d.marca.name
                  }}
                />
              </a>
            </Link>
          </li>
        );
        return brands;
      }, [])}
    </ul>
  );
};

export default BrandsGallery;
