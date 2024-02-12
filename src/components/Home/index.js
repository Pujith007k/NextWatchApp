import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import {IoClose} from 'react-icons/io5'
import {GoSearch} from 'react-icons/go'
import Header from '../Header'
import SideBar from '../Sidebar'
import HomeVideosList from '../HomeVideosList'
import './index.css'

const apiStatusHomeConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    list: [],
    searchInput: '',
    banner: false,
    apiStatus: apiStatusHomeConstants.initial,
    novideos: false,
  }

  componentDidMount() {
    this.getHomeVideoList()
  }

  onSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  getOnSearch = () => {
    this.getHomeVideoList()
  }

  onResetHomeVideos = () => {
    this.getHomeVideoList()
  }

  onCloseBanner = () => {
    this.setState({banner: true})
  }

  getHomeVideoList = async () => {
    this.setState({
      apiStatus: apiStatusHomeConstants.inProgress,
    })
    const {searchInput} = this.state
    const jwtToken = Cookies.get('jwt_token')

    const homeApiUrl = `https://apis.ccbp.in/videos/all?search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(homeApiUrl, options)
    console.log(response)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      if (data.total === 0) {
        this.setState({novideos: true})
      }
      const updatedList = data.videos.map(eachItem => ({
        channel: {
          name: eachItem.channel.name,
          profileImageUrl: eachItem.channel.profile_image_url,
        },
        id: eachItem.id,
        publishedAt: eachItem.published_at,
        thumbnailUrl: eachItem.thumbnail_url,
        title: eachItem.title,
        viewCount: eachItem.view_count,
      }))
      this.setState({
        list: updatedList,
        apiStatus: apiStatusHomeConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusHomeConstants.failure,
      })
    }
  }

  renderLoaderView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#000000" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
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
        onClick={this.onResetHomeVideos}
      >
        Retry
      </button>
    </div>
  )

  renderSuccessView = () => {
    const {list, novideos} = this.state
    return (
      <>
        {novideos ? (
          <div className="noVideosContainer">
            <img
              className="noVideosImage"
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
              alt="no videos"
            />
            <h1 className="noVideosHeading">No Search results found</h1>
            <p className="noVideosParagraph">
              Try different key words or remove search filter
            </p>
            <button
              className="failButton"
              type="button"
              onClick={this.onResetHomeVideos}
            >
              Retry
            </button>
          </div>
        ) : (
          <ul className="unOrderedHomeList">
            {list.map(eachItem => (
              <HomeVideosList listDetails={eachItem} key={eachItem.id} />
            ))}
          </ul>
        )}
      </>
    )
  }

  renderHomeSwitchCase = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusHomeConstants.success:
        return this.renderSuccessView()
      case apiStatusHomeConstants.failure:
        return this.renderFailureView()
      case apiStatusHomeConstants.inProgress:
        return this.renderLoaderView()
      default:
        return null
    }
  }

  render() {
    const {searchInput, banner} = this.state

    return (
      <>
        <Header />
        <div className="homeBgContainer" data-testid="home">
          <SideBar />
          <div className="mainContainer">
            {banner ? (
              ''
            ) : (
              <div className="bannerbgImage" data-testid="banner">
                <div className="bannerLogoCloseicon">
                  <img
                    className="bannerLogo"
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                    alt="nxt watch logo"
                  />
                  <IoClose
                    className="closeIcon"
                    data-testid="close"
                    onClick={this.onCloseBanner}
                  />
                </div>
                <p className="bannerParagraph">
                  Buy Nxt Watch Premium prepaid plans with UPI
                </p>
                <button type="button" className="bannerButton">
                  GET IT NOW
                </button>
              </div>
            )}
            <div className="homeVideosContainer">
              <div className="searchContainer">
                <input
                  type="search"
                  placeholder="Search"
                  className="searchInput"
                  value={searchInput}
                  onChange={this.onSearchInput}
                />
                <div className="searchIconContainer">
                  <button
                    type="button"
                    aria-label="search"
                    className="searchIconButton"
                    data-testid="searchButton"
                    onClick={this.getOnSearch}
                  >
                    <GoSearch className="searchIcon" />
                  </button>
                </div>
              </div>
              {this.renderHomeSwitchCase()}
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Home
