import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {SiYoutubegaming} from 'react-icons/si'
import Header from '../Header'
import SideBar from '../Sidebar'
import GamingVideosList from '../GamingVideosList'

import './index.css'

const apiStatusGamingConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Gaming extends Component {
  state = {gamingVideos: [], apiStatus: apiStatusGamingConstants.initial}

  componentDidMount() {
    this.getGamingVideosList()
  }

  onResetGamingVideos = () => {
    this.getGamingVideosList()
  }

  getGamingVideosList = async () => {
    this.setState({
      apiStatus: apiStatusGamingConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')

    const gamingApiUrl = 'https://apis.ccbp.in/videos/gaming'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(gamingApiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const updatedGamingVideos = data.videos.map(eachItem => ({
        id: eachItem.id,
        thumbnailUrl: eachItem.thumbnail_url,
        title: eachItem.title,
        viewCount: eachItem.view_count,
      }))
      this.setState({
        gamingVideos: updatedGamingVideos,
        apiStatus: apiStatusGamingConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusGamingConstants.failure,
      })
    }
  }

  renderGamingLoaderView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#000000" height="50" width="50" />
    </div>
  )

  renderGamingFailureView = () => (
    <div className="failureContainer">
      <img
        className="failImage"
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
        alt="failure view"
      />
      <h1 className="failHeading">Oops! Something Went Wrong</h1>
      <p className="failParagraph">We are having some trouble</p>

      <button
        className="failButton"
        type="button"
        onClick={this.onResetGamingVideos}
      >
        Retry
      </button>
    </div>
  )

  renderGamingSuccessView = () => {
    const {gamingVideos} = this.state
    return (
      <ul className="unorderedGamingList">
        {gamingVideos.map(eachItem => (
          <GamingVideosList gamingList={eachItem} key={eachItem.id} />
        ))}
      </ul>
    )
  }

  renderGamingSwitchCase = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusGamingConstants.success:
        return this.renderGamingSuccessView()
      case apiStatusGamingConstants.failure:
        return this.renderGamingFailureView()
      case apiStatusGamingConstants.inProgress:
        return this.renderGamingLoaderView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="gamingBgContainer" data-testid="gaming">
          <SideBar />
          <div className="gamingVideoContainer">
            <nav className="gamingNavbar">
              <SiYoutubegaming className="gamingNavIcon" />
              <h1 className="gamingNavHeading">Gaming</h1>
            </nav>
            {this.renderGamingSwitchCase()}
          </div>
        </div>
      </>
    )
  }
}
export default Gaming
