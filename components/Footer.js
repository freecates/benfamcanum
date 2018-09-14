import React from 'react'
import Link from 'next/link'
import FontAwesome from 'react-fontawesome'

const linkStyle = {
  marginLeft: 15
}

const footerStyle = {
  margin: '0 auto',
  maxWidth: '100%',
  backgroundColor: '#434343',
  padding: '1em',
  color: '#ffffff'
}

const Footer = () => (
  <footer style={footerStyle}>
        <section>
          <div className='wrapper'>
              <div className='first'>
                <p><img src='/static/fanoc-logo-footer.png'/></p>
              </div>
              <div className='second'>
                 <p>Asociación de Familias numerosas de Cataluña</p>
                 <p><small>Balmes, 92, 3r 2a<br/>08008 Barcelona<br/>Teléfono: 933511000</small></p>
                 <p><small>Horario: de Lunes a Viernes de 9h a 18h /el mes de julio de 9 a 15h / agosto cerrado.</small></p>
              </div>
              <div className='third'>
                 <p>¡Síguenos!</p>
                 <p><span><a href='https://www.facebook.com/AssociacioFANOC/'><FontAwesome
                name='facebook'
                size='2x'
                style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)', color:'#ffffff' }}
              /></a></span> <span><a href='https://twitter.com/familianombrosa?lang=ca'><FontAwesome
                name='twitter'
                size='2x'
                style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)', color:'#ffffff' }}
              /></a></span> <span><a href='https://www.youtube.com/user/FANOCAssFamNom'><FontAwesome
              name='youtube'
              size='2x'
              style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)', color:'#ffffff' }}
            /></a></span></p>
            <p><small><Link prefetch href="/aviso-legal">
              <a title='Aviso legal'>Aviso Legal</a>
            </Link><br/>
            <Link prefetch href="/politica-de-cookies">
              <a title='Enlace externo'>Política de Cookies</a>
            </Link>
            </small>        
            </p>
              </div>
          </div>
          
          <style jsx>{`
            a {
              color:inherit;
            }
            a:hover {
              color:#ffffff;
              text-decoration:underline;
            }          
            @media screen and (min-width: 768px) {                          
              .wrapper {
                display: -ms-flexbox;
                display: flex;
                -ms-flex-wrap: wrap;
                    flex-wrap: wrap;
                align-items:center;
                max-width: 70rem;
                margin:0 auto;
              }
              .wrapper-top {
                align-items:baseline;
              }
              .first {
                width: 33%;
                padding:0 0 0 0;
              }
              .second {
                width: 33%;
                padding:0 0 0 0;
              }
              .third {
                width: 33%;
                padding:0 0 0 0;
              }
            }
          `}</style>

        </section>
        
        

    </footer>
)

export default Footer
