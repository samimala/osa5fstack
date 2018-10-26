import React from 'react'
import BlogList from './components/BlogList'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import CreateBlogForm from './components/CreateBlogForm'

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
      error: null,
      notification: null,
      createBlogVisible: false,
      user: null
    }
  }

  async componentDidMount() {
    const blogs = await blogService.getAll()
    this.setState({ blogs })

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
      blogService.setToken(response.token)
    } 
    catch (exception) {
      this.setState({
        error: 'wrong username or pasword'
      })
    }
    setTimeout(() => { this.setState({ error: null }) }, 5000)
  }

  createBlog = async (event) => {
    event.preventDefault()
    this.createBlogForm.toggleVisibility()
    try {
      const newBlog = {
        url: this.state.newBlogUrl,
        title: this.state.newBlogTitle,
        author: this.state.newBlogAuthor
      }
      console.log('Sending new blog:', newBlog)
      const response = await blogService.create(newBlog)
      console.log('createBlog response', response)
      console.log('Toimiiko: ',"a new blog '" + response.title + "' by " + response.author + " added")
      this.setState({
        blogs: this.state.blogs.concat(response),
        notification: "a new blog '" + response.title + "' by " + response.author + " added",
        newBlog: {}
      })
    }
    catch (exception) {
      this.setState({
        error: 'Adding blog failed',
        newBlog: {}
      })
    }
    setTimeout(() => { this.setState({ error: null, notification: null }) }, 5000)
  }

  incBlogLikes = () => (blog) => async () => {
    const updatedBlog = {
      id: blog.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes+1,
      user: blog.user.token
    }
    console.log('Increase likes for blog: ', blog.title)
    const response = await blogService.update(updatedBlog)  
    const blogs = await blogService.getAll()
    this.setState({ blogs })
  }

  //--- jatka tästä
  deleteBlog = () => (blog) => async () => {
    console.log('Delete blog: ', blog.title)
    if (!window.confirm('Really want to get rid of: ' + blog.title)) {
      return
    }
    try {
      const response = await blogService.deleteBlog(blog)  
    }
    catch(exception) {
      window.alert('Could not delete blog: ' + blog.title)
    }
    const blogs = await blogService.getAll()
    this.setState({ blogs })
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
    const Error = ({error}) => {
      if (error==null) {
        return null
      }
      return (<div className="error">{error}</div>)
    }

    const Notification = ({note}) => {
      if (note==null) {
        return null
      }
      return (<div className="notification">{note}</div>)
    }

    const loginForm = () => (
      <div>
        <Error error={this.state.error}/> 
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


    const blogs = () => (
      <div>
        <Notification note={this.state.notification}/> 
        <h2>blogs</h2>
        <p>
          {this.state.user.username} 
          {' logged in '}
          <button onClick={this.onLogout}>Logout</button>
        </p>
        {console.log('Calling BlogList', this.state.blogs)}
        <Togglable buttonLabel="Create new blog" ref={component=>this.createBlogForm=component}>
          <CreateBlogForm
            newBlogTitle={this.state.newBlogTitle}
            newBlogAuthor={this.state.newBlogAuthor}
            newBlogUrl={this.state.newBlogUrl}
            handleChange={this.handleBlogFieldChange}
            handleSubmit={this.createBlog}
          />
        </Togglable>
        <BlogList
            currentLogin={this.state.user} 
            blogs={this.state.blogs}
            onIncLikes={this.incBlogLikes()}
            onDeleteBlog={this.deleteBlog()}
         />
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
