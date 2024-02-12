import './index.css'

const NotFound = () => (
  <div className="notFoundContainer">
    <img
      className="notfoundImage"
      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png"
      alt="not found"
    />
    <h1 className="notfoundHeading">Page Not Found</h1>
    <p className="notfoundParagraph">
      We are sorry, the page you requested could not be found.
    </p>
  </div>
)

export default NotFound
