import React from 'react'
import Link from 'next/link'

const linkStyle = {
  marginLeft: 15
}

const footerStyle = {
  margin: '20px auto',
  textAlign: 'center',
  maxWidth: '100%'
}

const Footer = () => (
  <footer style={footerStyle}>
        <p><Link href="https://www.facebook.com/AssociacioFANOC/"><a title='Enlace externo' target="_blank" rel='noopener'><img alt='Logo de Facebook' src='/static/logo-facebook-familias-numerosas.png' /></a></Link> <Link href="https://twitter.com/familianombrosa?lang=ca"><a title='Enlace externo' target="_blank" rel='noopener'><img alt='Logo de Twiter' src='/static/logo-twitter-familias-numerosas.png' /></a></Link></p>

        <section>
          <div className='wrapper'>
              <div className='first'>
                <p className='purple'>Miembros de:<br/><Link href="http://www.elfac.org/"><a title='Enlace externo' target="_blank" rel='noopener'><img alt='Logo European Large Families Confederation' src='/static/logo-european-large-families-confederation-familias-numerosas.jpg' /></a></Link></p>
              </div>
              <div className='second'>
                 <p className='purple'>Con el apoyo de:<br/><Link href="https://www.msssi.gob.es/"><a title='Enlace externo' target="_blank" rel='noopener'><img alt='Loog Ministerio de Sanidad, Servicios Sociales e Igualdad' src='/static/logo-ministerio-familias-numerosas.png' /></a></Link></p>
              </div>
              <div className='third'>
                 <p className='purple'>Certificación<br/><Link href="http://www.masfamilia.org/que-es-2"><a title='Enlace externo' target="_blank" rel='noopener'><img alt='Logo familiarmente responsable' src='/static/logo-familiarmente-responsable-familias-numerosas.png' /></a></Link>
                </p>
              </div>
          </div>
          <p className='grey'>Associació de Famílies Nombroses de Catalunya - FANOC &#169; 2018
          <Link prefetch href="/aviso-legal">
            <a title='Aviso legal' style={linkStyle}>Aviso Legal</a>
          </Link>
          <Link prefetch href="/politica-de-cookies">
            <a title='Enlace externo' style={linkStyle}>Política de Cookies</a>
          </Link>        
          </p>
          
          <style jsx>{`
            .purple {
              color:#3a2092;
            }
            a {
              color:inherit;
            }
            a:hover {
              text-decoration:underline;
            }
            .grey {
              background-color:#e0e4e8;
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
