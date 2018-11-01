import React from 'react'
import { mount } from 'enzyme'
import App from './App'
import Blog from './components/Blog'
jest.mock('./services/blogs')
import blogService from './services/blogs'

describe('<App />', () => {
    let app
    beforeAll(() => {
        app = mount(<App />)
    })

    it('no blogs shown if user not logged in - only login form visible', () => {
        app.update()
        const blogComponents = app.find(Blog)
        console.log(blogComponents.debug())
        expect(blogComponents.length).toEqual(0) 
        const loginForm = app.find('.loginform')
        expect(loginForm.length).toEqual(1)
        expect()       
    })
})