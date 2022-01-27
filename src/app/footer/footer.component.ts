import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TodoList } from '../todo-list';
import { TodoListService } from '../todo-list.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  todos: TodoList[] = [];
  // todos: TodoList[] = [];
  @Output() isAllfinish = new EventEmitter();
  @Output() clearAllDone = new EventEmitter();
  @Output() onSelectStatus = new EventEmitter();
  selectStatus!: boolean;
  constructor(public todoListService: TodoListService) {
    
  }
  ngOnInit(): void {
    
  }

  getCheckAll() {
    return this.todoListService.todoList.length !== 0 
    && this.todoListService.todoList.every(item => item.done);
  }
  getHasFinish() {
    return this.todoListService.todoList.filter(item => item.done).length;
  }
  handleCheckAll(event: any) {
    // this.isAllfinish.emit(event.target.checked);
    this.todoListService.handleCheckAll(event.target.checked).subscribe();
  }

  clearAllDoneTodo() {
    this.todoListService.clearAllDoneTodo().subscribe();
  }

  handleSelect(select: boolean) {
    this.selectStatus = select;
    this.onSelectStatus.emit(select);
  }
}
