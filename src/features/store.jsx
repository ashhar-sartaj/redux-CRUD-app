import { configureStore } from "@reduxjs/toolkit";
// import CreatePosts from "../components/CreatePosts";
import postsReducer from "../features/posts/postsSlice"

const store = configureStore({
    reducer: {
        posts: postsReducer
    }
})

export default store