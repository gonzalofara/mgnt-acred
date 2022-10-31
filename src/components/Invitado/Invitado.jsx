import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getInvitado, setInvitadoStatus } from "../../redux/actions/actions";
import SideBar from "../SideBar/SideBar";
import Aside from "../Aside/Aside";
import Error from "../Error/Error";
import { BsFillArchiveFill } from "react-icons/bs";
import { FaUsers, FaIdCard } from "react-icons/fa";
import { Link } from "react-router-dom";

const Invitado = (props) => {
  const id = props.match.params.id;
  const tk = sessionStorage.getItem("token");

  const dispatch = useDispatch();
  const invitado = useSelector((state) => state.invitado);
  const evento = useSelector((state) => state.evento);
  console.log(evento);

  useEffect(() => {
    dispatch(getInvitado(id));
  }, [dispatch]);

  if (!tk) {
    return <Error />;
  } else {
    return (
      <section className="dark:bg-gray-900 min-h-screen">
        <SideBar />

        <Aside id={id} />
        <div className="md:ml-60 mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-semibold sm:text-4xl text-center md:text-start grid">
            <div className="dark:text-gray-100">
              <span className="uppercase ">{invitado?.last_name}</span>,{" "}
              <span className="capitalize">{invitado?.first_name}</span>
            </div>
            <span className="text-lg font-light text-gray-600 dark:text-gray-500 uppercase">
              {evento?.nombre}
            </span>
          </h2>
          <nav
            aria-label="Breadcrumb"
            className="flex mt-4 justify-center md:justify-start dark:bg-gray-900"
          >
            <ol
              role="list"
              className="flex gap-2 overflow-hidden text-gray-700 dark:bg-gray-900"
            >
              <li className="flex items-center dark:bg-gray-900">
                <p className="flex h-6 items-center bg-gray-100 px-2 transition-colors hover:text-gray-900 dark:bg-gray-900 dark:text-gray-200 dark:hover:text-gray-400">
                  <FaUsers size={20} />

                  <span className="ml-1.5 text-xs font-medium"> Estado </span>
                </p>
              </li>

              <li className="relative flex items-center dark:bg-gray-900">
                <span className="absolute inset-y-0 -left-px h-6 w-4 bg-gray-100 dark:bg-gray-900 [clip-path:_polygon(0_0,_0%_100%,_100%_50%)]"></span>

                <p
                  className={
                    invitado?.status !== "pendiente"
                      ? "flex h-6 items-center bg-blue-500 pl-8 pr-4 text-xs font-medium transition-colors text-gray-100"
                      : invitado?.status === "pendiente"
                      ? "flex h-6 items-center bg-rose-600 pl-8 pr-4 text-xs font-medium transition-colors text-gray-100"
                      : null
                  }
                >
                  {invitado?.status !== "pendiente"
                    ? "Acreditado"
                    : "Pendiente"}
                </p>
              </li>
            </ol>
          </nav>
          <div>
            <p
              className={
                invitado?.status === "pendiente"
                  ? "flex gap-1 md:mx-0 mx-auto items-center justify-center cursor-pointer bg-teal-600 w-[130px] mt-4 text-gray-100 py-2 rounded-md hover:bg-teal-500 hover:text-gray-50 text-center"
                  : "flex gap-1 md:mx-0 mx-auto items-center justify-center bg-rose-600 w-[130px] mt-4 text-gray-100 py-2 rounded-md text-center opacity-50"
              }
              onClick={() =>
                invitado?.status === "pendiente" &&
                dispatch(setInvitadoStatus(id, { status: "acreditado" }))
              }
            >
              <span>
                <FaIdCard size={18} />
              </span>
              Acreditar
            </p>
            <ul className="mt-4 py-4">
              <li className="relative grid mb-4 text-left">
                <span className="text-gray-500 uppercase text-xs">Lista</span>
                <span className="text-gray-700 capitalize text-base dark:text-gray-200">
                  {invitado?.list_name ? invitado.list_name : evento?.nombre}
                </span>
              </li>
              <li className="relative grid mb-4 text-left">
                <span className="text-gray-500 uppercase text-xs">Id</span>
                <span className="text-gray-700 capitalize text-base dark:text-gray-200">
                  {invitado?.inv_id}
                </span>
              </li>
              <li className="relative grid mb-4 text-left">
                <span className="text-gray-500 uppercase text-xs">Nombre</span>
                <span className="text-gray-700 capitalize text-base dark:text-gray-200">
                  {invitado?.first_name}
                </span>
              </li>
              <li className="relative grid mb-4 text-left">
                <span className="text-gray-500 uppercase text-xs">
                  Apellido
                </span>
                <span className="text-gray-700 capitalize text-base dark:text-gray-200">
                  {invitado?.last_name}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    );
  }
};

export default Invitado;
