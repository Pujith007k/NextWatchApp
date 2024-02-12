import {Link} from 'react-router-dom'
import './index.css'

const TrendingVideosList = props => {
  const {trendingList} = props
  const {
    channelTrending,
    idTrending,
    publishedAtTrending,
    thumbnailUrlTrending,
    titleTrending,
    viewCountTrending,
  } = trendingList
  const {nameTrending, profileImageUrlTrending} = {...channelTrending}
  return (
    <Link to={`/videos/${idTrending}`} className="Trending-item-link">
      <li className="trendingList">
        <img
          className="trendingImage"
          src={thumbnailUrlTrending}
          alt="video thumbnail"
        />
        <div className="trendingDetails">
          <p className="trendingHeading">{titleTrending}</p>
          <p className="trendingParagraph">{nameTrending}</p>
          <div className="trendingCount_date">
            <p className="trendingCount">{viewCountTrending} views .</p>
            <p className="trendingDate">{publishedAtTrending} </p>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default TrendingVideosList
