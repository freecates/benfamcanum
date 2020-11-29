import Footer from './Footer';
import HeaderHome from './HeaderHome';
import { useRouter } from 'next/router';
import Styles from './Styles';

const layoutStyle = {
  margin: '0 auto',
  padding: 0,
  maxWidth: '100%'
};

const LayoutHome = props => {
  const { pathname } = useRouter();
  return (
    <div style={layoutStyle}>
      <HeaderHome ruta={pathname} />
      <main>{props.children}</main>
      <Footer ruta={pathname} />
      <Styles />
    </div>
  );
};

export default LayoutHome;
