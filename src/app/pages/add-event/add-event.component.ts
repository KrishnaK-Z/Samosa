import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { EventsService } from 'src/app/Services/Events/events.service';
import { Response } from 'src/app/Models/response.model';
import { Events } from 'src/app/Models/events.model';

declare var $: any;

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit {

  constructor(
    private eventsService: EventsService,
    private router: Router
  ) { }

  ngOnInit() {
    
  }

  addEvent(formData: Events): void {
    this.eventsService.addEvent(formData).subscribe(
      (response: Response) => {
        if (response.success) {
          this.router.navigate(['/dashboard']);
        }
      }
    )
  }

}
