import Footer from './Footer';
import HeaderHome from './HeaderHome';
import Styles from './Styles';

const layoutStyle = {
  margin: '0 auto',
  padding: 0,
  maxWidth: '100%'
};

const LayoutHome = props => (
  <div style={layoutStyle}>
    <HeaderHome ruta={props.ruta} />
    <main>{props.children}</main>
    <Footer ruta={props.ruta} />
    <Styles />
  </div>
);

export default LayoutHome;
