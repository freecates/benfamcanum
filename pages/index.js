import Head from 'next/head'
import Link from 'next/link'
import LayoutHome from '../components/LayoutHome.js'


export default () => (
    <LayoutHome>
    <Head>
      <title>Beneficios Familias Numerosas</title>
    </Head>
        <section className='call-to-action'>
                <h1><img alt='Icono conseguir beneficios familias numerosas' src='/static/icona-conseguir-beneficios-familias-numerosas.png'/><br/>¿No eres socio aún? ¿Quieres conseguir estos descuentos?</h1>
                <p><Link href="https://fanoc.org/hazte-socio/tipos-de-socio/"><a className='hollow button' target='_blank' title='Enlace externo' rel='noopener'>Quiero participar de estas ventajas</a></Link></p>
                <style jsx>{`
                    .call-to-action {
                        text-align:center;
                        margin:0 auto;
                    }
                    h1 {
                        color:#cb5599;
                    }
                    .button {
                        color:inherit!important;
                        text-transform:uppercase;
                        border-color:#cb5599;
                    }
                    .button:hover {
                        color:#cb5599;
                    }
                    @media screen and (min-width: 320px) {   
                        .call-to-action {
                        width: 100%;
                        }
                    }
                    @media screen and (min-width: 360px) {   
                        .call-to-action {
                        width: 90%;
                        }
                    }
                    @media screen and (min-width: 768px) {   
                        .call-to-action {
                        width: 70%;
                        }
                    }
                    @media screen and (min-width: 1366px) {   
                        .call-to-action {
                        width: 62%;
                        }
                    }
                `}</style>
            </section>
    </LayoutHome>
)
