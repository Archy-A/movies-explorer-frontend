import React, { useState, useEffect, useContext, useRef } from "react";
import { useHistory, useLocation } from "react-router-dom";

import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Profile({
  onUpdateUser, setLoggedIn, profileError, editProfileMessage, setMessageReg, messageReg
}) {

  const history = useHistory();
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setMessageReg(editProfileMessage)
  }, [editProfileMessage]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name: nameUser,
      email: description,
    });
  }

  const [nameUser, setNameUser] = useState("");
  const [description, setDescription] = useState("");

  const location = useLocation();
  useEffect(() => {
    setMessageReg("");
  }, [location]);


  useEffect(() => {
    setNameUser(currentUser.name);
    setDescription(currentUser.email);
  }, [currentUser]);

  function handleChangeName(e) {
    setNameUser(e.target.value);
    setMessageReg("");
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
    setMessageReg("");
  }

  function handleLogOut() {
    setLoggedIn(false);
    localStorage.clear();
    history.push("/");
  }


  const inputNameProfile = useRef();
  const inputEmailProfile = useRef();

  let buttonDisable1 = true;

   function setbuttonDisable1() {
    if (currentUser.name ===  nameUser && currentUser.email === description) {
      return buttonDisable1 = true;
    } else {
      return buttonDisable1 = false;
    }
  }

  return (
    <>
      <section className="profile">
        <div className="profile__wrapper">

       <div className="profile_title">
           <h1 className="profile__welcome">Привет, {currentUser.name}!</h1>
        </div>

        <form
              onSubmit={handleSubmit}
              className="profile_form"
              method="post"
              name="login"
            >

             <div className="profile__box">
               <div className="profile__container">
                 <p className="profile__title">Имя</p>
                  <input
                    ref={inputNameProfile}
                    id="profile__name"
                    type="text"
                    value={nameUser || ""}
                    onChange={handleChangeName}
                    name="nameReg"
                    placeholder=""
                    className="profile__name"
                    minLength="2"
                    maxLength="40"
                    required
                  ></input>
                </div>

              <div className="profile__line" />

              <div className="profile__container">
                <p className="profile__title">E-mail</p>
                <input
                  ref={inputEmailProfile}
                  id="profile__email"
                  type="text"
                  value={description || ""}
                  onChange={handleChangeDescription}
                  name="emailReg"
                  placeholder=""
                  className="profile__email"
                  minLength="2"
                  maxLength="40"
                  required
                ></input>
              </div>
            </div>
        
            <p className="profile__error">{profileError}</p>

              <div className="profile__framer">

                <div className={`profile__message ${messageReg.length < 0 ? "profile__message-hidden" : ""} } `}>
                   {messageReg}
                </div>

                <button
                  className="profile__redirect"
                  onClick={handleSubmit}
                  method="post"
                  disabled={setbuttonDisable1()}
                >
                  Редактировать
                </button>

                <button
                  className="profile__out"
                  onClick={handleLogOut}
                  method="post"
                >
                  Выйти из аккаунта
                </button>

              </div>
            </form>

       </div>
      </section>
    </>
  );
}

export default Profile;