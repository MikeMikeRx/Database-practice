import { projectFirestore } from "./firebase/config"
import { useState, useEffect } from "react"

const App = () => {
  const [data, setData] = useState([])
  const [error, setError] = useState(false)
  //useState - form
  const [movieTitle, setMovieTitle] = useState("")
  const [movieAge, setMovieAge] = useState(null)
  const [movieTime, setMovieTime] = useState(null)

  useEffect( ()=>{
    const unsubscribe = projectFirestore.collection("movies").onSnapshot( (snapshot)=>{

      if(snapshot.empty){
        setError("No files found")
        setData([])
      } else {
        let result = []
        snapshot.docs.forEach( (oneMovie) => {
          result.push( {id: oneMovie.id, ...oneMovie.data()} )
        })
        setData(result)
        setError("")        
      }      
    }, (err) => {setError(err.message)})
    
    return () => unsubscribe()
    
  }, [])

  const deleteMovie = (id) => {
    projectFirestore.collection("movies").doc(id).delete()
  }

  const submitForm = (e) => {
    e.preventDefault()

    console.log(movieTitle, movieAge, movieTime);
      
  }


  return <div className="all-movies">
    <form onSubmit={submitForm}>
      <input type="text" 
      onChange={ (e) => setMovieTitle( e.target.value ) } 
      placeholder="Movie name"/><br />

      <input type="number" 
      onChange={ (e) => setMovieAge( e.target.value ) } 
      placeholder="Minimum Age" min="0" /><br />

      <input type="number" 
      onChange={ (e) => setMovieTime( e.target.value ) } 
      placeholder="Movie duration" min="0"/><br />
      
      <input type="submit" value="Add movie"/>
    </form>


    {error && <p>{error}</p>}
    {data.map( (oneMovie)=> {
      const {id, title, minage, time} = oneMovie

      return <div key={id} className="one-movie">
        <h1>{title}</h1>
        <p>{time} min</p>
        <p>Age {minage} +</p>
        <button onClick={ () => {deleteMovie(id)}}>Remove from database</button>
      </div>
    })}
  </div>
  
}

export default App