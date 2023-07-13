import { useState,useEffect } from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom"

import { fechDataFromApi} from "./utils/api"
import { useSelector, useDispatch } from 'react-redux'
import {getApiConfiguration,getgenres} from "./store/homeSlice"

import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import Home from './pages/home/Home'
import Details from './pages/details/Details'
import SeaechResult from './pages/searchResult/SearchResult'
import Explore from './pages/explore/Explore'
import PageNotFound from './pages/404/PageNotFound'

function App() {

  const dispatch = useDispatch();
  const {url}=useSelector((state)=>
  state.home);
  console.log(url);

  useEffect(()=>{
    fetchApiConfig();
    genresCall();
  },[])
 
const fetchApiConfig =()=>{
  fechDataFromApi('/configuration')
  .then((res)=>{
    console.log(res);
const url={
  backdrop:res.images.secure_base_url +"original",
  poster:res.images.secure_base_url +"original",
  profile:res.images.secure_base_url +"original",

}

    dispatch(getApiConfiguration(url));
  })
}

const genresCall=async()=>{
     let promises=[]
     let endPoints=["tv","movie"]
     let allGenres={}
     
     endPoints.forEach((url)=>{
      promises.push(fechDataFromApi(`/genre/${url}/list`))
     })

     const data=await promises.all(promises);
     console.log(data);
     data.map(({genres})=>{
      return genres.map((item)=>(allGenres[item.id]=item))
     })
     dispatch(getgenres(allGenres))
     
}

  return (
   <BrowserRouter>
   <Header/>
   <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/:mediaType/:id' element={<Details/>}/>
    <Route path='/search/:query' element={<SeaechResult/>}/>
    <Route path='/explore/:mediaType' element={<Explore/>}/>
    <Route path='*' element={<PageNotFound/>}/>
   </Routes>
   <Footer/>
   </BrowserRouter>
  )
}

export default App
