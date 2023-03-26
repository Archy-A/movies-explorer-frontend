import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";

import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Profile({
  onUpdateUser, setLoggedIn
}) {

  const history = useHistory();
  const currentUser = useContext(CurrentUserContext);

  function handleSubmit(e) {
    // console.log('>>>>>>>>>>>>>>>>>>>>>>>>> handleSubmit = ', nameUser, description)
    e.preventDefault();
    onUpdateUser({
      name: nameUser,
      email: description,
    });
  }

  const [nameUser, setNameUser] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    setNameUser(currentUser.name);
    setDescription(currentUser.email);
  }, [currentUser]);

  function handleChangeName(e) {
    setNameUser(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleLogOut() {
    setLoggedIn(false);
    localStorage.removeItem("token");
    history.push("/");
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
        

              <div className="profile__framer">

                <button
                  className="profile__redirect"
                  onClick={handleSubmit}
                  method="post"
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

                {/* <NavLink to="/" className="profile__out">
                  Выйти из аккаунта
                </NavLink> */}
              </div>
            </form>

       </div>
      </section>
    </>
  );
}

export default Profile;