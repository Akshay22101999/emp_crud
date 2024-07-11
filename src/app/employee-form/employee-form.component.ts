import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Employee, EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnChanges {
  @Input() employee: Employee | undefined;
  @Output() employeeUpdated = new EventEmitter<void>();

  constructor(private employeeService: EmployeeService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['employee'] && changes['employee'].currentValue) {
      this.employee = { ...changes['employee'].currentValue };
    } else {
      this.employee = { id: 0, name: '', salary: 0, age: 0 };
    }
  }

  onSubmit(): void {
    if (this.employee && this.employee.id) {
      this.employeeService.updateEmployee(this.employee).subscribe(() => {
        this.employeeUpdated.emit();
      });
    } else if (this.employee) {
      this.employeeService.createEmployee(this.employee).subscribe(() => {
        this.employeeUpdated.emit();
      });
    }
  }

  clearForm(): void {
    this.employee = { id: 0, name: '', salary: '', age: '' };
  }
}
