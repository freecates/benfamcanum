import Link from 'next/link';
import { useRouter } from 'next/router';

const Promotions = ({ data }) => {
  const { pathname } = useRouter();
  const today = Date.now();
  const todayISO = new Date(today).toISOString();
  return data[0].acf.fecha_de_finalizaciion_de_la_promocion > todayISO ? (
    <>
      <div className="promo">
        <h4 className="align-center">
          <span className="label alert file-label">
            {!pathname.includes('/ca-ES/') ? (
              <Link href="/promociones">
                <a>
                  Mira aquí promociones que te
                  <br />
                  puedan interesar
                </a>
              </Link>
            ) : (
              <Link href="/ca-ES/promocions">
                <a>
                  Mira aquí promocions que et
                  <br />
                  puguin interessar
                </a>
              </Link>
            )}
          </span>
        </h4>
      </div>
      <style jsx>{`
        .align-center {
          text-align: center;
        }
        .promo {
          margin-top: 2em;
        }
        .file-label {
          background: #f18903 !important;
          color: #ffffff;
          font-weight: 400;
          font-size: 1.25rem;
          white-space: normal;
        }
        .file-label a {
          color: #ffffff !important;
        }
        .file-label a:hover {
          text-decoration: none;
        }
      `}</style>
    </>
  ) : null;
};

export default Promotions;
