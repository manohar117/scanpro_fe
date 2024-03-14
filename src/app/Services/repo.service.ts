import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RepoService {

  backendURL:string ="http://localhost:6767/"

  constructor(private httpClient:HttpClient) { } 

  fetchRepos(){
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem("jwtToken")}`);
    return this.httpClient.get(this.backendURL+"repo/getAll",{headers}).pipe(
      retry(1),
      catchError(this.processError)
    );
  }

  fetchRepo(name:string){
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem("jwtToken")}`);
    return this.httpClient.get(this.backendURL+"repo/get?name="+name,{headers}).pipe(
      retry(1),
      catchError(this.processError)
    );
  }

  createRepo(data:any){
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem("jwtToken")}`);
    return this.httpClient.post(this.backendURL+"repo/create",data,{headers}).pipe(
      retry(1),
      catchError(this.processError)
    );
  }

  updateRepo(data:any){
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem("jwtToken")}`);
    return this.httpClient.put(this.backendURL+"repo/updateAccess",data,{headers}).pipe(
      retry(1),
      catchError(this.processError)
    );
  }

  processError(err: any) {
    let message = '';
    if (err.error instanceof ErrorEvent) {
      message = err.error.message;
    } else {
      message = `Error Code: ${err.status}\nMessage: ${err.message}`;
    }
    //console.error(message);
    return throwError(() => message);
  }
}

