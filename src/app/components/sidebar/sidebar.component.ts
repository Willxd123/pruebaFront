import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ServerService } from '../../services/server.service';
import { FormsModule } from '@angular/forms';
import { RoomsComponent } from '../../pages/client/rooms/rooms.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    RouterModule,
    FormsModule,
    RoomsComponent,
    CommonModule,
  ],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  //--------------------socket---------------
  roomCode: string = ''; // Código de la sala que obtenemos de la URL
  roomName: string = ''; // Nombre de la sala que obtenemos del backend
  errorMessage: string = ''; // Para manejar errores
  usersInRoom: any[] = []; // Almacena los usuarios que se unen
  //------------------diagrama------------

  //-------------------------------------------
  constructor(
    private route: ActivatedRoute,
    private serverService: ServerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.roomCode = this.route.snapshot.paramMap.get('code') || '';
    /* this.serverService.joinRoom(this.roomCode); */
    // Escuchar cuando se une correctamente a la sala y obtener el nombre
    this.serverService.onJoinedRoom().subscribe((room) => {
      this.roomName = room.name; // Asignar el nombre de la sala
      console.log(`Unido a la sala: ${this.roomName}`);
    });
    this.serverService.onUsersListUpdate().subscribe((users) => {
      this.usersInRoom = users; // Actualizar la lista de usuarios
    });

  }

}
