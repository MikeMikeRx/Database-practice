import { projectFirestore } from "./firebase/config"
import { useState, useEffect } from "react"

const App = () => {
  const [data, setData] = useState([])
  const [error, setError] = useState(false)

  useEffect( ()=>{
    projectFirestore.collection("movies").get().then( (snapshot)=>{
      console.log(snapshot);

      if(snapshot.empty){
        setError("No files found")
      }
      
    })
  }, [])

  return <div>
    {error && <p>{error}</p>}
  </div>
  
}

export default App