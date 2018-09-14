import Link from 'next/link'
import Layout from '../components/MyLayout.js'

export default () => (
    <Layout>
      <nav aria-label="Estás aquí:" role="navigation">
        <ul className="breadcrumbs">
          <li><Link prefetch href="/"><a>Inicio</a></Link></li>
          <li>
            <span className="show-for-sr">Actual: </span>Aviso Legal
          </li>
        </ul>
      </nav>
        <h1>Aviso Legal</h1>
        <p>Los derechos de propiedad intelectual de los servicios on-line de FANOC y de su contenido pertenecen a dicha sociedad o, en su caso, a terceras personas.</p>

        <p>El usuario puede visualizar todos los elementos, imprimirlos, copiarlos y almacenarlos en el disco duro de su ordenador o en cualquier otro soporte físico siempre y cuando sea, única y exclusivamente, para su uso personal y privado. Para la utilización con fines comerciales de los contenidos de la web, su distribución, así como su modificación, alteración o descompilación, se requiere un permiso previo de FANOC.</p>

        <p>El usuario se compromete a hacer un uso adecuado de los contenidos y servicios que FANOC pueda ofrecer en su sede web y a no emplearlos para incurrir en actividades ilícitas o contrarias a la buena fe y al ordenamiento legal.</p>

        <p>Con la voluntad de mejorar la página web, FANOC se reserva el derecho de efectuar las modificaciones que considere oportunas, pudiendo cambiar, suprimir o añadir tanto los contenidos y servicios que presta como la forma en la que éstos aparezcan presentados o localizados.</p>

        <p>FANOC autoriza menciones a sus contenidos en otras webs, siempre que no reproduzcan los contenidos presentes en la página web de FANOC. En el caso de disponer de un enlace hipertexto a alguna de sus páginas, el usuario debe saber que está entrando en la página web de FANOC y debe percibir en su navegador su dirección URL. Si FANOC detecta el incumplimiento de las anteriores condiciones, así como cualquier utilización indebida de los contenidos presentados en su página web, se reserva el derecho de ejercer todas las acciones civiles y penales necesarias.</p>

        <h2>Protección de datos</h2>

        <p>En relación a los servicios a disposición de los usuarios a través de registro previo, todos los datos se mantienen en la más estricta privacidad de acuerdo con la legislación vigente. FANOC cumple esta legislación respecto a la protección de datos personales de sus usuarios y los mantiene en la más estricta confidencialidad de acuerdo con lo dispuesto en la Ley Orgánica 15/99 del 13 de diciembre de 1999 sobre Protección de Datos de Carácter Personal (LOPD), así como en lo dispuesto en la Ley de Servicios de la Sociedad de la Información y del Comercio Electrónico (SSICE) ley 34/2002 de 11 de julio.</p>

        <p>El usuario registrado en los servicios de la sede web de FANOC puede en todo momento ejercitar los derechos de acceso, rectificación y cancelación en los términos previstos en la LOPD y demás normas que la desarrollan. Puede hacerlo por correo electrónico <Link href='mailto:info@fanoc.org'><a>info@fanoc.org</a></Link> solicitando el acceso, cancelación o rectificación de sus datos.</p>

        <p>FANOC asegura la más estricta confidencialidad en la recogida y tratamiento de los datos facilitados por sus usuarios a través de Internet o cualquier otro medio. Los datos facilitados por los usuarios serán empleados únicamente para las finalidades descritas en el propio formulario de suscripción y determinadas por cada usuario.</p>

        <p><strong>Associació de Famílies Nombroses de Catalunya - FANOC</strong><br/> 
        C/ Balmes, 92 4t 1ªB<br/>
        08008 Barcelona<br/>
        Tel.: +34 93 351 10 00<br/>
        Fax: +34 93 467 32 98<br/>
        N.I.F. G59620617</p>

      <style jsx>{`
        .breadcrumbs {
          margin-bottom:1em;
        }
        a {
          color:#00add9!important;
        }
      `}</style>
    </Layout>
)
