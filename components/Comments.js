import Link from 'next/link'
import ReactDisqusComments from 'react-disqus-comments'

class Comments extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          Identifier: this.props.ID,
          Title: this.props.Title,
          URL: this.props.URL

    };  
    }
        
    handleNewComment(comment) {
        console.log(comment.text);
    }
  
    render() { 
        return (
            <section>
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
    }
  }
  export default Comments