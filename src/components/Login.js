import { useState, useEffect } from "react";
import { loginApi } from "../services/UserService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
function Login() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [loadingSpin, setLoadingSpin] = useState(false);

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      nav("/");
    }
  }, []);

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Missing email or password!");
      return;
    }
    setLoadingSpin(true);
    let res = await loginApi(email, password);
    if (res && res.token) {
      localStorage.setItem("token", res.token);
      nav("/");
    } else {
      if (res && res.status === 400) {
        toast.error(res.data.error);
      }
    }
    setLoadingSpin(false);
  };
  return (
    <div className="login-container col-6 col-sm-6">
      <div className="title">Log in</div>
      <div className="text">Email or username (eve.holt@reqres.in)</div>
      <input
        type="text"
        value={email}
        placeholder="Email or username..."
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <div className="input-pw">
        <input
          type={isShowPassword ? "text" : "password"}
          value={password}
          placeholder="Password..."
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <i
          onClick={() => setIsShowPassword(!isShowPassword)}
          className={
            isShowPassword === true
              ? "fa-solid fa-eye password-icon"
              : "fa-solid fa-eye-slash password-icon"
          }
        ></i>
      </div>

      <button
        className={email && password ? "active" : ""}
        disabled={email && password ? false : true}
        onClick={() => handleLogin()}
      >
        {loadingSpin && <i className="fas fa-circle-notch fa-spin"></i>}
        &nbsp;Login
      </button>
      <div className="back">
        <i className="fa-solid fa-chevron-left"></i> Go back
      </div>
    </div>
  );
}

export default Login;
