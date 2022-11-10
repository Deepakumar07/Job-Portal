import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { catchError } from 'rxjs/operators'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})

export class HttpService {

  constructor(private http: HttpClient) { }
  private token: string;

  private headers = new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  });

  private errorhandler(Responce: any) {
    const err = Response.error;
    console.log(err);
  }
  
  getheaders(): HttpHeaders {
    // this.createAuthHeader();
    return this.headers;
  }
  createAuthHeader(){
    // this.headers.set("Authorization", `Bearer , ${}`)
  }

  GET(url: string, params?: any): Observable<any> {
    const data = { params, headers: this.headers }
    return this.http.get(url, data).pipe(catchError(this.errorhandler.bind(this)));
  }

  POST(url: string, params?: any): Observable<any> {
  
    return this.http.post(url,params,{headers:this.headers});
  }

  PUT(url: string, params?: any): Observable<any> {
    return this.http.put(url, params, {headers: this.headers}).pipe(catchError(this.errorhandler.bind(this)));
  }

  DELETE(url: string): Observable<any> {
    return this.http.delete(url,{ headers : this.headers});
  }

}
