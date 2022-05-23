import { useEffect, useState } from 'react'
import api from './api'
import './App.css'
import SearchForm from './SearchForm'
import React from 'react'
import { ReactComponent as Telescope } from './telescope.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function App() {
  const [starredCount, setStarredCount] = useState(0)
  
  // Run once (onMount)
  // Fetched already starred items, set count
  useEffect(() => {
    (async () => {
      const { data } = await api.get('?starred=true')
      setStarredCount(data.length)
    })()
  }, [])
  
  function updateStarredCount(item) {
    const i = item.starred ? 1 : -1
    setStarredCount(starredCount + i)
    if (starredCount < 0) {
      setStarredCount(0)
    }
  }
  
  return (
    <>
      <header>
        <div className="graphic"><Telescope /></div>
        <h1 data-cy="title" className="title">LumiScope</h1>
        <div className="starred-count-container">
          <div className="starred-count">
            <FontAwesomeIcon className="icon" icon="star" />
            <span data-cy="starred-count">{starredCount}</span>
          </div>
        </div>
      </header>
      <div className="page">
        <SearchForm onStar={updateStarredCount}/>
      </div>
    </>
  );
}

export default App;
