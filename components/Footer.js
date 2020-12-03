import Link from 'next/link';
import React from 'react';
import FontAwesome from 'react-fontawesome';

const linkStyle = {
  marginLeft: 15
};

const footerStyle = {
  margin: '0 auto',
  maxWidth: '100%',
  backgroundColor: '#434343',
  padding: '1em',
  color: '#ffffff'
};

const Footer = props => (
  <footer style={footerStyle}>
    <section>
      <div className="wrapper">
        <div className="first">
          <p>
            <img
              src="/static/fanoc-logo-footer.png"
              alt="Logotip de FAmilies NOmbroses de Catalunya"
              height={'115'}
              width={'172'}
            />
          </p>
        </div>
        {props.ruta.includes('/ca-ES') && (
          <React.Fragment>
            <div className="second">
              <p>Associació de Families Nombroses de Catalunya</p>
              <p>
                <small>
                  Balmes, 92, 3r 2a
                  <br />
                  08008 Barcelona
                  <br />
                  Telèfon: 933511000
                </small>
              </p>
              <p>
                <small>
                  Horari: de Dilluns a Divendres de 9h a 18h / el mes de juliol de 9 a 15h / agost
                  tancat.
                </small>
              </p>
            </div>
            <div className="third">
              <p>Segueix-nos</p>
              <p>
                <span>
                  <a
                    href="https://www.facebook.com/AssociacioFANOC/"
                    aria-label="Enllaç al perfil de Facebook"
                  >
                    <FontAwesome
                      name="facebook-square"
                      size="2x"
                      aria-hidden
                      style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)', color: '#ffffff' }}
                    />
                  </a>
                </span>{' '}
                <span>
                  <a
                    href="https://twitter.com/familianombrosa?lang=ca"
                    aria-label="Enllaç al perfil de Twitter"
                  >
                    <FontAwesome
                      name="twitter-square"
                      size="2x"
                      aria-hidden
                      style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)', color: '#ffffff' }}
                    />
                  </a>
                </span>{' '}
                <span>
                  <a
                    href="https://www.youtube.com/user/FANOCAssFamNom"
                    aria-label="Enllaç al perfil de Youtube"
                  >
                    <FontAwesome
                      name="youtube-square"
                      size="2x"
                      aria-hidden
                      style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)', color: '#ffffff' }}
                    />
                  </a>
                </span>{' '}
                <span>
                  <a
                    href="https://www.instagram.com/p/BkKP0-znVo8/
                "
                    aria-label="Enllaçe al perfil d'Instagram"
                  >
                    <FontAwesome
                      name="instagram"
                      size="2x"
                      aria-hidden
                      style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)', color: '#ffffff' }}
                    />
                  </a>
                </span>
              </p>
              <p>
                <small>
                  <Link href="/ca-ES/aviso-legal">
                    <a title="Avís legal">Avís Legal</a>
                  </Link>
                  <br />
                  <Link href="/ca-ES/politica-de-cookies">
                    <a title="Polítiva de Cookies">Política de Cookies</a>
                  </Link>
                </small>
              </p>
            </div>
            <div className="four">
              <p>
                <a className="button" href="https://fanoc.org/hazte-amigo/">
                  Subscriu-te a la nostra newsletter!
                </a>
              </p>
            </div>
          </React.Fragment>
        )}

        {props.ruta.indexOf('/ca-ES') == -1 && (
          <React.Fragment>
            <div className="second">
              <p>Asociación de Familias numerosas de Cataluña</p>
              <p>
                <small>
                  Balmes, 92, 3r 2a
                  <br />
                  08008 Barcelona
                  <br />
                  Teléfono: 933511000
                </small>
              </p>
              <p>
                <small>
                  Horario: de Lunes a Viernes de 9h a 18h /el mes de julio de 9 a 15h / agosto
                  cerrado.
                </small>
              </p>
            </div>
            <div className="third">
              <p>¡Síguenos!</p>
              <p>
                <span>
                  <a
                    href="https://www.facebook.com/AssociacioFANOC/"
                    aria-label="Enlace al perfil de Facebook"
                  >
                    <FontAwesome
                      name="facebook-square"
                      size="2x"
                      aria-hidden
                      style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)', color: '#ffffff' }}
                    />
                  </a>
                </span>{' '}
                <span>
                  <a
                    href="https://twitter.com/familianombrosa?lang=ca"
                    aria-label="Enlace al perfil de Twitter"
                  >
                    <FontAwesome
                      name="twitter-square"
                      size="2x"
                      aria-hidden
                      style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)', color: '#ffffff' }}
                    />
                  </a>
                </span>{' '}
                <span>
                  <a
                    href="https://www.youtube.com/user/FANOCAssFamNom"
                    aria-label="Enlace al perfil de Youtube"
                  >
                    <FontAwesome
                      name="youtube-square"
                      size="2x"
                      aria-hidden
                      style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)', color: '#ffffff' }}
                    />
                  </a>
                </span>{' '}
                <span>
                  <a
                    href="https://www.instagram.com/p/BkKP0-znVo8/
                "
                    aria-label="Enlace al perfil de Instagram"
                  >
                    <FontAwesome
                      name="instagram"
                      size="2x"
                      aria-hidden
                      style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)', color: '#ffffff' }}
                    />
                  </a>
                </span>
              </p>
              <p>
                <small>
                  <Link href="/aviso-legal">
                    <a title="Aviso legal">Aviso Legal</a>
                  </Link>
                  <br />
                  <Link href="/politica-de-cookies">
                    <a title="Enlace externo">Política de Cookies</a>
                  </Link>
                </small>
              </p>
            </div>
            <div className="four">
              <p>
                <a className="button" href="https://fanoc.org/hazte-amigo/">
                  ¡Suscríbete a nuestra newsletter!
                </a>
              </p>
            </div>
          </React.Fragment>
        )}
      </div>

      <style jsx>{`
        a {
          color: inherit !important;
        }
        a:hover {
          color: #ffffff;
          text-decoration: underline;
        }
        a.button {
          color: #ffffff !important;
          background: #00add9 !important;
          border-radius: 3px;
        }
        @media screen and (min-width: 768px) {
          .wrapper {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-wrap: wrap;
            flex-wrap: wrap;
            align-items: center;
            max-width: 70rem;
            margin: 0 auto;
          }
          .wrapper-top {
            align-items: baseline;
          }
          .first {
            width: 25%;
            padding: 0 1em 0 0;
          }
          .second {
            width: 25%;
            padding: 0 1em 0 0;
          }
          .third {
            width: 25%;
            padding: 0 1em 0 0;
          }
          .four {
            width: 25%;
            padding: 0 0 0 0;
          }
        }
      `}</style>
    </section>
  </footer>
);

export default Footer;
