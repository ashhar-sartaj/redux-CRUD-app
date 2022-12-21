import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchAsyncPosts = createAsyncThunk("posts/fetchAsyncPosts", async ({id}) => {
    return fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
    .then(res => res.json())
})
// function for deleting the data 
export const deleteAsyncPosts = createAsyncThunk("posts/deleteAsyncPosts", async ({id}) => {
    return fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: "DELETE"
    })
    .then(res => res.json())
})
//function for creating posts
export const createAsyncPosts = createAsyncThunk("posts/createAsyncPosts", async ({values}) => {
    return fetch(`https://jsonplaceholder.typicode.com/posts`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body:JSON.stringify({
            title: values.title,
            body: values.body
        })
    })
    .then(res => res.json())
})

//function for editing the existing post
export const updateAsyncPosts = createAsyncThunk("posts/updateAsyncPosts", async ({id, title, body}) => {
    return fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body:JSON.stringify({
            title,
            body,
        })
    })
    .then(res => res.json())
})


const initialState = {
    posts: [],
    loading: false,
    error: null,
    body:"",
    edit: false,
}

const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        //this is the action for the edit functionality.
        setEdit: (state, action) => {
            state.body = action.payload.body,
            state.edit = action.payload.edit
        }
    },
    extraReducers: {
        [fetchAsyncPosts.pending]: (state, action) => {
            console.log("Pending")
            state.loading = true;
        }, 
        [fetchAsyncPosts.fulfilled]: (state, action) => {
            console.log("Fetched Successfully")
            state.loading = false;
            state.posts = [action.payload]
        },
        [fetchAsyncPosts.rejected]: (state, action) => {
            console.log("rejected")
            state.loading = false;
            state.error = action.payload;
        },

        [deleteAsyncPosts.pending]: (state, action) => {
            console.log("Pending")
            state.loading = true;
        }, 
        [deleteAsyncPosts.fulfilled]: (state, action) => {
            console.log("Fetched Successfully")
            state.loading = false;
            state.posts = action.payload
        },
        [deleteAsyncPosts.rejected]: (state, action) => {
            console.log("rejected")
            state.loading = false;
            state.error = action.payload;
        },

        [createAsyncPosts.pending]: (state, action) => {
            console.log("Pending")
            state.loading = true;
        }, 
        [createAsyncPosts.fulfilled]: (state, action) => {
            console.log("Fetched Successfully")
            state.loading = false;
            state.posts = [action.payload]
        },
        [createAsyncPosts.rejected]: (state, action) => {
            console.log("rejected")
            state.loading = false;
            state.error = action.payload;
        },

        [updateAsyncPosts.pending]: (state, action) => {
            console.log("Pending")
            state.loading = true;
        }, 
        [updateAsyncPosts.fulfilled]: (state, action) => {
            console.log("Fetched Successfully")
            state.loading = false;
            state.posts = [action.payload]
        },
        [updateAsyncPosts.rejected]: (state, action) => {
            console.log("rejected")
            state.loading = false;
            state.error = action.payload;
        },
    }
})
export const {setEdit} = postsSlice.actions
export default postsSlice.reducer;