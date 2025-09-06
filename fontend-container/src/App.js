import React, { useState } from "react";
import "./App.css";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  const [isLogin, setIsLogin] = useState(true);
  const handleSuccess = () => {
    // Xử lý sau khi login/signup thành công nếu cần
  };

  return (
    <div className="App">
      <div className="auth-container">
        <h2>{isLogin ? "Login" : "Sign Up"}</h2>
        {isLogin ? (
          <Login onSuccess={handleSuccess} />
        ) : (
          <Signup onSuccess={handleSuccess} />
        )}
        <p className="toggle-text">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <span className="toggle-link" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Sign Up" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
}

export default App;
