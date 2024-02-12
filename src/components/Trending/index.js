import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {HiFire} from 'react-icons/hi'
import Header from '../Header'
import SideBar from '../Sidebar'
import TrendingVideosList from '../TrendingVideosList'

import './index.css'

const apiStatusTrendingConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Trending extends Component {
  state = {trendingVideos: [], apiStatus: apiStatusTrendingConstants.initial}

  componentDidMount() {
    this.getTrendingVideosList()
  }

  onResetTrendingVideos = () => {
    this.getTrendingVideosList()
  }

  getTrendingVideosList = async () => {
    this.setState({
      apiStatus: apiStatusTrendingConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')

    const trendingApiUrl = 'https://apis.ccbp.in/videos/trending'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(trendingApiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const updatedTrendingVideos = data.videos.map(eachItem => ({
        channelTrending: {
          nameTrending: eachItem.channel.name,
          profileImageUrlTrending: eachItem.channel.profile_image_url,
        },
        idTrending: eachItem.id,
        publishedAtTrending: eachItem.published_at,
        thumbnailUrlTrending: eachItem.thumbnail_url,
        titleTrending: eachItem.title,
        viewCountTrending: eachItem.view_count,
      }))
      this.setState({
        trendingVideos: updatedTrendingVideos,
        apiStatus: apiStatusTrendingConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusTrendingConstants.failure,
      })
    }
  }

  renderTrendingLoaderView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#000000" height="50" width="50" />
    </div>
  )

  renderTrendingFailureView = () => (
    <div className="failureContainer">
      <img
        className="failImage"
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
        alt="failure view"
      />
      <h1 className="failHeading">Oops! Something Went Wrong</h1>
      <p className="failParagraph">We are having some trouble </p>

      <button
        className="failButton"
        type="button"
        onClick={this.onResetTrendingVideos}
      >
        Retry
      </button>
    </div>
  )

  renderTrendingSuccessView = () => {
    const {trendingVideos} = this.state
    return (
      <ul className="unOrderedTrendingList">
        {trendingVideos.map(eachItem => (
          <TrendingVideosList trendingList={eachItem} key={eachItem.id} />
        ))}
      </ul>
    )
  }

  renderTrendingSwitchCase = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusTrendingConstants.success:
        return this.renderTrendingSuccessView()
      case apiStatusTrendingConstants.failure:
        return this.renderTrendingFailureView()
      case apiStatusTrendingConstants.inProgress:
        return this.renderTrendingLoaderView()
      default:
        return null
    }
  }

  render() {
    const {trendingVideos} = this.state
    console.log(trendingVideos)
    return (
      <>
        <Header />
        <div className="trendingBgContainer" data-testid="trending">
          <SideBar />
          <div className="trendingVideoContainer">
            <nav className="trendingNavbar">
              <HiFire className="trendingIcon" />
              <h1 className="trendingHeading">Trending</h1>
            </nav>
            {this.renderTrendingSwitchCase()}
          </div>
        </div>
      </>
    )
  }
}
export default Trending
