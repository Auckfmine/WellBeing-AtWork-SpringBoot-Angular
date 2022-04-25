import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Event } from '../../Models/Forum/Event/Event';
import { EventService } from '../event.service';
import { MatDialog } from '@angular/material/dialog'
import { AddEventComponentComponent } from '../add-event-component/add-event-component.component';
@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  constructor(private _service:EventService , private router:Router,private matDialog:MatDialog) { }
  listEvent : Event[];
  updateId : number;
  @Output () eventEmmit= new EventEmitter(); 
  ngOnInit(): void {
    this._service.getAllEvent().subscribe(res=>{console.log(res);
      this.listEvent=res});
  }

  deleteEvent(idEvent:number){
    this._service.deleteEventById(idEvent)
    .subscribe(()=>this._service.getAllEvent().subscribe(res=>{this.listEvent=res}));
  }

  updateEvent(idEvent:number){
    this._service.sendEventData(idEvent);
    this.router.navigateByUrl("/event/addEvent");
  }
  onOpenDialogClick(){
    this.matDialog.open(AddEventComponentComponent);
    
  }
}