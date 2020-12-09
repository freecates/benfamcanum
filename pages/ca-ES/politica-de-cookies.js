import Link from 'next/link';
import { useRouter } from 'next/router';
import Layout from '@components/MyLayout.js';

const PoliticaDeCookies = () => {
  return (
    <Layout>
      <nav aria-label="Ets aquí:" role="navigation">
        <ul className="breadcrumbs">
          <li>
            <Link href="/ca-ES">
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
        Les cookies són breus informacions que s'envien i s'emmagatzemen en el disc dur de
        l'ordinador de l'usuari a través del seu navegador quan aquest es connecta a un web. Les
        galetes es poden utilitzar per demanar i emmagatzemar dades de l'usuari mentre està
        connectat per facilitar-li els serveis sol·licitats i que no es solen conservar (cookies de
        sessió), o per conservar les dades de l'usuari per a un altre tipus de serveis futurs i que
        es poden conservar per temps indefinit (galetes persistents). Les galetes poden ser pròpies
        o de tercers.
      </p>

      <p>Hi ha diversos tipus de cookies:</p>

      <ul>
        <li>
          Galetes tècniques que faciliten la navegació de l'usuari i la utilització de les diferents
          opcions o serveis que ofereix la web com identificar la sessió, permetre l'accés a
          determinades àrees, facilitar comandes, compres, emplenament de formularis, inscripcions,
          seguretat, facilitar funcionalitats (vídeos , xarxes socials, etc.).
        </li>
        <li>
          Galetes de personalització que permeten a l'usuari accedir als serveis segons les seves
          preferències (idioma, navegador, configuració, etc.).
        </li>
        <li>
          Galetes d'anàlisi que permeten l'anàlisi anònim del comportament dels usuaris del web i
          que permeten mesurar l'activitat de l'usuari i elaborar perfils de navegació per tal
          objectiu de millorar els llocs web.
        </li>
        <li>Galetes publicitàries que permeten la gestió dels espais publicitaris del web.</li>
        <li>
          Galetes de publicitat personalitzada que permeten la gestió dels espais publicitaris del
          web sobre la base del comportament i hàbits de navegació de l'usuari, d'on s'obté el seu
          perfil i aquest fet permet personalitzar la publicitat que es mostra en el navegador de
          l'usuari.
        </li>
      </ul>

      <p>
        FANOC únicament utilitza cookies tècniques, de personalització i anàlisi, pròpies i de
        tercers, que en cap cas tracten dades de caràcter personal ni capten hàbits de navegació per
        a fins publicitaris.
      </p>

      <p>
        Per això, en accedir a la nostra web, en compliment de l'article 22 de la Llei de Serveis de
        la Societat de la Informació, en tractar galetes d'anàlisi, li hem sol·licitat el seu
        consentiment per al seu ús, que en tot cas s'instal·laran passat un termini de temps
        prudencial perquè l'usuari tingui temps de decidir prestar el seu consentiment o no.
      </p>

      <p>
        De tota manera, l'informem que pot activar o desactivar aquestes cookies seguint les
        instruccions del seu navegador d'Internet.
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
};

export default PoliticaDeCookies;
