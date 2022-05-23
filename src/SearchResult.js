import './SearchResult.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function SearchResult({ item, onClick }) {
  let className = 'item'
  if (item.starred) {
    className += ' starred'
  }
  
  const a = item.address
  const address = a ? `${a.address1}\n${a.address2 || ''}\n${a.city}, ${a.state} ${a.postalCode}`.trim() : ''
  
  let {image, description, details} = {
    product: {
      image: <FontAwesomeIcon icon='box-open' />,
      description: item.productCategory,
      details: item.previewText
    },
    animal: {
      image: <FontAwesomeIcon icon='paw' />,
      description: item.taxonomy ? item.taxonomy.scientificName : '',
    },
    company: {
      image: <FontAwesomeIcon icon='building' />,
      description: item.description,
      details: address
    }
  }[item.type]
  
  if (item.image) {
    image = <img src={item.image} alt="" width="48" height="32" />
  }  
  
  return (
    <article
      className={className}
      data-cy="search-result"
      key={item.id}
      onClick={() => onClick(item)}
      tabindex="0"
    >
      <div className="row">
        <div className="image-container">{image}</div>
        <section className="info">
          <div className="name-and-description">
            <div className="name">{item.name}</div>
            <div className="description">{description}</div>
          </div>
          <div className="details">{details}</div>
        </section>
        <div className="star"><FontAwesomeIcon icon="star" /></div>
      </div>
    </article>
  )
}