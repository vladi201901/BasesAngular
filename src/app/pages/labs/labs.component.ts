import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-labs',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.css'
})
export class LabsComponent {
  apellido = 'Paz Fajardo';
  nombre = signal('Vladimir Jeanfranco');
  hobbies = signal([
    'Videojuegos',
    'Leer Comics',
    'Ver TV'  
  ]);
  person ={
    name: 'Vladimir Jeanfranco',
    lastname: 'Paz Fajardo',
    movil: 936301453,
    email: 'jeanfranco1035x@gmail.com',
    age :14,
    profesion : 'Developer Frontend',
    avatar: 'https://w3schools.com/howto/img_avatar.png'
  }
  imagen = 'https://blog.openreplay.com/images/3-methods-check-angular-version/images/hero.png';

  colorCtrl = new FormControl();
  widthCtrl = new FormControl(50, {
    nonNullable : true
  });
  
  nameCtrl = new FormControl(50, {
    nonNullable : true,
    validators : [
      Validators.required,
      Validators.minLength(3)
    ]
  });

  constructor(){
    this.colorCtrl.valueChanges.subscribe(value =>{
      console.log(value);
    });
  }
  clickHandler(){
    alert('Hola');
  }
  dblHandler(){
    alert('Doble Click')
  }
  changeHandler(event: Event){
    const input = event.target as HTMLInputElement;
    const newvalue = input.value;
    this.nombre.set(newvalue);
    console.log(event);
  }
  kedownHandler(event: KeyboardEvent){
    const input = event.target as HTMLInputElement;
    console.log(input.value);
  }
//  changeAge (event:Event){
//   const input = event.target as HTMLInputElement;
//   const newValue = input.value;
//   this.person.update(preState =>{
//     return {
//       ...preState,
//       age: parseInt(newValue, 10)
//     }
//   })
//  }

}
