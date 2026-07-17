import React, { useContext, useState } from "react";
import LayOut from "../../Components/LayOut/LayOut";
import classes from "../../Pages/Payment/Payment.module.css";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from "../../Components/Product/ProductCard";
import CurrencyFormat from "../../Components/CurrencyFormat/CurrencyFormat";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { axiosInstance } from "../../Api/axios";
import ClipLoader from "react-spinners/ClipLoader";
import { useNavigate } from "react-router-dom";

import { db } from "../../Utility/firebase";
import { collection, doc, setDoc } from "firebase/firestore";
import { Type } from "../../Utility/action.type";

function Payment() {
  const [{ user, basket }, dispatch] = useContext(DataContext);

  const totalItem = (basket || []).reduce((amount, item) => {
    return amount + item.amount;
  }, 0);

  const total = basket.reduce(
    (amount, item) => amount + item.price * item.amount,
    0,
  );

  const [cardError, setCardError] = useState("");
  const [processing, setProcessing] = useState(false);

  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCardError(e?.error?.message || "");
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    try {
      setProcessing(true);

      // 1. Get Client Secret

      const response = await axiosInstance({
        method: "POST",
        url: `/payment/create?total=${Math.round(total * 100)}`,
      });

      const clientSecret = response.data.clientSecret;

      // 2. Confirm Stripe Payment

      const { paymentIntent, error } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        },
      );

      if (error) {
        setCardError(error.message);
        setProcessing(false);
        return;
      }

      console.log(paymentIntent);

      // 3. Save Order To Firestore

      await setDoc(
        doc(
          collection(doc(collection(db, "users"), user.uid), "orders"),
          paymentIntent.id,
        ),

        {
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        },
      );

      // Empity in the Basket
      dispatch({ type: Type.EMPTY_BASKET });
      // console.log("Order Saved Successfully");

      setProcessing(false);
      navigate("/orders", { state: { msg: "You Have Placed New Order" } });
    } catch (error) {
      console.log(error);

      setCardError(error.message);

      setProcessing(false);
    }
  };

  return (
    <LayOut>
      <div className={classes.payment_header}>Checkout ({totalItem}) items</div>

      <section className={classes.payment}>
        <div className={classes.flex}>
          <h3>Delivery Address</h3>

          <div>
            <div>{user?.email}</div>
            <div>Ethiopia</div>
            <div>Hawassa</div>
          </div>
        </div>

        <hr />

        <div className={classes.flex}>
          <h3>Review Item and Delivery </h3>

          <div>
            {basket?.map((item) => (
              <ProductCard key={item.id} product={item} flex={true} />
            ))}
          </div>
        </div>

        <hr />

        <div className={classes.flex}>
          <h3>Payment Method</h3>

          <div className={classes.payment__card__container}>
            <div className={classes.payment__deatils}>
              <form onSubmit={handlePayment}>
                {cardError && (
                  <small style={{ color: "red" }}>{cardError}</small>
                )}

                <CardElement onChange={handleChange} />

                <div className={classes.payment__price}>
                  <div>
                    <span
                      style={{
                        display: "flex",
                        gap: "15px",
                      }}
                    >
                      <p>Total Order |</p>

                      <CurrencyFormat amount={total} />
                    </span>
                  </div>

                  <button type="submit" disabled={!stripe || processing}>
                    {processing ? (
                      <div className={classes.loading}>
                        <ClipLoader color="gray" size={12} />

                        <p>Please wait...</p>
                      </div>
                    ) : (
                      "Pay Now"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </LayOut>
  );
}

export default Payment;
