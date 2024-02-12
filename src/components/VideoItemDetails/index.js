import {Component} from 'react'

import Loader from 'react-loader-spinner'
import ReactPlayer from 'react-player'
import Cookies from 'js-cookie'
import {BiLike, BiDislike} from 'react-icons/bi'
import {MdPlaylistAdd} from 'react-icons/md'
import Header from '../Header'
import SideBar from '../Sidebar'

import './index.css'

const apiStatusVideoConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class VideoItemDetails extends Component {
  state = {
    videoData: {},
    like: false,

    saved: false,
    apiStatus: apiStatusVideoConstants.initial,
  }

  componentDidMount() {
    this.getVideoItemData()
  }

  onResetVideoItemVideos = () => {
    this.getVideoItemData()
  }

  onLikeColorChange = () => {
    this.setState(prevState => ({like: !prevState.like}))
  }

  onDisLikeColorChange = () => {
    this.setState(prevState => ({like: !prevState.like}))
  }

  onSavedColorChange = () => {
    this.setState(prevState => ({saved: !prevState.saved}))
  }

  getVideoItemData = async () => {
    this.setState({
      apiStatus: apiStatusVideoConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params

    const apiUrl = `https://apis.ccbp.in/videos/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const updatedVideoData = {
        channel: {
          name: data.video_details.channel.name,
          profileImageUrl: data.video_details.channel.profile_image_url,
          subscriberCount: data.video_details.channel.subscriber_count,
        },
        description: data.video_details.description,
        id: data.video_details.id,
        publishedAt: data.video_details.published_at,
        thumbnailUrl: data.video_details.thumbnail_url,
        title: data.video_details.title,
        videoUrl: data.video_details.video_url,
        viewCount: data.video_details.view_count,
      }
      this.setState({
        videoData: updatedVideoData,
        apiStatus: apiStatusVideoConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusVideoConstants.failure,
      })
    }
  }

  renderVideoLoaderView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#000000" height="50" width="50" />
    </div>
  )

  renderVideoFailureView = () => (
    <div className="failureContainer">
      <img
        className="failImage"
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
        alt="failure view"
      />
      <h1 className="failHeading">Oops! Something Went Wrong</h1>
      <p className="failParagraph">
        We are having some trouble to complete your request. Please try again.
      </p>

      <button
        className="failButton"
        type="button"
        onClick={this.onResetVideoItemVideos}
      >
        Retry
      </button>
    </div>
  )

  renderVideoSuccessView = () => {
    const {videoData, like, saved} = this.state
    const {
      channel,
      description,
      id,
      publishedAt,
      thumbnailUrl,
      title,
      videoUrl,
      viewCount,
    } = videoData
    const {name, profileImageUrl, subscriberCount} = {...channel}
    return (
      <div className="videoPlayerContainer">
        <ReactPlayer url={videoUrl} controls width="80vw" height="600px" />
        <p className="playerTitle">{title}</p>
        <div className="playerIcons">
          <div className="playerCount_Date">
            <p className="playerCount">
              {viewCount} Views <span className="dotColor">. </span>
            </p>
            <p className="playerDate">{publishedAt}</p>
          </div>
          <div className="playerIconsContainer">
            <div className={like ? 'likeColorContainer' : 'likeContainer'}>
              <BiLike className="likeIcon" />
              <button
                type="button"
                className={like ? 'likeColorbutton' : 'likebutton'}
                onClick={this.onLikeColorChange}
              >
                Like
              </button>
            </div>
            <div className={like ? 'likeContainer' : 'likeColorContainer'}>
              <BiDislike className="likeIcon" />
              <button
                type="button"
                className={like ? 'likebutton' : 'likeColorbutton'}
                onClick={this.onDisLikeColorChange}
              >
                Dislike
              </button>
            </div>
            <div className={saved ? 'likeColorContainer' : 'likeContainer'}>
              <MdPlaylistAdd className="likeIcon" />
              <button
                type="button"
                className={saved ? 'likeColorbutton' : 'likebutton'}
                onClick={this.onSavedColorChange}
              >
                {saved ? 'Saved' : 'Save'}
              </button>
            </div>
          </div>
        </div>
        <hr className="playerLine" />
        <div className="playerVideoDetails">
          <img
            className="playerprofile"
            src={profileImageUrl}
            alt="channel logo"
          />
          <div className="playerChannelDetails">
            <p className="channelName">{name}</p>
            <p className="channelCount">{subscriberCount} Subcribers</p>
            <p className="channelDescription">{description}</p>
          </div>
        </div>
      </div>
    )
  }

  renderVideoSwitchCase = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusVideoConstants.success:
        return this.renderVideoSuccessView()
      case apiStatusVideoConstants.failure:
        return this.renderVideoFailureView()
      case apiStatusVideoConstants.inProgress:
        return this.renderVideoLoaderView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="videoPlayerBgContainer" data-testid="videoItemDetails">
          <SideBar />
          {this.renderVideoSwitchCase()}
        </div>
      </>
    )
  }
}

export default VideoItemDetails
