import React from 'react'
import { shallow } from 'enzyme'
import Blog from './Blog'

describe.only('<Blog />', () => {
    it('By default title and author are visible only', () => {
        const blog = {
            title: 'Testititle',
            author: 'Testiauthor',
            url: 'urli',
            likes: 10
        }

        const blogComponent = shallow(<Blog title={blog.title} author={blog.author} url={blog.url} likes={blog.likes}/>)
        console.log(blogComponent.debug())
        const contentDiv1 = blogComponent.find('.allContent')
        const contentDiv2 = blogComponent.find('.toggleContent')

        console.log('contentDiv1:', contentDiv1.debug())
        expect(contentDiv1.text()).toContain(blog.title)
        expect(contentDiv1.text()).toContain(blog.author)
        expect(contentDiv2.getElement().props.style).toEqual({display:'none'})

        //expect(contentDiv2.text()).toContain(simpleBlog.likes)

        console.log(contentDiv1.debug())
        //console.log(contentDiv2.debug())
    }),

    it('after click the rest becomes visible', () => {
        const blog = {
            title: 'Testititle',
            author: 'Testiauthor',
            url: 'urli',
            likes: 10
        }

        const blogComponent = shallow(<Blog title={blog.title} author={blog.author} url={blog.url} likes={blog.likes}/>)
        console.log(blogComponent.debug())
        const button = blogComponent.find('.toggler')
        button.simulate('click')
        const contentDiv2 = blogComponent.find('.toggleContent')
        expect(contentDiv2.getElement().props.style).toEqual({display:''})
        expect(contentDiv2.text()).toContain(blog.likes)
        expect(contentDiv2.text()).toContain(blog.url)

    })
})