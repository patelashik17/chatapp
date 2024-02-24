import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import "./Style.scss";

interface response {
  response: string | "No Response";
}

const SingInWithGoogle = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .post<response>(`auth/google/login`, { code: searchParams.get("code") })
      .then((response: any) => {
        if (response.data) {
          console.log("response", response.data); // for debugging
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("user", JSON.stringify(response.data.user));
          navigate("/dashboard");
        }
      })
      .catch((error) => {
        console.log(error);
      });
    //  eslint-disable-next-line
  }, []);

  return (
    <div className="sign-in-google">
      <h1> Loading... </h1>
    </div>
  );
};

export default SingInWithGoogle;
