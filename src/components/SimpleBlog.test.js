import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe.only('<SimpleBlog />', () => {
    it('renders content', () => {
        const simpleBlog = {
            title: 'Testititle',
            author: 'Testiauthor',
            likes: 10
        }

        const blogComponent = shallow(<SimpleBlog blog={simpleBlog} />)
        console.log(blogComponent.debug())

        const contentDiv1 = blogComponent.find('.Content1')
        const contentDiv2 = blogComponent.find('.Content2')

        expect(contentDiv1.text()).toContain(simpleBlog.title)
        expect(contentDiv1.text()).toContain(simpleBlog.author)
        expect(contentDiv2.text()).toContain(simpleBlog.likes)

        console.log(contentDiv1.debug())
        console.log(contentDiv2.debug())
    })
})