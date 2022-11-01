import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import SideBar from "../SideBar/SideBar";
import Aside from "../Aside/Aside";
import Error from "../Error/Error";
import Swal from "sweetalert2";
import axios from "axios";

const NuevoEvento = () => {
  const tk = sessionStorage.getItem("token");
  const history = useHistory();
  //Estados
  const [evento, setEvento] = useState({
    nombre: "",
    cliente: "",
    fechaInicio: "",
    fechaFin: "",
    direccion: "",
  });
  //-------------------------
  const handleChange = (e) => {
    setEvento({
      ...evento,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    Swal.fire({
      title: "¿Crear evento?",
      showCancelButton: true,
      confirmButtonText: "Crear",
      cancelButtonText: `Cancelar`,
      width: "300px",
      color: "#8c8a8a",
      confirmButtonColor: "#14b8a6",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        // dispatch(postEvents(evento));
        axios
          .post(
            "https://backenddeploy-production.up.railway.app/eventos",
            evento
          )
          .then((res) => {
            Swal.fire({
              title: "Evento creado correctamente!",
              confirmButtonText: "Ok",
              icon: "success",
              width: "300px",
              color: "#8c8a8a",
              confirmButtonColor: "#14b8a6",
            }).then((result) => {
              if (result.isConfirmed) {
                history.push("/eventos");
                setEvento({});
              }
              history.push("/eventos");
              setEvento({});
            });
          })
          .catch(function (error) {
            Swal.fire({
              title: "Ha ocurrido un error. Intente nuevamente.",
              confirmButtonText: "Ok",
              confirmButtonColor: "#e11d48",
              icon: "error",
            });
          });
      }
    });
  };

  if (!tk) {
    return <Error />;
  } else {
    return (
      <section className="dark:bg-gray-900 min-h-screen">
        <SideBar />
        <Aside />
        <div className="grid py-4 md:ml-44">
          <div className="w-9/12 mx-auto md:text-left mb-4">
            <h1 className="text-5xl font-semibold dark:text-gray-100">
              Crear evento
            </h1>
            <h4 className="grid text-xs dark:text-gray-300">
              <span className="text-teal-600 text-base font-semibold">
                Datos
              </span>{" "}
              Completa los campos con la informacion del evento
            </h4>
          </div>

          <form className="grid w-9/12 mx-auto" onSubmit={handleSubmit}>
            <div className="mb-2">
              <h3 className="text-left font-semibold text-gray-800 dark:text-gray-300 text-sm">
                CLIENTE{" "}
                <span className="font-medium text-gray-500 dark:text-gray-300">
                  *
                </span>
              </h3>
              <input
                className="bg-gray-50 w-full py-3 rounded-xl px-2"
                type="text"
                name="cliente"
                value={evento.cliente}
                placeholder="Empresa"
                onChange={handleChange}
              />
            </div>

            <div className="mb-2">
              <h3 className="text-left font-semibold text-gray-800 dark:text-gray-300 text-sm">
                NOMBRE DEL EVENTO{" "}
                <span className="font-medium text-gray-500 dark:text-gray-300">
                  *
                </span>
              </h3>
              <input
                className="bg-gray-50 w-full py-3 rounded-xl px-2"
                type="text"
                name="nombre"
                value={evento.nombre}
                placeholder="Nombre "
                onChange={handleChange}
              />
            </div>

            <div className="mb-2">
              <h3 className="text-left font-semibold text-gray-800 dark:text-gray-300 text-sm uppercase">
                Fecha de inicio{" "}
                <span className="font-medium text-gray-500 dark:text-gray-300">
                  *
                </span>
              </h3>
              <input
                type="date"
                className="bg-gray-50 w-full py-3 rounded-xl px-2"
                name="fechaInicio"
                value={evento.fechaInicio}
                onChange={handleChange}
              />
            </div>

            <div className="mb-2">
              <h3 className="text-left font-semibold text-gray-800 dark:text-gray-300 text-sm uppercase">
                Fecha de cierre
              </h3>
              <input
                className="bg-gray-50 w-full py-3 rounded-xl px-2"
                type="date"
                name="fechaFin"
                value={evento.fechaFin}
                onChange={handleChange}
              />
            </div>

            <div className="mb-2">
              <h3 className="text-left font-semibold text-gray-800 dark:text-gray-300 text-sm uppercase">
                Direccion
              </h3>
              <input
                className="bg-gray-50 w-full py-3 rounded-xl px-2"
                type="text"
                name="direccion"
                value={evento.direccion}
                onChange={handleChange}
                placeholder="Dirección"
              />
            </div>
            <div className="flex gap-4 justify-start items-center">
              <button
                className={
                  evento?.nombre && evento?.cliente && evento?.fechaInicio
                    ? "bg-teal-500 mt-2 px-6 text-gray-200 hover:bg-teal-600 hover:text-gray-50"
                    : "bg-teal-700 mt-2 px-6 text-gray-200 opacity-50"
                }
                disabled={
                  evento?.nombre && evento?.cliente && evento?.fechaInicio
                    ? false
                    : true
                }
              >
                Crear
              </button>
              <Link to="/eventos">
                <p className="bg-transparent mt-2 text-gray-600 hover:text-gray-700 dark:hover:text-gray-400 hover:underline cursor-pointer">
                  Cancelar
                </p>
              </Link>
            </div>
          </form>
        </div>
      </section>
    );
  }
};

export default NuevoEvento;
