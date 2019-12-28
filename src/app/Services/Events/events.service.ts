import { Injectable } from '@angular/core';
import { WebRequestService } from 'src/app/Services/WebRequest/web-request.service';
import { AuthenticateService } from 'src/app/Services/Authentication/authenticate.service';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(
    private webRequestService: WebRequestService,
    private authentication: AuthenticateService
  ) { }
    
  /**
   * Register a new event
   * 
   * @param formData 
   */
  addEvent(formData){
    return this.webRequestService.post('events/addEvent', formData);
  }

  /**
   * Get all events
   */
  getAllEvents () {
    return this.webRequestService.get('events');
  }
}
