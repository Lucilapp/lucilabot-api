//ips
export const LUCILAPP_API_IP = "http://localhost:3000/api/";
export const SOCKET_API_IP = "http://localhost:5001/"

//control
export const CHAT_TIMEOUT_MS = 600000;

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
export const ID_MENSAJE_INPUT_AYUDA_APPS = 16;
export const ID_MENSAJE_INPUT_SOPORTE = 14;
export const ID_MENSAJE_INPUT_AYUDA_WEB = 11;

//finalizacion msgs
export const ID_MENSAJE_CHAT_TERMINADO = 21;
export const ID_MENSAJE_CHAT_TERMINADO_EXITOSO = 22;
export const ID_MENSAJE_CHAT_TERMINADO_NO_EXITOSO = 23;

//cats
export const ID_CATEGORIA_PAGINAS_WEB = 21;
export const CatArray = [
    {
        idMsg: 10,
        answers: [
            {letter: "A", catId: 2},
            {letter: "B", catId: 4},
            {letter: "C", catId: 19},
            {letter: "D", catId: 7},
            {letter: "E", catId: 5},
            {letter: "F", catId: 8},
            {letter: "G", catId: 20},
        ]
    },
    {
        idMsg: 17,
        answers: [
            {letter: "A", catId: 10},
            {letter: "B", catId: 11},
            {letter: "C", catId: 12},
            {letter: "D", catId: 13}
        ]
    }
];
