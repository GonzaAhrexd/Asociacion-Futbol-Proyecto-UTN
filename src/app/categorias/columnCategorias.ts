/* 
--------------------------------------------------------------------------------------------------------
    CAMPOS
    name: Nombre de la columna
    selector: Campo que se mostrará en la columna, debe ir en el formato (row:Row) => row.nombre_campo
    sortable: Si se puede ordenar la columna
    style: Estilos de la columna
----------------------------------------------------------------------------------------------------------
*/

// Datos que se mostrarán en la tabla de denuncias
type Row = {
    nombre: string;
    edad_minima: number;
    edad_maxima: number;
}

// Columnas de la tabla de denuncias
const ColumnCategorias = [
    {
        // Nombre de usuario
        name: 'Nombre',
        selector: (row:Row) => row.nombre,
        sortable: true,
        style: {
            fontSize: '14px',
            fontWeight: 500,
        },
    },
    {
        name: "Edad mínima",
        selector: (row:Row) => row.edad_minima,
        sortable: true,
        style: {
            fontSize: '14px',
            fontWeight: 500,
        },
    },
    {
        name: "Edad máxima",
        selector: (row:Row) => row.edad_maxima,
        sortable: true,
        style: {
            fontSize: '14px',
            fontWeight: 500,
        },
    },
   
  
];

export default ColumnCategorias