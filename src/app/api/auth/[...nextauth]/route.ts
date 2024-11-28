import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import db from "@/libs/db";
import bcrypt from "bcrypt";

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        dni: { label: "DNI", type: "string", placeholder: "41988321" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "*******",
        },
      },
      async authorize(credentials, req) {
        console.log(credentials);

        const userFound = await db.persona.findUnique({
          where: {
            dni: Number(credentials.dni),
          },
        });

        if (!userFound) throw new Error("Usuario no encontrado");

        console.log(userFound);

        const matchPassword = await bcrypt.compare(
          credentials?.password,
          userFound.pass
        );

        if (!matchPassword) throw new Error("Credenciales invalidas");

        return {
          id: userFound.dni,
          name: userFound.nombre,
          dir: userFound.direccion,
        };
      },
    }),
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
