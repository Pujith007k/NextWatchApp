import {Link} from 'react-router-dom'
import './index.css'

const HomeVideosList = props => {
  const {listDetails} = props
  const {channel, id, publishedAt, thumbnailUrl, title, viewCount} = listDetails
  const {name, profileImageUrl} = {...channel}

  return (
    <Link to={`/videos/${id}`} className="item-link">
      <li className="HomeVideosList">
        <img
          className="ThumbnailImage"
          src={thumbnailUrl}
          alt="video thumbnail"
        />
        <div className="profileAndDetailsBg">
          <img
            className="profileImage"
            src={profileImageUrl}
            alt="channel logo"
          />
          <div className="detailsContainer">
            <p className="title">{title}</p>
            <p className="channelName">{name}</p>
            <div className="userViews">
              <p className="views">{viewCount} Views . </p>
              <p className="date"> {publishedAt} ago</p>
            </div>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default HomeVideosList
