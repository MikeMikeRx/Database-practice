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

  const submitForm = async (e) => {
    e.preventDefault()

    const newMovie = {title: movieTitle, minage: movieAge, time: movieTime}

    try {
      await projectFirestore.collection("movies").add(newMovie)
      setMovieTitle("")
      setMovieAge("")
      setMovieTime("")
    } catch (err) {
      setError("Failed to add the movie to the database: " + err.message)
    }    
  }


  return <div className="wrap"> 
    <h1>Add a Movie to the Database</h1>

    <form onSubmit={submitForm} className="form">
      <input type="text" 
      onChange={ (e) => setMovieTitle( e.target.value ) } 
      placeholder="Movie name"
      value={movieTitle}
      /><br />

      <input type="number" 
      onChange={ (e) => setMovieTime( e.target.value ) } 
      placeholder="Movie duration" 
      min="0"
      value={movieTime}
      /><br />

      <input type="number" 
      onChange={ (e) => setMovieAge( e.target.value ) } 
      placeholder="Minimum age" 
      min="0"
      value={movieAge} 
      /><br />

      <input type="submit" value="Add movie"/>
    </form>


    {error && <p>{error}</p>}

    <div className="all-movies">
    {data.map( (oneMovie)=> {
      const {id, title, minage, time} = oneMovie

      return <div key={id} className="one-movie">
        <h2>{title}</h2>
        <p>{time} min</p>
        <p>Age {minage} +</p>
        <button onClick={ () => {deleteMovie(id)}}>Remove from database</button>
      </div>
    })}
  </div>
</div>  
}

export default App