import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


const hostBenefit = 'http://localhost:8082/api/benefit';
const hostContent = 'http://localhost:8082/api/content';
const hostEventType = 'http://localhost:8082/api/eventType';
const hostEvent = 'http://localhost:8082/api/event';
const hostMedia = 'http://localhost:8082/api/media';
const hostRequest = 'http://localhost:8082/api/request';

@Injectable({
  providedIn: 'root'
})
export class AllService {

  constructor(private http: HttpClient) { }

  /* -------------------------- apiBenefit -------------------------- */

  getAllBenefits(): Observable<any> {
    return this.http.get(hostBenefit + '/getAll', httpOptions);
  }

  addBenefit(item: any) {
    return this.http.post(hostBenefit + '/save', item);
  }

  getBenefit(id: any) {
    return this.http.get(hostBenefit + '/get/' + id);
  }

  updateBenefit(item: any) {
    return this.http.put(hostBenefit + '/update', item);
  }

  deleteBenefit(id: any) {
    return this.http.delete(hostBenefit + '/delete/' + id);
  }

  /* -------------------------- apiRequest -------------------------- */

  getAllRequests(): Observable<any> {
    return this.http.get(hostRequest + '/getAll', httpOptions);
  }

  addRequest(item: any) {
    console.log('item : ' + item)
    return this.http.post(hostRequest + '/save', item);
  }

  getRequest(id: any) {
    return this.http.get(hostRequest + '/get/' + id);
  }

  updateRequest(item: any) {
    return this.http.put(hostRequest + '/update', item);
  }

  deleteRequest(id: any) {
    return this.http.delete(hostRequest + '/delete/' + id);
  }

  /* -------------------------- apiEventType -------------------------- */

  getAllEventTypes(): Observable<any> {
    return this.http.get(hostEventType + '/getAll', httpOptions);
  }

  addEventType(item: any) {
    console.log('item : ' + item)
    return this.http.post(hostEventType + '/save', item);
  }

  getEventType(id: any) {
    return this.http.get(hostEventType + '/get/' + id);
  }

  updateEventType(item: any) {
    return this.http.put(hostEventType + '/update', item);
  }

  deleteEventType(id: any) {
    return this.http.delete(hostEventType + '/delete/' + id);
  }

}
