import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

const AdminLogin = () => {
  const [form, setForm] = useState({ id: "", password: "" });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (form.id === "admin" && form.password === "1234") {
      localStorage.setItem("adminAuth", "true");
      navigate("/admin/dashboard");
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <>
      <style>{`
  .login-container {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background-color: #f1f5f9;
  }

  .login-card {
    width: 100%;
    max-width: 400px;
    padding: 30px;
    background: #ffffff;
    border-radius: 16px;
    box-shadow: 0 10px 25px rgba(0,0,0,0.1);
  }

  .login-title {
    text-align: center;
    margin-bottom: 20px;
    font-size: 24px;
    font-weight: bold;
  }

  .login-input {
    width: 100%;
    padding: 12px;
    margin-bottom: 15px;
    border: 1px solid #ccc;
    border-radius: 10px;
    font-size: 14px;
    outline: none;
    box-sizing: border-box; /* Ensures padding doesn't affect width */
  }

  .login-input:focus {
    border-color: rgb(163, 21, 58);
  }

  .password-wrapper {
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column; /* Keeps margin-bottom of input working correctly */
  }

  .password-wrapper .login-input {
    padding-right: 45px; /* Space for the icon */
  }

  .eye-icon {
    position: absolute;
    right: 12px;
    /* (Input height 43px / 2) = ~21px from top, but 50% minus half icon size is cleaner */
    top: 22px; 
    transform: translateY(-50%);
    cursor: pointer;
    color: #555;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: color 0.2s;
  }

  .eye-icon:hover {
    color: rgb(163, 21, 58);
  }

  .error-text {
    color: red;
    margin-bottom: 10px;
    font-size: 14px;
  }

  .login-button {
    width: 100%;
    padding: 12px;
    background-color: rgb(163, 21, 58);
    color: white;
    border: none;
    border-radius: 10px;
    font-size: 16px;
    cursor: pointer;
  }

  .login-button:hover {
    background-color: rgb(133, 19, 50);
  }
`}</style>

      <div className="login-container">
        <form onSubmit={handleLogin} className="login-card">
          <h2 className="login-title">Admin Login</h2>

          <input
            type="text"
            placeholder="Admin ID"
            className="login-input"
            onChange={(e) => setForm({ ...form, id: e.target.value })}
          />

          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="login-input"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />

            <span
              className="eye-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
          </div>

          {error && <p className="error-text">{error}</p>}

          <button className="login-button">Login</button>
        </form>
      </div>
    </>
  );
};

export default AdminLogin;
