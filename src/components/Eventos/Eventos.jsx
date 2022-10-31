import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllEvents,
  resetEventDetail,
  setEventStatus,
} from "../../redux/actions/actions";
import { Link } from "react-router-dom";
import SideBar from "../SideBar/SideBar";
import Aside from "../Aside/Aside";
import Error from "../Error/Error";
import { BsFillArchiveFill } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { MdOutlineAddCircle } from "react-icons/md";

import Swal from "sweetalert2";

const Eventos = () => {
  const eventos = useSelector((state) => state.eventos);
  const tk = sessionStorage.getItem("token");

  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [showFiltered, setShowFiltered] = useState(false);

  const dispatch = useDispatch();

  const activos = eventos?.filter((e) => e.status === "active").length;
  const finalizados = eventos?.filter((e) => e.status === "closed").length;

  const handleChange = (e) => {
    let events = eventos;
    setSearch(e.currentTarget.value);

    setFiltered(
      events?.filter(
        (i) =>
          i.nombre.toLowerCase().indexOf(search.toLowerCase()) > -1 ||
          i.cliente.toLowerCase().indexOf(search.toLowerCase()) > -1
      )
    );

    setShowFiltered(true);
  };

  useEffect(() => {
    dispatch(resetEventDetail());
    dispatch(getAllEvents());
  }, [dispatch]);

  console.log(eventos);

  if (!tk) {
    return <Error />;
  } else {
    return (
      <section className="dark:bg-gray-900 min-h-screen">
        <SideBar />
        <Aside />
        <div className="md:ml-60 mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
          <h2 className="text-xl flex gap-4 font-bold sm:text-2xl text-start dark:text-gray-100">
            Eventos{" "}
            <Link to="/evento/crear">
              <span className="md:hidden flex w-[130px] gap-1 items-center justify-centerfont-normal text-sm cursor-pointer bg-blue-400 p-1 text-gray-100 rounded-md hover:bg-blue-500 hover:text-gray-50 text-center">
                <MdOutlineAddCircle size={20} fill="#f8fafc" /> Crear evento
              </span>
            </Link>
          </h2>

          <div className="relative mt-2">
            <span
              className={
                !search.length
                  ? "flex absolute inset-y-0 left-0 items-center pl-3 text-gray-400 focus:text-gray-900"
                  : "invisible"
              }
            >
              <FaSearch size={20} />
            </span>
            <input
              type="search"
              id="input-group-1"
              className="bg-gray-50 border border-gray-300 text-gray-600 text-sm rounded-lg focus:ring-blue-100 focus:border-blue-50 block w-full pl-10 p-2.5 py-4"
              placeholder="Buscar eventos"
              onChange={handleChange}
              value={search}
            />
            {showFiltered && search && filtered.length ? (
              <ul className="block w-full bg-gray-50 rounded-lg border border-gray-200 text-gray-900 dark:bg-gray-700 dark:border-gray-600">
                {filtered.map((i) => (
                  <li
                    key={i.id}
                    className="flex px-6 py-2 bg-gray-100 dark:bg-gray-700 border-b border-gray-300 dark:border-gray-600 w-full justify-between text-left"
                  >
                    <div className="grid w-full">
                      <h3 className="w-1/3 font-semibold">
                        <Link to={"/eventos/" + i.id}>
                          <span className="font-semibold text-teal-600 dark:text-teal-500">
                            {i.id}. {i.nombre}
                          </span>
                        </Link>
                      </h3>
                      <p className="uppercase font-medium text-xs text-gray-600 dark:text-gray-400">
                        <span>{i?.cliente}</span>
                      </p>
                    </div>
                    <div className="flex gap-2 items-center capitalize">
                      <span
                        className={
                          i.status === "active"
                            ? "bg-blue-500 px-1 rounded text-sm text-gray-50 mr-4 sm:mr-0"
                            : "bg-rose-500 px-1 rounded text-sm text-gray-50 mr-4 sm:mr-0"
                        }
                      >
                        {i.status}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
          <div className="mt-8 grid grid-cols-1 gap-x-12 gap-y-12 lg:grid-cols-2 text-left">
            {eventos?.length > 0 &&
              eventos
                ?.filter((e) => e.archived !== "true")
                .map((e) => (
                  <blockquote
                    key={e.id}
                    className={
                      e.status === "active"
                        ? "border-t-4 border-teal-600 shadow-md dark:shadow-sm dark:shadow-gray-700 "
                        : "border-t-4 border-rose-600 shadow-md dark:shadow-sm dark:shadow-gray-700 "
                    }
                  >
                    <header className="sm:grid sm:items-center ml-4 mt-2">
                      <Link to={`/eventos/${e.id}`}>
                        <h1
                          className={
                            e.status === "active"
                              ? "mt-2 text-3xl font-medium sm:mt-0 text-teal-600 hover:text-gray-400 hover:cursor-pointer uppercase"
                              : "mt-2 text-3xl font-medium sm:mt-0 text-rose-600 hover:text-gray-400 hover:cursor-pointer uppercase"
                          }
                        >
                          {e.nombre}
                        </h1>
                      </Link>
                      <p className="uppercase font-semibold text-gray-700 dark:text-gray-600 text-xs">
                        {e.cliente} -{" "}
                        <span className="font-semibold text-gray-500 text-xs">
                          {e.Invitados.length + " Invitados"}
                        </span>
                      </p>
                    </header>

                    <p className="mt-2 ml-4 text-sm text-gray-700 dark:text-gray-600">
                      {`Actualizado el ${e.updatedAt.slice(
                        8,
                        10
                      )}/${e.updatedAt.slice(5, 7)}/${e.updatedAt.slice(
                        0,
                        4
                      )} a las ${e.updatedAt.slice(11, 16)} hs.`}
                    </p>

                    <footer
                      className={
                        e.status === "active"
                          ? "mt-4 pl-4 py-3 bg-gray-200 dark:bg-gray-800"
                          : "mt-4 pl-4 py-3 bg-rose-200 dark:bg-rose-800"
                      }
                    >
                      <p
                        className={
                          e.status === "active"
                            ? "text-xs text-gray-700 hover:cursor-pointer group hover:text-gray-700 dark:hover:text-gray-500 flex gap-1 items-center w-[100px]"
                            : "text-xs text-rose-700 hover:cursor-pointer group hover:text-rose-700 dark:hover:text-rose-200 flex gap-1 items-center w-[100px]"
                        }
                        onClick={() =>
                          dispatch(
                            setEventStatus(e.id, { archived: "true" })
                          ).then(() => dispatch(getAllEvents()))
                        }
                      >
                        <BsFillArchiveFill size={18} />
                        <span className="opacity-0 group-hover:opacity-50 dark:group-hover:opacity-100">
                          Archivar
                        </span>
                      </p>
                    </footer>
                  </blockquote>
                ))}
          </div>
        </div>
      </section>
    );
  }
};

export default Eventos;
