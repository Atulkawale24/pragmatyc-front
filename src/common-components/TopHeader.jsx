import React from "react";
import topHeaderStyle from "../styles/topHeader.module.css";
import { IoSearch } from "react-icons/io5";
import hamburger from "../assets/icons/hamburger.svg";
import { FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toggleMobileMenu } from "../store/showMobileMenu";

const TopHeader = ({ currentTab, isDisable, searchString, setSearchString }) => {
  const dispatch = useDispatch();
  const mobileMenuState = useSelector((state) => state?.showMobileMenu?.state);

  return (
    <div className={topHeaderStyle?.topHeaderWrapper}>
      <div>
        <h4 className={topHeaderStyle?.tabName}>{currentTab}</h4>
      </div>
      <div className={topHeaderStyle?.topHeaderRight}>
        {!isDisable && (
          <div className={topHeaderStyle?.searchWrapper}>
            <input type="text" placeholder="Search" value={searchString} onChange={(event) => setSearchString(event?.target.value)} />
            <IoSearch />
          </div>
        )}
        <div className={topHeaderStyle?.profileWrapper}>
          <FaUserCircle size={28} />
        </div>
        <img src={hamburger} alt="logo" className="mobile_menu" loading="lazy" onClick={() => dispatch(toggleMobileMenu(mobileMenuState ? false : true))} />
      </div>
    </div>
  );
};

export default TopHeader;
