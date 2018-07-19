class SelectCity extends React.Component {
      constructor(props) {
        super(props);
        console.log(this.props.options[Object.keys(this.props.options)[0]].value);
        this.state = {
            elements: this.props.options,
            selectedValue: this.props.options[Object.keys(this.props.options)[0]].value,
            inputClass: this.props.inputClass,
            inputClass2: this.props.inputClass2,
            localBenefit: this.props.localBenefit,
            inputValue: this.props.inputValue
            //label: this.props.label
        };
   
       this.handleChange = this.handleChange.bind(this);
       this.handleSubmit = this.handleSubmit.bind(this);
     }
   
     handleChange(event) {
       this.setState({selectedValue: event.target.options[event.target.selectedIndex].value});
     }
   
     handleSubmit(event) {
       window.location.href=this.state.selectedValue;
       event.preventDefault();
     }
   
     render() {
       
       const renderedElements = this.state.elements.map((element) => {
         return ( <option value={element.value}>{element.label}</option> )
      })
   
       return (
         <form onSubmit={this.handleSubmit} className={this.state.inputClass == 'benefit' && 'benefit'}>
           {this.state.inputClass == 'city' ?
           <label className='city'>           
             <select className='city' onChange={this.handleChange}>
                <option>Elige población</option>
               {renderedElements}
             </select>
           </label>
           : ''}
           {this.state.inputClass == 'comunidad' ?
           <label className='city'>           
             <select className='city' onChange={this.handleChange}>
                <option>Elige CA</option>
               {renderedElements}
             </select>
           </label>
           : ''}
           {this.state.inputClass == 'map' ?
           <label className='map'>           
             <select className='map' onChange={this.handleChange}>
               {renderedElements}
             </select>
           </label>
           : ''}
           {this.state.inputClass == 'benefit' ?
           <label className='benefit'>{this.state.localBenefit == true ? <h4>Selecciona el municipio</h4> : <h4>Selecciona la comunidad</h4>}           
             <select className='benefit' onChange={this.handleChange}>
               {renderedElements}
             </select>
           </label>
           : ''}
       <div className='wrapper'>{this.state.inputClass == 'city' && this.state.inputClass2 == null || this.state.inputClass == 'comunidad' && this.state.inputClass2 == null ? <input className='button city' type='submit' value={this.state.inputValue} />: ''}{this.state.inputClass == 'city' && this.state.inputClass2 == 'green' ? <input className='button city green' type='submit' value={this.state.inputValue} />: ''}{this.state.inputClass == 'comunidad' && this.state.inputClass2 == 'green' ? <input className='button city green' type='submit' value={this.state.inputValue} />: ''}{this.state.inputClass == 'map' ? <input className='button map' type='submit' value='Buscar por localidad' />: ''}{this.state.inputClass == 'benefit' ? <input className='button benefit' type='submit' value='Buscar la prestación' />: ''}</div>
           <style jsx>{`
             .wrapper, label.map {
               width:100%;
             }
             label.city {
               width:100%;
             }
             form.benefit {
             padding: 2em;
             background: #333333;
             border-radius:6.5%;
             }
             label.benefit {
              text-align:center;
              color:#ffffff;
             }
             input[type=submit], select.map {
               margin:0 auto;
               display:block;
             }
             select.city {
              margin:.7em auto;
              display:block;
             }
             @media screen and (min-width: 768px) {
                input[type=submit].map, input[type=submit].benefit, select.map, select.city {
                  width:55%;
                }
             }
             input[type=submit].city {
               background:#d86525;
             }
             input[type=submit].city:hover {
               background:#aa4e1c;
             }
             input[type=submit].city.green {
               background:#007950;
             }
             input[type=submit].city.green:hover {
               background:#009966;
             }
             input[type=submit].map {
               background:#009933;
             }
             input[type=submit].map:hover {
               background:#00862c;
             }
             input[type=submit].benefit {
              background:#cc3366;
             }
             input[type=submit].benefit:hover {
              background:#a62953;
             }
           `}</style>
         </form>
       );
     }
   }
   export default SelectCity