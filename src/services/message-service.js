export default class MessageService{
    getAllAsync = async () => {
        const returnArray = await repo.getAllAsync();
        return returnArray;
        
    }
}