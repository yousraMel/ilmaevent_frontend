import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const API_URL = 'http://localhost:8082/api/';
// const API_URL = 'http://ilma-event-api-env.eba-968cdqgy.eu-north-1.elasticbeanstalk.com/api/';

const hostBenefit = API_URL + 'benefit';
const hostContent = API_URL + 'content';
const hostEventType = API_URL + 'eventType';
const hostEvent = API_URL + 'event';
const hostMedia = API_URL + 'media';
const hostRequest = API_URL + 'request';

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
    // return this.http.delete(hostBenefit + '/delete/' + id);
    return this.http.delete(hostBenefit + '/delete/' + id).pipe(
      catchError((error: HttpErrorResponse) => {
        const errorMessage = "Attention ! Cette prestation est actuellement utilisée par une ou plusieurs demandes et ne peut pas être supprimée.";
        return throwError(() => new Error(errorMessage));
      })
    );
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

  getAllTypes(): Observable<any> {
    return this.http.get(hostEventType + '/getAll', httpOptions);
  }

  addType(item: any) {
    console.log('item : ' + item)
    return this.http.post(hostEventType + '/save', item);
  }

  getType(id: any) {
    return this.http.get(hostEventType + '/get/' + id);
  }

  updateType(item: any) {
    return this.http.put(hostEventType + '/update', item);
  }

  deleteType(id: any) {
    // return this.http.delete(hostEventType + '/delete/' + id);
    return this.http.delete(hostEventType + '/delete/' + id).pipe(
      catchError((error: HttpErrorResponse) => {
        const errorMessage = "Attention ! Ce type est actuellement utilisé par une ou plusieurs demandes et ne peut pas être supprimé.";
        return throwError(() => new Error(errorMessage));
      })
    );
  }

}
