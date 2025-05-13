import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // <-- 1. Importa HttpClient
import { Observable } from 'rxjs'; // <-- 2. Importa Observable

@Injectable({
  providedIn: 'root' // Esto hace que el servicio esté disponible en toda la app
})
export class UsuarioService {

  // ¡IMPORTANTE! Ajusta esta URL base y la ruta específica
  // para que coincidan con el endpoint de registro de tu backend Spring Boot.
  // Pregúntale a tu compañero la URL exacta.
  private apiUrl = 'http://localhost:8080/api/usuarios'; // <-- 3. **AJUSTA ESTA URL**

  constructor(private http: HttpClient) { } // <-- 4. Inyecta HttpClient

  // Método para enviar los datos del usuario al backend
  registrarUsuario(datosUsuario: any): Observable<any> {
    // Usa http.post() para enviar los datos
    // El primer argumento es la URL completa del endpoint (URL base + ruta específica)
    // El segundo argumento son los datos a enviar (el objeto del formulario)
    console.log('Enviando a:', `${this.apiUrl}/registro`); // Opcional: Para depurar la URL
    console.log('Datos:', datosUsuario); // Opcional: Para depurar los datos que se envían
    return this.http.post<any>(`${this.apiUrl}/registro`, datosUsuario); // <-- 5. Llama a http.post
  }

  // Aquí podrías añadir otros métodos para interactuar con usuarios (ej. login, obtener datos, etc.)
}