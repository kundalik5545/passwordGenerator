import React, { useCallback, useEffect, useRef, useState } from "react";
import "./passwordGen.css";

function PasswordGen() {
  const [length, setLength] = useState(8);
  const [numberAllow, setNumber] = useState(false);
  // const [charAllowed, setChar] = useState(false);
  const [symbollAllow, setSymboll] = useState(false);
  const [password, setPassword] = useState();

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllow) str += "0123456789";
    if (symbollAllow) str += "!@#$%^&*-_+=`~";
    for (let i = 1; i <= length; i++) {
      let randomNum = Math.random() * str.length + 1;
      pass += str.charAt(randomNum);
    }
    setPassword(pass);
  }, [length, numberAllow, symbollAllow, setPassword]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllow, symbollAllow]);

  // function copyBtnClick() {
  //   let btn = document.querySelector(".copy-Btn");
  //   window.navigator.clipboard.writeText(password)
  // }

  //Alternative method

  const passwordRef = useRef(null);

  const copyBtnClick = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  return (
    <div>
      <div className="heroSection">
        <h2>Password Generator</h2>
        <div className="inputSection">
          <input
            type="text"
            name="password"
            id="password"
            value={password}
            readOnly
            ref={passwordRef}
          />
          <button className="copy-Btn" onClick={copyBtnClick}>
            Copy
          </button>
        </div>
        <div className="control-Section">
          <div className="length">
            <label htmlFor="length">Length ({length})</label>
            <input
              type="range"
              name="length"
              id="range-length"
              min={6}
              max={14}
              value={length}
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
          </div>
          <div className="number">
            <label htmlFor="number">Number</label>
            <input
              type="checkbox"
              name="number"
              id="number-input"
              onChange={() => {
                setNumber((prev) => !prev);
              }}
            />
          </div>
          {/* <div className="char">
            <label htmlFor="char">Char</label>
            <input
              type="checkbox"
              name="char"
              id="char-input"
              onChange={() => {
                setChar((prev) => !prev);
              }}
            />
          </div> */}
          <div className="special-char">
            <label htmlFor="symboll">Symboll</label>
            <input
              type="checkbox"
              name="symboll"
              id="symboll-input"
              onChange={() => {
                setSymboll((prev) => !prev);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PasswordGen;
