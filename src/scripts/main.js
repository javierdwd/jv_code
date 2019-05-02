import './CompactList';
import './GithubWidget';

if(!window.customElements) {
  document.body.classList.add("ce-fallback");
}

let scrollTimer = null;
let pageWrapper = document.querySelector('.l-page-wrapper');

window.addEventListener('scroll', _ => {
  clearTimeout(scrollTimer);

  scrollTimer = setTimeout(_ => {
    if(window.pageYOffset >= (window.innerHeight / 3)) {
      pageWrapper.classList.add('l-page-wrapper--darken-bg');
    } else {
      pageWrapper.classList.remove('l-page-wrapper--darken-bg');
    }
  }, 100);
});