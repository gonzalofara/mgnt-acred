import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/magnetica_rayo.png";

const Logged = () => {
  return (
    <section className="bg-black text-gray-700 h-screen">
      <div className="flex items-center justify-center m-0 p-0 lg:hidden">
        <img src={Logo} alt="logo" className="h-56" />
      </div>
      <div className="container flex flex-col justify-center mx-auto lg:py-24 lg:flex-row lg:justify-between ">
        <div className="flex flex-col justify-center p-6 text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left">
          <h1 className="text-4xl font-extrabold text-transparent mb-8 bg-clip-text bg-gradient-to-r from-indigo-400 via-orange-300 to-yellow-300 leading-none sm:text-5xl lg:text-6xl">
            MAGNÉTICA <br />
            <span className="text-cyan-200">acreditaciones</span>
          </h1>

          <div className="flex flex-col space-y-4 sm:items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start">
            <Link to="/general">
              <div className="px-8 py-3 cursor-pointer text-lg text-gray-100 font-semibold rounded bg-violet-400 border border-2 border-violet-400 hover:bg-violet-500 hover:border-violet-600 hover:text-white">
                Volver al Inicio
              </div>
            </Link>
          </div>
        </div>
        <div className="flex items-center justify-center lg:mr-44 lg:mt-0 lg:h-96">
          <img
            src={Logo}
            alt="logo"
            className="invisible lg:visible lg:mb-24"
          />
        </div>
      </div>
    </section>
  );
};

export default Logged;
