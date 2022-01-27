import { AfterViewChecked, Component } from '@angular/core';
import { TodoListService } from '../todo-list.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements AfterViewChecked {
  onSelectStatus: boolean = false;
  constructor(public todoListService: TodoListService) {}

  ngAfterViewChecked(): void {
    localStorage.setItem(
      'todo-list',
      JSON.stringify(this.todoListService.todoList)
    );
  }

  add(event: any) {
    if(event.keyCode !== 13) return;
    if(event.target.value.trim() === '') {
      alert('请输入值！')
      return;
    }
    const todo = {
      id: new Date().getTime() + Math.random().toString(36).substring(2),
      name: event.target.value,
      done: false,
    };
    this.todoListService.addTodo(todo).subscribe();
    event.target.value = '';
  }

  handleSelect(select: boolean) {
    this.onSelectStatus = select;
  }

  // add(name: string) {
  //   const todo = {
  //     id: new Date().getTime() + Math.random().toString(36).substring(2),
  //     name: name,
  //     done: false,
  //   };
  //   this.todoListService.addTodo(todo).subscribe();
  // }

  // deleteTodo(id: string) {
  //   this.todos = this.todos.filter((item) => item.id !== id);
  // }

  // changeTodo(todo: TodoList) {
  //   this.todos.forEach((item) => {
  //     if (item.id === todo.id) {
  //       item.done = todo.done;
  //     }
  //   });
  // }

  // checkAll(isAllfinish: boolean) {
  //   this.todos.forEach((item) => (item.done = isAllfinish));
  // }

  // clearAllDone() {
  //   this.todos = this.todos.filter((item) => !item.done);
  // }

}
