import React, { useEffect } from "react";
import {
  DropDown,
  Login,
  Logo,
  Nav,
  NavMenu,
  SignOut,
  UserImg,
} from "./HeaderStyle";
import { auth, provider } from "../../firebaseSetup/firebase";
import { signInWithPopup } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import {
  setUserLoginDetails,
  selectUserPhoto,
  selectUserName,
  setSignOutState,
} from "../../features/user/userSlice";
import { useNavigate } from "react-router-dom";

function Header() {
  const dispatch = useDispatch();
  const userName = useSelector(selectUserName);
  const userPhoto = useSelector(selectUserPhoto);
  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
        navigate("/home");
      } else {
        navigate("/");
      }
    });
  }, [userName]);

  // /////////
  // Sign Out and Sign In Functionality
  // ////////

  const headerAuth = () => {
    if (!userName) {
      signInWithPopup(auth, provider)
        .then((result) => {
          setUser(result.user);
        })
        .catch((error) => {
          console.log(error.message);
        });
    } else if (userName) {
      auth
        .signOut()
        .then(() => dispatch(setSignOutState()), navigate("/"))
        .catch((error) => {
          alert(error.message);
        });
    }
  };

  const setUser = (user) => {
    dispatch(
      setUserLoginDetails({
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
      })
    );
  };
  return (
    <Nav>
      <Logo>
        <img src="/images/logo.svg" alt="Disney +" />
      </Logo>

      {!userName ? (
        <Login onClick={headerAuth}>Login</Login>
      ) : (
        <>
          <NavMenu>
            <a href="/home">
              <img src="/images/home-icon.svg" alt="HOME" />
              <span>HOME</span>
            </a>
            <a href="/search">
              <img src="/images/search-icon.svg" alt="SEARCH" />
              <span>SEARCH</span>
            </a>
            <a href="/watchlist">
              <img src="/images/watchlist-icon.svg" alt="WATCHLIST" />
              <span>WATCHLIST</span>
            </a>
            <a href="/originals">
              <img src="/images/original-icon.svg" alt="ORIGINALS" />
              <span>ORIGINALS</span>
            </a>
            <a href="/series">
              <img src="/images/series-icon.svg" alt="SERIES" />
              <span>SERIES</span>
            </a>
          </NavMenu>
          <SignOut>
            <UserImg src={userPhoto} alt={userName} />
            <DropDown>
              <span onClick={headerAuth}>Sign Out</span>
            </DropDown>
          </SignOut>
        </>
      )}
      {/* <Login onClick={headerAuth}>Login</Login> */}
    </Nav>
  );
}

export default Header;
