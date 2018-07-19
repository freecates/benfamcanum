import btoa from 'btoa'
import fetch from 'isomorphic-unfetch'
import Link from 'next/link'
import ReactDisqusComments from 'react-disqus-comments'

class IsMember extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          isEmail: '',
          isPassword:'',
          isRegistered: undefined,
          HowTo: this.props.dataOK,
          Identifier: this.props.ID,
          Title: this.props.Title,
          URL: this.props.URL

    };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleNewComment(comment) {
        console.log(comment.text);
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

        const user = 'beneficios'
        const method = 'isAssociated'
        const params = {
            user: this.state.isEmail,
            pass:this.state.isPassword
        }
        const jsonData = JSON.stringify(params)
        const jsonDataEncode = btoa(jsonData)
        const data = {
            method: method,
            params: jsonDataEncode
        }
        const dataEncode = JSON.stringify(data)

        const res = await fetch(`https://www.familias-numerosas.org/v2/ws/endpoint.php?user=${user}&data=${dataEncode}`)
        const isRegistered = await res.json()
        const isMemberString = btoa("15" + isRegistered.Response + "45")
        console.log(`${isMemberString}`)
        if (typeof window != 'undefined' && isRegistered.Response === true) {
            sessionStorage.setItem('isMember', isMemberString)
            sessionStorage.setItem('email', this.state.isEmail)
        }
        this.setState({
            isRegistered: isRegistered.Response
        })
        
      event.preventDefault();
    }
  
    render() {
        console.log(`Hola: ${this.state.isRegistered}`)
        if (typeof window != 'undefined') {
            if (this.state.isRegistered == true || sessionStorage.getItem('isMember') == "MTV0cnVlNDU=") { 
                return (
                    <section>
                    <p>Hola {sessionStorage.getItem('email')}</p>
                        <div className='callout large alert fade-in'>
                            <p>¡ATENCIÓN!: <span>{this.state.HowTo}</span></p>
                        </div>
                        <ReactDisqusComments
                            shortname="beneficios-familias-numerosas"
                            identifier={this.state.Identifier}
                            title={this.state.Title}
                            url={'https://beneficios.now.sh/' + this.state.URL}
                            category_id={null}
                            onNewComment={this.handleNewComment}/>
                            <style jsx>{`
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
            } else if (this.state.isRegistered == undefined) {
                return (
                    <section>
                        <div className='wrapper'>
                            <form>
                            <label>
                                <input placeholder='Usuario' type="email" name='isEmail' value={this.state.isEmail} onChange={this.handleChange} required />
                            </label>
                            <label>
                                <input placeholder='Contraseña' type="password" name='isPassword' value={this.state.isPassword} onChange={this.handleChange}required />
                            </label>
                            <div className='wrapper-input'><input type="button" className='button' onClick={this.handleSubmit} value="Enviar" /></div>
                            <p className='yellow margin-inverse'>¿Quieres participar de estos beneficios? Ahora te puedes hacer socio. ¡Fácil y rápido!</p>
                            <div className='wrapper-input'><Link href='http://www.familiasnumerosas.org/hazte-socio/' ><a target='_blank'className='button button-pink' >Sí, quiero hacerme socio</a></Link></div>
                            </form>
                            <p className='align-left'><small><strong>COMENTARIOS</strong>: Para poder leer o escribir opiniones sobre esta oferta, debes introducir tu usuario y contraseña de asociado</small></p>
                            <p className='margin-invert align-center'><small><Link href='https://www.familias-numerosas.org/ingreso.php'><a className='button button-green' target='_blank'>Recuperar contraseña</a></Link></small></p>
                        </div>
                        <style jsx>{`
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
                            .button.button-green {
                              color:#ffffff!important;
                              background:#009933;
                            }
                            .button.button-green:hover {
                              background:#007e2a;
                            }
                            h1, label, p, .align-center {
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
                            .margin-invert {
                              margin-bottom:2rem;
                              margin-top:-1rem;
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
                } else if (this.state.isRegistered == false) {
                    return (
                        <section>
                            <div className='callout large alert fade-in'>
                                <p>Lo sentimos. Los datos introducidos no son correctos. Por favor intentalo de nuevo.</p>
                            </div>
                            <div className='wrapper'>
                                <form>
                                <label>
                                    <input placeholder='Usuario' type="email" name='isEmail' value={this.state.isEmail} onChange={this.handleChange} required />
                                </label>
                                <label>
                                    <input placeholder='Contraseña' type="password" name='isPassword' value={this.state.isPassword} onChange={this.handleChange}required />
                                </label>
                                <div className='wrapper-input'><input type="button" className='button' onClick={this.handleSubmit} value="Enviar" /></div>
                                <p className='yellow margin-inverse'>¿Quieres participar de estos beneficios? Ahora te puedes hacer socio. ¡Fácil y rápido!</p>
                                <div className='wrapper-input'><Link href='http://www.familiasnumerosas.org/hazte-socio/' ><a target='_blank'className='button button-pink' >Sí, quiero hacerme socio</a></Link></div>
                                </form>
                                <p className='align-left'><small><strong>COMENTARIOS</strong>: Para poder leer o escribir opiniones sobre esta oferta, debes introducir tu usuario y contraseña de asociado</small></p>
                                <p className='margin-invert align-center'><small><Link href='https://www.familias-numerosas.org/ingreso.php'><a className='button button-green' target='_blank'>Recuperar contraseña</a></Link></small></p>
                            </div>
                            <style jsx>{`
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
                                .button.button-green {
                                  color:#ffffff!important;
                                  background:#009933;
                                }
                                .button.button-green:hover {
                                  background:#007e2a;
                                }
                                h1, label, p, .align-center {
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
                                .margin-invert {
                                  margin-bottom:2rem;
                                  margin-top:-1rem;
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
            } else {
                return null
            }
    }
  }
  export default IsMember