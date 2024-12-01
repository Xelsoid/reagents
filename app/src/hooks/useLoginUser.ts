// import { useNavigate } from "react-router-dom";
import { useCallback } from "react";

export const useUserLogin = () => {
  // const navigate = useNavigate();

  return useCallback((name: string, passwordUser: string) => {
    fetch("/api/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        password: passwordUser,
      }),
    }).then((response) =>
      response
        .json()
        .then((resp) => {
          localStorage.setItem("name", resp.name);
          localStorage.setItem("role", resp.role);
          // navigate("main");
        })
        .catch(() => alert("Invalid login or password")),
    );
  }, []);
};
