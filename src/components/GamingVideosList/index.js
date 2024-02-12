import {Link} from 'react-router-dom'
import './index.css'

const GamingVideosList = props => {
  const {gamingList} = props
  const {id, thumbnailUrl, title, viewCount} = gamingList
  return (
    <Link to={`/videos/${id}`} className="gaming-item-link">
      <li className="gamingList">
        <img className="gamingImage" src={thumbnailUrl} alt="video thumbnail" />
        <p className="gamingHeading">{title}</p>
        <p className="gamingParagraph">{viewCount} Watching Worldwide</p>
      </li>
    </Link>
  )
}
export default GamingVideosList
