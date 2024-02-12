import {Component} from 'react'
import Header from '../Header'
import SideBar from '../Sidebar'

import './index.css'

class SavedVideos extends Component {
  state = {savedvideos: false}

  renderNoSavedVideos = () => (
    <div className="noSavedContainer">
      <img
        className="noSavedImage"
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
        alt="no saved videos"
      />
      <h1 className="noSavedHeading">No saved videos found</h1>
      <p className="noSavedParagraph">Save your videos by clicking a button</p>
    </div>
  )

  render() {
    const {savedvideos} = this.state
    return (
      <>
        <Header />
        <div className="savedBgContainer " data-testid="savedVideos">
          <SideBar />
          {savedvideos ? this.renderNoSavedVideos() : ''}
        </div>
      </>
    )
  }
}
export default SavedVideos
