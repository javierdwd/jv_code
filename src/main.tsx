import { render } from 'preact'
import { App } from './app'
import './components/CompactList.js'
import './styles/main.css'

if(!window.customElements) {
  document.body.classList.add("ce-fallback");
}

render(<App />, document.getElementById('app')!)
