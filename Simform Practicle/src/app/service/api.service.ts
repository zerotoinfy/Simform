import { Injectable, Input,Output,EventEmitter } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  private callMethodInNav = new Subject<any>();
  callInNavigation$ = this.callMethodInNav.asObservable();
  loggedInStatus = false;
  baseUri: string = 'http://localhost:4000/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  // For invoking method in navigation method to show the menu after login
  invokingNavigation() {
    this.callMethodInNav.next();
  }

  // For setting the route protection free
  setLoggedIn(value: boolean) {
    this.loggedInStatus = value;
  }

  setLoggedOut(value: boolean) {
    this.loggedInStatus = value;
  }

  getIsLoggedIn(){
    return this.loggedInStatus;
  }

  // Create
  register(data): Observable<any> {
    let url = `${this.baseUri}/register`;
    return this.http.post(url, data)
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  // Create
  login(data): Observable<any> {
    let url = `${this.baseUri}/login`;
    return this.http.post(url, data)
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  // Create
  createProduct(data): Observable<any> {
    console.log("The call is In Service method.");
    let url = `${this.baseUri}/create`;
    return this.http.post(url, data)
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  // Get all products
  getProducts() {
    return this.http.get(`${this.baseUri}`);
  }

  // Get employee
  getProduct(id): Observable<any> {
    let url = `${this.baseUri}/read/${id}`;
    return this.http.get(url, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }

  // Update employee
  updateProduct(id, data): Observable<any> {
    let url = `${this.baseUri}/update/${id}`;
    return this.http.put(url, data, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    )
  }

  // Delete employee
  deleteProduct(id): Observable<any> {
    let url = `${this.baseUri}/delete/${id}`;
    return this.http.delete(url, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    )
  }

  // Error handling 
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}