import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllEvents } from "../../redux/actions/actions";
import SideBar from "../SideBar/SideBar";
import Aside from "../Aside/Aside";
import Error from "../Error/Error";
import Logo from "../../assets/magnetica_rayo.png";

const Dashboard = () => {
  const tk = sessionStorage.getItem("token");
  const eventos = useSelector((state) => state.eventos);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllEvents());
  }, [dispatch]);

  console.log(eventos);

  if (tk) {
    return (
      <section className="w-full">
        <SideBar></SideBar>
        <Aside></Aside>
        <div>
          <img
            src={Logo}
            alt="logo"
            className="mx-auto md:ml-96 lg:mx-auto h-[300px]"
          />
          <h1 className="text-4xl font-extrabold text-transparent mb-8 bg-clip-text bg-gradient-to-r from-indigo-600 via-orange-300 to-yellow-500 leading-none sm:text-5xl lg:text-6xl md:ml-52 lg:mx-auto">
            EVENTOS
          </h1>
          <div className="grid mx-auto items-center space-y-2 p-4 md:flex md:space-y-0 md:w-1/2 md:justify-center md:gap-6 md:ml-80 lg:mx-auto">
            <div className="grid justify-center py-6 px-12 bg-gradient-to-r from-transparent via-violet-200 to-violet-300 bg-opacity-50 rounded md:p-8">
              <h1 className="text-6xl font-bold text-violet-500">
                {eventos?.length}
              </h1>
              <p className="text-violet-600 uppercase">Eventos registrados</p>
            </div>
            <div className="grid py-6 px-12 bg-gradient-to-r from-transparent via-blue-200 to-blue-300 bg-opacity-50 rounded md:p-8">
              <h1 className="text-6xl font-bold text-blue-400">
                {eventos?.filter((e) => e.status === "active").length}
              </h1>
              <p className="text-blue-600 uppercase">Eventos activos</p>
            </div>
            <div className="grid py-6 px-12 bg-gradient-to-r from-transparent via-red-200 to-red-300 bg-opacity-50 rounded md:p-8">
              <h1 className="text-6xl font-bold text-red-400">
                {eventos?.filter((e) => e.status === "closed").length}
              </h1>
              <p className="text-red-600 uppercase">Eventos finalizados</p>
            </div>
          </div>
        </div>
      </section>
    );
  } else {
    return (
      <div className="w-full">
        <Error></Error>
      </div>
    );
  }
};

export default Dashboard;
