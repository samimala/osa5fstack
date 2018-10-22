import React from 'react'
import BlogList from './components/BlogList'
import blogService from './services/blogs'
import loginService from './services/login'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      newBlogUrl: '',
      newBlogAuthor: '',
      newBlogTitle: '',
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

    const loggedUserJSON = window.localStorage.getItem('loggerBlogSystemUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({user})
      blogService.setToken(user.token)
    }
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
      window.localStorage.setItem('loggerBlogSystemUser', JSON.stringify(response))
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

  createBlog = async (event) => {
    event.preventDefault()
    try {
      const newBlog = {
        url: this.state.newBlogUrl,
        title: this.state.newBlogTitle,
        author: this.state.newBlogAuthor
      }
      console.log('Sending new blog:', newBlog)
      const response = await blogService.create(newBlog)
      console.log('createBlog response', response)
      this.setState({
        blogs: this.state.blogs.concat(response),
        newBlog: {}
      })
    }
    catch (exception) {
      this.setState({
        error: 'Adding blog failed',
        newBlog: {}
      })
    }
    setTimeout(() => { this.setState({ error: null }) }, 5000)
  }

  handleLoginFieldChange = (event) => {
    this.setState( { [event.target.name] : event.target.value })
  }

  handleBlogFieldChange = (event) => {
    const key = event.target.name
    console.log('Key is ' + key)
    this.setState( { [key] : event.target.value })
  }

  onLogout = () => {
    window.localStorage.removeItem('loggerBlogSystemUser')
    this.setState( { user: null })
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

    const createBlogForm = () => (
      <div>
        <h2>create new</h2>
        <form onSubmit={this.createBlog}>
        <div>
          <b>title</b>
          <input 
            type="text" 
            name="newBlogTitle" 
            value={this.state.newBlogTitle}
            onChange={this.handleBlogFieldChange}/>
        </div>
        <div>
          <b>author</b>
          <input 
            type="text" 
            name="newBlogAuthor" 
            value={this.state.newBlogAuthor}
            onChange={this.handleBlogFieldChange}/>
        </div>
        <div>
          <b>url</b>
          <input 
            type="text" 
            name="newBlogUrl" 
            value={this.state.newBlogUrl}
            onChange={this.handleBlogFieldChange}/>
        </div>
        <button type="submit">create</button>
        </form>
      </div>
    )
    const blogs = () => (
      <div>
        <h2>blogs</h2>
        <p>
          {this.state.user.username} 
          {' logged in '}
          <button onClick={this.onLogout}>Logout</button>
        </p>
        {console.log('Calling BlogList', this.state.blogs)}
        {createBlogForm()}
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
