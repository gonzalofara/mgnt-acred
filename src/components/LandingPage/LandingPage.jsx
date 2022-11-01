import React, { useState } from "react";
import Logo from "../../assets/magnetica_rayo.png";
import axios from "axios";
import Landing from "../Landing/Landing";
import { useHistory } from "react-router-dom";

const LandingPage = () => {
  const [input, setInput] = useState({ email: "", password: "" });
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState("");
  const history = useHistory();
  const tk = sessionStorage.getItem("token");
  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = input;

    axios
      .post("https://backenddeploy-production.up.railway.app/login", {
        email,
        password,
      })
      .then(async (res) => {
        const { token } = res.data;
        sessionStorage.setItem("token", token);
        history.push("/general");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (!tk) {
    return (
      <section className="bg-gray-100 dark:bg-gray-900 h-screen lg:h-screen">
        <div className="flex flex-col bg-gray-50 items-center justify-center px-6 py-8 mx-auto dark:bg-gray-900 h-full lg:h-screen lg:py-0">
          <img className="w-32 h-32" src={Logo} alt="logo" />

          <div className="w-full bg-white dark:bg-slate-800 dark:shadow-gray-700 rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-gray-100 md:text-2xl">
                Iniciar sesión
                <span className={showError ? "visible" : "hidden"}>
                  {error}
                </span>
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-200 "
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="nombre@empresa.com"
                    required={true}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-200"
                  >
                    Contraseña
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    required={true}
                    onChange={handleChange}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full text-white bg-violet-400 hover:bg-violet-500 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Ingresar
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    );
  } else {
    return <Landing />;
  }
};

export default LandingPage;
