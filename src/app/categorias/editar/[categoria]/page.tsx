export default async function Page({
    params,
  }: {
    params: Promise<{ nombre: string }>
  }) {

    const nombre = (await params).nombre
    
    return <div>Categoria: {nombre}</div>


  }