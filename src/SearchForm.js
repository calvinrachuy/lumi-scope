import { useState } from 'react'
import './SearchForm.css'
import SearchResult from './SearchResult'
import api from './api'

export default function SearchForm({ onStar }) {
  const [items, setSearchResults] = useState([])
  
  let inputClassName = 'search-input'
  if (items.length) {
    inputClassName += ' expanded'
  }
  
  function updateSearchResult(item) {
    setSearchResults(items.map(x => item.id === x.id ? item : x))
  }

  async function search(q = '') {
    if (!q) {
      setSearchResults([])
      return;
    }
    
    const { data } = await api.get(`?_limit=10&name_like=${q}`)
    setSearchResults(data)
  }
  
  async function updateStarred(item) {
    let optimisticSearchResult = Object.assign({}, item, { starred: !item.starred })
    updateSearchResult(optimisticSearchResult)
    const { data } = await api.patch(`/${item.id}`, { starred: !item.starred })
    updateSearchResult(data)
    onStar(data)
  }
  
  const itemList = items.map((item) => (
    <SearchResult key={item.id} item={item} onClick={updateStarred} />
  ))
  
  return (
    <div className="search">
      <div className="form-container">
      <form>
        <input
          className={inputClassName}
          data-cy="search-input"
          onChange={e => search(e.target.value)}
          placeholder="search..."
          type="text"
        />
        <section data-cy="search-results" className="search-results">
          {itemList}
        </section>
        </form>
      </div>
    </div>
  )
}