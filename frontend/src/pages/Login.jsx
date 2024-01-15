import { useMutation } from "@apollo/client";
import { LOGIN } from "../queries";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import Error from "../components/Error";
import Spinner from "../components/Spinner";

const Login = () => {
  const value = useContext(AuthContext);
  const [alert, setAlert] = useState("");

  const LogIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [login, { loading, data, error }] = useMutation(LOGIN, {
      onError: (error) => setAlert(error.message),
    });

    useEffect(() => {
      if (!loading && data) {
        const token = data.login.token;
        const userId = data.login.userId;
        const username = data.login.username;
        value.login(token, userId, username);
      }
    }, [data, loading]);
    if (loading) {
      return <Spinner />;
    }
    if (error) return <p>Error:</p>;

    return (
      <form
        className="auth-form"
        onSubmit={(event) => {
          event.preventDefault();
          login({
            variables: { email: email.trim(), password: password.trim() },
          });
        }}
      >
        <Error error={alert} />
        <div className="mb-3 mt-2">
          <label className="form-label" htmlFor="email">
            البريد الالكتروني
          </label>
          <input
            className="form-control"
            id="email"
            type="email"
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="password">
            كلمة المرور
          </label>
          <input
            className="form-control"
            id="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            type="password"
            required
          />
        </div>
        <div className="form-actions">
          <button className="btn m-2" type="submit">
            إرسال
          </button>
          <button className="btn" onClick={() => navigate("/signUp")}>
            انتقل إلى إنشاء حساب
          </button>
        </div>
      </form>
    );
  };
  return <LogIn />;
};

export default Login;
