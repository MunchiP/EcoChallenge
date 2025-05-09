import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../usuario.service'; // <-- 1. Importa tu servicio

@Component({
  selector: 'app-registro-usuario',
  standalone: true,
  imports: [
       CommonModule,
       ReactiveFormsModule
  ],
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.css']
})
export class RegistroUsuarioComponent implements OnInit {

  registroForm!: FormGroup; // Usa '!' para indicar que se inicializará en ngOnInit o constructor

  // Inyecta FormBuilder y tu UsuarioService
  constructor(private fb: FormBuilder, private usuarioService: UsuarioService) { // <-- 2. Inyecta el servicio
    // Puedes inicializar aquí también si prefieres:
    this.registroForm = this.fb.group({});
  }

  ngOnInit(): void {
    // Define la estructura y validaciones del formulario
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      genero: ['', Validators.required],
      edad: ['', [Validators.required, Validators.min(5), Validators.max(18)]]
    });
  }

  onSubmit(): void {
    if (this.registroForm.valid) {
      console.log('Formulario válido. Enviando datos...');

      // 3. Llama al servicio para enviar los datos al backend
      this.usuarioService.registrarUsuario(this.registroForm.value).subscribe({
        next: (respuestaBackend) => {
          // Esto se ejecuta si la petición POST fue exitosa (ej. código 200, 201)
          console.log('✅ Registro exitoso:', respuestaBackend);
          alert('¡Registro exitoso!');
          // Aquí podrías redirigir al usuario a otra página,
          // mostrar un mensaje de éxito en la interfaz, etc.
          this.registroForm.reset(); // Opcional: resetear el formulario después de éxito
        },
        error: (errorBackend) => {
          // Esto se ejecuta si hubo un error en la petición (ej. 400 Bad Request, 500 Internal Server Error)
          console.error('❌ Error en el registro:', errorBackend);
          alert('Hubo un error en el registro. Revisa la consola para más detalles.');
          // Aquí podrías mostrar errores específicos del backend al usuario
        },
        complete: () => {
          // Esto se ejecuta al finalizar la petición (éxito o error)
          console.log('▶️ Proceso de envío a backend finalizado.');
        }
      });

    } else {
      console.error('El formulario no es válido. No se enviarán los datos.');
      // 4. Marca los campos como 'touched' para que se muestren los mensajes de error en el HTML
      this.registroForm.markAllAsTouched();
      alert('Por favor, completa el formulario correctamente.'); // Mensaje básico para el usuario
    }
  }

  get nombre() { return this.registroForm.get('nombre'); }
  get apellido() { return this.registroForm.get('apellido'); }
  get genero() { return this.registroForm.get('genero'); }
  get edad() { return this.registroForm.get('edad'); }

}