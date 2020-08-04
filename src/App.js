import React, { useState, useEffect } from 'react'
import Card from './components/Card'
import Search from './components/Search'

function App() {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  
  useEffect(() => {
    fetch(`https://pixabay.com/api/?key=${process.env.REACT_APP_API_KEY_PIX}&q=${search}&image_type=photo&pretty=true`)
      .then(res => res.json())
      .then(data  => {
        setImages(data.hits)
        setLoading(false)
        console.log(data)
      })
      .catch(e => console.log(e))
  },[search])
  return (
    
    <div className="container mx-auto">
    <Search searchText={(text) => setSearch(text)}/>
    {!loading && images.length===0 && <h1 className="text-6xl text-center mx-auto mt-32">No images founds:(</h1>}
      {loading? <h1 className="text-6xl text-center mx-auto mt-32">Loading...</h1>:
        <div className="grid grid-cols-3 gap-4">
        {images.map(image => <Card key={image.id} image={image}/>)}
      </div>
      }
    </div>
  )
}

export default App
