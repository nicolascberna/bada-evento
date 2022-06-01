import { Component, OnInit } from '@angular/core';
import { EventoService } from '../../services/evento.service';
import { Router } from '@angular/router';
import { Age, Catering, Drinks, Entertainment, Music, Prevent, Site } from '../../models/evento.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-acordeon',
  templateUrl: './acordeon.component.html',
  styleUrls: ['./acordeon.component.scss']
})
export class AcordeonComponent implements OnInit {
  
  //variables usadas en los servicios para el llamado y guardado de los datos
  ageResult: Age[];
  cateringResult: Catering[];
  siteResult: Site[];
  musicResult: Music[];
  entertainmentResult: Entertainment[];
  drinksResult: Drinks[];
  musicValue = 0;
  siteValue = 0;
  entertaimentValue = 0;
  drinksValue = 0;
  cateringValue = 0;

  //variables usadas en el HTML para obtener el dato ingresado desde el input y calcular el totalItems
  //se asigna 1 para no dar valores en 0 al no ingresar nada en el input
  displayValue: number =1;

  //variable donde se guarda la suma de los valores selecccionados en el acordeón
  totalItems = 0;

  //se crea un objeto para almacenar los datos obtenidos del localStorage en getEvent
  event = {
    id: null,
    group: null,
    site: null,
    music: null,
    event_catering: null,
    event_drinks: null,
    event_entertainment: null,
    type: null,
    description: null,
    urlBase: null,
    value: null
  }

  //se guarda el ID del localStorage en una varible y así usarla para obtener los items de Catering, Drinks y Entertainment
  id = parseInt(localStorage.getItem("id"))

  //se guarda el prevent en el localStorage para ser cargado en el frame de datos y así actualizarlo
  getEvent = JSON.parse(localStorage.getItem("prevent"))

  constructor(
    private eventService: EventoService,
    private router: Router
  ) {}

  ngOnInit(): void {

    //se llama a la función y se le pasa el parametro del localStorage guardado en getEvent previamente
    this.setEventObject(this.getEvent)
    console.log(this.event)
    
    //se llama a los servicios para obtener los items de cada categoria
    this.eventService.getAge().subscribe((agesFromApi: Age[]) =>
      this.ageResult = agesFromApi
    ), error => console.error(error)

    this.eventService.getCatering(this.id).subscribe((cateringFromApi: Catering[]) =>
      this.cateringResult = cateringFromApi
    ), error => console.error(error)

    this.eventService.getSite().subscribe((siteFromApi: Site[]) =>
      this.siteResult = siteFromApi
    ), error => console.error(error)

    this.eventService.getMusic().subscribe((musicFromApi: Music[]) =>
      this.musicResult = musicFromApi
    ), error => console.error(error)

    this.eventService.getEntertainment(this.id).subscribe((entertainmentFromApi: Entertainment[]) =>
      this.entertainmentResult = entertainmentFromApi
    ), error => console.error(error)
      
    this.eventService.getDrinks(this.id).subscribe((drinksFromApi: Drinks[]) =>
       this.drinksResult = drinksFromApi
    ), error => console.error(error)
  }


  //función que guarda el objeto de tipo Prevent y lo guardo en un arreglo
  setEventObject(obj: Prevent) {
    this.event = obj
  }

  //función que obtiene la selección de radioButton y guarda en el localStorage
  onItemChange(value, type, object) {
      //se evalúa la opción seleccionada en el radioButton, guardado value y el object que se pasan desde el HTML
      switch(type) {
      case 'music': console.log(" Value is : ", value);
        this.musicValue = value;
        this.event.music = object
        break;
      case 'site': console.log(" Value is : ", value);
        this.siteValue = value;
        this.event.site = object
        break;
      case 'entertainment': console.log(" Value is : ", value);
        this.entertaimentValue = value;
        this.event.event_entertainment = object
        break;
      case 'drinks': console.log(" Value is : ", value);
        this.drinksValue = value; 
        this.event.event_drinks = object
        break;
      case 'catering': console.log(" Value is : ", value);
        this.cateringValue = value;
        this.event.event_catering = object
        break;
      default: console.log(" Value is : ", value);
    }
    
    //se modifica el localStorage para actualizar el vista de los datos en el frame según la selección
    localStorage.setItem("prevent", JSON.stringify(this.event));
    
    //se calcula el total de los items seleccionados llamando a la función de calculos
    this.calcularTotal(this.displayValue.toString())

    //localSotorge sin uso BORRAR
    //localStorage.setItem("valueEvent", JSON.stringify(this.totalItems));
  }

  //función que recibe la cantidad de invitados y calcula el total de los items seleccionados
  calcularTotal(val:string){
   this.displayValue = parseInt(val);
   this.totalItems = this.musicValue + this.siteValue+ this.entertaimentValue+ (this.drinksValue*this.displayValue)+ (this.cateringValue*this.displayValue);
  }
//-------------------------ALERTAS RESERVA Y GUARDADO DE EVENTO----------------------------------------
 alertaReserva(){
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-primary',
      cancelButton: 'btn btn-secondary'
    },
    buttonsStyling: false
  })
  
  swalWithBootstrapButtons.fire({
    title: '¿Desea pagar su evento ahora?',
    text: "Presione el botón GUARDAR y pague mas tarde",
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Pagar',
    cancelButtonText: 'Guardar'
  }).then((result) => {
    if (result.isConfirmed) {
      this.navegarPago()
    } else if (
      result.dismiss === Swal.DismissReason.cancel
    ){
      this.alertaEmail()
    }
  })
}

async alertaEmail(){
  const { value: email } = await Swal.fire({
    title: 'Ingrese su email, enviaremos el ID de su evento',
    input: 'email',
    inputLabel: 'Use este ID para modificar o pagar su evento más tarde',
    inputPlaceholder: 'Ingrese su email aquí',
    icon:'warning'
  })
  
  if (email) {
    Swal.fire(`ID enviado a: ${email}`, '', 'success')
    this.navegarHome()
  }
}

//función de navegación HOME
navegarHome(){
  this.router.navigateByUrl("/");
}

//función de navegación a RESERVA
navegarPago(){
  this.router.navigateByUrl("/reserva");
}

}