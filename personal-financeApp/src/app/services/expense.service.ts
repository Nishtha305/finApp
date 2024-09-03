import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface Expense{
  category: string;
  amount: number;
  date: Date;
}
@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  private apiUrl = 'http://localhost:5000/api/expenses';

  constructor(private http: HttpClient) { }
  addExpense(expense: Expense):Observable<Expense>{
    return this.http.post<Expense>(this.apiUrl, expense);
  }

  getExpense(): Observable<Expense[]>{
    return this.http.get<Expense[]>(this.apiUrl);
  }
}

