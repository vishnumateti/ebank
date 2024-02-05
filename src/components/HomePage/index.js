import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

const HomePage = props => {
  const {history} = props

  const logoutPage = () => {
    Cookies.remove('jwt_token')
    history.replace('/ebank/login')
  }

  const token = Cookies.get('jwt_token')
  if (token === undefined) {
    return <Redirect to="/ebank/login" />
  }

  return (
    <div>
      <nav>
        <img
          src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png"
          alt="website logo"
        />
        <button type="button" onClick={logoutPage}>
          Logout
        </button>
      </nav>
      <div>
        <h1>Your Flexibility, Our Excellence</h1>
        <img
          src="https://assets.ccbp.in/frontend/react-js/ebank-digital-card-img.png"
          alt="digital card"
        />
      </div>
    </div>
  )
}

export default HomePage
