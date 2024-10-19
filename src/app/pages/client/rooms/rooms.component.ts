import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ServerService } from '../../../services/server.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as go from 'gojs';
import { SidebarComponent } from '../../../components/sidebar/sidebar.component';
import { NavegationComponent } from '../../../components/navegation/navegation.component';
@Component({
  selector: 'app-rooms',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    SidebarComponent,
    NavegationComponent,
    RouterModule,
  ], // Asegúrate de agregar estos módulos
  templateUrl: './rooms.component.html',
})
export class RoomsComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef;
  roomCode: string = ''; // Código de la sala que obtenemos de la URL
  roomName: string = ''; // Nombre de la sala que obtenemos del backend
  roomId: number = 0; // ID de la sala, obtenido al unirse
  errorMessage: string = ''; // Para manejar errores
  usersInRoom: any[] = []; // Almacena los usuarios que se unen
  // Propiedades para la multiplicidad y etiqueta de enlace
  currentMultiplicityFrom: string = '';
  currentMultiplicityTo: string = '';
  currentLabelText: string = '';

  //-----------------------------diagramas------------------------------
  @ViewChild('diagramDiv', { static: true }) diagramDiv!: ElementRef;
  public diagram!: go.Diagram;
  //relaciones
  private isAssociationMode: boolean = false; // Modo de asociación activado
  private firstSelectedNode: go.Node | null = null; // Primer nodo seleccionado
  //asociacion directa;
  selectedFromClassId: string | null = null; // Para almacenar la clase de origen
  selectedToClassId: string | null = null; // Para almacenar la clase de destino
  isDirectAssociationMode = false;
  isGeneralizationMode = false;
  isAggregationMode = false;
  isCompositionMode = false;
  isDependencyMode = false;
  isManyToManyMode: boolean = false; // Modo muchos a muchos

  secondSelectedNode: go.Node | null = null; // Segundo nodo seleccionado
  //-----------
  attributeName: string = ''; // Nombre del atributo select
  methodName: string = ''; // Nombre del método select
  selectedAttribute: string = ''; //Nombre del atributoDelete select
  selectedMethod: string = ''; //Nombre del metodoDelete select

  methodReturnType: string = ''; // Tipo de retorno por defecto para métodos
  attributeReturnType: string = ''; // Tipo de retorno por defecto para atributos

  fromClassId: string | null = null; // Clase de origen
  toClassId: string | null = null; // Clase de destino
  multiplicityFrom: string = ''; // Multiplicidad por defecto origen
  multiplicityTo: string = ''; // Multiplicidad por defecto destino

  classList: any[] = []; // Lista de clases (nodos) disponibles para seleccionar
  //------tabla
  newAttribute: string = '';
  newMethod: string = '';
  selectedClassLocation: { top: number; left: number } | null = null;
  selectedClassSize: { width: number; height: number } | null = null;

  selectedClass: any = null; // Clase seleccionada
  constructor(
    private route: ActivatedRoute,
    private serverService: ServerService,
    private router: Router,

    private cdr: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute
  ) {}
  // Método para actualizar las propiedades de multiplicidad y etiqueta de enlace
  updateLinkInfo(
    multiplicityFrom: string,
    multiplicityTo: string,
    labelText: string
  ) {
    this.currentMultiplicityFrom = multiplicityFrom;
    this.currentMultiplicityTo = multiplicityTo;
    this.currentLabelText = labelText;
  }
  ngOnInit(): void {
    //oyente de nuevo usuario conectado
    this.roomCode = this.route.snapshot.paramMap.get('code') || '';

    if (this.roomCode) {
      this.serverService.joinRoom(this.roomCode);
    }
  }

}
