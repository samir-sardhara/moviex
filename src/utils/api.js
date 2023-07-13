import axios from "axios";



const BASE_URL="https://api.themoviedb.org/3";

const TMDB_TOKEN ="eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NzY3MGI1NTNjYzYxMTA1NDU2NTc3OWVjYzc2Y2ZiNCIsInN1YiI6IjY0YTAwYmQ2OGMwYTQ4MDBjNzYzYmQxNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gV8cwgZLry1rITB3Q0EsLqxjhbj5lud5k9kqjAfCKCU"

const headers={
    Authorization:"bearer " +
    TMDB_TOKEN,
};

export  const fechDataFromApi=async(url,params)=>{
  try{
    const {data}=await axios.get(BASE_URL +url,{
        headers,
        params
    })
    return data;
  }catch(err){
     console.log(err);
     return err;
  }
}


