import React from 'react'

const CreateBlogForm = (props) => {
    return (
    <div>
        <h2>create new</h2>
        <form onSubmit={props.handleSubmit}>
        <div>
            <b>title</b>
            <input 
            type="text" 
            name="newBlogTitle" 
            value={props.newBlogTitle}
            onChange={props.handleChange}/>
        </div>
        <div>
            <b>author</b>
            <input 
            type="text" 
            name="newBlogAuthor" 
            value={props.newBlogAuthor}
            onChange={props.handleChange}/>
        </div>
        <div>
            <b>url</b>
            <input 
            type="text" 
            name="newBlogUrl" 
            value={props.newBlogUrl}
            onChange={props.handleChange}/>
        </div>
        <button type="submit">create</button> 
        </form>
    </div>
    )
}
 export default CreateBlogForm