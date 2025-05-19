import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Hobbies } from '../../interface/hobbies.model';
import { FormControl, ReactiveFormsModule, Validators, AbstractControl, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  // intro = 'Bienvenido al Mundo de la Programación Frontend con Angular';
  hobbies = signal<Hobbies[]>([
    {
      id:Date.now(),
      hobbie:'Ver TV',
      complement: false
    },
    {
      id:Date.now(),
      hobbie:'Ver Documentales',
      complement: false
    },
    {
      id:Date.now(),
      hobbie:'Jugar videoJuegos',
      complement: false
    }
    , {
      id:Date.now(),
      hobbie:'Ir a pasear',
      complement: false
    }
  ]);

  filter = signal<'all'| 'pending' | 'complement'>('all');
  tasksByFilter = computed(()=>{
    const filter = this.filter();
    const hobbie = this.hobbies();
    if(filter === 'pending'){
      return hobbie.filter(hobbie => !hobbie.complement);
    }
    if(filter === 'complement'){
      return hobbie.filter(hobbie => hobbie.complement);
    }
    return  hobbie;
  });

  newHobbieCrtl = new FormControl('',{
    nonNullable:true,
    validators:[
      Validators.required,
      // this.nowhiteSpaceValidator()
       
    ]
  });
  //Funcion que no permita registrar espacios
  // nowhiteSpaceValidator(): ValidatorFn{
  //   return (control: AbstractControl): {[key:string] : any} | null =>{
  //     const isWhitespace = (control.value || '').trim().length === 0;
  //     const isValid = ! isWhitespace;
  //     return isValid ? null : {
  //       'Whitespace':true
  //     };
  //   }
  // }
  changeHundler(){
    if(this.newHobbieCrtl.valid){
      const value = this.newHobbieCrtl.value.trim();
      if(value !== ''){
        this.addHobbie(value);
        this.newHobbieCrtl.setValue('');
      }
    
    }        
  }
  addHobbie(hobbie: string){
    const newHobbie = {
      id: Date.now(),
      hobbie,
      complement: false
    };
    this.hobbies.update((hobbie)=>[...hobbie, newHobbie])
  }

  //Funcion que selecciona un indice dependiendo de la seleccion
  updateHobbie(index : number){
    this.hobbies.update((hobbie)=>{
      return hobbie.map((hobbie, position)=>{
        if(position === index){
          return {
            ...hobbie,
            complement: !hobbie.complement
          }
        }
        return hobbie;
      })
    })
  }
  deleteHobbie(index: number){
    this.hobbies.update(()=>{
      this.hobbies().splice(index,1);
      return this.hobbies();
    });
  }
  updateHobbieEditingMode(index : number){
    this.hobbies.update(prevState =>{
      return prevState.map((hobbie, position)=>{
        if(position === index){
          return{
            ...hobbie,
            editing:true
          }
        }
        return {
          ...hobbie,
          editing: false
        };
      })
    })
  };
  updateHobbieText(index : number, event:Event){
    const input = event.target as HTMLInputElement;
    this.hobbies.update(prevState =>{
      return prevState.map((hobbie, position)=>{
        if(position === index){
          return{
            ...hobbie,
            hobbie: input.value,
            editing: false
          }
        }
       return hobbie;
      })
    })
  };

  changeFilter(filter: 'all'| 'pending' | 'complement'){
    this.filter.set(filter);
  }

}
