import Link from 'next/link';
import { useRouter } from 'next/router';
import slug from 'limax';
import Layout from './MyLayout';

const Fallback = ({ notFound, breadCrumb }) => {

  const { pathname } = useRouter();
  const slugFromBreadCrumb = slug(breadCrumb);
  return (
    <>
      {pathname.includes('/ca-ES') && (
        <Layout>
          <nav aria-label="Ets aquí:" role="navigation">
            <ul className="breadcrumbs">
              <li>
                <Link href="/ca-ES">
                  <a>Inici</a>
                </Link>
              </li>
              <li>
                <Link href={`/ca-ES/${slugFromBreadCrumb}`}>
                  <a>{breadCrumb}</a>
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
      )}
      {pathname.indexOf('/ca-ES') == -1 && (
        <Layout>
          <nav aria-label="Estás aquí:" role="navigation">
            <ul className="breadcrumbs">
              <li>
                <Link href="/">
                  <a>Inicio</a>
                </Link>
              </li>
              <li>
                <Link href={`/${slugFromBreadCrumb}`}>
                  <a>{breadCrumb}</a>
                </Link>
              </li>
            </ul>
          </nav>
          <section>
            <div className={'file'}>
              <h1>{notFound ? 'Oferta no encontrada' : '... Loading'}</h1>
            </div>
          </section>
        </Layout>
      )}
    </>
  );
};

export default Fallback;
