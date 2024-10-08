import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { ref } from "lit/directives/ref.js";

export class counterApp extends DDDSuper(LitElement) {
  static get tag() {
    return "counter-app";
  }

  constructor() {
    super();
    this.title = "Counter App";
    this.counter = 0;
    this.min = 0;
    this.max = 30;
  }

  static get properties() {
    return {
      title: { type: String },
      counter: { type: Number, reflect: true },
      min: { type: Number },
      max: { type: Number },
    };
  }

  static get styles() {
    return [
      super.styles,
      css`
        :host {
          display: block;
          color: var(--ddd-theme-primary);
          background-color: var(--ddd-theme-accent);
          font-family: var(--ddd-font-navigation);
          font-size: var(--counter-app-font-size, var(--ddd-font-size-s));
        }
        :host([counter="18"]) .counter {
          color: var(--ddd-theme-default-roarGolden);
        }
        :host([counter="21"]) .counter {
          color: var(--ddd-theme-default-discoveryCoral);
        }

        .wrapper {
          margin: var(--ddd-spacing-2);
          padding: var(--ddd-spacing-4);
          text-align: center;
        }
        .counter {
          font-size: 4rem;
        }
        .counter.max-value,
        .counter.min-value {
          color: var(--ddd-theme-default-wonderPurple);
        }

        .but {
          font-size: 2rem;
          width: 4rem;
          height: 4rem;
          margin: 0.5rem;
          background-color: gray;
          color: var(--ddd-theme-accent);
          border: none;
          border-radius: 0.5rem;
          cursor: pointer;
        }

        .but:hover {
          background-color: var(--ddd-theme-default-limestoneGray);
        }
      `,
    ];
  }

  updated(changedProperties) {
    if (changedProperties.has("counter") && this.counter === 21) {
      this.makeItRain();
    }

    if (this.counter === this.max) {
      counterElement.classList.add("max-value");
    } else if (this.counter === this.min) {
      counterElement.classList.add("min-value");
    } else {
      counterElement.classList.remove("max-value");
      counterElement.classList.remove("min-value");
    }
  }

  makeItRain() {
    // this is called a dynamic import. It means it won't import the code for confetti until this method is called
    // the .then() syntax after is because dynamic imports return a Promise object. Meaning the then() code
    // will only run AFTER the code is imported and available to us
    // import("@haxtheweb/multiple-choice/lib/confetti-container.js").then(
      (module) => {
        // This is a minor timing 'hack'. We know the code library above will import prior to this running
        // The "set timeout 0" means "wait 1 microtask and run it on the next cycle.
        // this "hack" ensures the element has had time to process in the DOM so that when we set popped
        // it's listening for changes so it can react
        setTimeout(() => {
          // forcibly set the poppped attribute on something with id confetti
          // while I've said in general NOT to do this, the confetti container element will reset this
          // after the animation runs so it's a simple way to generate the effect over and over again
          this.shadowRoot.querySelector("#confetti").setAttribute("popped", "");
        }, 0);
      }
    
  }

  increment() {
    if (this.counter < this.max) {
      this.counter++;
    }
  }

  decrement() {
    if (this.counter > this.min) {
      this.counter--;
    }
  }

  render() {
    return html` <confetti-container id="confetti"
      ><div class="wrapper">
        <div>${this.title}</div>
        <div class="counter">${this.counter}</div>
        <div>
          <button
            ?disabled="${this.min === this.counter}"
            class="but"
            @click=${this.decrement}
          >
            -
          </button>
          <button
            ?disabled="${this.max === this.counter}"
            class="but"
            @click=${this.increment}
          >
            +
          </button>
        </div>
      </div>
    </confetti-container>`;
  }

  /**
   * haxProperties integration via file reference
   */
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}

globalThis.customElements.define(counterApp.tag, counterApp);