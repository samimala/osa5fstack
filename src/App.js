import React from 'react'
import BlogList from './components/BlogList'
import blogService from './services/blogs'
import loginService from './services/login'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      username: '',
      password: '',
      error: '',
      user: null
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )
  } 

  login = async (event) => {
    event.preventDefault()
    console.log('Login - username: ', this.state.username, ' password: ', this.state.password)
    try {
      const response = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })
      console.log('login response: ', response)
      this.setState({ 
        username: '', 
        password: '',
        user: response
      })
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
            <p>{this.state.error}</p>
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

    const blogs = () => (
      <div>
        <h2>blogs</h2>
        <p>
          {this.state.user.username} logged in 
        </p>
        {console.log('Calling BlogList', this.state.blogs)}
        
        <BlogList blogs={this.state.blogs} />
        
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
