import React, { useEffect, useState } from "react";
import SideBar from "../SideBar/SideBar";
import Aside from "../Aside/Aside";
import {
  getEventDetail,
  resetEventDetail,
  setInvitadoStatus,
} from "../../redux/actions/actions";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { TiInputChecked } from "react-icons/ti";

const Invitados = (props) => {
  const id = props.match.params.id;
  const evento = useSelector((state) => state.evento);
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);
  console.log(id);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetEventDetail());
    dispatch(getEventDetail(id));
  }, [dispatch]);
  let n = 0;

  const handleChange = (e) => {
    let invitados = evento?.Invitados;
    setSearch(e.currentTarget.value);

    if (e.currentTarget.value !== "") {
      setFiltered(
        invitados.filter(
          (i) =>
            i.first_name.toLowerCase().indexOf(search.toLowerCase()) > -1 ||
            i.last_name.toLowerCase().indexOf(search.toLowerCase()) > -1
        )
      );
    } else {
      setFiltered(invitados);
    }
  };
  return (
    <section className="dark:bg-gray-900 min-h-screen">
      <SideBar />
      <Aside invitados={evento?.Invitados?.length} />
      <div className="md:ml-60 mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
        <div>
          <h2 className="text-xl dark:text-gray-100 font-bold sm:text-4xl text-start grid mb-2">
            {evento?.nombre}
            <span className="text-sm font-medium text-gray-600 uppercase">
              {evento.cliente}
            </span>
          </h2>
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
              vulue={search}
            />
          </div>
        </div>

        <div className="overflow-x-auto relative mt-2">
          <table className="w-full text-sm text-left text-gray-500 border border-gray-200 dark:border-gray-600 rounded">
            <thead className="text-xs text-gray-700 dark:text-gray-300 uppercase bg-gray-200 dark:bg-gray-600">
              <tr>
                <th scope="col" className="py-3 px-2">
                  Invitado
                </th>
                <th scope="col" className="py-3 ">
                  Estado
                </th>
                <th scope="col" className="py-3 ">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0
                ? evento?.Invitados?.map((i) => {
                    n++;
                    return (
                      <tr
                        key={n}
                        className="bg-white border-b dark:border-gray-600"
                      >
                        <th
                          scope="row"
                          className="py-4 px-2 font-medium text-gray-900 whitespace-nowrap "
                        >
                          <Link key={i.id} to={"/invitados/" + i.id}>
                            {i.last_name.toUpperCase()}, {i.first_name}
                          </Link>
                        </th>
                        <td className="py-4 capitalize">
                          <span
                            className={
                              i.status === "acreditado"
                                ? "bg-blue-500 p-1 rounded text-gray-50 mr-4 sm:mr-0"
                                : "bg-rose-500 p-1 rounded text-gray-50 mr-4 sm:mr-0"
                            }
                          >
                            {i.status}
                          </span>
                        </td>
                        <td className="py-4 capitalize">
                          <span
                            className={
                              i.status === "acreditado"
                                ? "hidden"
                                : "text-gray-500 flex w-1/2 items-center text-sm hover:text-blue-400 cursor-pointer"
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
                        </td>
                      </tr>
                    );
                  })
                : filtered?.map((i) => {
                    n++;
                    return (
                      <tr key={n} className="bg-white border-b">
                        <th
                          scope="row"
                          className="py-4 px-2 font-medium text-gray-900 whitespace-nowrap"
                        >
                          <Link key={i.id} to={"/invitados/" + i.id}>
                            {i.last_name.toUpperCase()},{" "}
                            {i.first_name.length > 16
                              ? i.first_name.slice(0, 16) + "..."
                              : i.first_name}
                          </Link>
                        </th>
                        <td className="py-4 capitalize">
                          <span
                            className={
                              i.status === "acreditado"
                                ? "bg-blue-500 p-1 rounded text-gray-50 mr-4 sm:mr-0"
                                : "bg-rose-500 p-1 rounded text-gray-50 mr-4 sm:mr-0"
                            }
                          >
                            {i.status}
                          </span>
                        </td>
                        <td className="py-4 capitalize">
                          <span
                            className={
                              i.status === "acreditado"
                                ? "hidden"
                                : "text-gray-500 flex w-1/2 items-center text-sm hover:text-blue-400 cursor-pointer"
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
                        </td>
                      </tr>
                    );
                  })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Invitados;
