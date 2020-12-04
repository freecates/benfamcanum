import Link from 'next/link';
import { useRouter } from 'next/router';

const Gallery = ({ data }) => {
  const { pathname } = useRouter();
  const langURL = !pathname.includes('/ca-ES/') ? `/` : '/ca-ES/';
  return (
    <ul className="gallery">
      {data.map((d, index) => (
        <li className="benefit" key={index}>
          {d.imagen_destacada_de_la_oferta_general_thumb ? (
            <p className="fade-in">
              <Link href={`${langURL}p/${d.ID}/${d.slug}`}>
                <a title={'Ver la ficha de ' + d.name}>
                  <img
                    className="fade-in"
                    loading={'lazy'}
                    width="250"
                    height="250"
                    src={d.imagen_destacada_de_la_oferta_general_thumb.sizes.thumbnail}
                    alt={d.titulo_de_la_oferta_oferta_general}
                  />
                </a>
              </Link>
            </p>
          ) : null}

          {d.imagen_destacada_de_la_oferta_socios_thumb ? (
            <p className="fade-in">
              <Link href={`${langURL}p/${d.ID}/${d.slug}`}>
                <a title={'Ver la ficha de ' + d.name}>
                  <img
                    className="fade-in"
                    loading={'lazy'}
                    width="250"
                    height="250"
                    src={d.imagen_destacada_de_la_oferta_socios_thumb.sizes.thumbnail}
                    alt={d.titulo_de_la_oferta_oferta_socios}
                  />
                  <span className="label alert gallery-label">
                    <small>
                      EXCLUSIVO
                      <br /> SOCIOS
                    </small>
                  </span>
                </a>
              </Link>
            </p>
          ) : null}

          <p>
            <Link href={`/p/${d.ID}/${d.slug}`}>
              <a title={'Ver la ficha de ' + d.name} dangerouslySetInnerHTML={{ __html: d.name }} />
            </Link>
            <br />

            <small>{d.localidad_del_beneficio.name}</small>
            <br />

            {d.titulo_de_la_oferta_oferta_general ? (
              <span className="titulo-oferta">{d.titulo_de_la_oferta_oferta_general}</span>
            ) : null}

            {d.titulo_de_la_oferta_oferta_socios ? (
              <span className="titulo-oferta">{d.titulo_de_la_oferta_oferta_socios}</span>
            ) : null}
          </p>
        </li>
      ))}
    </ul>
  );
};

export default Gallery;
