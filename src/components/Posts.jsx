import React, { useEffect } from 'react'
import "./Posts.scss"
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { deleteAsyncPosts, fetchAsyncPosts, updateAsyncPosts } from '../features/posts/postsSlice'
import { setEdit } from '../features/posts/postsSlice'
import Spinner from './Spinner'
const Posts = () => {
    const [id, setId] = useState();
    const [textBody, setTextBody] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {posts, loading, body, edit} = useSelector(state => ({...state.posts}))

    useEffect(() => {
        if(body) {
            setTextBody(body);
        }
    }, [body])

    const handleFetchData = (e) => {
        e.preventDefault();
        if (!id) {
            window.alert("Please a valid Id")
        } else {
            dispatch(fetchAsyncPosts({id}))
            setId("")
        }
    }

    const handleDelete = ({id}) => {
        dispatch(deleteAsyncPosts({id: posts[0].id}));
        window.location.reload()
        window.alert("Post deleted successfully")
    }
  return (
    <>
        <div>
            <div class="container">

                <form action="">                
                    <div class="row height d-flex justify-content-center align-items-center">
                        <div class="col-md-8">
                            <div class="search">
                            <i class="fa fa-search"></i>
                            <input type="number" class="form-control" placeholder="Enter Search ID Here" value={id} onChange={(e) => setId(e.target.value)}/>
                            <button class="btn btn-primary">Search</button>
                            </div>
                            <div className='btn-functionality'>                    
                                <button onClick={handleFetchData}type="submit" class="btn btn-secondary mt-3 mx-3">Fetch Post</button>

                                <button  onClick={() => navigate('/createPosts')} type="button" class="btn btn-secondary mt-3">Create Post</button>
                            </div>
                        </div>
                    </div>
                </form>

            </div>
        </div>

        {/* this div is for spinner */}
        <div className='container'>
            {
                loading ? <Spinner/> : (<>
                    {posts.length > 0 && (
                        <>
                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title">{posts[0].title}</h5>
                                    {edit ? (
                                    <>
                                        <div className="form-outline mb-4">
                                            <textarea className="form-control" id="form4Example3" rows="4" value={textBody} onChange={(e) => {setTextBody(e.target.value)}}></textarea>

                                            <button type="button" class="btn btn-info" onClick={() => {
                                                dispatch(updateAsyncPosts({
                                                    id: posts[0].id, 
                                                    title: posts[0].title, 
                                                    body: textBody
                                                }))
                                                dispatch(setEdit({edit: false, body: ""}))
                                            }
                                                // dispatch(setEdit({edit: false}))
                                                } >SAVE</button>
                                    
                                            <button type="button" class="btn btn-danger" onClick={() => {
                                                dispatch(setEdit({edit: false, body: ""}))
                                            }}>CANCEL</button>
                                        </div>
                                    </>) : (
                                        <>
                                            <p class="card-text">{posts[0].body}</p>    
                                        </>
                                    )}

                                    {/* //THESE BELOW buttons, we will only show them when there is no edit mode. i.e: when edit is false. */}
                                    {!edit && (
                                        <>
                                        
                                        <button type="button" class="btn btn-info" onClick={() => {dispatch(setEdit({edit: true, body: posts[0].body}))}}>EDIT</button>

                                        <button type="button" class="btn btn-danger" onClick={handleDelete}>DELETE</button>
                                        </>
                                    )}
                                    
                                </div>
                            </div>
                        </>
                    )}
                </>)
            }
        </div>
    </>
  )
}

export default Posts
