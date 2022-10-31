import React, { useState } from "react";
import * as xlsx from "xlsx";
import { createList } from "../../redux/actions/actions";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { BsFileEarmarkPlusFill } from "react-icons/bs";
import { FaFileUpload } from "react-icons/fa";
import SideBar from "../SideBar/SideBar";
import Aside from "../Aside/Aside";
import Error from "../Error/Error";
import Swal from "sweetalert2";
import axios from "axios";

const CrearLista = (props) => {
  const id = props.match.params.id;
  const tk = sessionStorage.getItem("token");

  // console.log(id);
  // const dispatch = useDispatch();
  const history = useHistory();
  const [lista, setLista] = useState([]);
  const [listName, setListName] = useState({});
  const readUploadFile = (e) => {
    if (e.target.files) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = xlsx.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        let json = xlsx.utils.sheet_to_json(worksheet);
        json = json.map((i) => {
          return { ...i, inv_id: parseInt(i.id) };
        });
        // console.log("EL YEISON", json);
        json.length !== 0 && setLista(json);
        console.log(json);
      };

      reader.readAsArrayBuffer(e.target.files[0]);
      const filename = e.target.files[0]?.name.replace("_", " ");
      const cut = filename?.indexOf(".");
      console.log(filename);
      filename && setListName({ listName: filename.slice(0, cut) });
    }
  };
  console.log("LA LISTA", lista);
  console.log("EL NOMBRE", listName);
  const handleSubmit = () => {
    if (lista.length > 0 && listName) {
      Swal.fire({
        title: "¿Crear lista?",
        showCancelButton: true,
        confirmButtonText: "Crear",
        cancelButtonText: `Cancelar`,
        width: "300px",
        color: "#8c8a8a",
        confirmButtonColor: "#0d9488",
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .post(
              `https://backenddeploy-production.up.railway.app/invitados/${id}`,
              { withCredentials: true },
              [lista, listName]
            )
            .then((res) => {
              Swal.fire({
                title: "Lista creada correctamente",
                confirmButtonText: "Ok",
                confirmButtonColor: "#0d9488",
                icon: "success",
              }).then((result) => {
                history.push("/eventos/" + id);
                setLista([]);
              });
            })
            .catch(function (error) {
              Swal.fire({
                title: "Ha ocurrido un error. Intente nuevamente.",
                confirmButtonText: "Ok",
                confirmButtonColor: "#e11d48",
                icon: "error",
              }).then((result) => {
                if (result.isConfirmed) {
                  setLista([]);
                  history.push("/eventos/" + id + "/listas/crear");
                }
                setLista([]);
                history.push("/eventos/" + id + "/listas/crear");
              });
            });
        }
      });
    }
  };

  if (!tk) {
    return <Error />;
  } else {
    return (
      <section className="dark:bg-gray-900 min-h-screen">
        <SideBar />

        <Aside id={id} />
        <div className="md:ml-60 mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-semibold sm:text-4xl text-center md:text-start grid dark:text-gray-100">
            Crear Lista
            <span className="text-lg font-light text-gray-600">
              Carga de archivo
            </span>
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-x-12 gap-y-6 text-left">
            <div className="relative mb-6">
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none text-gray-400 focus:text-gray-900">
                <BsFileEarmarkPlusFill size={20} />
              </div>
              <input
                className="bg-gray-50 border border-gray-300 text-gray-600 text-sm rounded-lg focus:ring-blue-100 focus:border-blue-50 block w-full pl-10 p-2.5 py-4"
                id="upload"
                type="file"
                name="upload"
                onChange={readUploadFile}
              />
            </div>
            <p
              className={
                lista?.length > 0
                  ? "flex gap-1 items-center justify-center bg-teal-600 w-[120px] cursor-pointer text-gray-100 py-2 px-2 rounded-md hover:bg-teal-500 hover:text-gray-50 text-center"
                  : "flex gap-1 items-center justify-center bg-teal-600 opacity-50 w-[120px] pl-2 text-gray-300 py-2 rounded-md text-center"
              }
              onClick={() => lista?.length > 0 && handleSubmit()}
            >
              Crear lista
              <span>
                <FaFileUpload size={20} />
              </span>
            </p>
          </div>
        </div>
      </section>
    );
  }
};

export default CrearLista;
