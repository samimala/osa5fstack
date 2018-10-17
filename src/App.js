import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      username: '',
      password: '',
      user: null
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )
  } 

  login = (event) => {
    event.preventDefault()
    console.log('Login - username: ', this.state.username, ' password: ', this.state.password)
    try {
      const response = loginService.login({
        username: this.state.username,
        password: this.state.password
      })
      response.then(this.setState({ 
        username: '', 
        password: '',
        user: response.user
      })
      )
    } 
    catch (exception) {
      this.setState({
        error: 'Kredentiaaleissa vikaa'
      })
    }
    setTimeout(() => { this.setState({ error: null }) }, 5000)
  }

  handleLoginFieldChange = (event) => {
    this.setState( { [event.target.name] : event.target.value })
  }

    
  render() {
    const loginForm = () => (
      <div>
        <h2>login</h2>
        <form onSubmit={this.login}>
          <div>
            <b>username</b>
            <input 
              type="text" 
              name="username" 
              value={this.state.username}
              onChange={this.handleLoginFieldChange}/>
          </div>
          <div>
            <b>password</b>
            <input 
              type="text" 
              name="password" 
              value={this.state.password}
              onChange={this.handleLoginFieldChange}/>
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )

    const noneloggedin = () => {}

    const loggedin = () => {
      <div>
        {this.state.username} logged in 
      </div>
    }

    const blogs = () => (
      <div>
        <h2>blogs</h2>
        {this.state.user=== null?noneloggedin():loggedin()}
        {this.state.blogs.map(blog => 
          <Blog key={blog._id} blog={blog}/>
        )}
      </div>
    )
    
    if (this.state.user === null) {
      console.log('loginForm about to print')
      return loginForm()
    } 
    return blogs()
  }
}

export default App;