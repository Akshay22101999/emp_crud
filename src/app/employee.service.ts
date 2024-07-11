import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Employee {
  id;
  name;
  salary;
  age;
}

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private employees: Employee[] = [
    // { id: 1, name: 'Default Employee', salary: 50000, age: 25 },
    // { id: 2, name: 'Jane Smith', salary: 60000, age: 30 },
    // { id: 3, name: 'Jim Brown', salary: 70000, age: 35 }
  ];

  getEmployees(): Observable<Employee[]> {
    return of(this.employees);
  }

  getEmployeeById(id: number): Observable<Employee | undefined> {
    return of(this.employees.find(emp => emp.id === id));
  }

  createEmployee(employee: Employee): Observable<Employee> {
    employee.id = this.employees.length > 0 ? Math.max(...this.employees.map(emp => emp.id)) + 1 : 1;
    this.employees.push(employee);
    return of(employee);
  }

  updateEmployee(updatedEmployee: Employee): Observable<Employee | undefined> {
    const index = this.employees.findIndex(emp => emp.id === updatedEmployee.id);
    if (index !== -1) {
      this.employees[index] = updatedEmployee;
      return of(updatedEmployee);
    }
    return of(undefined);
  }

  deleteEmployee(id: number): Observable<void> {
    this.employees = this.employees.filter(emp => emp.id !== id);
    return of();
  }
}
