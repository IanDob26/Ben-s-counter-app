import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";

export class counterApp extends DDDSuper(LitElement) {
  static get tag() {
    return "counter-app";
  }

  constructor() {
    super();
    this.title = "Counter App";
    this.counter = 5;
    this.min = 0;
    this.max = 10;
  }

  static get properties() {
    return {
      title: { type: String },
      counter: { type: Number },
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
        .wrapper {
          margin: var(--ddd-spacing-2);
          padding: var(--ddd-spacing-4);
        }
        div {
          text-align: center;
          padding: 0;
          margin: 0;
        }
        .counter {
          font-size: 4rem;
        }
        button {
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
      `,
    ];
  }

  render() {
    return html` <div class="wrapper">
      <div>${this.title}</div>
      <div class="counter">${this.counter}</div>
      <div>
        <button>-</button>
        <button>+</button>
      </div>
    </div>`;
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
