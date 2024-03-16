import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { SharedService } from './shared.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'https://localhost:4200, https://www.ilmaevent.com',
    // Add other headers as needed
  })
};



// const API_URL = 'http://localhost:5000/api/';
const API_URL = 'http://ilmaeventapi.eu-north-1.elasticbeanstalk.com/api/';

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

  constructor(private http: HttpClient,
    private sharedService: SharedService) { }



  // getAllBenefits(): Observable<any> {
  //   return this.http.get(hostBenefit + '/getAll', { ...httpOptions, observe: 'response' }).pipe(
  //     catchError((error: HttpErrorResponse) => {
  //       // Handle errors here
  //       return throwError(error);
  //     })
  //   );
  // }

  getAllBenefits(): Observable<any[]> {
    return this.http.get<any[]>(hostBenefit + '/getAll', httpOptions).pipe(
      catchError((error: HttpErrorResponse) => {
        // Handle errors here
        return throwError(error);
      }),
      map((data: any[]) => {
        return this.sharedService.activeFilterAndSortItems(data);
      })
    );
  }

  addBenefit(item: any) {
    const formattedDate = new Date().toISOString().replace('T', ' ').substring(0, 19);
    item.lastModifDate = formattedDate;
    item.creationDate = formattedDate;
    return this.http.post(hostBenefit + '/save', item);
  }

  getBenefit(id: any) {
    return this.http.get(hostBenefit + '/get/' + id);
  }

  updateBenefit(item: any) {
    // Add the current date to the item before updating
    const formattedDate = new Date().toISOString().replace('T', ' ').substring(0, 19);
    item.lastModifDate = formattedDate;
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
    const formattedDate = new Date().toISOString().replace('T', ' ').substring(0, 19);
    item.lastModifDate = formattedDate;
    item.creationDate = formattedDate;
    return this.http.post(hostRequest + '/save', item);
  }

  getRequest(id: any) {
    return this.http.get(hostRequest + '/get/' + id);
  }

  updateRequest(item: any) {
    // Add the current date to the item before updating
    const formattedDate = new Date().toISOString().replace('T', ' ').substring(0, 19);
    item.lastModifDate = formattedDate;
    return this.http.put(hostRequest + '/update', item);
  }

  deleteRequest(id: any) {
    // console.log('DELETE');
    return this.http.delete(hostRequest + '/delete/' + id);
  }

  /* -------------------------- apiEventType -------------------------- */

  getAllTypes(): Observable<any> {
    return this.http.get(hostEventType + '/getAll', httpOptions);
  }

  addType(item: any) {
    console.log('item : ' + item)
    const formattedDate = new Date().toISOString().replace('T', ' ').substring(0, 19);
    item.lastModifDate = formattedDate;
    item.creationDate = formattedDate;
    return this.http.post(hostEventType + '/save', item);
  }

  getType(id: any) {
    return this.http.get(hostEventType + '/get/' + id);
  }

  updateType(item: any) {
    // Add the current date to the item before updating
    const formattedDate = new Date().toISOString().replace('T', ' ').substring(0, 19);
    item.lastModifDate = formattedDate;
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

  /* -------------------------- apiMedia -------------------------- */

  getAllMedia(): Observable<any> {
    return this.http.get(hostMedia + '/getAll', httpOptions);
  }

  addMedia(file: any, media: any) {
    const formattedDate = new Date().toISOString().replace('T', ' ').substring(0, 19);
    media.lastModifDate = formattedDate;
    media.creationDate = formattedDate;
    // console.log("MEDIA in service: " + JSON.stringify(media));
    // console.log("FILE in service: " + JSON.stringify(file));
    const formData = new FormData();
    formData.append('file', file);

    // Convert media object to JSON string and append it to FormData
    formData.append('media', JSON.stringify(media));

    return this.http.post(hostMedia + '/save', formData).pipe(
      catchError((error: HttpErrorResponse) => {
        const errorMessage = "Attention ! Cette image existe déjà.";
        return throwError(() => new Error(errorMessage));
      })
    );
  }

  updateMedia(item: any) {
    // Add the current date to the item before updating
    const formattedDate = new Date().toISOString().replace('T', ' ').substring(0, 19);
    item.lastModifDate = formattedDate;
    return this.http.put(hostMedia + '/update', item);
  }


  getMedia(id: any) {
    return this.http.get(hostMedia + '/get/' + id);
  }

  deleteMedia(id: any) {
    return this.http.delete(hostMedia + '/delete/' + id);
  }

}
