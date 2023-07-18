import React, { useState } from "react";
import Cards from "react-credit-cards-2";
import 'react-credit-cards-2/dist/es/styles-compiled.css'
import styles from "./styles.css";

const CreditCard = ({ cardnumber, cardname, carddate, cardcvc, chosen }) => {
  const [number, SetNumber] = useState(cardnumber);
  const [name, SetName] = useState(cardname);
  const [date, SetDate] = useState(carddate);
  const [cvc, SetCvc] = useState(cardcvc);
  const [focus, SetFocus] = useState();

  return (
    <>
      {/* <div className="rccs__card backcolor"> */}

      {chosen == true ? (
        <div className="rccs__card backcolor">
          <Cards
            number={number}
            name={name}
            expiry={date}
            cvc={cvc}
            focused={focus}
          />
        </div>
      ) : (
        <div className="rccs__card backcolor">
          <Cards
            number={number}
            name={name}
            expiry={date}
            cvc={cvc}
            focused={focus}
          />
        </div>
      )}

      {/* <form>
        <div className="row">
          <div className="col-sm-11">
            <label for="name">Card Number</label>
            <input
              type="text"
              className="form-control"
              value={number}
              name="number"
              onChange={(e) => {
                SetNumber(e.target.value);
              }}
              onFocus={(e) => SetFocus(e.target.name)}
            ></input>
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-sm-11">
            <label for="name">Card Name</label>
            <input
              type="text"
              className="form-control"
              value={name}
              name="name"
              onChange={(e) => {
                SetName(e.target.value);
              }}
              onFocus={(e) => SetFocus(e.target.name)}
            ></input>
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-sm-6">
            <label for="name">Expiration Date</label>
            <input
              type="text"
              name="expiry"
              className="form-control"
              value={date}
              onChange={(e) => {
                SetDate(e.target.value);
              }}
              onFocus={(e) => SetFocus(e.target.name)}
            ></input>
          </div>
          <div className="col-sm-5">
            <label for="name">CVV</label>
            <input
              type="tel"
              name="cvc"
              className="card"
              value={cvc}
              onChange={(e) => {
                SetCvc(e.target.value);
              }}
              onFocus={(e) => SetFocus(e.target.name)}
            ></input>
          </div>
        </div>
      </form> */}
    </>
  );
};
export default CreditCard;
