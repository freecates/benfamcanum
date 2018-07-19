import Head from 'next/head'
import Layout from '../components/MyLayout.js'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'
import {IntlProvider, FormattedDate} from 'react-intl'

const today = Date.now();
const todayISO = new Date(today).toISOString();

const Promociones = (props) => (
  <Layout>
    <Head>
      <title>Promociones para familias numerosas</title>
    </Head>
    <nav aria-label="Estás aquí:" role="navigation">
      <ul className="breadcrumbs">
        <li><Link prefetch href="/"><a>Inicio</a></Link></li>
        <li><Link prefetch href="/beneficios"><a>Ofertas para familias</a></Link></li>
        <li>
          <span className="show-for-sr">Actual: </span> Promociones
        </li>
      </ul>
    </nav>
    <section>
      <h1>Promociones</h1>
      <IntlProvider defaultLocale='es'>
      {props.promociones[0].acf.fecha_de_finalizaciion_de_la_promocion > todayISO ?
        <div className='table-scroll'>
          <table>          
            <thead>
              <tr>
                <td></td>
                <td></td>
                <td>Promoción</td>
                <td></td>
              </tr>
            </thead>
            {props.promociones.sort((a,b) => {
            if (a.slug < b.slug) {
              return -1
            }
            if (a.slug > b.slug) {
              return 1
            }
            return 0
            }).map((promocione, index) => (
            <tbody key={index}>
              <tr>
                <td width='64'><img src={'/static/32/' + promocione.acf.categoria_de_la_promocion.slug +'-familias-numerosas.png'} /></td>
                <td width='200'>{ promocione.acf.categoria_de_la_promocion.name}</td>
                <td><span dangerouslySetInnerHTML={ {__html: promocione.acf.nombre_de_la_empresa} } /> | <span>Válida hasta el 
                <strong> <FormattedDate value={promocione.acf.fecha_de_finalizaciion_de_la_promocion} day='numeric' month='long' year='numeric' /></strong></span>
                </td>
                <td width='150'>
                  <Link prefetch as={`/pro/${promocione.id}/${promocione.slug}`} href={`/promocion?id=${promocione.id}`}>
                    <a title={'Acceder a la ficha de ' + promocione.acf.nombre_de_la_empresa} className='button small'>Ver detalle</a>
                  </Link></td>
              </tr>
            </tbody>
            ))}
          </table>
        </div> : 
        <h2 className='align-center'>Lo sentimos. No hay promociones en curso en estos momentos.</h2>}

      </IntlProvider>
    </section>
        <style jsx>{`
          .breadcrumbs {
            margin-bottom:1em;
          }
          h1, .align-center {
            text-align:center;
          }
          h1, h2, h3 {
            color:#391f92;
          }
          table thead {
            background:none;
          }
          table tbody tr td {
            border-top:1px solid #000000;
          }
          table tbody tr td a {
            margin:0;
          }
          table tbody tr td a.button {
            background:#d86525;
          }
          table tbody tr td a.button:hover {
            background:#aa4e1c;
          }
          @media screen and (max-width: 768px) {
            table tbody td {
              padding:.5rem .1rem .5rem .1rem;
            }
          }
          @media screen and (min-width: 768px) {
            .table-scroll table {
              width:100%;
            }
          }
          nav a {
            color:#3f3fff;
          }
        `}</style>
  </Layout>
)

Promociones.getInitialProps = async function(context) {
  const res = await fetch(`https://gestorbeneficios.familiasnumerosas.org/wp-json/wp/v2/promociones`)
  const promociones = await res.json()

  console.log(`Promociones data fetched. Count: ${promociones.length}`)
  console.log(`La data de la promoció és ${promociones[0].acf.fecha_de_finalizaciion_de_la_promocion} i la data d'avui és ${todayISO}`)

  return { promociones }
}

export default Promociones