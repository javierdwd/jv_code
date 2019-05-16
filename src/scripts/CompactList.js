// <useful-link>
class UsefulLink extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({mode: 'open'});
  }

  static get observedAttributes() {
    return ['href'];
  }

  attributeChangedCallback(attrName, oldValue, newValue) {
    if (newValue !== oldValue) {
      this[attrName] = this.getAttribute(attrName);
    }

    this.render();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
        }
        a {
          all: unset;
          display: block;
        }
      </style>
      <a target="_blank" rel="noopener noreferrer"><slot></slot></a>
    `;

    const anchor = this.shadowRoot.querySelector('a');
    const href = this.getAttribute('href');

    if(href) {
      anchor.setAttribute('href', href);
    }
  }
}

if(window.customElements) {
  customElements.define('useful-link', UsefulLink);
}

// <compact-list>
class CompactList extends HTMLElement {
  constructor() {
    super();

    this.button;
    this.elems;
    this.offset;
    this.size;

    this.attachShadow({mode: 'open'});

    this.showElements = this.showElements.bind(this);
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
      <style>
        ::slotted(*) {
          display: none;
        }
        ::slotted(button) {
          display: block;
        }
        :host button {
          width: 130px;
          display: block;
        }
      </style>
      <div id="compact-list">
        <slot></slot>
      </div>

      <slot name="more"></slot>
    `;

    this.elems = this.shadowRoot.getElementById('compact-list')
                     .children[0]
                     .assignedElements();

    this.offset = 0;
    this.size = parseInt(this.getAttribute('size')) || 4;
    this.button = this.querySelector('button');

    if(!this.button) {
      this.button = document.createElement('button');
      this.button.innerText = 'More';
      this.shadowRoot.children[2].appendChild(this.button);
    }
    this.button.addEventListener('click', this.showElements)

    this.showElements();
  }

  showElements() {
    let initOffset = this.offset || 0;
    let limit = initOffset + this.size;

    if(limit > this.elems.length) {
      limit = this.elems.length;
    }
    this.elems.forEach((el, index) => {
      if(index < initOffset) {
        el.style.display = 'none';
      } else {
        if(index < limit) {
          el.style.display = 'block';
        } else {
          if(index === limit) {
            this.offset = limit;
          }
        }
      }
    });

    if(limit === this.elems.length) {
      this.button.setAttribute('disabled', '');
    }
  }
}

if(window.customElements) {
  customElements.define('compact-list', CompactList);
}