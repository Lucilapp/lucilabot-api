//ips
export const LUCILAPP_API_IP = "https://8960-200-73-176-50.ngrok-free.app/api/";
export const SOCKET_API_IP = "http://localhost:5001"

//control
export const CHAT_TIMEOUT_MS = 180000;

//control msgs
export const ID_MENSAJE_INICIO = 1;
export const ID_MENSAJE_REGISTRO = 0;
export const ID_MENSAJE_FIN_REGISTRO = 9;
export const ID_MENSAJE_TIMEOUT = 19;
export const ID_MENSAJE_ERROR_INTERNO = 20;
export const ID_MENSAJE_RESPUESTA_INVALIDA = 18;
export const ID_MENSAJE_CONEXION_CHAT = 12;
export const ID_MENSAJE_INCORRECTO = 18;

//input msgs
export const ID_MENSAJE_INPUT_NOMBRE = 3;
export const ID_MENSAJE_INPUT_EDAD = 4;
export const ID_MENSAJE_INPUT_DNI = 5;
export const ID_MENSAJE_INPUT_GENERO = 6;
export const ID_MENSAJE_INPUT_AYUDA_INICO = 11;
export const ID_MENSAJE_INPUT_AYUDA_APPS = 16;
export const ID_MENSAJE_INPUT_SOPORTE = 14;

//categorias
export const CatArray = [
    {
        idMsg: 10,
        answers: [
            {letter: "A", catId: 1},
            {letter: "B", catId: 2},
            {letter: "C", catId: 4},
            {letter: "D", catId: 7},
            {letter: "E", catId: 5},
        ]
    },
    {
        idMsg: 17,
        answers: [
            {letter: "B", catId: 8},
            {letter: "C", catId: 10},
            {letter: "D", catId: 11},
            {letter: "E", catId: 12},
            {letter: "F", catId: 13},
        ]
    }
];