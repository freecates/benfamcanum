import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/MyLayout.js'

export default () => (
    <Layout layout>
    <Head>
      <title>Prestaciones Familias Numerosas</title>
    </Head>
        <nav aria-label="Estás aquí:" role="navigation">
        <ul className="breadcrumbs">
            <li><Link prefetch href="/"><a>Inicio</a></Link></li>
            <li>
            <span className="show-for-sr">Actual: </span> Prestaciones oficiales 
            </li>
        </ul>
        </nav>
       <section className='call-to-action'>
            <p className='icones-prestacions'>
                <Link prefetch href="/municipios-prestaciones"><a><img src='/static/icona-prestacions-municipals-familias-numerosas.png'/></a></Link> 
                <Link prefetch href="/comunidades-prestaciones"><a><img src='/static/icona-prestacions-autonomiques-familias-numerosas.png'/></a></Link> 
                <Link prefetch href="/prestaciones-estatales"><a><img src='/static/icona-prestacions-estatals-familias-numerosas.png'/></a></Link>
            </p>
        </section>
        <style jsx>{`
            a, li {
                color:#ffffff!important;
            }
            .breadcrumbs {
                margin:-2rem 0 1rem 0;
            }
            .call-to-action {
                text-align:center;
                margin:0 auto;
                color:#ffffff;
            }
            @media screen and (min-width: 320px) {   
                .call-to-action {
                width: 100%;
                }
                .icones-prestacions img {
                    padding:0 0 1em 0;
                }
            }
            @media screen and (min-width: 360px) {   
                .call-to-action {
                width: 90%;
                }
            }
            @media screen and (min-width: 768px) {   
                .call-to-action {
                width: 93%;
                }
                .icones-prestacions img {
                    padding:0 2em 1em 0;
                }
            }
            @media screen and (min-width: 1366px) {   
                .call-to-action {
                width: 70%;
                }
            }
        `}</style>
    </Layout>
)
