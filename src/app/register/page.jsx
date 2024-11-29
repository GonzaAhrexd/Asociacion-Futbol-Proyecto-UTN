"use client";
import React from "react";
import { useForm } from "react-hook-form";
import InputText from "../../components/Inputs/InputText";
import Link from "next/link";
// import { registerUser } from "@/utils/register/register";
import { useState } from "react";
import InputDate from "@/components/Inputs/InputDate";
import Swal from "sweetalert2";
import { signIn } from "next-auth/react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Page() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const router = useRouter();
  const [rol, setRol] = useState("");
  ///////// codigo nuevo

  function calcularEdad(fecha_nacimiento) {
    const hoy = new Date(); // Fecha actual
    const nacimiento = new Date(fecha_nacimiento); // Fecha de nacimiento

    // Calcular la diferencia en años
    let edad = hoy.getFullYear() - nacimiento.getFullYear();

    // Ajustar la edad si el cumpleaños aún no ha ocurrido este año
    const mesActual = hoy.getMonth();
    const diaActual = hoy.getDate();
    const mesNacimiento = nacimiento.getMonth();
    const diaNacimiento = nacimiento.getDate();

    // Si aún no ha llegado el cumpleaños de este año, resta 1
    if (
      mesActual < mesNacimiento ||
      (mesActual === mesNacimiento && diaActual < diaNacimiento)
    ) {
      edad--;
    }

    return edad;
  }

  const crearJugador = async ({ dni, categoriaJugador, nro_socio }) => {
    try {
      // Envía los datos en formato JSON
      const signupResponse = await axios.post("/api/jugador", {
        dni_jugador_fk: dni,
        categoria_fk: categoriaJugador,
        nro_socio: nro_socio,
        nro_equipo: null,
        es_responsable: false,
        foto: "foto",
      });

      console.log(signupResponse);
    } catch (error) {
      if (error.response) {
        console.log(error);
      }
    }
  };

  const crearPersona = async (data) => {
    try {
      const edadJugador = calcularEdad(data.fecha_nacimiento);
      let categoriaJugador = "";

      if (edadJugador >= 41 && edadJugador <= 45) {
        categoriaJugador = "Maxi";
      } else if (edadJugador >= 46 && edadJugador <= 50) {
        categoriaJugador = "Super";
      } else if (edadJugador >= 51 && edadJugador <= 55) {
        categoriaJugador = "Master";
      } else {
        categoriaJugador = "juvenil";
      }

      // Envía los datos en formato JSON
      const signupResponse = await axios.post("/api/register", {
        nombre: data.nombre,
        apellido: data.apellido,
        dni: data.dni,
        fecha_nacimiento: data.fecha_nacimiento,
        direccion_calle: data.direccion_calle,
        direccion_altura: data.direccion_altura,
        pass: data.pass,
      });

      console.log(signupResponse);

      if (data.rol == "Jugador") {
        crearJugador({
          dni: data.dni,
          categoriaJugador,
          nro_socio: data.nro_socio,
        });
      } else if (data.rol == "Arbitro") {
        crearArbitro();
      }

      const res = await signIn("credentials", {
        dni: signupResponse.data.dni,
        password: data.pass,
        redirect: false,
      });

      if (res?.ok) return router.push("/");
    } catch (error) {
      if (error.response) {
        console.log(error);
      }
    }
  };





  ///////// codigo nuevo


  const [nivelExp, setNivelExp] = useState("Elige una opción");
  const [mensajeError, setMensajeError] = useState("");

  return (
    <div className="h-auto py-20 flex flex-col items-center justify-center">
      <div className="w-full md:w-3/10 h-screen md:h-8/10 flex flex-col items-center justify-center bg-gray-100 border shadow rounded-lg p-2">
        <span className="text-white bg-red-700 rounded-lg h-5">
          {mensajeError}
        </span>
        <h1 className="text-4xl">Registro de usuario</h1>
        <form className="w-full p-2" onSubmit={handleSubmit(crearPersona)}>
          <div className="flex flex-row justify-evenly items-center gap-4">
            <InputText
              campo="Nombre"
              type="text"
              nombre="nombre"
              register={register}
              require
              errors={errors.nombre}
            />
            <InputText
              campo="Apellido"
              type="text"
              nombre="apellido"
              register={register}
              require
              errors={errors.apellido}
            />
          </div>

          <div className="flex flex-row justify-evenly items-center gap-4">
            <InputText
              campo="dni"
              type="text"
              nombre="dni"
              register={register}
              require
              errors={errors.dni}
            />
            <InputDate
              campo="Fecha de nacimiento"
              nombre="fecha_nacimiento"
              placeholder="Selecciona una fecha"
              register={register}
              setValue={setValue}
              require={true}
            />
          </div>
          <div className="flex flex-row justify-evenly items-center gap-4">
            <InputText
              campo="Contraseña"
              type="password"
              nombre="pass"
              register={register}
              require
              errors={errors.pass}
            />
            <InputText
              campo="Repite la contraseña"
              type="password"
              nombre="pass_repeat"
              register={register}
              require
              errors={errors.pass_repeat}
            />
          </div>
          <div className="flex flex-row justify-evenly items-center gap-4">
            <InputText
              campo="Calle"
              type="text"
              nombre="direccion_calle"
              register={register}
              require
              errors={errors.direccion_calle}
            />
            <InputText
              campo="Altura"
              type="text"
              nombre="direccion_altura"
              register={register}
              require
              errors={errors.direccion_altura}
            />
          </div>
          <div className="flex flex-col my-4 h-24 justify-evenly">
            <h3 className="text-center">¿Qué sos?</h3>
            <div className="flex flex-row justify-evenly items-center gap-4">
              <label>
                <input
                  type="radio"
                  value="Jugador"
                  {...register("rol", { required: true })} // Registrar el campo
                  checked={rol === "Jugador"} // Controlado por el estado
                  onChange={(e) => setRol(e.target.value)}
                />
                Jugador
              </label>
              <label>
                <input
                  type="radio"
                  value="Arbitro"
                  {...register("rol", { required: true })}
                  checked={rol === "Arbitro"} // Controlado por el estado
                  onChange={(e) => setRol(e.target.value)}
                />
                Árbitro
              </label>
            </div>
          </div>
          {rol === "Jugador" && (
            <div className="flex flex-col justify-evenly items-center gap-4 text-center">
              <InputText
                campo="Número de socio"
                type="text"
                nombre="nro_socio"
                register={register}
                require
                errors={errors.numero_socio}
              />
              <div className="my-8">
                <label className="font-semibold">Foto</label>
                <input
                  type="file"
                  {...register("foto", { required: true })}
                  accept="image/*" // Restringir a imágenes
                  className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-600"
                />
                {errors?.foto && (
                  <span className="text-red-600 text-sm">
                    Este campo es obligatorio
                  </span>
                )}
              </div>
            </div>
          )}

          {/* {rol === "Arbitro" && (
            <div className="flex flex-col justify-evenly items-center gap-4 text-center">
              <label className="font-semibold">Nivel de experiencia</label>
              <select
                className="px-4 py-2"
                defaultValue=""
                {...register("nivelExp", {
                  required: "El nivel es obligatorio",
                })}
              >
                <option value="" disabled>
                  Elige una opción
                </option>
                <option value="Principiante">Principiante</option>
                <option value="Intermerdio">Intermedio</option>
                <option value="Avanzado">Avanzado</option>
              </select>
              <div className="my-8">
                <label className="font-semibold mr-2">Tengo certificado</label>
                <input
                  type="checkbox"
                  value="tiene_cert"
                  {...register("tiene_cert")}
                />
              </div>
            </div>
          )} */}

          <div className="flex items-center justify-center">
            <span>
              Ya tienes cuenta?{" "}
              <Link href="/login" className="text-green-600">
                ¡Inicia sesión!
              </Link>
            </span>
          </div>
          <button
            type="submit"
            className="bg-green-600 text-white p-2 rounded-lg w-full my-2 "
          >
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
}
