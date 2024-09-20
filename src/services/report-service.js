import ReportRepository from "../repositories/report-repository.js"

export default class ReportService {
    createReport = (idUsuario, idCliente, reporte) =>{
        const repo =  new ReportRepository();
        repo.createReport(idUsuario, idCliente, reporte)
    }
}