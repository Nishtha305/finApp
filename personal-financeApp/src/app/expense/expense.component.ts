import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Expense, ExpenseService } from '../services/expense.service';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css']
})
export class ExpenseComponent implements OnInit{
  categories: string[] = ['Food','Transport','Entertainment','Petrol', 'Utilities', 'Other']
  expenses: Expense[] =[];
  newExpense: Expense = { category: '', amount: 0, date: new Date() };
  constructor(private expenseService: ExpenseService) { }

  ngOnInit(){
    this.getExpenses()
  }

  getExpenses(){
    this.expenseService.getExpense().subscribe(expenses =>{
      this.expenses = expenses;
    }, error=>{
      console.error('Error Fetching Expanses:', error);
    })
  }
  addExpense() {
    if (!this.newExpense.category || !this.newExpense.amount || !this.newExpense.date) {
      return;
    }

    this.expenseService.addExpense(this.newExpense)
      .subscribe(newExpense => {
        this.expenses.push(newExpense);
        this.newExpense = { category: '', amount: 0, date: new Date() };
      }, error => {
        console.error('Error adding expense:', error);
      });
  }
}
