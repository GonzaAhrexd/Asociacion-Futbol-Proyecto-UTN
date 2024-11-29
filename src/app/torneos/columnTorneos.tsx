/* 
--------------------------------------------------------------------------------------------------------
    CAMPOS
    name: Nombre de la columna
    selector: Campo que se mostrará en la columna, debe ir en el formato (row:Row) => row.nombre_campo
    sortable: Si se puede ordenar la columna
    style: Estilos de la columna
----------------------------------------------------------------------------------------------------------
*/

import { DateTime } from "next-auth/providers/kakao";

/*
    nombre String @id // PK
  categoria_fk String
  inscripciones_inicio DateTime
  inscripciones_fin DateTime
  inicio_torneo DateTime
  fin_torneo DateTime
  esta_habilitado Boolean
*/

type Row = {
    nombre:string;
    categoria_fk:string;
    inscripciones_inicio:DateTime;
    inscripciones_fin:DateTime;
    inicio_torneo:DateTime;
    fin_torneo:DateTime;
    esta_habilitado: number;
    division:string;
}

const columnTorneos = [
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
        name: "Division",
        selector: (row:Row) => row.division,
        sortable: true,
        style: {
            fontSize: '14px',
            fontWeight: 500,
        },
    },
    {
        name: "Inicio inscripciones",
        selector: (row:Row) => row.inscripciones_inicio,
        sortable: true,
        style: {
            fontSize: '14px',
            fontWeight: 500,
        },
    },
    {
        name: "Inicio inscripciones",
        selector: (row:Row) => row.inscripciones_inicio,
        sortable: true,
        style: {
            fontSize: '14px',
            fontWeight: 500,
        },
    },
    {
        name: "Fin inscripciones",
        selector: (row:Row) => row.inscripciones_fin,
        sortable: true,
        style: {
            fontSize: '14px',
            fontWeight: 500,
        },
    },
    {
        name: "Inicio torneo",
        selector: (row:Row) => row.inicio_torneo,
        sortable: true,
        style: {
            fontSize: '14px',
            fontWeight: 500,
        },
    },
    {
        name: "Fin torneo",
        selector: (row:Row) => row.inscripciones_inicio,
        sortable: true,
        style: {
            fontSize: '14px',
            fontWeight: 500,
        },
    },
    {
        name: "Esta habilitado",
        selector: (row:Row) => row.esta_habilitado == 0 ? "No" : "Si",
        sortable: true,
        style: {
            fontSize: '14px',
            fontWeight: 500,
        },
    },
    
   
  
];

export default columnTorneos