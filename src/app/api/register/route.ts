import { NextResponse } from 'next/server';

// export async function GET() {
//   return NextResponse.json({ message: 'Respuesta a GET' });
// }

export async function POST(req: Request) {
  const body = await req.json();
  

  return NextResponse.json({ message: 'Datos recibidos', data: body });


}
