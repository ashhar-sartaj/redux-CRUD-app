import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createAsyncPosts } from '../features/posts/postsSlice'
import Spinner from './Spinner'

const CreatePosts = () => {
  
  const [values, setValues] = useState({title: "", body: ""})
  const [showPosts, setShowPosts] = useState(false); //this will be showing the post as we clicked the submit button.

  const {loading, posts} =  useSelector(state => ({...state.posts})) //we get the loading and posts from posts state. 

  //below we will be destructuring the values.
  const {title, body} = values
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(createAsyncPosts({values}))
    setValues({title: "", body: ""})
    setShowPosts(true);
  }

  //function to show the post that just got created.
  const showCreatedPost = () => {
    return (
      <>
        {loading ? <Spinner/> : 
        (<>
          <div class="card">
            <div class="card-body">
                <h5 class="card-title">{posts[0].title}</h5>
                <p class="card-text">{posts[0].body}</p>
            </div>
          </div>
        </>)}
      </>
    )
  }

  return (
    <div>
      <h2 className='text-center bg-dark text-white p-2'>Create New Post!</h2>
      <form>
        {/* <!-- Title input --> */}
        <div className="form-outline mb-4">
          <input type="text" id="form4Example1" className="form-control" value={title} onChange={(e)=> setValues({...values, title:e.target.value})}/>
          <label className="form-label" for="form4Example1">Post Title</label>
        </div>

        {/* <!-- Message input --> */}
        <div className="form-outline mb-4">
          <textarea className="form-control" id="form4Example3" rows="4" value={body} onChange={(e) => {setValues({...values, body: e.target.value})}}></textarea>
          <label className="form-label" for="form4Example3">Add Description</label>
        </div>

        {/* <!-- Submit button --> */}
        {/* <button type="submit" className="btn btn-primary btn-block mb-4">Send</button> */}
        <div className='btn-functionality'>                    
          <button onClick={() => navigate("/")} class="btn btn-secondary mt-3 mx-3">Go Home</button>

          <button  onclick={handleSubmit} type="submit" class="btn btn-secondary mt-3">Submit</button>
        </div>
      </form>

      {/* //here we will be showing the created post that the user just created. */}
      <div className='mt-4'>
        {showPosts && <div>{showCreatedPost()}</div>}
      </div>
    </div>
  )
}

export default CreatePosts
