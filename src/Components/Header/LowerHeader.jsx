import React, { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { MdClose } from "react-icons/md";
import classes from "../Header/Header.module.css";

// Modal Component
const Modal = ({ title, content, icon, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className={classes.modal__overlay} onClick={onClose}>
      <div
        className={classes.modal__content}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={classes.modal__header}>
          <div className={classes.modal__title}>
            <span className={classes.modal__icon}>{icon}</span>
            <h2>{title}</h2>
          </div>
          <button
            className={classes.modal__close}
            onClick={onClose}
            aria-label="Close modal"
          >
            <MdClose size={24} />
          </button>
        </div>

        <div className={classes.modal__body}>{content}</div>

        <div className={classes.modal__footer}>
          <button className={classes.modal__button} onClick={onClose}>
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

function LowerHeader() {
  const [activeMenu, setActiveMenu] = useState("All");
  const [modalState, setModalState] = useState({
    isOpen: false,
    title: "",
    content: "",
    icon: "",
  });
  const navigate = useNavigate();

  const showModal = (title, content, icon) => {
    setModalState({ isOpen: true, title, content, icon });
  };

  const closeModal = () => {
    setModalState({ isOpen: false, title: "", content: "", icon: "" });
  };

  const menuItems = [
    {
      id: 1,
      name: "All",
      icon: true,
      action: () => {
        showModal("All Products", "🛍️ Showing All Products", "🛍️");
        setTimeout(() => navigate("/"), 500);
      },
    },
    {
      id: 2,
      name: "Today's Deals",
      action: () => {
        showModal(
          "Today's Deals",
          "🎉 Save up to 50% on selected items!",
          "🎉",
        );
        setTimeout(() => navigate("/"), 500);
      },
    },
    {
      id: 3,
      name: "Customer Service",
      action: () => {
        const content = (
          <div className={classes.modal__info}>
            <p>
              <strong>Email:</strong> yohannesalemayehu1012@gmail.com
            </p>
            <p>
              <strong>Phone:</strong>  0953035274
            </p>
            <p>
              <strong>Live Chat:</strong> Available 24/7
            </p>
          </div>
        );
        showModal("Customer Service", content, "📞");
      },
    },
    {
      id: 4,
      name: "Registry",
      action: () => {
        const content = (
          <div className={classes.modal__list}>
            <p>✨ Create & Manage Your Registries</p>
            <ul>
              <li>💍 Wedding Registry</li>
              <li>👶 Baby Registry</li>
              <li>🏠 Housewarming Registry</li>
            </ul>
          </div>
        );
        showModal("Registry", content, "💝");
      },
    },
    {
      id: 5,
      name: "Gift Cards",
      action: () => {
        const content = (
          <div className={classes.modal__list}>
            <p>🎁 Amazon Gift Cards</p>
            <ul>
              <li>📱 Digital Gift Cards</li>
              <li>💳 Physical Gift Cards</li>
              <li>🏢 Corporate Gifts Available</li>
            </ul>
          </div>
        );
        showModal("Gift Cards", content, "🎁");
      },
    },
    {
      id: 6,
      name: "Sell",
      action: () => {
        const content = (
          <div className={classes.modal__list}>
            <p>💼 Start Selling on Amazon</p>
            <ul>
              <li>✓ Join Amazon Seller Central</li>
              <li>✓ Set up your store</li>
              <li>✓ Reach millions of customers</li>
            </ul>
          </div>
        );
        showModal("Sell", content, "💼");
      },
    },
  ];

  const handleMenuClick = (item) => {
    setActiveMenu(item.name);
    console.log(`Clicked on: ${item.name}`);

    // Execute the action associated with the menu item
    if (item.action) {
      item.action();
    }
  };

  return (
    <>
      <Modal
        title={modalState.title}
        content={modalState.content}
        icon={modalState.icon}
        isOpen={modalState.isOpen}
        onClose={closeModal}
      />
      <div className={classes["lower-header"]}>
        <ul className={classes["lower-header__menu"]}>
          {menuItems.map((item) => (
            <li
              key={item.id}
              onClick={() => handleMenuClick(item)}
              className={activeMenu === item.name ? classes.active : ""}
              title={`Click to access ${item.name}`}
            >
              {item.icon && <AiOutlineMenu />}
              <span>{item.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default LowerHeader;
