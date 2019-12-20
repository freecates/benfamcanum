import Link from 'next/link';
import Layout from '../../components/MyLayout.js';

export default props => (
  <Layout ruta={props.ruta}>
    <nav aria-label="Ets aquí:" role="navigation">
      <ul className="breadcrumbs">
        <li>
          <Link href="/ca-ES">
            <a>Inici</a>
          </Link>
        </li>
        <li>
          <span className="show-for-sr">Actual: </span>Avís Legal
        </li>
      </ul>
    </nav>
    <h1>Avís Legal</h1>
    <p>
      Els drets de propietat intel·lectual dels serveis on-line de FANOC i del seu contingut
      pertanyen a aquesta societat o, si escau, a terceres persones.
    </p>
    <p>
      L'usuari pot visualitzar tots els elements, imprimir-los, copiar-los i emmagatzemar-los al
      disc dur del seu ordinador o en qualsevol altre suport físic sempre que sigui, única i
      exclusivament, per al seu ús personal i privat. Per a la utilització amb fins comercials dels
      continguts del web, la seva distribució, així com la seva modificació, alteració o
      descompilació, es requereix un permís previ de FANOC.
    </p>
    <p>
      L'usuari es compromet a fer un ús adequat dels continguts i serveis que FANOC pugui oferir a
      la seva seu web ia no emprar-los per incórrer en activitats il·lícites o contràries a la bona
      fe ia l'ordenament legal.
    </p>
    <p>
      Amb la voluntat de millorar la pàgina web, FANOC es reserva el dret d'efectuar les
      modificacions que consideri oportunes, podent canviar, suprimir o afegir tant els continguts i
      serveis que presta com la forma en què aquests apareguin presentats o localitzats.
    </p>
    <p>
      FANOC autoritza mencions als seus continguts en altres webs, sempre que no reprodueixin els
      continguts presents a la pàgina web de FANOC. En el cas de disposar d'un enllaç hipertext a
      alguna de les seves pàgines, l'usuari ha de saber que està entrant a la pàgina web de FANOC i
      ha de percebre en el seu navegador la seva adreça URL. Si FANOC detecta l'incompliment de les
      anteriors condicions, així com qualsevol utilització indeguda dels continguts presentats a la
      seva pàgina web, es reserva el dret d'exercir totes les accions civils i penals necessàries.
    </p>
    <h2>Protecció de dades</h2>
    <p>
      En relació als serveis a disposició dels usuaris a través de registre previ, totes les dades
      es mantenen en la més estricta privacitat d'acord amb la legislació vigent. FANOC compleix
      aquesta legislació respecte a la protecció de dades personals dels seus usuaris i els manté en
      la més estricta confidencialitat d'acord amb el que disposa la Llei Orgànica 15/99 del 13 de
      desembre de 1999 sobre Protecció de Dades de Caràcter Personal (LOPD) , així com en el que
      disposa la Llei de Serveis de la Societat de la Informació i del Comerç Electrònic (SSICE)
      llei 34/2002 d'11 de juliol.
    </p>
    <p>
      L'usuari registrat en els serveis de la seu web de FANOC pot en tot moment exercitar els drets
      d'accés, rectificació i cancel·lació en els termes previstos en la LOPD i altres normes que la
      desenvolupen. Pot fer-ho per correu electrònicelectrónico{' '}
      <Link href="mailto:info@fanoc.org">
        <a>info@fanoc.org</a>
      </Link>{' '}
      sol·licitant l'accés, cancel·lació o rectificació de les seves dades.
    </p>
    <p>
      FANOC assegura la més estricta confidencialitat en la recollida i tractament de les dades
      facilitades pels seus usuaris a través d'Internet o qualsevol altre mitjà. Les dades
      facilitades pels usuaris seran emprades únicament per a les finalitats descrites en el propi
      formulari de subscripció i determinades per cada usuari.
    </p>
    <p>
      <strong>Associació de Famílies Nombroses de Catalunya - FANOC</strong>
      <br />
      C/ Balmes, 92 4t 1ªB
      <br />
      08008 Barcelona
      <br />
      Tel.: +34 93 351 10 00
      <br />
      Fax: +34 93 467 32 98
      <br />
      N.I.F. G59620617
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
