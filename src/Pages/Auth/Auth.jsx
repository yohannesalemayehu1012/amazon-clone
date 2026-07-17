/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import classes from "./Auth.module.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { auth } from "../../Utility/firebase";
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import { Type } from "../../Utility/action.type";
import { ClipLoader } from "react-spinners";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [resetMessage, setResetMessage] = useState("");
  const [resetError, setResetError] = useState("");
  const [{ user }, dispatch] = useContext(DataContext);

  const [loading, setLoading] = useState({
    signIn: false,
    signUp: false,
    resetPassword: false,
  });

  const navigate = useNavigate();
  const navStateData = useLocation();
  console.log(navStateData);

  const [showPassword, setShowPassword] = useState(false);

  // console.log(user);

  const authHandler = async (e) => {
    e.preventDefault();
    setResetMessage("");
    setResetError("");

    if (e.target.name === "signin") {
      setLoading({ ...loading, signIn: true });
      signInWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          dispatch({
            type: Type.SET_USER,
            user: userInfo.user,
          });

          setLoading({ ...loading, signIn: false });
          navigate(navStateData?.state?.redirect || "/");
        })
        .catch((error) => {
          setError(error.message);
          setLoading({ ...loading, signIn: false });
        });
    } else {
      setLoading({ ...loading, signUp: true });
      createUserWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          dispatch({
            type: Type.SET_USER,
            user: userInfo.user,
          });
          setLoading({ ...loading, signUp: false });
          navigate("/");
        })
        .catch((error) => {
          setError(error.message);
          setLoading({ ...loading, signUp: false });
        });
    }
  };

  const handlePasswordReset = async () => {
    if (!email.trim()) {
      setResetError(
        "Please enter your email address before requesting a reset link.",
      );
      setResetMessage("");
      return;
    }

    setLoading({ ...loading, resetPassword: true });
    setResetError("");
    setResetMessage("");

    try {
      await sendPasswordResetEmail(auth, email);
      setResetMessage(
        `A password reset link has been sent to ${email}. Please check your inbox.`,
      );
    } catch (error) {
      setResetError(
        error.message || "Unable to send the recovery email right now.",
      );
    } finally {
      setLoading({ ...loading, resetPassword: false });
    }
  };

  // console.log(password,email)
  return (
    <section className={classes.login}>
      {/* Logo */}
      <Link to="/">
        <img
          src="https://i.pinimg.com/736x/75/70/30/757030bb2dee57dddd5446b78a783daf.jpg"
          alt="Amazon Logo"
        />
      </Link>

      <div className={classes.login_container}>
        <h1>Sign In</h1>
        {navStateData?.state?.msg && (
          <small
            style={{
              padding: "5px",
              textAlign: "center",
              color: "red",
              fontWeight: "bold",
            }}
          >
            {navStateData.state.msg}
          </small>
        )}
        <form>
          <div>
            <label htmlFor="email">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              placeholder="Enter your email"
            />
          </div>

          <div className={classes.password_container}>
            <label htmlFor="password">Password</label>

            <div>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Enter your password"
              />

              <span onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <div className={classes.password_actions}>
              <button
                type="button"
                onClick={handlePasswordReset}
                className={classes.forgot_password_button}
              >
                {loading.resetPassword ? (
                  <ClipLoader color="#ff9900" size={12} />
                ) : (
                  "Forgot password?"
                )}
              </button>
            </div>

            {(resetError || resetMessage) && (
              <div
                className={`${classes.reset_status} ${
                  resetError ? classes.reset_status_error : ""
                }`}
              >
                {resetError || resetMessage}
              </div>
            )}
          </div>
          <button
            type="submit"
            onClick={authHandler}
            name="signin"
            className={classes.login_signInButton}
          >
            {loading.signIn ? <ClipLoader color="#000" size={15} /> : "Sign In"}
          </button>
        </form>

        <p>
          By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use &
          Sale. Please see our Privacy Notice, Cookies Notice and Interest-Based
          Ads Notice.
        </p>

        <button
          type="submit"
          onClick={authHandler}
          name="signup"
          className={classes.login_registerButton}
        >
          {loading.signUp ? (
            <ClipLoader color="#000" size={15} />
          ) : (
            "Create Your Amazon Account"
          )}
        </button>
        {error && (
          <small
            style={{
              paddingTop: "10px",
              color: "red",
              justifyContent: "center",
            }}
          >
            {error}
          </small>
        )}
      </div>
    </section>
  );
}

export default Auth;
