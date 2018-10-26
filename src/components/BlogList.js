import React from 'react'
import Blog from './Blog'

const BlogList = (props) => (
    props.blogs.map(blog => 
      <Blog 
        key={blog.id} 
        title={blog.title} 
        author={blog.author}
        url={blog.url}
        likes = {blog.likes}
        user={blog.user}
        onIncLikes={props.onIncLikes(blog)}
        onDeleteBlog={props.onDeleteBlog(blog)}
      />
    )
)


export default BlogList