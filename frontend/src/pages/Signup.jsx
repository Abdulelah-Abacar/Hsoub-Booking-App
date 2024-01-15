import { useMutation } from "@apollo/client";
import { useContext, useEffect, useState } from "react";
import { CREATE_USER } from "../queries";
import AuthContext from "../context/AuthContext";
import Error from "../components/Error";
import Spinner from "../components/Spinner";

const Signup = () => {
  const value = useContext(AuthContext);

  function SignUp() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [alert, setAlert] = useState("");

    const [signup, { loading, error, data }] = useMutation(CREATE_USER, {
      onError: (error) => setAlert(error.message),
      onCompleted: () => {
        setAlert("تم إنشاء الحساب بنجاح");
      },
    });

    useEffect(() => {
      if (!loading && data) {
        const token = data.createUser.token;
        const userId = data.createUser.userId;
        const username = data.createUser.username;
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
          signup({
            variables: {
              username: username.trim(),
              email: email.trim(),
              password: password.trim(),
            },
          });
        }}
      >
        <Error error={alert} />
        <div className="mb-3 mt-2">
          <label className="form-label" htmlFor="username">
            اسم المستخدم
          </label>
          <input
            className="form-control"
            id="username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
            required
          />
        </div>
        <div className="mb-3">
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
          <button type="submit" className="btn">
            إرسال
          </button>
        </div>
      </form>
    );
  }
  return <SignUp />;
};

export default Signup;
