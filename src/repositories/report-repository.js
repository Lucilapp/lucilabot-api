import { LUCILAPP_API_IP } from "../config/constants.js"

export default class ReportRepository{
    createReport = async (idUsu, idCli, rep) => {
        const data = {
            idUsuario: idUsu,
            idCliente: idCli,
            reporte: rep,
          };
          try {
            const response = await fetch(`${LUCILAPP_API_IP}reporte`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(data)
            });
        
            if (response.ok) {
              const result = await response.json();
            } else {
              console.error('Error en la solicitud:', response.statusText);
            }
          } catch (error) {
            console.log(error);
          }
    }
}