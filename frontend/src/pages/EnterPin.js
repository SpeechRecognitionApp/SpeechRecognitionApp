import React, { useState, useRef } from "react";
import PinInput from "react-pin-input";
import moment from "moment";
import swal from "sweetalert";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import "./index.css";ç

function EnterPin() {
  const [input, setInput] = useState("");
  const [layoutName, setLayoutName] = useState("default");
  const pin = useRef(null);
  const keyboard = useRef(null);

  const onChange = (newInput) => {
    setInput(newInput);
  };

  const onKeyPress = (button) => {
    if (button === "{clear}") {
      handleClear();
      return;
    }

    // ... (其他按键的处理逻辑)
  };

  const handleClear = () => {
    setInput("");
    pin.current.clear();
    keyboard.current.clearInput();
  };

  const handleShift = () => {
    setLayoutName(layoutName === "default" ? "shift" : "default");
  };

  const onSubmitHandler = (e) => {
    if (input === "1234") {
      window.localStorage.setItem("pin", input);
      window.location.href = "https://qnm081.csb.app/home";
    } else {
      swal("Invalid PIN!", "Pin you enter didn't match. Try again", "error");
      window.location.reload();
      handleClear();
    }
  };

  const inputStyle = {
    width: "100%",
    height: "100px",
    padding: "10px",
    fontSize: 20,
    border: 0,
    background: "#000",
    margin: "30px 0px 0px",
    color: "#fff",
    textAlign: "Center",
  };

  return (
    <div className="Pin home-container">
      <div className="text white-text">
        <h2 id="todaysDate"> </h2>
      </div>
      <PinInput
        length={4}
        focus
        ref={pin}
        type="numeric"
        inputMode="number"
        pattern="\d*"
        onChange={onChange}
        onComplete={onSubmitHandler}
      />
      <input
        value={input}
        style={inputStyle}
        placeholder={""}
        onChange={(e) => setInput(e.target.value)}
      />
      <Keyboard
        keyboardRef={keyboard}
        layoutName={layoutName}
        theme={
          "hg-theme-default hg-theme-numeric hg-layout-numeric numeric-theme"
        }
        layout={{
          default: ["1 2 3", "4 5 6", "7 8 9", "{clear} 0 {bksp}"],
        }}
        mergeDisplay
        display={{
          "{clear}": "Clear",
          "{bksp}": "&#8592",
        }}
        maxLength={4}
        onChange={onChange}
        onKeyPress={onKeyPress}
        onComplete={onSubmitHandler}
      />
    </div>
  );
}

export default EnterPin;
