import { Component, OnInit } from '@angular/core';
import { EventService } from './event.service';
import { Event } from '../../Models/event/Event';
import { Router } from '@angular/router';


@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {
  popularEvent : Event =new Event();
  search:string;
  constructor(private _service:EventService ,   
    private router: Router) { }
  listEvent : Event[];
  updateId : number;
  
  ngOnInit(): void {
    this._service.getEventByUser(3).subscribe(res=>{console.log(res);
      this.listEvent=res});
      this._service.getPopularEvent().subscribe((e)=>{
      
        this.popularEvent=e;
        console.log(this.popularEvent);
    
      });


  }
  goto(id: number): void {
    this.router.navigate(["event-detail", id]);
  }
  sortedByDistance(){
    this._service.getAllEventByDistance().subscribe(res=>{console.log(res);
      this.listEvent=res});
  
  }
  sortedByFrais(){
    this._service.getAllEventByFrais().subscribe(res=>{console.log(res);
      this.listEvent=res});
  }

  getEventTags(tag:string){
    this._service.getEventTags(tag).subscribe(res=>{console.log(res);
      this.listEvent=res});
  }
}