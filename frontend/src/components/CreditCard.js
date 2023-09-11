import React, { useState } from "react";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import styles from "./styles.css";

const CreditCard = ({ cardnumber, cardname, carddate, cardcvc, chosen }) => {
  const [number, SetNumber] = useState(cardnumber);
  const [name, SetName] = useState(cardname);
  const [date, SetDate] = useState(carddate);
  const [cvc, SetCvc] = useState(cardcvc);
  const [focus, SetFocus] = useState();

  return (
    <>
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
    </>
  );
};
export default CreditCard;
