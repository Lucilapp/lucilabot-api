import { LUCILAPP_API_IP } from "../config/constants.js"

export default class TaskRepository {
    createTask = async (desc, tomada, idCat, idCliente, idUsuario, socket) => {
        const data = {
            descripcion: desc,
            tomada: tomada,
            idCategoria: idCat,
            idCliente: idCliente,
            idUsuario: idUsuario,
            clientSocket: socket
          };
        try {
            console.log("POST Tarea")
            const response = await fetch(`${LUCILAPP_API_IP}tarea`, {
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
