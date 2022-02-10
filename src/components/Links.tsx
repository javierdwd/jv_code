declare global {
  namespace JSX {
    interface IntrinsicElements {
      "compact-list": CompactListAttributes;
      "useful-link": UsefulLinktAttributes;
    }

    interface CompactListAttributes extends HTMLAttributes {
      size: number;
    }
    interface UsefulLinktAttributes extends HTMLAttributes {
      href: string;
    }
  }
}

export default function Link() {
  return (
    <section class="l-section l-section--center l-section--column l-links">
      <h1 class="l-section__title l-links__title">Things that catch my attention nowadays</h1>

      <compact-list class="c-good-links" size={6}>
        {/* <useful-link class="c-good-links__link"
          href="#">

        </useful-link> */}

        <useful-link class="c-good-links__link"
          href="https://ponyfoo.com/articles/json-web-tokens-vs-session-cookies">
          JSON Web Tokens vs. Session Cookies: In Practice
        </useful-link>
        <useful-link class="c-good-links__link"
          href="https://medium.com/simply/state-management-with-react-hooks-and-context-api-at-10-lines-of-code-baf6be8302c">
          State Management with React Hooks and Context API in 10 lines of code!
        </useful-link>
        <useful-link class="c-good-links__link"
          href="https://dzone.com/articles/simplifying-objectassign-method-in-javascript">
          Simplifying the Object.assign Method in JavaScript
        </useful-link>
        <useful-link class="c-good-links__link"
          href="https://www.freecodecamp.org/news/how-to-be-a-successful-software-engineer-6f82a5b1a82e/">
          How to be a successful software engineer
        </useful-link>
        <useful-link class="c-good-links__link"
          href="https://www.freecodecamp.org/news/using-structured-data-helps-your-websites-seo/">
          Why Using Structured Data Helps Your Website’s SEO
        </useful-link>
        <useful-link class="c-good-links__link"
          href="https://www.vojtechruzicka.com/javascript-hoisting-var-let-const-variables">
          Javascript hoisting, var, let and const variables
        </useful-link>
        <useful-link class="c-good-links__link"
          href="https://egghead.io/courses/simplify-react-apps-with-react-hooks">
          Simplify React Apps with React Hooks
        </useful-link>
        <useful-link class="c-good-links__link c-good-links__link--filled"
          href="https://medium.com/@JonWongCodes/lets-get-hooked-on-hooks-cff22399acdd">
          Let’s get hooked on Hooks!
        </useful-link>
        <useful-link class="c-good-links__link"
          href="https://addyosmani.com/blog/lazy-loading/">
          Native image lazy-loading for the web!
        </useful-link>
        <useful-link class="c-good-links__link"
          href="https://blog.bitsrc.io/understanding-javascript-async-and-await-with-examples-a010b03926ea">
          Deeply Understanding JavaScript Async and Await with Examples
        </useful-link>
        <useful-link class="c-good-links__link c-good-links__link--filled"
          href="https://javascript.info/map-set-weakmap-weakset">
          Map, Set, WeakMap and WeakSet
        </useful-link>
        <useful-link class="c-good-links__link"
          href="https://dev.to/maxrimue/discuss-how-should-you-handle-errors-in-your-library-code-3dhe">
          Discuss: How should you handle errors in your library code?
        </useful-link>
        <useful-link class="c-good-links__link"
          href="https://medium.freecodecamp.org/an-introduction-to-tdd-with-vue-js-66544710b50c">
          An introduction to test-driven development with Vue.js
        </useful-link>
        <useful-link class="c-good-links__link c-good-links__link--filled"
          href="https://snipcart.com/blog/vue-render-functions">
          Introduction to Vue Render Functions
        </useful-link>
        <useful-link class="c-good-links__link"
          href="https://andy-bell.design/wrote/competing-by-mimicking/">
          Competing by mimicking
        </useful-link>
        <useful-link class="c-good-links__link"
          href="https://blog.apollographql.com/explaining-graphql-connections-c48b7c3d6976">
          Explaining GraphQL Connections
        </useful-link>
        <useful-link class="c-good-links__link c-good-links__link--filled"
          href="https://www.robinwieruch.de/react-with-graphql-tutorial/">
          A complete React with GraphQL Tutorial
        </useful-link>
        <useful-link class="c-good-links__link"
          href="https://css-tricks.com/an-introduction-to-web-components/">
          An Introduction to Web Components
        </useful-link>
        <useful-link
          class="c-good-links__link"
          href="https://www.smashingmagazine.com/2016/06/battling-bem-extended-edition-common-problems-and-how-to-avoid-them/">
          Battling BEM CSS: 10 Common Problems And How To Avoid Them
        </useful-link>
        <useful-link class="c-good-links__link" href="https://overreacted.io/es/how-does-react-tell-a-class-from-a-function/">
          ¿Cómo React distingue una clase de una función?
        </useful-link>
        <useful-link class="c-good-links__link"
          href="https://www.youtube.com/watch?v=wfMtDGfHWpA">
          Fun Fun Function: Composition over Inheritance
        </useful-link>
        <useful-link class="c-good-links__link" href="https://nodesource.com/blog/deploying-nodejs-microservices-to-ZEIT">
          Deploying Node.js microservices to ZEIT ▲ Now
        </useful-link>

        <button slot="more" class="c-good-links__button c-btn c-btn--animated">show me more</button>
      </compact-list>
    </section>
  );
}