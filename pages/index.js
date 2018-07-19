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
                <p><img alt='Carnet de socio familias numerosas' src='/static/carnet-familias-numerosas.jpg'/></p>
                <p><Link href="http://www.familiasnumerosas.org/hazte-socio/"><a className='hollow button' target='_blank' title='Enlace externo' rel='noopener'>Quiero participar de estas ventajas</a></Link></p>
                <style jsx>{`
                    .call-to-action {
                        text-align:center;
                        margin:0 auto;
                    }
                    h1 {
                        color:#391f92;
                    }
                    .button {
                        color:inherit;
                        text-transform:uppercase;
                        border-color:#391f92;
                    }
                    .button:hover {
                        color:#391f92;
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
