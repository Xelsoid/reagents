import React, { useState } from "react";
import "../style/login_page.css";
import { loginUser } from "../helpers/loginUser.ts";

export const LoginPage = () => {
  const [userName, setUserName] = useState("");
  const [userPass, setUserPass] = useState("");
  return (
    <div className="login_wraper">
      <p>Введите Имя</p>
      <input placeholder="Введите имя" id="user_name" onChange={(e) => setUserName(e.target.value)}>
      </input>
      <p>Введите Пароль</p>
      <input 
      placeholder="Введите пароль" 
      id="user_pass" 
      type="password" 
      onChange={(e) => setUserPass(e.target.value)}>
      </input>
      <button className="enter_btn" onClick={() => loginUser(userName, userPass)}>Ввод</button>
    </div>
  );
};
