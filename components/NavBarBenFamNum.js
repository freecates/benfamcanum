import Link from 'next/link';
import React from 'react';
import FontAwesome from 'react-fontawesome';
import MediaQuery from 'react-responsive';
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem } from 'reactstrap';

export default class NavBarBenFamNum extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      ruta: ''
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    const ruta = this.props.ruta;
    return (
      <div>
        <Navbar style={{ padding: '0 1rem 1rem 1rem' }} inverse expand="lg" ruta={ruta}>
          <NavbarToggler title="Commutador" className="ml-2" onClick={this.toggle} />
          {ruta.includes('/ca-ES') && (
            <Link href="https://fanoc.org/">
              <a>
                <NavbarBrand title="Anar al Web Corporatiu FANOC" className="ml-auto">
                  <img src="/static/logo-families-nombroses.png" alt="Web Corporatiu FANOC" />
                </NavbarBrand>
              </a>
            </Link>
          )}
          {ruta.indexOf('/ca-ES') == -1 && (
            <Link href="https://fanoc.org/">
              <a>
                <NavbarBrand title="Ir a la Web Corporativa FANOC" className="ml-auto">
                  <img src="/static/logo-families-nombroses.png" alt="Web Corporativa FANOC" />
                </NavbarBrand>
              </a>
            </Link>
          )}
          <Collapse isOpen={this.state.isOpen} navbar>
            {ruta.includes('/ca-ES') && (
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <Link  href="/ca-ES/beneficis">
                    <a title="Ofertes comercials per a famílies nombroses">
                      <strong>Ofertes i descomptes</strong>
                    </a>
                  </Link>
                </NavItem>
                <NavItem>
                  <Link  href="/ca-ES/prestacions">
                    <a title="Prestacions per a famílies nombroses">
                      <strong>Ajudes públiques</strong>
                    </a>
                  </Link>
                </NavItem>
                <NavItem>
                  <Link  href="/ca-ES/buscador">
                    <a title="Buscador">
                      <FontAwesome
                        name="search"
                        size="2x"
                        style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
                      />
                    </a>
                  </Link>
                </NavItem>
                <MediaQuery maxDeviceWidth={768}>
                  <NavItem>
                    <p>
                      <Link  href="/">
                        <a title="Ir a la página de inicio en castellano" className="lang">
                          <small>ES</small>
                        </a>
                      </Link>
                    </p>
                  </NavItem>
                </MediaQuery>
              </Nav>
            )}

            {ruta.indexOf('/ca-ES') == -1 && (
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <Link  href="/beneficios">
                    <a title="Ofertas comerciales para familias numerosas">
                      <strong>Ofertas y descuentos</strong>
                    </a>
                  </Link>
                </NavItem>
                <NavItem>
                  <Link  href="/prestaciones">
                    <a title="Prestaciones para familias numerosas">
                      <strong>Ayudas públicas</strong>
                    </a>
                  </Link>
                </NavItem>
                <NavItem>
                  <Link  href="/buscador">
                    <a title="Buscador">
                      <FontAwesome
                        name="search"
                        size="2x"
                        style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
                      />
                    </a>
                  </Link>
                </NavItem>
                <MediaQuery maxDeviceWidth={768}>
                  <NavItem>
                    <p>
                      <Link  href="/ca-ES">
                        <a title="Anar a la pàgina d'inici en català" className="lang">
                          <small>CA</small>
                        </a>
                      </Link>
                    </p>
                  </NavItem>
                </MediaQuery>
              </Nav>
            )}
          </Collapse>
        </Navbar>
        <style jsx>{`
          a {
            color: #000000;
            margin: 0 1em;
          }
          a:hover {
            color: #000000;
            text-decoration: underline;
          }
          a strong {
            text-transform: uppercase;
          }
          p {
            text-align: right;
          }
          a.lang {
            padding: 0.5em;
            color: #ffffff !important;
            background: #000000;
          }
          .nav-item:last-child {
            text-align: right !important;
          }
          @media screen and (min-width: 768px) {
            .align-nav {
            }
          }
          @media screen and (min-width: 1024px) {
            .align-nav {
              margin-top: 5em;
            }
          }
        `}</style>
      </div>
    );
  }
}
