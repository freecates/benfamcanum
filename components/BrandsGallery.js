import Link from 'next/link';
import { useRouter } from 'next/router';

const BrandsGallery = ({ data, type }) => {
    const { pathname } = useRouter();
    const caURL = pathname.includes('/ca-ES/') ? `/ca-ES/` : '';
    const esURL = !pathname.includes('/ca-ES/') ? `/` : '';
    const typeURL = type && type.length ? `-${type}` : '';
  return (
    <ul className="gallery national-gallery">
      {data.reduce((brands, d) => {
        if (d.marca == false) {
          return brands;
        }
        brands[d.marca.term_id] = (
          <span key={d.marca.term_id}>
            <li className="benefit align-center">
              <Link href={`${caURL || esURL}m-o-g-m${typeURL}/${d.marca.term_id}/${d.marca.slug}`}>
                <a title={'Ver todas las ofertas de ' + d.marca.name}>
                  <img
                    src={
                      'https://benfamcanumpics.famnum.now.sh/static/96/' +
                      d.marca.slug +
                      '-familias-numerosas.png'
                    }
                    width="96"
                    height="96"
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
          </span>
        );
        return brands;
      }, [])}
    </ul>
  );
};

export default BrandsGallery;
