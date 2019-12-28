import { Component, OnInit } from '@angular/core';
import { EventsService } from 'src/app/Services/Events/events.service';
import { Response } from 'src/app/Models/response.model';
import { Events } from 'src/app/Models/events.model';

declare var $: any;

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  events: Events[];

  constructor(
    private eventsService: EventsService
  ) { }

  ngOnInit() {
    // Making fixed on scroll
    $(window).on('scroll', function(){
      (!window.requestAnimationFrame) ? fixGallery() : window.requestAnimationFrame(fixGallery);
    });
  
    function fixGallery() {
      var offsetTop = $('.main-content').offset().top,
        scrollTop = $(window).scrollTop();
      ( scrollTop >= offsetTop ) ? $('.main-content').addClass('is-fixed') : $('.main-content').removeClass('is-fixed');
    }

    this.eventsService.getAllEvents().subscribe((response: Response)=>{
      if (response.success) {
        this.events = response.result;
      }
    });
  }

}
