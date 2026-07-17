import React, { useContext, useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import classes from "./Orders.module.css";
import { db } from "../../Utility/firebase";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from "../../Components/Product/ProductCard";
// eslint-disable-next-line no-unused-vars
import CurrencyFormat from "../../Components/CurrencyFormat/CurrencyFormat";
import LayOut from "../../Components/LayOut/LayOut";

function Orders() {
  const [{ user }] = useContext(DataContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      const ordersRef = query(
        collection(db, "users", user.uid, "orders"),
        orderBy("created", "desc"),
      );

      onSnapshot(ordersRef, (snapshot) => {
        console.log(snapshot);

        setOrders(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          })),
        );
      });
    } else {
      setOrders([]);
    }
  }, [user]);

  return (
    <LayOut>
      <section className={classes.container}>
        <div className={classes.orders_container}>
          <h2>Your Order</h2>
          {orders?.length === 0 && (
            <div style={{ padding: "20px" }}>You don't have order yet</div>
          )}
          {/* Ordered Items */}
          <div>
            {orders?.map((eachOrder, i) => {
              return (
                <div key={i}>
                  <hr />
                  <p>Order ID:{eachOrder?.id}</p>
                  {
                    // eslint-disable-next-line array-callback-return
                    eachOrder?.data?.basket?.map((order) => (
                      <ProductCard
                        flex={true}
                        product={order}
                        key={order.id}
                        showAction={false}
                      />
                    ))
                  }
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </LayOut>
  );
}

export default Orders;
