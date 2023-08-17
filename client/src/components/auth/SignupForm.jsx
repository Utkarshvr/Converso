"use client";
import { useSignup } from "@/hooks/rtq/auth.rtq";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const initialState = {
  username: "",
  password: "",
};
export default function SignupForm() {
  const [credentials, setCredentials] = useState(initialState);
  const router = useRouter();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // RTQ
  const { isLoading, isSuccess, isError, error, mutate, data } = useSignup();

  useEffect(() => {
    if (isSuccess) {
      console.log(data);

      // onLoginSuccess({
      //   user: data?.data?.user,
      //   token: data?.data?.access_token,
      // });
      router.push("/auth/login");
    }
  }, [isSuccess]);

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(credentials);

    mutate(credentials);
  };

  return (
    <div style={{ maxWidth: "500px" }} className="mt-5 container-sm">
      <h4>Signup</h4>
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Username
          </label>
          <input
            value={credentials.username}
            type={"text"}
            name={"username"}
            placeholder={"Enter Username"}
            onChange={(e) => handleChange(e)}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            value={credentials.password}
            type={"password"}
            name={"password"}
            placeholder={"Enter Password"}
            onChange={(e) => handleChange(e)}
            className="form-control"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          style={{ width: "100%" }}
          className="btn btn-primary"
          aria-label="Close"
        >
          Signup
        </button>
        {isError && error && (
          <h6
            className=" mt-2"
            style={{ textAlign: "center", color: "#ff0000" }}
          >
            {error?.message}
          </h6>
        )}
      </form>
    </div>
  );
}
