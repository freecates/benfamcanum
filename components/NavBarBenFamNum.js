import React from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import FontAwesome from 'react-fontawesome';
import Link from 'next/link';

export default class NavBarBenFamNum extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div>
        <Navbar inverse toggleable expand='lg'>
          <NavbarToggler title='Commutador' className='ml-2' onClick={this.toggle} />
          <Link prefetch href="/"><NavbarBrand title='Inicio' className='ml-auto'>
            <img src='/static/logo-families-nombroses.png' alt='Inicio' />
          </NavbarBrand></Link>
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem><Link prefetch href="/beneficios">
                  <a title='Ofertas comerciales para familias numerosas'><strong>Ofertas y descuentos</strong></a>
                </Link></NavItem>
                <NavItem><Link prefetch href="/prestaciones">
                  <a title='Prestaciones para familias numerosas'><strong>Ayudas públicas</strong></a>
                </Link></NavItem>
                <NavItem><Link prefetch href="/contacto">
                  <a title='Contacta con nosotros'><strong>Contacto</strong></a>
                </Link></NavItem>
                <NavItem><Link prefetch href="/buscador">
                  <a title='Buscador'><FontAwesome
                name='search'
                size='2x'
                style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
              /></a>
                </Link></NavItem>
              </Nav>
            </Collapse>
        </Navbar>
        <style jsx>{`
          a {
            color:#000000;
            margin:0 1em;
          }
          a:hover {
            color:#000000;
            text-decoration:underline;
          }
          a strong {
            text-transform:uppercase;
          }
          @media screen and (min-width: 768px) {
            .align-nav {
            }
          }
          @media screen and (min-width: 1024px) {
            .align-nav {
              margin-top:5em;
            }
          }
        `}</style>
      </div>
    );
  }
}