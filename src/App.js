import { projectFirestore } from "./firebase/config"
import { useState, useEffect } from "react"

const App = () => {
  const [data, setData] = useState([])
  const [error, setError] = useState(false)

  useEffect( ()=>{
    projectFirestore.collection("movies").get().then( (snapshot)=>{

      if(snapshot.empty){
        setError("No files found")
      } else {
        let result = []
        snapshot.docs.forEach( (oneMovie) => {
          result.push( {id: oneMovie.id, ...oneMovie.data()} )
        })
        setData(result)        
      }
      
    }).catch( (err) => {
      setError(err.message)
    } )
  }, [])

  return <div>
    {error && <p>{error}</p>}
  </div>
  
}

export default App