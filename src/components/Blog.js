import React from 'react'

class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      compressedForm: true,
    }
  }
  
  toggleCompression = () => {
    this.setState({compressedForm : !this.state.compressedForm})
  }
  blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  render() {
    const hideWhenCompressed = { display: this.state.compressedForm ? 'none': ''}
    const showWhenCompressed = { display: this.state.compressedForm ? '' : 'none'}

    return (
      <div style={this.blogStyle}>      
        <span onClick={this.toggleCompression}> 
           {this.props.title}
        </span> 
        {' '}
        {this.props.author}
        <div style={hideWhenCompressed}>
          <div>
            <a href={this.props.url}>{this.props.url}</a> 
          </div>
          <div>
            {this.props.likes} 
            {' likes '}
            <button>like</button>
          </div>
          <div>
            {'Added by '} {this.props.user.name}
          </div>
        </div>
      </div>
  
    )
  }
}
export default Blog