import axios from "axios"
import { InitialFormState, PostInterface, CommentData } from "./interfaces"

const API = axios.create({
  baseURL: "http://localhost:8000/",
})

//middleware verification setup.
//add token to request headers for backend to verify
API.interceptors.request.use((req) => {
  if (req.headers) {
    if (localStorage.getItem("profile")) {
      req.headers.Authorization = `Bearer ${
        JSON.parse(localStorage.getItem("profile")!).token
      }`
    }

    return req
  }
})

//postSlice
export const getPosts = () => API.get(`/posts/getPosts`)

export const makePost = (formData: any) => API.post(`/posts/makePost`, formData)

export const likePost = (id: string) => API.patch(`/posts/${id}/likePost`)

export const deletePost = (id: string) => API.delete(`/posts/${id}`)

export const editPost = (id: string, updatedPost: PostInterface) =>
  API.patch(`/posts/${id}`, updatedPost)

export const commentPost = (id: string, commentData: CommentData) =>
  API.patch(`/posts/${id}/commentPost`, commentData)

//comments
export const likeComment = (commentId: string, postId: string) =>
  API.patch(`/comments/${postId}/${commentId}/likeComment`)

export const deleteComment = (commentId: string, postId: string) =>
  API.delete(`/comments/${postId}/${commentId}/`)

//stockDataSlice
//go to backend server to fetch api data
export const fetchFinanceData = (ticker: string) => API.get(`/search/${ticker}`)

//authSlice
//sign in and sign up
export const signIn = (formData: InitialFormState) =>
  API.post("/user/signin", formData)

export const signUp = (formData: InitialFormState) =>
  API.post("/user/signup", formData)
