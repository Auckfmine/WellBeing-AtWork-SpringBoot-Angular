import { Component, OnInit , Inject, Input} from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from 'app/event/event.service';
import { Event } from '../../Models/Forum/Event/Event';

@Component({
  selector: 'app-add-event-component',
  templateUrl: './add-event-component.component.html',
  styleUrls: ['./add-event-component.component.scss']
})
export class AddEventComponentComponent implements OnInit {
  event : Event = new Event();
  constructor(@Inject(EventService) private ev:EventService, private _router:Router ) { }

  ngOnInit(): void {
    this.ev.$eventEmit.subscribe((data)=> {
      console.log("aaaaaaa");
      this.event=data;
    })

  }
  addEvent (){
    this.ev.addEvent(this.event).subscribe(()=>this._router.navigateByUrl("/event/"));
  }

}
