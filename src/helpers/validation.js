export default class ValidationHelper {
    validarNombre = (nombre) => {
        console.log(nombre)
        // Expresión regular para validar que el nombre solo contenga letras (mayúsculas o minúsculas) y espacios, y que permita caracteres acentuados
        const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
    
        // Verificar que el nombre cumpla con la expresión regular
        if (!regex.test(nombre)) {
            return false;
        }
    
        // Dividir el nombre en palabras (eliminar espacios extra)
        const palabras = nombre.trim().split(/\s+/);
    
        // Verificar que haya al menos dos palabras
        if (palabras.length < 2) {
            return false;
        }
    
        // Verificar que cada palabra tenga al menos dos letras
        for (const palabra of palabras) {
            if (palabra.length < 2) {
                return false;
            }
        }
    
        // Si pasa todas las comprobaciones, el nombre es válido
        return true;
    };
    
    // Validar un año (de 1 a 3 dígitos)
    validarAno = (ano) => {
        // Expresión regular para verificar que el año tenga entre 1 y 3 dígitos
        const regex = /^\d{1,3}$/;
    
        // Verificar que el año cumple con la expresión regular
        return regex.test(ano);
    };
    
    // Validar un DNI (solo números y de 7 a 8 dígitos)
    validarDNI = (dni) => {
        // Expresión regular para verificar que el DNI es solo números y tiene entre 7 y 8 dígitos
        const regex = /^\d{7,8}$/;
    
        // Verificar que el DNI cumple con la expresión regular
        return regex.test(dni);
    };
    
    // Validar el género (solo 'M', 'F' o 'X')
    validarGenero = (genero) => {
        // Eliminar espacios al inicio y al final, y convertir a mayúsculas
        genero = genero.trim().toUpperCase();
        
        // Expresión regular para verificar que el género sea solo 'M', 'F' o 'X'
        const regex = /^[MFX]$/;
        
        // Verificar que el género cumple con la expresión regular
        return regex.test(genero);
    };    
}

