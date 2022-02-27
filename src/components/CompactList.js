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

// <compact-list>
export default class CompactList extends HTMLElement {
  constructor() {
    super();

    this.list;
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
        <slot name="list-item"></slot>
      </div>

      <slot name="next"></slot>
    `;

    this.list = this.shadowRoot.querySelector('slot[name="list-item"]');
    this.offset = 0;
    this.size = parseInt(this.getAttribute('size')) || 4;
    this.button = this.querySelector('button');

    if(!this.button) {
      this.button = document.createElement('button');
      this.button.innerText = 'Next';
      this.shadowRoot.children[2].appendChild(this.button);
    }
    this.button.addEventListener('click', this.showElements)

    if(
      !this.list.assignedElements().length ||
      !this.list.assignedElements().length === this.size
    ) {
      this.button.setAttribute('disabled', '');
    }

    this.list.addEventListener('slotchange', () => {
      this.elems = this.list.assignedElements();

      this.showElements();
    });
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
        el.setAttribute('data-active', '0');
      } else {
        if(index < limit) {
          el.style.display = 'block';
          el.setAttribute('data-active', '1');
        } else {
          if(index === limit) {
            this.offset = limit;
          }
        }
      }
    });

    if(limit === this.elems.length) {
      this.button.setAttribute('disabled', '');
    } else {
      this.button.removeAttribute('disabled');
    }
  }
}

if(window.customElements) {
  customElements.define('useful-link', UsefulLink);
  customElements.define('compact-list', CompactList);
}