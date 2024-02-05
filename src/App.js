import {Switch, Route} from 'react-router-dom'
import Login from './components/Login'
import HomePage from './components/HomePage'
import NotFound from './components/NotFound'
import './App.css'

// Replace your code here
const App = () => (
  <Switch>
    <Route exact path="/ebank/login" component={Login} />
    <Route exact path="/" component={HomePage} />
    <Route component={NotFound} />
  </Switch>
)

export default App
