import React from "react";
import ReactDOM from "react-dom";
import debounce from "lodash.debounce";

class Modal extends React.Component {
  constructor(props) {
    super(props);

    this.modal = document.createElement("div");
    this.modal.id = "modal-container";
    this.modal.className = "react-tel-input";
    this.handleDropdownPosition = debounce(
      this.handleDropdownPosition.bind(this),
      200
    );
  }

  handleDropdownPosition = () => {
    const bodyTag = document.getElementsByTagName("body")[0];
    const { top: bodyTop } = bodyTag.getBoundingClientRect();
    const { numberInputRef } = this.props;
    const {
      top: inputTop,
      left: inputLeft,
      height: inputHeight,
      width: inputWidth,
    } = numberInputRef.getBoundingClientRect();
    const { height: countryListHeight } = this.modal
      .querySelector(".country-list")
      .getBoundingClientRect();

    this.modal.style = `
      position: absolute;
      left: ${inputLeft}px;
      top: ${inputTop - bodyTop}px; 
      width: ${inputWidth}px; 
      height: ${countryListHeight}px;
    `;

    const topSpace = inputTop;
    const bottomSpace = window.innerHeight - inputTop - inputHeight;
    const marginTop = topSpace - countryListHeight;
    const marginBottom = bottomSpace - countryListHeight;

    if (marginBottom > 0 || marginBottom > marginTop) {
      this.modal.style.transform = `translateY(${inputHeight}px)`;
    } else {
      this.modal.style.transform = "translateY(-100%)";
    }
  };

  componentDidMount() {
    document.body.appendChild(this.modal);
    this.handleDropdownPosition();
    document.addEventListener("scroll", this.handleDropdownPosition);
    document.addEventListener("resize", this.handleDropdownPosition);
  }

  componentWillUnmount() {
    document.body.removeChild(this.modal);
    document.removeEventListener("scroll", this.handleDropdownPosition);
    document.addEventListener("resize", this.handleDropdownPosition);
  }

  render() {
    console.log("React Phone Input Development is running........");
    return ReactDOM.createPortal(this.props.children, this.modal);
  }
}

export default Modal;