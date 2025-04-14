import React, { useState } from "react";
import navStyle from "../styles/sideNav.module.css";
import logo from "../assets/images/logo.png";
import hamburger from "../assets/icons/hamburger.svg";
import { tabArray } from "../utilities/tabArray";
import { useLocation, useNavigate } from "react-router-dom";
import { FaWindowClose } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../store/userDetail";
import { toast } from "react-toastify";

const SideNav = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const route = useLocation();
  const currentRoute = route?.pathname?.split("/");
  const [toggleState, setToggleState] = useState({
    tab: "",
    state: false,
  });

  const logoutUser = () => {
    Cookies.remove("pragmatyc_token");
    dispatch(setUserData({}));
    navigate("/");
    toast.success("Logged out successfully");
  }
  return (
    <div className={navStyle?.sideNavWrapper}>
      <div className={navStyle?.headerWrapper}>
        <div className={navStyle?.logoWrapper}>
          <img src={logo} alt="logo" loading="lazy" />
        </div>
        <button className="unset ml-auto">
          <img src={hamburger} alt="logo" className="hamburger" loading="lazy" />
          <FaWindowClose className="close_nav" />
        </button>
      </div>
      <div className={navStyle?.listWrapper}>
        {tabArray?.map((ele, index) => (
          <>
            <div
              className={
                currentRoute[2] === ele?.activeClass
                  ? navStyle?.listItem
                  : navStyle?.inActiveListItem
              }
              key={index}
            >
              <div
                className={navStyle?.item}
                onClick={() => {
                  ele?.isDropdownExist
                    ? setToggleState({
                      ...toggleState,
                      tab: ele?.tab,
                      state: !toggleState?.state,
                    })
                    : setToggleState({
                      ...toggleState,
                      tab: ele?.tab,
                      state: false,
                    });
                  navigate(ele?.route);
                }}
              >
                <div className={navStyle?.iconWrapper}>
                  <img src={ele?.icon} alt="icon" loading="lazy" />
                </div>
                <h4 className={navStyle?.listItemText}>{ele?.tab}</h4>
              </div>
            </div>
          </>
        ))}
      </div>
      <div className={navStyle?.logoutButtonWrapper} onClick={() => logoutUser()}>
        <IoIosLogOut />
        <h5>Logout</h5>
      </div>
    </div>
  );
};

export default SideNav;
