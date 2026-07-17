import React from "react";
import classes from "./Footer.module.css";

function Footer() {
  return (
    <footer className={classes.footer}>
      <div className={classes.footer__container}>
        <div className={classes.footer__section}>
          <h4>Get to Know Us</h4>
          <ul>
            <li>
              <a href="#about">About Amazon</a>
            </li>
            <li>
              <a href="#careers">Careers</a>
            </li>
            <li>
              <a href="#press">Press Releases</a>
            </li>
            <li>
              <a href="#blog">Amazon Blog</a>
            </li>
          </ul>
        </div>

        <div className={classes.footer__section}>
          <h4>Connect with Us</h4>
          <ul>
            <li>
              <a href="#facebook">Facebook</a>
            </li>
            <li>
              <a href="#twitter">Twitter</a>
            </li>
            <li>
              <a href="#instagram">Instagram</a>
            </li>
          </ul>
        </div>

        <div className={classes.footer__section}>
          <h4>Make Money with Us</h4>
          <ul>
            <li>
              <a href="#sell">Sell on Amazon</a>
            </li>
            <li>
              <a href="#associates">Amazon Associates</a>
            </li>
            <li>
              <a href="#advertise">Advertise Your Products</a>
            </li>
          </ul>
        </div>

        <div className={classes.footer__section}>
          <h4>Help & Settings</h4>
          <ul>
            <li>
              <a href="#account">Your Account</a>
            </li>
            <li>
              <a href="#help">Customer Service</a>
            </li>
            <li>
              <a href="#returns">Returns Centre</a>
            </li>
          </ul>
        </div>
      </div>

      <div className={classes.footer__divider}></div>

      <div className={classes.footer__bottom}>
        <div className={classes.footer__links}>
          <a href="#conditions">Conditions of Use</a>
          <span className={classes.footer__separator}>|</span>
          <a href="#privacy">Privacy Notice</a>
          <span className={classes.footer__separator}>|</span>
          <a href="#cookies">Cookies</a>
          <span className={classes.footer__separator}>|</span>
          <a href="#ads">Ads Preferences</a>
        </div>
      </div>

      <div className={classes.footer__copyright}>
        <p>
          &copy; 1996-{new Date().getFullYear()} Amazon.com, Inc. or its
          affiliates
        </p>
      </div>
    </footer>
  );
}

export default Footer;
