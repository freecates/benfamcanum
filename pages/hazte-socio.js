import Link from 'next/link'
import Layout from '../components/MyLayout.js'

export default () => (
    <Layout>
      <nav aria-label="Estás aquí:" role="navigation">
        <ul className="breadcrumbs">
          <li><Link prefetch href="/"><a>Inicio</a></Link></li>
          <li>
            <span className="show-for-sr">Actual: </span>Hazte socio
          </li>
        </ul>
      </nav>

      <section className='call-to-action'>
        <h1>Hazte socio</h1>

        <figure><img src='/static/Imagenhome2016familiasnumerosas.jpg' width='100%' height='324' alt='Imagen hazte socio Familias Numerosas' title='Imagen hazte socio Familias Numerosas'/></figure>

        <p>Hazte socio y podrás acceder a múltiples ventajas y descuentos. Además, nos ayudarás a conseguir más y mejores beneficios para las familias numerosas, porque cuantos más seamos, más fuerza tendremos ante instituciones y empresas.</p>

        <h2>¡Si te asocias, ser más te costará menos!</h2>

        <figure><img src='/static/a.png' width='111' height='111' alt=''/></figure>

        <h2>Cómo asociarte</h2>

        <p>Puedes asociarte on line rellenando este formulario.</p>

        <p><a href='http://www.familias-numerosas.org/' title='Acceder' target='_blank'>Acceder al formulario</a></p>

        <p className='text-left'>Además de rellenar el formulario de socio con todos tus datos, deberás remitir por correo electrónico a la Asociación de tu localidad o de tu región una copia del título o carné oficial de familia numerosa o del libro de familia.</p>
        
        <p className='text-left'>Tenemos <a href='http://www.familiasnumerosas.org/conocenos/nuestras-asociaciones/' target='_blank'>Asociaciones en toda España</a>; deberás asociarte en la de tu localidad o en la más cercana a tu domicilio. Busca el email y envíales tu documentación. En breve se pondrán en contacto contigo y te remitirán tu carné de socio para que empieces a disfrutar cuanto antes de sus beneficios.</p>

        <p className='text-left'>Ser socio implica el pago de una cuota de aproximadamente 30 euros al año, con la que las Asociaciones sufragan sus gastos de funcionamiento y los servicios ofrecidos a los socios, ya que son entidades sin ánimo de lucro. El importe de la cuota puede variar entre Asociaciones, por lo que debes consultar en la que te corresponda.</p>

        <h2>Solicita información</h2>

        <p className='text-left'>Si simplemente quieres pedir información, busca los datos de la Asociación que te interese y ponte en contacto con ella, a través de correo electrónico o teléfono.</p>

        <figure><img src='/static/c.png' width='111' height='111' alt=''/></figure>

        <p>Aqui encontrarás los datos de todas las Asociaciones.</p>

        <p><a href='http://www.familiasnumerosas.org/conocenos/nuestras-asociaciones/' title="Acceder" target='_blank'>Elige tu asociación</a></p>
      </section>
        <style jsx>{`
            .breadcrumbs {
                margin-bottom:1em;
            }
            a {
                color:#3f3fff!important;
            }
            .call-to-action {
                text-align:center;
                margin:0 auto;
            }
            .text-left {
                text-align:left;
            }
            h1, h2 {
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
    </Layout>
)
