import React from 'react'
import { mount } from 'enzyme'
import App from './App'
import Blog from './components/Blog'
jest.mock('./services/blogs')
import blogService from './services/blogs'

describe('<App />', () => {
  let app

  describe('User has not logged in', () => {
    beforeEach(() => {
      app = mount(<App />)
    })

    it('no blogs shown - only login form visible', () => {
        app.update()
        const blogComponents = app.find(Blog)
        console.log(blogComponents.debug())
        expect(blogComponents.length).toEqual(0) 
        const loginForm = app.find('.loginform')
        expect(loginForm.length).toEqual(1)
    })
  })

  describe('User has not logged in', () => {
    beforeEach(() => {
        const user = {
              username: 'tester',
              token: '1231231214',
              name: 'Teuvo Testaaja'
        }
        window.localStorage.setItem('loggerBlogSystemUser', JSON.stringify(user))
        app = mount(<App />)
      })

      it ('when a user has logged in blogs are shown - login is not visible', () => {          
        app.update()
        const blogComponents = app.find(Blog)
        console.log(blogComponents.debug())
        expect(blogComponents.length).toEqual(blogService.blogs.length) 
        const loginForm = app.find('.loginform')
        expect(loginForm.length).toEqual(0)
      })            
    })
})