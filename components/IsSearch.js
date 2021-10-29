import React from "react";
import fetch from 'isomorphic-unfetch';
import Link from 'next/link';

const B = props => (
  <div>
    <p className="fade-in file-label align-center">
      {props.ruta.includes('/ca-ES') && (
        <small>
          Per a que la cerca funcioni <strong>has de fer clic al quadre verd de Cercar</strong>
        </small>
      )}
      {props.ruta.indexOf('/ca-ES') == -1 && (
        <small>
          Para que la búsqueda funcione <strong>debes clicar en el cuadro verde de Buscar</strong>
        </small>
      )}
    </p>
    <style jsx>{`
      .file-label {
        margin-top: 1em;
        background: rgba(241, 137, 3, 0.2) !important;
        color: #000000;
        padding: 1em;
        white-space: normal;
      }
      .align-center {
        text-align: center;
      }
      .fade-in {
        animation-name: fadeIn;
        animation-duration: 1.3s;
        animation-timing-function: cubic-bezier(0, 0, 0.4, 1);
        animation-fill-mode: forwards;
      }
      @keyframes fadeIn {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }
    `}</style>
  </div>
);

class IsSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Title: '',
      PostResults: {},
      OfertasResults: {},
      OfertasGrandeMarcasResults: {},
      OfertasGrandeMarcasCAResults: {},
      ActionButton: null,
      ruta: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
    if (value != '') {
      this.setState({
        ActionButton: <B ruta={this.props.ruta} />
      });
    } else {
      this.setState({
        ActionButton: null
      });
    }
  }

  handleSubmit = async function(event) {
    const noEncTitle = this.state.Title;
    const title = encodeURI(noEncTitle);

    const res = await fetch(
      `https://gestorbeneficis.fanoc.org/wp-json/lanauva/v1/beneficios?title=${title}&comunidad=catalu`
    );
    const res2 = await fetch(
      `https://gestorbeneficis.fanoc.org/wp-json/lanauva/v1/ofertas_online?title=${title}`
    );
    const res3 = await fetch(
      `https://gestorbeneficis.fanoc.org/wp-json/lanauva/v1/ofertas_grandes_marc?title=${title}&comunidad=8143`
    );
    const res4 = await fetch(
      `https://gestorbeneficis.fanoc.org/wp-json/lanauva/v1/of_gr_m_ca/?title=${title}&comunidad=8143`
    );
    const PostResults = await res.json();
    const OfertasResults = await res2.json();
    const OfertasGrandeMarcasResults = await res3.json();
    const OfertasGrandeMarcasCAResults = await res4.json();
    console.log(
      PostResults,
      OfertasResults,
      OfertasGrandeMarcasResults,
      OfertasGrandeMarcasCAResults
    );
    this.setState({
      PostResults,
      OfertasResults,
      OfertasGrandeMarcasResults,
      OfertasGrandeMarcasCAResults
    });
    event.persist();
  };

  render() {
    const ruta = this.props.ruta;
    console.log(
      `Post count: ${this.state.PostResults.length}, ${this.state.OfertasResults.length}, ${this.state.OfertasGrandeMarcasResults.length}, ${this.state.OfertasGrandeMarcasCAResults.length}`
    );
    if (
      (this.state.PostResults.length >= 1) |
      (this.state.OfertasResults.length >= 1) |
      (this.state.OfertasGrandeMarcasResults.length >= 1) |
      (this.state.OfertasGrandeMarcasCAResults.length >= 1)
    ) {
      return (
        <main>
          {this.state.PostResults.length >= 1 ? (
            <section className="section-padding">
              <div className="fade-in">
                <p>
                  {ruta.includes('/ca-ES') && (
                    <>
                      Resultats de <strong>Beneficis</strong> amb la cerca
                    </>
                  )}
                  {ruta.indexOf('/ca-ES') == -1 && (
                    <>
                      Resultados de <strong>Beneficios</strong> con la búsqueda
                    </>
                  )}{' '}
                  <strong>"{this.state.Title}"</strong>
                </p>
                <ul className="gallery results">
                  {this.state.PostResults.map((PostResult, index) => (
                    <li className="benefit" key={index}>
                      {PostResult.imagen_destacada_de_la_oferta_general_thumb ? (
                        <p className="fade-in">
                          {ruta.includes('/ca-ES') && (
                            <Link
                              as={`/ca-ES/p/${PostResult.ID}/${PostResult.slug}`}
                              href={`/ca-ES/post?id=${PostResult.ID}`}
                            >
                              <a title={'Veure la fitxa de ' + PostResult.name}>
                                <img
                                  className="fade-in"
                                  width={'250'}
                                  height={'250'}
                                  loading={'lazy'}
                                  src={
                                    PostResult.imagen_destacada_de_la_oferta_general_thumb.sizes
                                      .thumbnail
                                  }
                                  alt={PostResult.titulo_de_la_oferta_oferta_general}
                                />
                              </a>
                            </Link>
                          )}
                          {ruta.indexOf('/ca-ES') == -1 && (
                            <Link
                              as={`/p/${PostResult.ID}/${PostResult.slug}`}
                              href={`/post?id=${PostResult.ID}`}
                            >
                              <a title={'Ver la ficha de ' + PostResult.name}>
                                <img
                                  className="fade-in"
                                  width={'250'}
                                  height={'250'}
                                  loading={'lazy'}
                                  src={
                                    PostResult.imagen_destacada_de_la_oferta_general_thumb.sizes
                                      .thumbnail
                                  }
                                  alt={PostResult.titulo_de_la_oferta_oferta_general}
                                />
                              </a>
                            </Link>
                          )}
                        </p>
                      ) : null}

                      {PostResult.imagen_destacada_de_la_oferta_socios_thumb ? (
                        <p className="fade-in">
                          {ruta.includes('/ca-ES') && (
                            <Link
                              as={`/ca-ES/p/${PostResult.ID}/${PostResult.slug}`}
                              href={`/ca-ES/post?id=${PostResult.ID}`}
                            >
                              <a title={'Veure la fitxa de ' + PostResult.name}>
                                <img
                                  className="fade-in"
                                  width={'250'}
                                  height={'250'}
                                  loading={'lazy'}
                                  src={
                                    PostResult.imagen_destacada_de_la_oferta_socios_thumb.sizes
                                      .thumbnail
                                  }
                                  alt={PostResult.titulo_de_la_oferta_oferta_socios}
                                />
                                <span className="label alert gallery-label">
                                  <small>
                                    EXCLUSIU
                                    <br /> SOCIS
                                  </small>
                                </span>
                              </a>
                            </Link>
                          )}
                          {ruta.indexOf('/ca-ES') == -1 && (
                            <Link
                              as={`/p/${PostResult.ID}/${PostResult.slug}`}
                              href={`/post?id=${PostResult.ID}`}
                            >
                              <a title={'Ver la ficha de ' + PostResult.name}>
                                <img
                                  className="fade-in"
                                  width={'250'}
                                  height={'250'}
                                  loading={'lazy'}
                                  src={
                                    PostResult.imagen_destacada_de_la_oferta_socios_thumb.sizes
                                      .thumbnail
                                  }
                                  alt={PostResult.titulo_de_la_oferta_oferta_socios}
                                />
                                <span className="label alert gallery-label">
                                  <small>
                                    EXCLUSIVO
                                    <br /> SOCIOS
                                  </small>
                                </span>
                              </a>
                            </Link>
                          )}
                        </p>
                      ) : null}

                      <p>
                        {ruta.includes('/ca-ES') && (
                          <Link
                            as={`/ca-ES/p/${PostResult.ID}/${PostResult.slug}`}
                            href={`/ca-ES/post?id=${PostResult.ID}`}
                          >
                            <a
                              title={'Veure la fitxa de ' + PostResult.name}
                              dangerouslySetInnerHTML={{ __html: PostResult.name }}
                            />
                          </Link>
                        )}
                        {ruta.indexOf('/ca-ES') == -1 && (
                          <Link
                            as={`/p/${PostResult.ID}/${PostResult.slug}`}
                            href={`/post?id=${PostResult.ID}`}
                          >
                            <a
                              title={'Ver la ficha de ' + PostResult.name}
                              dangerouslySetInnerHTML={{ __html: PostResult.name }}
                            />
                          </Link>
                        )}
                        <br />
                        {PostResult.categoria_de_la_prestacion ? (
                          <small>
                            {ruta.includes('/ca-ES') && (
                              <Link
                                as={`/ca-ES/c-l/${PostResult.categoria_de_la_prestacion.term_id}/${PostResult.categoria_de_la_prestacion.slug}/${PostResult.localidad_del_beneficio.term_id}/${PostResult.localidad_del_beneficio.slug}`}
                                href={`/ca-ES/category-localidad?id=${PostResult.categoria_de_la_prestacion.term_id}&localidad=${PostResult.localidad_del_beneficio.term_id}`}
                              >
                                <a
                                  title={
                                    'Veure tots els resultats dels beneficis de ' +
                                    PostResult.categoria_de_la_prestacion.name +
                                    ' a ' +
                                    PostResult.localidad_del_beneficio.name
                                  }
                                >
                                  <span
                                    dangerouslySetInnerHTML={{
                                      __html: PostResult.localidad_del_beneficio.name
                                    }}
                                  />
                                </a>
                              </Link>
                            )}
                            {ruta.indexOf('/ca-ES') == -1 && (
                              <Link
                                as={`/c-l/${PostResult.categoria_de_la_prestacion.term_id}/${PostResult.categoria_de_la_prestacion.slug}/${PostResult.localidad_del_beneficio.term_id}/${PostResult.localidad_del_beneficio.slug}`}
                                href={`/category-localidad?id=${PostResult.categoria_de_la_prestacion.term_id}&localidad=${PostResult.localidad_del_beneficio.term_id}`}
                              >
                                <a
                                  title={
                                    'Ver todos los beneficios de ' +
                                    PostResult.categoria_de_la_prestacion.name +
                                    ' en ' +
                                    PostResult.localidad_del_beneficio.name
                                  }
                                >
                                  <span
                                    dangerouslySetInnerHTML={{
                                      __html: PostResult.localidad_del_beneficio.name
                                    }}
                                  />
                                </a>
                              </Link>
                            )}
                          </small>
                        ) : (
                          <small>{PostResult.localidad_del_beneficio.name}</small>
                        )}{' '}
                        <br />
                        {PostResult.titulo_de_la_oferta_oferta_general ? (
                          <span className="titulo-oferta">
                            {PostResult.titulo_de_la_oferta_oferta_general}
                          </span>
                        ) : (
                          ''
                        )}
                        {PostResult.titulo_de_la_oferta_oferta_socios ? (
                          <span className="titulo-oferta">
                            {PostResult.titulo_de_la_oferta_oferta_socios}
                          </span>
                        ) : (
                          ''
                        )}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          ) : (
            ''
          )}

          {this.state.OfertasResults.length >= 1 ? (
            <section className="section-padding">
              <div className="fade-in">
                <p>
                  {ruta.includes('/ca-ES') && (
                    <>
                      Resultats d'<strong>Ofertes Online</strong> amb la cerca
                    </>
                  )}
                  {ruta.indexOf('/ca-ES') == -1 && (
                    <>
                      Resultados de <strong>Ofertas Online</strong> con la búsqueda
                    </>
                  )}{' '}
                  <strong>"{this.state.Title}"</strong>
                </p>
                <ul className="gallery results">
                  {this.state.OfertasResults.map((OfertasResult, index) => (
                    <li className="benefit" key={index}>
                      {OfertasResult.imagen_destacada_de_la_oferta_general ? (
                        <p className="fade-in">
                          {ruta.includes('/ca-ES') && (
                            <Link
                              as={`/ca-ES/oo/${OfertasResult.ID}/${OfertasResult.slug}`}
                              href={`/ca-ES/oferta-on-line?id=${OfertasResult.ID}`}
                            >
                              <a title={'Veure la fitxa de ' + OfertasResult.name}>
                                <img
                                  className="fade-in"
                                  width={'250'}
                                  height={'250'}
                                  loading={'lazy'}
                                  src={
                                    OfertasResult.imagen_destacada_de_la_oferta_general.sizes.medium
                                  }
                                  alt={OfertasResult.titulo_de_la_oferta_oferta_general}
                                />
                              </a>
                            </Link>
                          )}
                          {ruta.indexOf('/ca-ES') == -1 && (
                            <Link
                              as={`/oo/${OfertasResult.ID}/${OfertasResult.slug}`}
                              href={`/oferta-on-line?id=${OfertasResult.ID}`}
                            >
                              <a title={'Ver la ficha de ' + OfertasResult.name}>
                                <img
                                  className="fade-in"
                                  width={'250'}
                                  height={'250'}
                                  loading={'lazy'}
                                  src={
                                    OfertasResult.imagen_destacada_de_la_oferta_general.sizes.medium
                                  }
                                  alt={OfertasResult.titulo_de_la_oferta_oferta_general}
                                />
                              </a>
                            </Link>
                          )}
                        </p>
                      ) : null}

                      {OfertasResult.imagen_destacada_de_la_oferta_socios ? (
                        <p className="fade-in">
                          {ruta.includes('/ca-ES') && (
                            <Link
                              as={`/ca-ES/oo/${OfertasResult.ID}/${OfertasResult.slug}`}
                              href={`/ca-ES/oferta-on-line?id=${OfertasResult.ID}`}
                            >
                              <a title={'Veure la fitxa de ' + OfertasResult.name}>
                                <img
                                  className="fade-in"
                                  width={'250'}
                                  height={'250'}
                                  loading={'lazy'}
                                  src={
                                    OfertasResult.imagen_destacada_de_la_oferta_socios.sizes.medium
                                  }
                                  alt={OfertasResult.titulo_de_la_oferta_oferta_socios}
                                />
                                <span className="label alert gallery-label">
                                  <small>
                                    EXCLUSIU
                                    <br /> SOCIS
                                  </small>
                                </span>
                              </a>
                            </Link>
                          )}
                          {ruta.indexOf('/ca-ES') == -1 && (
                            <Link
                              as={`/oo/${OfertasResult.ID}/${OfertasResult.slug}`}
                              href={`/oferta-on-line?id=${OfertasResult.ID}`}
                            >
                              <a title={'Ver la ficha de ' + OfertasResult.name}>
                                <img
                                  className="fade-in"
                                  width={'250'}
                                  height={'250'}
                                  loading={'lazy'}
                                  src={
                                    OfertasResult.imagen_destacada_de_la_oferta_socios.sizes.medium
                                  }
                                  alt={OfertasResult.titulo_de_la_oferta_oferta_socios}
                                />
                                <span className="label alert gallery-label">
                                  <small>
                                    EXCLUSIVO
                                    <br /> SOCIOS
                                  </small>
                                </span>
                              </a>
                            </Link>
                          )}
                        </p>
                      ) : null}

                      <p>
                        {ruta.includes('/ca-ES') && (
                          <Link
                            as={`/ca-ES/oo/${OfertasResult.ID}/${OfertasResult.slug}`}
                            href={`/ca-ES/oferta-on-line?id=${OfertasResult.ID}`}
                          >
                            <a
                              title={'Veure la fitxa de ' + OfertasResult.name}
                              dangerouslySetInnerHTML={{ __html: OfertasResult.name }}
                            />
                          </Link>
                        )}
                        {ruta.indexOf('/ca-ES') == -1 && (
                          <Link
                            as={`/oo/${OfertasResult.ID}/${OfertasResult.slug}`}
                            href={`/oferta-on-line?id=${OfertasResult.ID}`}
                          >
                            <a
                              title={'Ver la ficha de ' + OfertasResult.name}
                              dangerouslySetInnerHTML={{ __html: OfertasResult.name }}
                            />
                          </Link>
                        )}
                        <br />
                        {OfertasResult.categoria_de_la_oferta ? (
                          <small>
                            {ruta.includes('/ca-ES') && (
                              <Link
                                as={`/ca-ES/c-o-o/${OfertasResult.categoria_de_la_oferta.term_id}/${OfertasResult.categoria_de_la_oferta.slug}`}
                                href={`/ca-ES/category-ofertas-on-line?id=${OfertasResult.categoria_de_la_oferta.term_id}`}
                              >
                                <a
                                  title={
                                    'Veure tots els beneficis de ' +
                                    OfertasResult.categoria_de_la_oferta.name
                                  }
                                >
                                  <span
                                    dangerouslySetInnerHTML={{
                                      __html: OfertasResult.categoria_de_la_oferta.name
                                    }}
                                  />
                                </a>
                              </Link>
                            )}
                            {ruta.indexOf('/ca-ES') == -1 && (
                              <Link
                                as={`/c-o-o/${OfertasResult.categoria_de_la_oferta.term_id}/${OfertasResult.categoria_de_la_oferta.slug}`}
                                href={`/category-ofertas-on-line?id=${OfertasResult.categoria_de_la_oferta.term_id}`}
                              >
                                <a
                                  title={
                                    'Ver todos los beneficios de ' +
                                    OfertasResult.categoria_de_la_oferta.name
                                  }
                                >
                                  <span
                                    dangerouslySetInnerHTML={{
                                      __html: OfertasResult.categoria_de_la_oferta.name
                                    }}
                                  />
                                </a>
                              </Link>
                            )}
                          </small>
                        ) : (
                          <small>{OfertasResult.categoria_de_la_oferta.name}</small>
                        )}{' '}
                        <br />
                        {OfertasResult.titulo_de_la_oferta_oferta_general ? (
                          <span className="titulo-oferta">
                            {OfertasResult.titulo_de_la_oferta_oferta_general}
                          </span>
                        ) : null}
                        {OfertasResult.titulo_de_la_oferta_online_exclusiva_socios ? (
                          <span className="titulo-oferta">
                            {OfertasResult.titulo_de_la_oferta_online_exclusiva_socios}
                          </span>
                        ) : null}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          ) : null}

          {this.state.OfertasGrandeMarcasResults.length >= 1 ? (
            <section className="section-padding">
              <div className="fade-in">
                <p>
                  {ruta.includes('/ca-ES') && (
                    <>
                      Resultats d'<strong>Ofertes Grans Marques</strong> amb la cerca
                    </>
                  )}
                  {ruta.indexOf('/ca-ES') == -1 && (
                    <>
                      Resultados de <strong>Ofertas Grandes Marcas</strong> con la búsqueda
                    </>
                  )}{' '}
                  <strong>"{this.state.Title}"</strong>
                </p>
                <ul className="gallery results">
                  {this.state.OfertasGrandeMarcasResults.map((OfertasGrandeMarcasResult, index) => (
                    <li className="benefit-simple" key={index}>
                      <p className="align-left">
                        {ruta.includes('/ca-ES') && (
                          <Link href={`/ca-ES/ogm/${OfertasGrandeMarcasResult.ID}`}>
                            <a
                              title={'Veure la fitxa de ' + OfertasGrandeMarcasResult.name}
                              dangerouslySetInnerHTML={{ __html: OfertasGrandeMarcasResult.name }}
                            />
                          </Link>
                        )}
                        {ruta.indexOf('/ca-ES') == -1 && (
                          <Link href={`/ogm/${OfertasGrandeMarcasResult.ID}`}>
                            <a
                              title={'Ver la ficha de ' + OfertasGrandeMarcasResult.name}
                              dangerouslySetInnerHTML={{ __html: OfertasGrandeMarcasResult.name }}
                            />
                          </Link>
                        )}
                        .
                        {OfertasGrandeMarcasResult.localidad_del_beneficio !== null ? (
                          <small>{OfertasGrandeMarcasResult.localidad_del_beneficio.name}.</small>
                        ) : (
                          ''
                        )}{' '}
                        {OfertasGrandeMarcasResult.titulo_de_la_oferta ? (
                          <span className="titulo-oferta">
                            {OfertasGrandeMarcasResult.titulo_de_la_oferta}
                          </span>
                        ) : (
                          ''
                        )}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          ) : (
            ''
          )}

          {this.state.OfertasGrandeMarcasCAResults.length >= 1 ? (
            <section className="section-padding">
              <div className="fade-in">
                <p>
                  {ruta.includes('/ca-ES') && (
                    <>
                      Resultats d'<strong>Ofertes Grans Marques</strong> amb la cerca
                    </>
                  )}
                  {ruta.indexOf('/ca-ES') == -1 && (
                    <>
                      Resultados de <strong>Ofertas Grandes Marcas</strong> con la búsqueda
                    </>
                  )}{' '}
                  <strong>"{this.state.Title}"</strong>
                </p>
                <ul className="gallery results">
                  {this.state.OfertasGrandeMarcasCAResults.map(
                    (OfertasGrandeMarcasCAResult, index) => (
                      <li className="benefit-simple" key={index}>
                        <p className="align-left">
                          {ruta.includes('/ca-ES') && (
                            <Link
                              href={`/ca-ES/ogmca/${OfertasGrandeMarcasCAResult.ID}/${OfertasGrandeMarcasCAResult.slug}`}
                            >
                              <a
                                title={'Veure la fitxa de ' + OfertasGrandeMarcasCAResult.name}
                                dangerouslySetInnerHTML={{
                                  __html: OfertasGrandeMarcasCAResult.name
                                }}
                              />
                            </Link>
                          )}
                          {ruta.indexOf('/ca-ES') == -1 && (
                            <Link
                              as={`/ogmca/${OfertasGrandeMarcasCAResult.ID}/${OfertasGrandeMarcasCAResult.slug}`}
                              href={`/oferta-gran-marca-ca?id=${OfertasGrandeMarcasCAResult.ID}`}
                            >
                              <a
                                title={'Ver la ficha de ' + OfertasGrandeMarcasCAResult.name}
                                dangerouslySetInnerHTML={{
                                  __html: OfertasGrandeMarcasCAResult.name
                                }}
                              />
                            </Link>
                          )}
                          .{' '}
                          <small>{OfertasGrandeMarcasCAResult.localidad_del_beneficio.name}</small>.{' '}
                          {OfertasGrandeMarcasCAResult.titulo_de_la_oferta ? (
                            <span className="titulo-oferta">
                              {OfertasGrandeMarcasCAResult.titulo_de_la_oferta}
                            </span>
                          ) : (
                            ''
                          )}
                        </p>
                      </li>
                    )
                  )}
                </ul>
              </div>
            </section>
          ) : (
            ''
          )}

          <section>
            <p>
              {ruta.includes('/ca-ES') && (
                <>¿No és el que estaves buscant? Prova amb una altra cerca</>
              )}
              {ruta.indexOf('/ca-ES') == -1 && (
                <>¿No es lo que estabas buscando? Prueba con una búsqueda diferente</>
              )}
            </p>
            <div className="wrapper">
              <form>
                {ruta.includes('/ca-ES') && (
                  <label>
                    <h4>Introdueix una nova cerca</h4>
                    <input
                      placeholder="La meva cerca"
                      type="search"
                      name="Title"
                      value={this.state.Title}
                      onChange={this.handleChange}
                      required
                    />
                  </label>
                )}
                {ruta.indexOf('/ca-ES') == -1 && (
                  <label>
                    <h4>Introduce una nueva búsqueda</h4>
                    <input
                      placeholder="Mi Busqueda"
                      type="search"
                      name="Title"
                      value={this.state.Title}
                      onChange={this.handleChange}
                      required
                    />
                  </label>
                )}
                <div className="wrapper-input">
                  {ruta.includes('/ca-ES') && (
                    <input
                      type="button"
                      className="button"
                      onClick={this.handleSubmit}
                      value="Cercar"
                    />
                  )}
                  {ruta.indexOf('/ca-ES') == -1 && (
                    <input
                      type="button"
                      className="button"
                      onClick={this.handleSubmit}
                      value="Buscar"
                    />
                  )}
                </div>
              </form>
              <div onChange={this.handleChange}>{this.state.ActionButton}</div>
            </div>
          </section>
          <style jsx>{`
            .section-padding {
              margin-bottom: 1em;
            }
            .results {
              background-color: rgba(147, 216, 247, 0.1);
            }
            .gallery {
              display: -ms-flexbox;
              display: flex;
              -ms-flex-wrap: wrap;
              flex-wrap: wrap;
              padding: 1em 5px;
            }
            ul {
              list-style-type: none !important;
              margin-left: 0;
              margin: 0 auto !important;
            }
            a {
              color: inherit !important;
            }
            a:hover {
              text-decoration: underline;
            }
            nav a {
              color: #00add9;
            }
            .benefit {
              width: 150px;
            }
            .benefit-simple {
              width: 100%;
            }
            .gallery-label {
              position: relative;
              margin-top: -40px;
              margin-right: 5px;
              float: right;
              text-align: center;
              background: #f18903 !important;
            }
            .titulo-oferta {
              color: #ff0000;
            }
            @media screen and (min-width: 320px) {
              .gallery {
                width: 100%;
              }
              .benefit,
              .benefit-simple {
                margin: 5px;
              }
            }
            @media screen and (max-width: 375px) {
              .benefit {
                width: 124px;
              }
            }
            @media screen and (min-width: 360px) {
              .gallery {
                width: 90%;
              }
            }
            @media screen and (min-width: 768px) {
              .gallery {
                width: 90%;
              }
              .benefit {
                width: 200px;
              }
              .benefit,
              .benefit-simple {
                margin: 7.5px;
              }
            }
            @media screen and (min-width: 1024px) {
              .gallery {
                width: 100%;
              }
              .benefit {
                width: 220px;
              }
              .benefit,
              .benefit-simple {
                margin: 0 10px;
              }
            }
            @media screen and (min-width: 1160px) {
              .benefit {
                width: 245px;
              }
            }

            @media screen and (min-width: 768px) {
              .wrapper {
                max-width: 80%;
                width: 390px;
                margin: 0 auto;
              }
            }
            @media screen and (min-width: 1024px) {
              .wrapper {
                max-width: 50%;
              }
            }
            form {
              padding: 2em;
              background: #333333;
              border-radius: 6.5%;
            }
            label {
              color: #ffffff;
            }
            .wrapper-input {
              width: 100%;
              padding: 1em;
            }
            input[type='button'] {
              background: #009933;
              margin: 0 auto;
              display: block;
              width: 100%;
            }
            input[type='button']:hover {
              background: #007e2a;
            }
            .button-pink {
              background: #cc3366;
              margin: 0 auto;
              display: block;
              width: 100%;
              color: #ffffff !important;
            }
            .button-pink:hover {
              background: #a62953;
            }
            h1,
            label,
            p {
              text-align: center;
            }
            .align-left {
              text-align: left;
            }
            .yellow {
              color: #f3f303;
            }
            .margin-inverse {
              margin-top: 1em;
              margin-bottom: 0;
            }
            .file-label {
              background: #f18903 !important;
              color: #ffffff;
              font-weight: bold;
              padding: 1em;
              white-space: normal;
            }
            .fade-in {
              animation-name: fadeIn;
              animation-duration: 1.3s;
              animation-timing-function: cubic-bezier(0, 0, 0.4, 1);
              animation-fill-mode: forwards;
            }
            @keyframes fadeIn {
              from {
                opacity: 0;
              }
              to {
                opacity: 1;
              }
            }
          `}</style>
        </main>
      );
    } else if (
      this.state.PostResults.length == 0 &&
      (this.state.Title != '') | (this.state.OfertasResults.length == 0) &&
      (this.state.Title != '') | (this.state.OfertasGrandeMarcasResults.length == 0) &&
      (this.state.Title != '') | (this.state.OfertasGrandeMarcasCAResults.length == 0) &&
      this.state.Title != ''
    ) {
      return (
        <section>
          {ruta.includes('/ca-ES') && (
            <p>No hi ha resultats per la teva cerca. Prova amb una altra cerca</p>
          )}
          {ruta.indexOf('/ca-ES') == -1 && (
            <p>No hay resultados para tu búsqueda. Prueba con una búsqueda diferente</p>
          )}
          <div className="wrapper">
            <form>
              {ruta.includes('/ca-ES') && (
                <label>
                  <h4>Introdueix una cerca</h4>
                  <input
                    placeholder="La meva cerca"
                    type="search"
                    name="Title"
                    value={this.state.Title}
                    onChange={this.handleChange}
                    required
                  />
                </label>
              )}
              {ruta.indexOf('/ca-ES') == -1 && (
                <label>
                  <h4>Introduce una búsqueda</h4>
                  <input
                    placeholder="Mi Busqueda"
                    type="search"
                    name="Title"
                    value={this.state.Title}
                    onChange={this.handleChange}
                    required
                  />
                </label>
              )}
              <div className="wrapper-input">
                {ruta.includes('/ca-ES') && (
                  <input
                    type="button"
                    className="button"
                    onClick={this.handleSubmit}
                    value="Cercar"
                  />
                )}
                {ruta.indexOf('/ca-ES') == -1 && (
                  <input
                    type="button"
                    className="button"
                    onClick={this.handleSubmit}
                    value="Buscar"
                  />
                )}
              </div>
            </form>
            <div onChange={this.handleChange}>{this.state.ActionButton}</div>
          </div>
          <style jsx>{`
            @media screen and (min-width: 768px) {
              .wrapper {
                max-width: 80%;
                width: 390px;
                margin: 0 auto;
              }
            }
            @media screen and (min-width: 1024px) {
              .wrapper {
                max-width: 50%;
              }
            }
            form {
              padding: 2em;
              background: #333333;
              border-radius: 6.5%;
            }
            label {
              color: #ffffff;
            }
            .wrapper-input {
              width: 100%;
              padding: 1em;
            }
            input[type='button'] {
              background: #009933;
              margin: 0 auto;
              display: block;
              width: 100%;
            }
            input[type='button']:hover {
              background: #007e2a;
            }
            .button-pink {
              background: #cc3366;
              margin: 0 auto;
              display: block;
              width: 100%;
              color: #ffffff !important;
            }
            .button-pink:hover {
              background: #a62953;
            }
            h1,
            label {
              text-align: center;
            }
            .yellow {
              color: #f3f303;
            }
            .margin-inverse {
              margin-top: 1em;
              margin-bottom: 0;
            }
            .file-label {
              background: #f18903 !important;
              color: #ffffff;
              font-weight: bold;
              padding: 1em;
              white-space: normal;
            }
            .fade-in {
              animation-name: fadeIn;
              animation-duration: 1.3s;
              animation-timing-function: cubic-bezier(0, 0, 0.4, 1);
              animation-fill-mode: forwards;
            }
            @keyframes fadeIn {
              from {
                opacity: 0;
              }
              to {
                opacity: 1;
              }
            }
          `}</style>
        </section>
      );
    } else {
      return (
        <section>
          <div className="wrapper">
            <form>
              {ruta.includes('/ca-ES') && (
                <label>
                  <h4>Introdueix una cerca</h4>
                  <input
                    placeholder="La meva cerca"
                    type="search"
                    name="Title"
                    value={this.state.Title}
                    onChange={this.handleChange}
                    required
                  />
                </label>
              )}
              {ruta.indexOf('/ca-ES') == -1 && (
                <label>
                  <h4>Introduce una búsqueda</h4>
                  <input
                    placeholder="Mi Busqueda"
                    type="search"
                    name="Title"
                    value={this.state.Title}
                    onChange={this.handleChange}
                    required
                  />
                </label>
              )}
              <div className="wrapper-input">
                {ruta.includes('/ca-ES') && (
                  <input
                    type="button"
                    className="button"
                    onClick={this.handleSubmit}
                    value="Cercar"
                  />
                )}
                {ruta.indexOf('/ca-ES') == -1 && (
                  <input
                    type="button"
                    className="button"
                    onClick={this.handleSubmit}
                    value="Buscar"
                  />
                )}
              </div>
            </form>
            <div onChange={this.handleChange}>{this.state.ActionButton}</div>
          </div>
          <style jsx>{`
            @media screen and (min-width: 768px) {
              .wrapper {
                max-width: 80%;
                width: 390px;
                margin: 0 auto;
              }
            }
            @media screen and (min-width: 1024px) {
              .wrapper {
                max-width: 50%;
              }
            }
            form {
              padding: 2em;
              background: #333333;
              border-radius: 6.5%;
            }
            label {
              color: #ffffff;
            }
            .wrapper-input {
              width: 100%;
              padding: 1em;
            }
            input[type='button'] {
              background: #009933;
              margin: 0 auto;
              display: block;
              width: 100%;
            }
            input[type='button']:hover {
              background: #007e2a;
            }
            .button-pink {
              background: #cc3366;
              margin: 0 auto;
              display: block;
              width: 100%;
              color: #ffffff !important;
            }
            .button-pink:hover {
              background: #a62953;
            }
            h1,
            label,
            p {
              text-align: center;
            }
            .yellow {
              color: #f3f303;
            }
            .margin-inverse {
              margin-top: 1em;
              margin-bottom: 0;
            }
            .file-label {
              background: #f18903 !important;
              color: #ffffff;
              font-weight: bold;
              padding: 1em;
              white-space: normal;
            }
            .fade-in {
              animation-name: fadeIn;
              animation-duration: 1.3s;
              animation-timing-function: cubic-bezier(0, 0, 0.4, 1);
              animation-fill-mode: forwards;
            }
            @keyframes fadeIn {
              from {
                opacity: 0;
              }
              to {
                opacity: 1;
              }
            }
          `}</style>
        </section>
      );
    }
  }
}
export default IsSearch;
