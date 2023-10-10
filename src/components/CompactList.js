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
          display: block;
        }
        ::slotted(*[hidden]) {
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

      <slot name="newer"></slot>
      <slot name="older"></slot>
    `;

    this.list = this.shadowRoot.querySelector('slot[name="list-item"]');
    this.offset = 0;
    this.size = parseInt(this.getAttribute('size')) || 4;
    this.sizeZeroIndex = this.size - 1;

    this.buttonNewer = this.querySelector('button[slot="newer"]');
    this.buttonOlder = this.querySelector('button[slot="older"]');

    this.buttonNewer?.addEventListener('click', this.loadNewerElements.bind(this))
    this.buttonOlder?.addEventListener('click', this.loadOlderElements.bind(this))


    this.list.addEventListener('slotchange', () => {
      this.elems = this.list.assignedElements();

      this.showElements(this.offset, this.sizeZeroIndex);
      this.updateButtonStatus();
    });
  }

  loadNewerElements() {
    this.showElements(
      Math.max(this.offset - this.sizeZeroIndex,  0), // fromIndex
      this.offset // toIndex
    )
  }

  loadOlderElements() {
    this.showElements(
      this.offset + this.sizeZeroIndex, // fromIndex
      Math.min(this.offset + this.sizeZeroIndex * 2, (this.elems.length - 1)) // toIndex
    );
  }

  updateButtonStatus() {
    if((this.offset + this.size) < this.elems.length) {
      this.buttonOlder?.removeAttribute('disabled', '')
    } else {
      this.buttonOlder?.setAttribute('disabled', '')
    }

    if(this.offset > 0) {
      this.buttonNewer?.removeAttribute('disabled', '')
    } else {
      this.buttonNewer?.setAttribute('disabled', '')
    }
  }

  showElements(fromIndex, toIndex) { // Zero-indexes
    console.log({
      fromIndex,
      toIndex,
      elemsLength: this.elems.length
    });

    this.elems.forEach((el, index) => {
      if(index >= fromIndex && index <= toIndex ) {
        el.removeAttribute('hidden', '');
      } else {
        el.setAttribute('hidden', '');
      }
    });

    this.offset = fromIndex

    this.updateButtonStatus()
  }
}

if(window.customElements) {
  customElements.define('useful-link', UsefulLink);
  customElements.define('compact-list', CompactList);
}