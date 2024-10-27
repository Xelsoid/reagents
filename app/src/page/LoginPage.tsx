import React, { useState } from "react";
import "../style/login_page.css";
import { useUserLogin } from "../hooks/useLoginUser";

export const LoginPage = () => {
  const [userName, setUserName] = useState("");
  const [userPass, setUserPass] = useState("");
  const loginUser = useUserLogin();

  const handleUserLogin = () => {
    if (!userName || !userPass) {
      alert("Введите логин и пароль");
      return;
    }
    loginUser(userName, userPass);
  };

  return (
    <div className="login_wraper">
      <p>Введите Имя</p>
      <input
        placeholder="Введите имя"
        id="user_name"
        onChange={(e) => setUserName(e.target.value)}
      />
      <p>Введите Пароль</p>
      <input
        placeholder="Введите пароль"
        id="user_pass"
        type="password"
        onChange={(e) => setUserPass(e.target.value)}
      />
      <button className="enter_btn" type="button" onClick={handleUserLogin}>
        Ввод
      </button>
    </div>
  );
};
