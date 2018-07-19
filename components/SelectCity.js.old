class SelectCity extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props.options[Object.keys(this.props.options)[0]].value);
    this.state = {
        elements: this.props.options,
        selectedValue: this.props.options[Object.keys(this.props.options)[0]].value
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
      <form onSubmit={this.handleSubmit}>
        <label>
          <select onChange={this.handleChange}>
            {renderedElements}
          </select>
        </label>
        <div className='wrapper'><input className='button' type='submit' value='Buscar el mejor descuento' /></div>
        <style jsx>{`
          .wrapper {
            width:100%;
            padding:1em;
          }
          input[type=submit] {
            background:#d86525;
            margin:0 auto;
            display:block;
          }
          input[type=submit]:hover {
            background:#aa4e1c;
          }
        `}</style>
      </form>
    );
  }
}
export default SelectCity