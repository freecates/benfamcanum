import Link from 'next/link';
import Layout from '../../components/MyLayout.js';

export default props => (
  <Layout ruta={props.ruta}>
    <nav aria-label="Ets aquí:" role="navigation">
      <ul className="breadcrumbs">
        <li>
          <Link prefetch href="/ca-ES">
            <a>Inici</a>
          </Link>
        </li>
        <li>
          <span className="show-for-sr">Actual: </span>Política de Cookies
        </li>
      </ul>
    </nav>
    <h1>Política de cookies</h1>
    <p>
      Las cookies son breves informaciones que se envían y almacenan en el disco duro del ordenador
      del usuario a través de su navegador cuando éste se conecta a una web. Las cookies se pueden
      utilizar para recabar y almacenar datos del usuario mientras está conectado para facilitarle
      los servicios solicitados y que no se suelen conservar (cookies de sesión), o para conservar
      los datos del usuario para otro tipo de servicios futuros y que se pueden conservar por tiempo
      indefinido (cookies persistentes). Las cookies pueden ser propias o de terceros.
    </p>

    <p>Existen varios tipos de cookies:</p>

    <ul>
      <li>
        Cookies técnicas que facilitan la navegación del usuario y la utilización de las diferentes
        opciones o servicios que ofrece la web como identificar la sesión, permitir el acceso a
        determinadas áreas, facilitar pedidos, compras, cumplimentación de formularios,
        inscripciones, seguridad, facilitar funcionalidades (vídeos, redes sociales, etc.).
      </li>
      <li>
        Cookies de personalización que permiten al usuario acceder a los servicios según sus
        preferencias (idioma, navegador, configuración, etc.).
      </li>
      <li>
        Cookies de análisis que permiten el análisis anónimo del comportamiento de los usuarios de
        la web y que permiten medir la actividad del usuario y elaborar perfiles de navegación con
        el fin objetivo de mejorar los sitios web.
      </li>
      <li>
        Cookies publicitarias que permiten la gestión de los espacios publicitarios de la web.
      </li>
      <li>
        Cookies de publicidad personalizada que permiten la gestión de los espacios publicitarios de
        la web en base al comportamiento y hábitos de navegación del usuario, de donde se obtiene su
        perfil y este hecho permite personalizar la publicidad que se muestra en el navegador del
        usuario.
      </li>
    </ul>

    <p>
      FANOC únicamente utiliza cookies técnicas, de personalización y análisis, propias y de
      terceros, que en ningún caso tratan datos de carácter personal ni captan hábitos de navegación
      para fines publicitarios.
    </p>

    <p>
      Por ello, al acceder a nuestra web, en cumplimiento del artículo 22 de la Ley de Servicios de
      la Sociedad de la Información, al tratar cookies de análisis, le hemos solicitado su
      consentimiento para su uso, que en todo caso se instalarán pasado un plazo de tiempo
      prudencial para que el usuario tenga tiempo de decidir prestar su consentimiento o no.
    </p>

    <p>
      De todas formas, le informamos que puede activar o desactivar estas cookies siguiendo las
      instrucciones de su navegador de Internet.
    </p>

    <style jsx>{`
      .breadcrumbs {
        margin-bottom: 1em;
      }
      a {
        color: #00add9 !important;
      }
    `}</style>
  </Layout>
);
