import {Link} from 'react-router-dom'
import {IoMdHome} from 'react-icons/io'
import {HiFire} from 'react-icons/hi'
import {SiYoutubegaming} from 'react-icons/si'
import {CgPlayListAdd} from 'react-icons/cg'
import './index.css'

const SideBar = () => (
  <div className="homeSideBar">
    <div className="sideBarIcons">
      <div className="iconContainer">
        <IoMdHome className="icons" />
        <Link to="/" className="nav-link">
          <p className="paragraph">Home</p>
        </Link>
      </div>
      <div className="iconContainer">
        <HiFire className="icons" />
        <Link to="/trending" className="nav-link">
          <p className="paragraph">Trending</p>
        </Link>
      </div>
      <div className="iconContainer">
        <SiYoutubegaming className="icons" />
        <Link to="/gaming" className="nav-link">
          <p className="paragraph">Gaming</p>
        </Link>
      </div>
      <div className="iconContainer">
        <CgPlayListAdd className="icons" />
        <Link to="/saved-videos" className="nav-link">
          <p className="paragraph">Saved videos</p>
        </Link>
      </div>
    </div>
    <div className="socialMediaContainer">
      <p className="ContactUs">CONTACT US</p>
      <div className="socialMediaIconContainer">
        <img
          className="socialMediaIcon"
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
          alt="facebook logo"
        />
        <img
          className="socialMediaIcon"
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
          alt="twitter logo"
        />
        <img
          className="socialMediaIcon"
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png "
          alt="linked in logo"
        />
      </div>
      <p className="socialMediaParagraph">
        Enjoy! Now to see your channels and recommendations!
      </p>
    </div>
  </div>
)

export default SideBar
