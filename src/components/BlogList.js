import React from 'react'
import Blog from './Blog'
import PropTypes from 'prop-types'

const BlogList = ({blogs, currentLogin, onIncLikes, onDeleteBlog, currentLogin2}) => {
  return (
    blogs.map(blog => 
      <Blog 
        key={blog.id} 
        currentLogin={currentLogin}
        title={blog.title} 
        author={blog.author}
        url={blog.url}
        likes = {blog.likes}
        user={blog.user}
        onIncLikes={onIncLikes(blog)}
        onDeleteBlog={onDeleteBlog(blog)}
      />
    )
  )
}

BlogList.propTypes = {
  blogs: PropTypes.array.isRequired,
  currentLogin: PropTypes.object.isRequired,
  onIncLikes:PropTypes.func.isRequired,
  onDeleteBlog: PropTypes.func.isRequired,
}

export default BlogList