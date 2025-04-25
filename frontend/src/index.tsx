import { direction } from 'localization'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { store } from './redux/store'
import App from './App'
import './assets/css/fontiran.css'
import reportWebVitals from './reportWebVitals'

document.getElementsByTagName('body')[0].setAttribute('dir', direction)

render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root'),
)

reportWebVitals()