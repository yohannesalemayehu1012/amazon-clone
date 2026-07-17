import logo from "../../Image/amazon-logo.png";
import flag from "../../Image/flag.jpg";
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import classes from "./Header.module.css";
import LowerHeader from "./LowerHeader";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { DataContext } from "../DataProvider/DataProvider";
import { auth } from "../../Utility/firebase";
import { Type } from "../../Utility/action.type";

function Header() {
  const [{ user, basket }, dispatch] = useContext(DataContext);
  const [language, setLanguage] = useState("EN");
  const [searchCategory, setSearchCategory] = useState("All");

  // Calculate total quantity of items in the basket
  const totalItem = basket.reduce((amount, item) => {
    return amount + item.amount;
  }, 0);

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      dispatch({
        type: Type.SET_USER,
        user: null,
      });
    } catch (err) {
      console.error("Sign out failed", err);
    }
  };

  return (
    <>
      <section className={classes.fixed}>
        <section>
          <div className={classes.header}>
            {/* ================= Logo ================= */}
            <div className={classes.header__logo}>
              <Link to="/">
                <img src={logo} alt="Amazon Logo" />
              </Link>
            </div>

            {/* ================= Delivery ================= */}
            <div className={classes.header__delivery}>
              <span>
                <IoLocationOutline />
              </span>

              <div>
                <p>Delivered to</p>
                <span>Ethiopia</span>
              </div>
            </div>

            {/* ================= Search ================= */}
            <div className={classes.header__search}>
              <select
                value={searchCategory}
                onChange={(e) => setSearchCategory(e.target.value)}
              >
                <option>All</option>
                <option>Electronics</option>
                <option>Books</option>
                <option>Clothing</option>
                <option>Home & Garden</option>
              </select>

              <input type="text" placeholder="Search Amazon" />

              <span className={classes["header__search-icon"]}>
                <FaSearch />
              </span>
            </div>

            {/* ================= Right Navigation ================= */}
            <div className={classes.header__nav}>
              {/* Language */}
              <div className={classes.header__language}>
                <img src={flag} alt="Flag" />

                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                >
                  <option value="EN">EN</option>
                  <option value="ES">ES</option>
                  <option value="FR">FR</option>
                  <option value="DE">DE</option>
                  <option value="IT">IT</option>
                </select>
              </div>

              {/* Account */}
              {user ? (
                <div className={classes.header__account}>
                  <p>Hello, {user.email?.split("@")[0]}</p>
                  <button
                    type="button"
                    className={classes.header__signOut}
                    onClick={handleSignOut}
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <Link to="/auth" className={classes.header__account}>
                  <div>
                    <p>Hello, Sign In</p>
                    <span>Account &amp; Lists</span>
                  </div>
                </Link>
              )}

              {/* Orders */}
              <Link to="/orders">
                <div>
                  <p>Returns</p>
                  <span>&amp; Orders</span>
                </div>
              </Link>

              {/* Cart */}
              <Link to="/cart" className={classes.header__cart}>
                <FaShoppingCart />

                <span>{totalItem}</span>
              </Link>
            </div>
          </div>
        </section>

        {/* ================= Lower Header ================= */}
        <LowerHeader />
      </section>
    </>
  );
}

export default Header;
