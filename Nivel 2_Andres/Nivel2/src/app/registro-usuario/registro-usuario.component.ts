import { Component, OnInit } from '@angular/core';
// Importa las clases necesarias para Reactive Forms
import { CommonModule } from '@angular/common'; // Necesario para *ngIf
import { ReactiveFormsModule } from '@angular/forms'; // Necesario para [formGroup], formControlName
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  // Declara la propiedad para el FormGroup
  registroForm: FormGroup;

  // Inyecta FormBuilder en el constructor
  constructor(private fb: FormBuilder) {
    // Inicializa el FormGroup vacío aquí para evitar errores antes de ngOnInit
    this.registroForm = this.fb.group({});
  }

  ngOnInit(): void {
    // Define la estructura y validaciones del formulario
    this.registroForm = this.fb.group({
      // Define cada control del formulario
      // Validators.required hace que el campo sea obligatorio
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      genero: ['', Validators.required],
      // Añadimos validadores de mínimo y máximo para la edad
      edad: ['', [Validators.required, Validators.min(5), Validators.max(18)]]
    });
  }

  // Función que se llamará cuando se envíe el formulario
  onSubmit(): void {
    if (this.registroForm.valid) {
      console.log('Formulario Enviado:', this.registroForm.value);
      // AQUÍ es donde, más adelante, llamaremos a un servicio
      // para enviar this.registroForm.value al backend (Spring Boot)
      alert('¡Datos listos para enviar! (Ver consola para detalles)');
      // Podríamos resetear el formulario después de enviar
      // this.registroForm.reset();
    } else {
      console.error('El formulario no es válido');
      // Marcar todos los campos como 'touched' para mostrar errores si no lo están
      this.registroForm.markAllAsTouched();
    }
  }

  // Puedes añadir getters para acceder fácilmente a los controles en el HTML (opcional)
  // get nombre() { return this.registroForm.get('nombre'); }
  // get apellido() { return this.registroForm.get('apellido'); }
  // ...etc
}