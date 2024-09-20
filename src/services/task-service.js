import { toNamespacedPath } from "path";
import TaskRepository from "../repositories/task-repository.js"

export default class TaskService {
    createTask = (desc, idCat, idClient, idSocket) => {
        const repo = new TaskRepository();
        repo.createTask(desc, false, idCat, idClient, null, idSocket)
    }
}