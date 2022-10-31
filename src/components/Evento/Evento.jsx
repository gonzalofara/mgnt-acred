import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Estadisticas from "../Estadisticas/Estadisticas";
import {
  getEventDetail,
  setEventStatus,
  resetInvitadoDetail,
  setInvitadoStatus,
} from "../../redux/actions/actions";
import SideBar from "../SideBar/SideBar";
import Aside from "../Aside/Aside";
import Error from "../Error/Error";
import { BiWindowClose } from "react-icons/bi";
import { ImStatsBars } from "react-icons/im";
import { FaUsers, FaSearch } from "react-icons/fa";
import { TiInputChecked } from "react-icons/ti";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const Evento = (props) => {
  const id = props.match.params.id;
  const tk = sessionStorage.getItem("token");

  const dispatch = useDispatch();
  const evento = useSelector((state) => state.evento);
  const invitadosArr = evento?.Invitados;
  const [disabled, setDisabled] = useState(true);
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [showFiltered, setShowFiltered] = useState(false);

  useEffect(() => {
    dispatch(resetInvitadoDetail());
    dispatch(getEventDetail(id));
  }, [dispatch, evento.status]);

  const handlehidden = (e) => {
    setDisabled(!disabled);
  };

  const handleChange = (e) => {
    let invitados = evento?.Invitados;
    setSearch(e.currentTarget.value);

    setFiltered(
      invitados.filter(
        (i) =>
          i.first_name.toLowerCase().indexOf(search.toLowerCase()) > -1 ||
          i.last_name.toLowerCase().indexOf(search.toLowerCase()) > -1
      )
    );

    setShowFiltered(true);
  };
  const handleClick = () => {
    Swal.fire({
      title: "¿Finalizar evento?",
      showCancelButton: true,
      confirmButtonText: "Finalizar",
      cancelButtonText: `Cancelar`,
      width: "300px",
      color: "#8c8a8a",
      confirmButtonColor: "#f43f5e",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        dispatch(setEventStatus(id, { status: "closed" }));
        dispatch(getEventDetail(id));
        Swal.fire({
          title: "Evento finalizado",
          confirmButtonText: "Ok",
          icon: "success",
        });
      }
    });
  };

  if (!tk) {
    return <Error />;
  } else {
    return (
      <section className="dark:bg-gray-900 min-h-screen">
        <SideBar id={id} evento={evento} />

        <Aside id={id} event={evento} />
        <div className="md:ml-60 mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
          <h2
            className={
              evento?.status === "active"
                ? "text-4xl font-semibold sm:text-4xl text-center md:text-start grid uppercase dark:text-gray-100"
                : "text-4xl font-semibold sm:text-4xl text-rose-600 text-center md:text-start grid uppercase"
            }
          >
            {evento?.nombre}

            <span
              className={
                evento?.status !== "active"
                  ? "text-sm font-light text-rose-900 uppercase"
                  : "text-sm font-light uppercase dark:text-gray-500"
              }
            >
              {evento?.cliente}{" "}
              <span className="dark:text-gray-700 text-gray-400">
                -{evento?.fechaInicio}-
              </span>
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
                <p className="flex h-6 items-center bg-gray-100 dark:bg-gray-900 dark:text-gray-200 px-2 transition-colors hover:text-gray-900 dark:hover:text-gray-400">
                  <FaUsers size={20} />

                  <span className="ml-1.5 text-xs font-medium"> Estado </span>
                </p>
              </li>

              <li className="relative flex items-center ">
                <span className="absolute inset-y-0 -left-px h-6 w-4 bg-gray-100 dark:bg-gray-900 [clip-path:_polygon(0_0,_0%_100%,_100%_50%)]"></span>

                <p
                  className={
                    evento?.status === "active"
                      ? "flex h-6 items-center bg-blue-500 pl-8 pr-4 text-xs font-medium transition-colors text-gray-100"
                      : evento?.status === "closed"
                      ? "flex h-6 items-center bg-rose-600 pl-8 pr-4 text-xs font-medium transition-colors text-gray-100"
                      : null
                  }
                >
                  {evento?.status === "active" ? "Activo" : "Finalizado"}
                </p>
              </li>
              <li className="flex items-center dark:bg-gray-900">
                <p className="flex h-6 items-center bg-gray-100 px-2 transition-colors hover:text-gray-900 dark:bg-gray-900 dark:text-gray-200 dark:hover:text-gray-400">
                  <FaUsers size={20} />

                  <span className="ml-1.5 text-xs font-medium">
                    {" "}
                    Invitados{" "}
                  </span>
                </p>
              </li>

              <li className="relative flex items-center">
                <span className="absolute inset-y-0 -left-px h-6 w-4 bg-gray-100 dark:bg-gray-900 [clip-path:_polygon(0_0,_0%_100%,_100%_50%)]"></span>

                <p className="flex h-6 items-center bg-teal-500 pl-8 pr-4 text-xs font-medium transition-colors text-gray-100">
                  {evento?.Invitados?.length}
                </p>
              </li>
            </ol>
          </nav>
          <div className="mt-6 grid grid-cols-1 gap-x-12 gap-y-6 text-left">
            <div className="flex gap-x-2">
              <p
                className={
                  evento?.status === "active"
                    ? "flex gap-1 md:mx-0 mx-auto items-center cursor-pointer bg-rose-600 w-[160px] mt-2 pl-2 text-gray-100 py-2 rounded-md hover:bg-rose-500 hover:text-gray-50 text-center"
                    : "flex gap-1 md:mx-0 mx-auto items-center bg-rose-600 w-[160px] mt-2 pl-2 text-gray-100 py-2 rounded-md text-center opacity-50"
                }
                onClick={evento?.status === "active" && handleClick}
              >
                <span>
                  <BiWindowClose size={20} />
                </span>
                Finalizar evento
              </p>
              <p
                onClick={handlehidden}
                className={
                  "flex gap-1 md:mx-0 mx-auto items-center cursor-pointer bg-teal-600 w-[160px] mt-2 pl-2 text-gray-100 py-2 rounded-md hover:bg-teal-500 hover:text-gray-50 text-center"
                }
              >
                <span>
                  <ImStatsBars size={20} />
                </span>
                Estadisticas
              </p>
            </div>
            <div className="relative">
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
                placeholder="Buscar invitados"
                onChange={handleChange}
                value={search}
              />
              {showFiltered && search && filtered.length ? (
                <ul className="block w-full bg-gray-50 rounded-lg border border-gray-200 text-gray-900 dark:bg-gray-700 dark:border-gray-600 ">
                  {filtered.map((i) => (
                    <li
                      key={i.id}
                      className="flex px-6 py-2 bg-gray-100 border-b border-gray-300 w-full justify-between dark:border-gray-600 dark:bg-gray-700"
                    >
                      <div className="grid w-full">
                        <h3 className="w-1/3 font-semibold">
                          <Link to={"/invitados/" + i.id}>
                            <span className="font-semibold text-teal-500">
                              {i.id}. {i.first_name}, {i.last_name}
                            </span>
                          </Link>
                        </h3>
                        <p className="uppercase font-medium text-xs text-gray-600 dark:text-gray-400">
                          {evento?.Invitados[1]?.list_name} -{" "}
                          <span className="dark:text-gray-500">
                            {evento?.cliente}
                          </span>
                        </p>
                      </div>
                      <div className="flex gap-2 items-center capitalize">
                        <span
                          className={
                            i.status === "acreditado"
                              ? "bg-blue-500 px-1 rounded text-sm text-gray-50 mr-4 sm:mr-0"
                              : "bg-rose-500 px-1 rounded text-sm text-gray-50 mr-4 sm:mr-0"
                          }
                        >
                          {i.status}
                        </span>
                        <span
                          className={
                            i.status === "acreditado"
                              ? "invisible text-gray-500 flex w-[72px] items-center text-sm hover:text-blue-400"
                              : "text-gray-500 dark:text-gray-400 flex w-[72px] items-center text-sm hover:text-blue-400 cursor-pointer"
                          }
                          onClick={() =>
                            dispatch(
                              setInvitadoStatus(i.id, {
                                status: "acreditado",
                              })
                            ).then(() => dispatch(getEventDetail(id)))
                          }
                        >
                          <TiInputChecked size={18} /> Acreditar
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
            <div hidden={disabled}>
              <Estadisticas invitadosArr={invitadosArr} evento={evento} />
            </div>
          </div>
        </div>
      </section>
    );
  }
};

export default Evento;
