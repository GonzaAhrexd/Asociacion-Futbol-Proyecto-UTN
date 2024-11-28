/* 
--------------------------------------------------------------------------------------------------------
    CAMPOS
    name: Nombre de la columna
    selector: Campo que se mostrará en la columna, debe ir en el formato (row:Row) => row.nombre_campo
    sortable: Si se puede ordenar la columna
    style: Estilos de la columna
----------------------------------------------------------------------------------------------------------
*/

// model Equipo {
//     nro_equipo Int @id // PK
//     dni_dt_fk Int
//     categoria_fk String 
//     nombre String
//     division String
    
//     categoria Categoria @relation(fields: [categoria_fk], references: [nombre])
//     directorTecnico DirectorTecnico @relation(fields: [dni_dt_fk], references: [dni_dt_fk])
//     jugadores Jugador[]
//     torneos   EquipoTorneo[]
//     partidos  EquipoPartido[]
// }

type Row = {
    dni_dt_fk: number;
    categoria_fk: string;
    nombre: string;
    division: string;
}

const ColumnEquipos = [
    {
        name: 'Nombre',
        selector: (row:Row) => row.nombre,
        sortable: true,
        style: {
            fontSize: '14px',
            fontWeight: 500,
        },
    },
    {
        name: "Categoria",
        selector: (row:Row) => row.categoria_fk,
        sortable: true,
        style: {
            fontSize: '14px',
            fontWeight: 500,
        },
    },
    {
        name: "Dni DT",
        selector: (row:Row) => row.dni_dt_fk,
        sortable: true,
        style: {
            fontSize: '14px',
            fontWeight: 500,
        },
    },
    {
        name: "Division",
        selector: (row:Row) => row.division,
        sortable: true,
        style: {
            fontSize: '14px',
            fontWeight: 500,
        },
    },
   
  
];

export default ColumnEquipos