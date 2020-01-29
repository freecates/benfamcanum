import Link from 'next/link';
import React from 'react';
import FontAwesome from 'react-fontawesome';

const linkStyle = {
  marginLeft: 15
};

const navStyle = {
  margin: '0 auto',
  maxWidth: '100%',
  backgroundColor: '#f6f5f2',
  padding: '1em 1em 0 1em',
  color: '#000000'
};

const NavBarExternal = props => (
  <nav style={navStyle} ruta={props.ruta}>
    <section>
      <div className="wrapper">
        {props.ruta.includes('/ca-ES') && (
          <p>
            <span className="first">
              <a target="_blank" className="button" href="https://fanoc.org/zona-soci/">
                Zona socis
              </a>
            </span>
            <span className="first">
              <Link href="/">
                <a title="ir a la página de inicio en castellano" className="lang">
                  es
                </a>
              </Link>
            </span>
            <span className="second">
              <span>
                <a
                  target="_blank"
                  href="https://www.facebook.com/AssociacioFANOC/"
                  aria-label="Enllaç al perfil de Facebook"
                >
                  <FontAwesome
                    name="facebook-square"
                    size="2x"
                    aria-hidden
                    style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)', color: '#000000' }}
                  />
                </a>
              </span>{' '}
              <span>
                <a
                  target="_blank"
                  href="https://twitter.com/familianombrosa?lang=ca"
                  aria-label="Enllaç al perfil de Twitter"
                >
                  <FontAwesome
                    name="twitter-square"
                    size="2x"
                    aria-hidden
                    style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)', color: '#000000' }}
                  />
                </a>
              </span>{' '}
              <span>
                <a
                  target="_blank"
                  href="https://www.youtube.com/user/FANOCAssFamNom"
                  aria-label="Enlaç al perfil de Youtube"
                >
                  <FontAwesome
                    name="youtube-square"
                    size="2x"
                    aria-hidden
                    style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)', color: '#000000' }}
                  />
                </a>
              </span>{' '}
              <span>
                <a
                  target="_blank"
                  href="https://www.instagram.com/p/BkKP0-znVo8/
              "
                  aria-label="Enllaç al perfil d'Instragram"
                >
                  <FontAwesome
                    name="instagram"
                    size="2x"
                    aria-hidden
                    style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)', color: '#000000' }}
                  />
                </a>
              </span>
            </span>{' '}
            <span className="third">
              <a target="_blank" title="Contacte" href="https://fanoc.org/contacte/">
                Contacta
              </a>
            </span>
          </p>
        )}
        {props.ruta.indexOf('/ca-ES') == -1 && (
          <p>
            <span className="first">
              <a target="_blank" className="button" href="https://fanoc.org/es/zona-socio/">
                Zona socios
              </a>
            </span>
            <span className="first">
              <Link href="/ca-ES">
                <a title="anar a la pàgina d'inici en català" className="lang">
                  ca
                </a>
              </Link>
            </span>
            <span className="second">
              <span>
                <a
                  target="_blank"
                  href="https://www.facebook.com/AssociacioFANOC/"
                  aria-label="Enlace al perfil de Facebook"
                >
                  <FontAwesome
                    name="facebook-square"
                    size="2x"
                    aria-hidden
                    style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)', color: '#000000' }}
                  />
                </a>
              </span>{' '}
              <span>
                <a
                  target="_blank"
                  href="https://twitter.com/familianombrosa?lang=ca"
                  aria-label="Enlace al perfil de Twitter"
                >
                  <FontAwesome
                    name="twitter-square"
                    size="2x"
                    aria-hidden
                    style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)', color: '#000000' }}
                  />
                </a>
              </span>{' '}
              <span>
                <a
                  target="_blank"
                  href="https://www.youtube.com/user/FANOCAssFamNom"
                  aria-label="Enlace al perfil de Youtube"
                >
                  <FontAwesome
                    name="youtube-square"
                    size="2x"
                    aria-hidden
                    style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)', color: '#000000' }}
                  />
                </a>
              </span>{' '}
              <span>
                <a
                  target="_blank"
                  href="https://www.instagram.com/p/BkKP0-znVo8/
                "
                  aria-label="Enlace al perfil de Instragram"
                >
                  <FontAwesome
                    name="instagram"
                    size="2x"
                    aria-hidden
                    style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)', color: '#000000' }}
                  />
                </a>
              </span>
            </span>{' '}
            <span className="third">
              <a target="_blank" title="Contacto" href="https://fanoc.org/es/contacto/">
                Contacta
              </a>
            </span>
          </p>
        )}
      </div>

      <style jsx>{`
        a {
          color: inherit !important;
        }
        a:hover {
          color: #000000;
          text-decoration: underline;
        }
        a.button {
          color: #ffffff !important;
          background: #00add9 !important;
          border-radius: 3px;
          padding: 0.25em 1em;
        }
        a.lang {
          padding: 0.25em 1em;
          margin: 0 0 1rem 0;
          display: inline-block;
          vertical-align: middle;
          text-transform: uppercase;
        }
        .wrapper {
          text-align: left;
        }
        .wrapper p {
          margin-bottom: 0;
        }
        @media screen and (min-width: 768px) {
          .wrapper {
            max-width: 60rem;
            margin: 0 auto;
          }
          .wrapper-top {
            align-items: baseline;
          }
          .first {
            width: 33%;
            padding: 0 5em 0 0;
          }
          .second {
            width: 33%;
            padding: 0 5em 0 0;
          }
          .third {
            width: 33%;
            padding: 0 1em 0 0;
            font-size: 0.9rem;
          }
          .four {
            width: 33%;
            padding: 0 0 0 0;
          }
        }
      `}</style>
    </section>
  </nav>
);

export default NavBarExternal;
