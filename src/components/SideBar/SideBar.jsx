import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdArrowRoundBack, IoMdAdd, IoMdListBox } from "react-icons/io";
import logo from "../../assets/magnetica_rayo.png";
import Swal from "sweetalert2";

const SideBar = ({ evento, id }) => {
  const [hidden, setHidden] = useState(true);
  const history = useHistory();
  const handleHidden = () => {
    setHidden(!hidden);
  };
  const handleOut = () => {
    Swal.fire({
      title: "¿Cerrar sesión?",
      showCancelButton: true,
      confirmButtonText: "Confirmar",
      cancelButtonText: `Cancelar`,
      width: "300px",
      color: "#8c8a8a",
      confirmButtonColor: "#0d9488",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        sessionStorage.clear();
        window.location.assign("/");
      }
    });
  };
  return (
    <header>
      <nav
        className="
         flex flex-wrap
         items-center
         justify-between
         w-full
         py-4
         md:py-0
         px-4
         text-lg text-gray-700
         shadow-sm
         dark:border-b dark:border-gray-800 dark:shadow-none dark:bg-gray-900
       "
      >
        <div>
          <a href="/general" className="flex items-center content-center gap-1">
            <img src={logo} className="w-[45px] h-[45px]" />

            <span className="text-gray-900 text-base font-extrabold dark:text-gray-200">
              Acreditaciones
            </span>
          </a>
        </div>

        <div className="flex items-center gap-6 md:hidden block">
          <div
            className="cursor-pointer flex items-center"
            onClick={() => history.goBack()}
          >
            <IoMdArrowRoundBack size={24} />
            <p className="text-sm text-gray-400 ">Volver</p>
          </div>
          <div className="cursor-pointer" onClick={handleHidden}>
            <GiHamburgerMenu size={24} />
          </div>
        </div>

        <div className="w-full md:hidden" id="menu" hidden={hidden}>
          <ul
            className="
             pt-4
             text-base text-gray-700
             md:flex
             md:justify-between 
             md:pt-0 md:items-center"
          >
            <li>
              <Link to="/eventos">
                <span
                  className="block text-gray-500 hover:text-teal-500"
                  // href="/eventos"
                >
                  Eventos
                </span>
              </Link>
            </li>
            <li>
              <a
                className="md:p-4 py-2 block text-gray-500 hover:text-teal-500"
                href="/archivo"
              >
                Archivo
              </a>
            </li>
            {!evento?.Invitados?.length && id ? (
              <li>
                <p className="text-xs text-gray-400 mt-2">ACCIONES</p>
                <a
                  className="md:p-4 flex items-center justify-center text-center gap-1 py-2 block text-gray-500 hover:text-teal-500"
                  href={`/eventos/${id}/listas/crear`}
                >
                  <span>Nueva Lista</span>
                  <IoMdAdd />
                </a>
              </li>
            ) : null}
            {evento?.Invitados?.length && id ? (
              <div>
                <li>
                  <p className="text-xs text-gray-400 mt-2">LISTA</p>
                  <a
                    className="md:p-4 flex items-center justify-center text-center gap-1 py-2 block text-teal-600 hover:text-teal-500"
                    href={`/eventos/${id}/invitados`}
                  >
                    <span>{evento.Invitados[0].list_name}</span>
                    <IoMdListBox size={20} />
                  </a>
                </li>
                <li>
                  <p className="text-xs text-gray-400 mt-2">ACCIONES</p>
                  <a
                    className="md:p-4 flex items-center justify-center text-center gap-1 py-2 block text-gray-500 hover:text-teal-500"
                    href={`/eventos/${id}/nuevoinvitado`}
                  >
                    <span>Nuevo Invitado</span>
                    <IoMdAdd />
                  </a>
                </li>
              </div>
            ) : null}

            <li className="">
              <p
                className="md:px-2 md:py-1 md:rounded py-2 block cursor-pointer bg-teal-600 hover:bg-teal-500 text-gray-100"
                onClick={handleOut}
              >
                Cerrar sesión
              </p>
            </li>
          </ul>
        </div>

        <div
          className="hidden w-full md:flex md:items-center md:w-auto"
          id="menu"
        >
          <ul
            className="
             pt-4
             text-base text-gray-700
             md:flex
             md:justify-between 
             md:pt-0 md:items-center"
          >
            <li>
              <a
                className="block text-gray-500 hover:text-teal-500"
                href="/eventos"
              >
                Eventos
              </a>
            </li>
            <li>
              <a
                className="md:p-4 py-2 block text-gray-500 hover:text-teal-500"
                href="/archivo"
              >
                Archivo
              </a>
            </li>

            <li className="">
              <p
                className="md:px-2 md:py-1 md:rounded py-2 block cursor-pointer bg-teal-600 hover:bg-teal-500 text-gray-100"
                onClick={handleOut}
              >
                Cerrar sesión
              </p>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default SideBar;
