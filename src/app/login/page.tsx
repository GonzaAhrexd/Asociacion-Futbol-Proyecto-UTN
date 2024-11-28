"use client";
import React from "react";
import { useForm } from "react-hook-form";
import InputText from "../../components/Inputs/InputText";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

function page() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const router = useRouter();

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div className="w-full md:w-3/10 h-screen md:h-7/10 flex flex-col items-center justify-center bg-gray-100 border shadow rounded-lg p-2">
        <h1 className="text-4xl">Inicia sesión</h1>
        <form
          className="w-full p-2"
          onSubmit={handleSubmit(async (data) => {
            console.log(data);
            const res = await signIn("credentials", {
              dni: data.dni,
              password: data.pass,
              redirect: false,
            });

            if (res?.error) {
              alert(res.error);
            } else {
              router.push("/");
            }

            console.log(res);
          })}
        >
          <InputText
            campo="DNI"
            type="text"
            nombre="dni"
            register={register}
            require
            errors={errors.dni}
          />
          <InputText
            campo="Contraseña"
            type="password"
            nombre="pass"
            register={register}
            require
            errors={errors.pass}
          />
          <div className="flex items-center justify-center">
            <span>
              ¿No tienes cuenta?{" "}
              <Link href="/register" className="text-green-600">
                ¡Registrate!
              </Link>
            </span>
          </div>
          <button
            type="submit"
            className="bg-green-600 text-white p-2 rounded-lg w-full my-2 "
          >
            Iniciar sesión
          </button>
        </form>
      </div>
    </div>
  );
}

export default page;
