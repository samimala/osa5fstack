import React from 'react'

const SimpleBlog = ({ blog, onClick }) => (
  <div>
    <div className='Content1'>
      {blog.title} {blog.author}
    </div>
    <div className='Content2'>
      blog has {blog.likes} likes
      <button onClick={onClick}>like</button>
    </div>
  </div>
)

export default SimpleBlog
