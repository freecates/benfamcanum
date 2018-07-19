import btoa from 'btoa'
import fetch from 'isomorphic-unfetch'
import Link from 'next/link'
import Observer from 'react-intersection-observer'

class IsSearch extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          Title: '',
          PostResults: {},
          OfertasResults: {},
          OfertasGrandeMarcasResults: {}

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
    }
  
    handleSubmit = async function (event) {
        
        const title = this.state.Title

        const res = await fetch(`https://gestorbeneficios.familiasnumerosas.org/wp-json/lanauva/v1/beneficios?title=${title}`)
        const res2 = await fetch(`https://gestorbeneficios.familiasnumerosas.org/wp-json/lanauva/v1/ofertas_online?title=${title}`)
        const res3 = await fetch(`https://gestorbeneficios.familiasnumerosas.org/wp-json/lanauva/v1/ofertas_grandes_marc?title=${title}`)
        const PostResults = await res.json()
        const OfertasResults = await res2.json()
        const OfertasGrandeMarcasResults = await res3.json()
        console.log(PostResults, OfertasResults, OfertasGrandeMarcasResults)
        this.setState({
            PostResults, OfertasResults, OfertasGrandeMarcasResults
        })       
      event.preventDefault();
    }
  
    render() {
        console.log(`Post count: ${this.state.PostResults.length}, ${this.state.OfertasResults.length}, ${this.state.OfertasGrandeMarcasResults.length}`)
        if (this.state.PostResults.length >= 1 | this.state.OfertasResults.length >= 1 | this.state.OfertasGrandeMarcasResults.length >= 1) { 
            return (
                <main>
                    {this.state.PostResults.length >= 1 ?
                    <section className='section-padding'>
                        <div className='fade-in'>
                            <p>Resultados de <strong>Beneficios</strong> con la búsqueda <strong>"{this.state.Title}"</strong></p>
                            <ul className='gallery results'>
                            {this.state.PostResults.map((PostResult, index) => (
                                <li className='benefit' key={index}>
                                    {PostResult.imagen_destacada_de_la_oferta_general_thumb ? <Observer threshold={1} triggerOnce={true} render={() => (<p className='fade-in'><Link prefetch as={`/p/${PostResult.ID}/${PostResult.slug}`} href={`/post?id=${PostResult.ID}`}><a title={'Ver la ficha de ' + PostResult.name}><img className='fade-in' width='250' src={PostResult.imagen_destacada_de_la_oferta_general_thumb.sizes.thumbnail} alt={PostResult.titulo_de_la_oferta_oferta_general} /></a></Link></p>)} /> : ''}

                                    {PostResult.imagen_destacada_de_la_oferta_socios_thumb ? <Observer threshold={1} triggerOnce={true} render={() => (<p className='fade-in'><Link prefetch as={`/p/${PostResult.ID}/${PostResult.slug}`} href={`/post?id=${PostResult.ID}`}><a title={'Ver la ficha de ' + PostResult.name}><img className='fade-in' width='250' src={PostResult.imagen_destacada_de_la_oferta_socios_thumb.sizes.thumbnail} alt={PostResult.titulo_de_la_oferta_oferta_socios} /><span className='label alert gallery-label'><small>EXCLUSIVO<br/> SOCIOS</small></span></a></Link></p>)} /> : ''}

                                    <p><Link prefetch as={`/p/${PostResult.ID}/${PostResult.slug}`} href={`/post?id=${PostResult.ID}`}>
                                    <a title={'Ver la ficha de ' + PostResult.name} dangerouslySetInnerHTML={ {__html: PostResult.name} } />
                                    </Link><br/>
                                    {PostResult.categoria_de_la_prestacion ?<small><Link prefetch as={`/c-l/${PostResult.categoria_de_la_prestacion.term_id}/${PostResult.categoria_de_la_prestacion.slug}/${PostResult.localidad_del_beneficio.term_id}/${PostResult.localidad_del_beneficio.slug}`} href={`/category-localidad?id=${PostResult.categoria_de_la_prestacion.term_id}&localidad=${PostResult.localidad_del_beneficio.term_id}`}><a title={'Ver todos los beneficios de ' + PostResult.categoria_de_la_prestacion.name + ' en ' + PostResult.localidad_del_beneficio.name}><span dangerouslySetInnerHTML={ {__html: PostResult.localidad_del_beneficio.name} } /></a></Link></small> : <small>{PostResult.localidad_del_beneficio.name}</small>} <br/>

                                    {PostResult.titulo_de_la_oferta_oferta_general ?
                                    <span className='titulo-oferta'>{PostResult.titulo_de_la_oferta_oferta_general}</span> : '' }

                                    {PostResult.titulo_de_la_oferta_oferta_socios ?
                                    <span className='titulo-oferta'>{PostResult.titulo_de_la_oferta_oferta_socios}</span> : '' }

                                    </p>
                                </li>
                                ))}
                            </ul>
                        </div>
                    </section>
                    : ''}

                    {this.state.OfertasResults.length >= 1 ?
                    <section className='section-padding'>
                    <div className='fade-in'>
                        <p>Resultados de <strong>Ofertas Online</strong> con la búsqueda <strong>"{this.state.Title}"</strong></p>
                        <ul className='gallery results'>
                        {this.state.OfertasResults.map((OfertasResult, index) => (
                            <li className='benefit' key={index}>
                                {OfertasResult.imagen_destacada_de_la_oferta_general ? <Observer threshold={1} triggerOnce={true} render={() => (<p className='fade-in'><Link prefetch as={`/oo/${OfertasResult.ID}/${OfertasResult.slug}`} href={`/oferta-on-line?id=${OfertasResult.ID}`}><a title={'Ver la ficha de ' + OfertasResult.name}><img className='fade-in' width='250' src={OfertasResult.imagen_destacada_de_la_oferta_general.sizes.medium} alt={OfertasResult.titulo_de_la_oferta_oferta_general} /></a></Link></p>)} /> : ''}

                                {OfertasResult.imagen_destacada_de_la_oferta_socios ? <Observer threshold={1} triggerOnce={true} render={() => (<p className='fade-in'><Link prefetch as={`/oo/${OfertasResult.ID}/${OfertasResult.slug}`} href={`/oferta-on-line?id=${OfertasResult.ID}`}><a title={'Ver la ficha de ' + OfertasResult.name}><img className='fade-in' width='250' src={OfertasResult.imagen_destacada_de_la_oferta_socios.sizes.medium} alt={OfertasResult.titulo_de_la_oferta_oferta_socios} /><span className='label alert gallery-label'><small>EXCLUSIVO<br/> SOCIOS</small></span></a></Link></p>)} /> : ''}

                                <p><Link prefetch as={`/oo/${OfertasResult.ID}/${OfertasResult.slug}`} href={`/oferta-on-line?id=${OfertasResult.ID}`}>
                                <a title={'Ver la ficha de ' + OfertasResult.name} dangerouslySetInnerHTML={ {__html: OfertasResult.name} } />
                                </Link><br/>
                                {OfertasResult.categoria_de_la_oferta ?<small><Link prefetch as={`/c-o-o/${OfertasResult.categoria_de_la_oferta.term_id}/${OfertasResult.categoria_de_la_oferta.slug}`} href={`/category-ofertas-on-line?id=${OfertasResult.categoria_de_la_oferta.term_id}`}><a title={'Ver todos los beneficios de ' + OfertasResult.categoria_de_la_oferta.name}><span dangerouslySetInnerHTML={ {__html: OfertasResult.categoria_de_la_oferta.name} } /></a></Link></small> : <small>{OfertasResult.categoria_de_la_oferta.name}</small>} <br/>

                                {OfertasResult.titulo_de_la_oferta_oferta_general ?
                                <span className='titulo-oferta'>{OfertasResult.titulo_de_la_oferta_oferta_general}</span> : '' }

                                {OfertasResult.titulo_de_la_oferta_online_exclusiva_socios ?
                                <span className='titulo-oferta'>{OfertasResult.titulo_de_la_oferta_online_exclusiva_socios}</span> : '' }

                                </p>
                            </li>
                            ))}
                        </ul>
                    </div>
                </section>
                : ''}
                
                {this.state.OfertasGrandeMarcasResults.length >= 1 ?
                <section className='section-padding'>
                    <div className='fade-in'>
                        <p>Resultados de <strong>Ofertas Grandes Marcas</strong> con la búsqueda <strong>"{this.state.Title}"</strong></p>
                        <ul className='gallery results'>
                        {this.state.OfertasGrandeMarcasResults.map((OfertasGrandeMarcasResult, index) => (
                            <li className='benefit-simple' key={index}>

                                <p className='align-left'><Link prefetch as={`/ogm/${OfertasGrandeMarcasResult.ID}/${OfertasGrandeMarcasResult.slug}`} href={`/oferta-gran-marca?id=${OfertasGrandeMarcasResult.ID}`}>
                                <a title={'Ver la ficha de ' + OfertasGrandeMarcasResult.name} dangerouslySetInnerHTML={ {__html: OfertasGrandeMarcasResult.name} } />
                                </Link>. <small>{OfertasGrandeMarcasResult.localidad_del_beneficio.name}</small>. {OfertasGrandeMarcasResult.titulo_de_la_oferta ?
                                <span className='titulo-oferta'>{OfertasGrandeMarcasResult.titulo_de_la_oferta}</span> : '' }
                                </p>
                            </li>
                            ))}
                        </ul>
                    </div>
                </section>
                : ''}

                <section>
                    <p>¿No es lo que estabas buscando? Prueba con una búsqueda diferente</p>
                    <div className='wrapper'>
                        <form>
                        <label>
                            <h4>Introduce una nueva búsqueda</h4>
                            <input placeholder='Mi Busqueda' type="search" name='Title' value={this.state.Title} onChange={this.handleChange} required />
                        </label>
                        <div className='wrapper-input'><input type="button" className='button' onClick={this.handleSubmit} value="Buscar" /></div>
                        </form>
                    </div>
                </section>
                <style jsx>{`
                    .section-padding {
                        margin-bottom:1em;
                    }
                    .results {
                        background-color:rgba(147,216,247,.1);
                    }
                    .gallery {
                        display: -ms-flexbox;
                        display: flex;
                        -ms-flex-wrap: wrap;
                            flex-wrap: wrap;
                        padding:1em 5px;
                    }
                    ul {
                        list-style-type:none;
                        margin-left:0;
                        margin:0 auto!important;
                    }
                    a {
                        color:inherit;
                    }
                    a:hover {
                        text-decoration:underline;
                    }
                    nav a {
                        color:#3f3fff;
                    }
                    .benefit {
                        width: 150px;
                    }
                    .benefit-simple {
                        width:100%;
                    }
                    .gallery-label {
                        position:relative;
                        margin-top:-40px;
                        margin-right:5px;
                        float:right;
                        text-align:center;
                        background:#cc0033!important;
                    }
                    .titulo-oferta {
                        color:#ff0000;
                    }
                    @media screen and (min-width: 320px) {   
                        .gallery {
                        width: 100%;
                        }              
                        .benefit, .benefit-simple {
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
                        .benefit, .benefit-simple {
                            margin:7.5px;
                        }
                    }
                    @media screen and (min-width: 1024px) {   
                        .gallery {
                        width: 100%;
                        }
                        .benefit {
                            width: 220px;
                        }
                        .benefit, .benefit-simple {                            
                            margin:0 10px;
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
                        width:390px;
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
                    border-radius:6.5%;
                    }
                    label {
                    color:#ffffff;
                    }
                    .wrapper-input {
                    width:100%;
                    padding:1em;
                    }
                    input[type=button] {
                    background:#009933;
                    margin:0 auto;
                    display:block;
                    width:100%;
                    }
                    input[type=button]:hover {
                    background:#007e2a;
                    }
                    .button-pink {
                    background:#cc3366;
                    margin:0 auto;
                    display:block;
                    width:100%;
                    color:#ffffff!important;
                    }
                    .button-pink:hover {
                    background:#a62953;
                    }
                    h1, label, p {
                        text-align:center;
                    }
                    .align-left {
                        text-align:left;
                    }
                    .yellow {
                        color:#f3f303;
                    }
                    .margin-inverse {
                        margin-top:1em;
                        margin-bottom:0;
                    }
                    .file-label {
                        background:#cc0033!important;
                        color:#ffffff;
                        font-weight:bold;
                        padding:1em;
                        white-space:normal;
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
        } else if (this.state.PostResults.length == 0 && this.state.Title != '' | this.state.OfertasResults.length == 0 && this.state.Title != '' | this.state.OfertasGrandeMarcasResults.length == 0 && this.state.Title != '') {
                return (
                    <section>
                    <p>No hay resultados para tu búsqueda. Prueba con una búsqueda diferente</p>
                        <div className='wrapper'>
                            <form>
                            <label>
                                <h4>Introduce una búsqueda</h4>
                                <input placeholder='Mi Busqueda' type="search" name='Title' value={this.state.Title} onChange={this.handleChange} required />
                            </label>
                            <div className='wrapper-input'><input type="button" className='button' onClick={this.handleSubmit} value="Buscar" /></div>
                            </form>
                        </div>
                        <style jsx>{`
                            @media screen and (min-width: 768px) {
                                .wrapper {
                                max-width: 80%;
                                width:390px;
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
                            border-radius:6.5%;
                            }
                            label {
                            color:#ffffff;
                            }
                            .wrapper-input {
                            width:100%;
                            padding:1em;
                            }
                            input[type=button] {
                            background:#009933;
                            margin:0 auto;
                            display:block;
                            width:100%;
                            }
                            input[type=button]:hover {
                            background:#007e2a;
                            }
                            .button-pink {
                            background:#cc3366;
                            margin:0 auto;
                            display:block;
                            width:100%;
                            color:#ffffff!important;
                            }
                            .button-pink:hover {
                            background:#a62953;
                            }
                            h1, label {
                                text-align:center;
                            }
                            .yellow {
                                color:#f3f303;
                            }
                            .margin-inverse {
                                margin-top:1em;
                                margin-bottom:0;
                            }
                            .file-label {
                                background:#cc0033!important;
                                color:#ffffff;
                                font-weight:bold;
                                padding:1em;
                                white-space:normal;
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
            else {
                    return (
                        <section>
                            <div className='wrapper'>
                                <form>
                                <label>
                                    <h4>Introduce una búsqueda</h4>
                                    <input placeholder='Mi Busqueda' type="search" name='Title' value={this.state.Title} onChange={this.handleChange} required />
                                </label>
                                <div className='wrapper-input'><input type="button" className='button' onClick={this.handleSubmit} value="Buscar" /></div>
                                </form>
                            </div>
                            <style jsx>{`
                                @media screen and (min-width: 768px) {
                                    .wrapper {
                                    max-width: 80%;
                                    width:390px;
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
                                border-radius:6.5%;
                                }
                                label {
                                color:#ffffff;
                                }
                                .wrapper-input {
                                width:100%;
                                padding:1em;
                                }
                                input[type=button] {
                                background:#009933;
                                margin:0 auto;
                                display:block;
                                width:100%;
                                }
                                input[type=button]:hover {
                                background:#007e2a;
                                }
                                .button-pink {
                                background:#cc3366;
                                margin:0 auto;
                                display:block;
                                width:100%;
                                color:#ffffff!important;
                                }
                                .button-pink:hover {
                                background:#a62953;
                                }
                                h1, label, p {
                                    text-align:center;
                                }
                                .yellow {
                                    color:#f3f303;
                                }
                                .margin-inverse {
                                    margin-top:1em;
                                    margin-bottom:0;
                                }
                                .file-label {
                                    background:#cc0033!important;
                                    color:#ffffff;
                                    font-weight:bold;
                                    padding:1em;
                                    white-space:normal;
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
  export default IsSearch