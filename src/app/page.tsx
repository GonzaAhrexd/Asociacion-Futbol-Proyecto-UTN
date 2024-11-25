import Link from 'next/link'
export default function Home() {
  const estilosBotones = "m-2 bg-gray-300 px-5 py-2 rounded"

  return (
   <div className='flex flex-col w-fit'>
      <h1>Home</h1>
      <Link href="/" className={estilosBotones}>Canchas</Link>
      <Link href="/categorias" className={estilosBotones}>Categorias</Link>

   </div>
  );
}
