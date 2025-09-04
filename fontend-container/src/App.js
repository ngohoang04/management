import { useState } from "react";
import "./App.css";
import axios from "axios";
import "./App.css";

function App() {
  const [isLogin, setIsLogin] = useState(true);

  // Form fields
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validate fields before submit
  const validate = () => {
    let newErrors = {};

    // Email
    if (!formData.email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email format is invalid.";
    }

    // Password
    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    // Signup-only fields
    if (!isLogin) {
      if (!formData.name) {
        newErrors.name = "User Name is required for signup.";
      }
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = "Please confirm your password.";
      } else if (formData.confirmPassword !== formData.password) {
        newErrors.confirmPassword = "Passwords do not match.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      if (isLogin) {
        // 👉 CALL API LOGIN
        const res = await axios.post("http://localhost:5000/api/login", {
          email: formData.email,
          password: formData.password,
        });
        alert("✅ Login success: " + res.data.message);

        // Lưu token vào localStorage nếu có
        if (res.data.token) {
          localStorage.setItem("token", res.data.token);
        }
      } else {
        // 👉 CALL API SIGNUP
        const res = await axios.post("http://localhost:5000/api/signup", {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        });
        alert("✅ Signup success: " + res.data.message);
      }

      // Reset form sau khi thành công
      setFormData({ name: "", email: "", password: "", confirmPassword: "" });
      setErrors({});
    } catch (err) {
      alert("❌ Error: " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <div className="auth-container">
        <h2>{isLogin ? "Login" : "Sign Up"}</h2>

        <form onSubmit={handleSubmit} className="auth-form">
          {/* User Name field only for Signup */}
          {!isLogin && (
            <div className="form-group">
              <label>User Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your user name"
              />
              {errors.name && <small className="error">{errors.name}</small>}
            </div>
          )}

          {/* Email */}
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
            {errors.email && <small className="error">{errors.email}</small>}
          </div>

          {/* Password */}
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
            />
            {errors.password && (
              <small className="error">{errors.password}</small>
            )}
          </div>

          {/* Confirm Password (Signup only) */}
          {!isLogin && (
            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter your password"
              />
              {errors.confirmPassword && (
                <small className="error">{errors.confirmPassword}</small>
              )}
            </div>
          )}

          {/* Submit button */}
          <button type="submit" className="btn" disabled={loading}>
            {loading ? "Processing..." : isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        {/* Toggle link */}
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
