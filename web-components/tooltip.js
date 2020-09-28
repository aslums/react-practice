class Tooltip extends HTMLElement {
  constructor() {
    super();
    this._tooltipContainer;
    this._tooltipText = "some text";
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
    <style>


      div {
        background-color:black;
        color:white;
        position:absolute;
        z-index:10;
      }

      .highlight{
        background-color: red;
      }
 
      ::slotted(.highlight) {
        border-bottom: 2px dotted green;
      } 

      :host-context(p){
        margin-bottom:2px;
      }

      :host(.important) {
        color: red;
      }

      :host{
        background:var(--color-primary, #ccc) ;
      }

      .icon {
        background: black;
        color: white;
        padding: 0.15rem 0.5rem;
        text-align:center;
        border-radius: 50%;
      }

    </style>
    <slot>Some default</slot>
    <span class="icon"> (?) </span>`;
  }

  connectedCallback() {
    if (this.hasAttribute("text")) {
      this._tooltipText = this.getAttribute("text");
    }
    const tooltipIcon = this.shadowRoot.querySelector("span");
    tooltipIcon.addEventListener("mouseenter", this._showTooltip.bind(this));
    tooltipIcon.addEventListener("mouseleave", this._hidetoolTip.bind(this));
    this.shadowRoot.appendChild(tooltipIcon);
    this.style.position = "relative";
  }

  disconnectedCallback() {
    console.log("disconnected");
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log(name, oldValue, newValue);
  }

  static get observedAttributes() {
    return ["text"];
  }
  _showTooltip() {
    this._tooltipContainer = document.createElement("div");
    this._tooltipContainer.textContent = this._tooltipText;
    this.shadowRoot.appendChild(this._tooltipContainer);
  }
  _hidetoolTip() {
    this.shadowRoot.removeChild(this._tooltipContainer);
  }
}

customElements.define("uc-tooltip", Tooltip);
