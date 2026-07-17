/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import CurrencyFormat from "../CurrencyFormat/CurrencyFormat";
import classes from "./Product.module.css";
import { DataContext } from "../DataProvider/DataProvider";
import { Type } from "../../Utility/action.type";

function ProductCard({
  product,
  flex,
  renderDesc = false,
  showRemoveButton = false,
  showAction = true,
}) {
  const [state, dispatch] = useContext(DataContext);

  if (!product) {
    return null;
  }

  const { image, title, id, rating, price, description } = product;

  const addToCart = () => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item: {
        image,
        title,
        id,
        rating,
        price,
        description,
      },
    });
  };

  const removeFromCart = () => {
    dispatch({
      type: Type.REMOVE_FROM_BASKET,
      id,
    });
  };

  return (
    <div
      className={`${classes.card__container} ${
        flex ? classes.product_flexed : ""
      }`}
    >
      <Link to={`/product/${id}`}>
        <img src={image} alt={title} />
      </Link>

      <div>
        <h3>{title}</h3>

        <div className={classes.rating}>
          <Rating value={rating?.rate || 0} precision={0.1} readOnly />

          <small>{rating?.count}</small>
        </div>

        <div>
          <CurrencyFormat amount={price} />
        </div>

        {renderDesc && description ? <p>{description}</p> : null}

        {showAction && (
          <button
            className={classes.button}
            onClick={showRemoveButton ? removeFromCart : addToCart}
          >
            {showRemoveButton ? "Remove from Cart" : "Add to Cart"}
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
