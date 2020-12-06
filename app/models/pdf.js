let html ={
    contenido : (nombre,nombreDueño,fecha, nombreVet, tipo, diagnostico) => { 
        return `<div id="borde">
        <p align="center">
            Veterinaria<br />
            Urgencias las 24 horas.<br />
        </p>
        <p>
            <strong>Generales</strong>:<br />
            <strong>Nombre mascota</strong>: <u>${nombre}</u> &nbsp;Fecha: <u>${fecha}</u><br />
            <strong>Nombre dueño</strong>: <u>${nombreDueño}</u> &nbsp;<strong>Tipo de consulta</strong>: <u>${tipo}</u>
        </p> ${diagnostico}
        <p align="center">
            Doctor(a). ${nombreVet}<br />
            Firma
        </p>
    </div>
    `}
}

module.exports = html;
























