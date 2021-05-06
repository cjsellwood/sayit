import * as actionTypes from "../actions/actionTypes";

// Authorize user
export const authorize = () => {
  return {
    type: actionTypes.AUTHORIZE,
  };
};

// Deauthorize user
export const deauthorize = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expires");
  return {
    type: actionTypes.DEAUTHORIZE,
  };
};

// Handle register user submission to backend
export const userRegister = (registerForm, history) => {
  return (dispatch) => {
    fetch("http://localhost:3000/register", {
      method: "POST",
      body: JSON.stringify(registerForm),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("userRegister", data);

        // If error on backend throw to catch block
        if (data.error) {
          throw new Error(data.error);
        }

        // Set jwt token in local storage
        localStorage.setItem("token", data.token);
        const expires = Date.now() + Number(data.expiresIn);
        localStorage.setItem("expires", expires);

        // Login user with redux state auth
        dispatch(authorize());

        // Redirect to home page on success
        history.push("/");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
};

// Handle login submission to backend
export const userLogin = (loginForm, history) => {
  return (dispatch) => {
    fetch("http://localhost:3000/login", {
      method: "POST",
      body: JSON.stringify(loginForm),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("userRegister", data);

        // If error on backend throw to catch block
        if (data.error) {
          throw new Error(data.error);
        }

        // Set jwt token in local storage
        localStorage.setItem("token", data.token);
        const expires = Date.now() + Number(data.expiresIn);
        localStorage.setItem("expires", expires);

        // Login user with redux state auth
        dispatch(authorize());

        // Redirect to home page on success
        history.push("/");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
};
