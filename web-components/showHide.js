class ShowHide extends HTMLElement {
  constructor() {
    super();
    this._button;
    this._isHidden = true;
    this._messageContainer;
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
    <button>Show</button>
    `;
  }

  connectedCallback() {
    this._button = this.shadowRoot.querySelector("button");
    this.shadowRoot.appendChild(this._button);
    this._button.addEventListener("click", this._showMessage.bind(this));
  }

  _showMessage() {
    if (this._isHidden) {
      this._messageContainer = document.createElement("p");
      this._messageContainer.textContent = "More infos!";
      this.shadowRoot.appendChild(this._messageContainer);
      this._isHidden = false;
      this._button.textContent = "Hide";
    } else {
      this._messageContainer.remove();
      this._isHidden = true;
      this._button.textContent = "Show";
    }
  }
}

customElements.define("uc-showhide", ShowHide);
