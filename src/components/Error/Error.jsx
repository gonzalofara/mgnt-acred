import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/magnetica_rayo.png";

const Error = () => {
  return (
    <div className="grid h-screen place-content-center bg-white dark:bg-gray-900">
      <div className="text-center">
        <img
          src={Logo}
          alt="logo"
          className="mx-auto h-56 w-auto text-black sm:h-80"
        />

        <h1 className="mt-6 text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-200 sm:text-4xl">
          Uh-oh!
        </h1>

        <p className="mt-4 text-gray-500">No se pudo cargar la página</p>
      </div>
      <div>
        <Link to="/">
          <p className="w-full mt-4 text-white bg-violet-400 hover:bg-violet-500 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
            Ir al Inicio
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Error;
