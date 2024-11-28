import Link from 'next/link'
export default function Home() {

  const botonGris300 = "m-2 bg-gray-300 px-5 py-2 rounded"

  return (
    <div>
      <div className='flex flex-col w-fit'>
          <h1>Aca podriamos poner un panel de admin o algo asi</h1>
          <Link href="/" className={botonGris300}>Canchas</Link>
          <Link href="/categorias" className={botonGris300}>Categorias</Link>

      </div>
    </div>
   
  );
}
