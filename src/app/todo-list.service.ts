import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TodoList } from './todo-list';

@Injectable({
  providedIn: 'root',
})
export class TodoListService {
  // 当前的todo list数据
  private _todoList: TodoList[] = [];
  get todoList(): TodoList[] {
    return this._todoList;
  }
  constructor() {
    const currentTodoList = localStorage.getItem('todo-list');
    this._todoList =
      currentTodoList !== null ? JSON.parse(currentTodoList) : [];
  }
  /**
   * 新增todo
   */
  addTodo(todo: TodoList): Observable<TodoList[]> {
    this._todoList.push(todo);
    return of(this._todoList);
  }

  editTodo(todo: TodoList): Observable<TodoList[]>{
    this._todoList.find(item => {
      if(item.id === todo.id) {
        item.name = todo.name;
      }
    });
    return of(this._todoList)
  }
  /**
   * 删除todo
   */
  delete(id: string): Observable<TodoList[]> {
    this._todoList = this._todoList.filter((item) => item.id !== id);
    return of(this._todoList);
  }

  /**
   * 修改todo的checked状态
   */
  handleTodoChecked(id: string, done: boolean): Observable<TodoList[]> {
    this._todoList.forEach((item) => {
      if (item.id === id) {
        item.done = done;
      }
    });
    return of(this._todoList);
  }

  /**
   * 全选和去全选
   */
  handleCheckAll(done: boolean): Observable<TodoList[]> {
    this._todoList.forEach((item) => (item.done = done));
    return of(this._todoList);
  }

  /**
   * 清空所有已完成的todo
   */
  clearAllDoneTodo(): Observable<TodoList[]> {
    this._todoList = this._todoList.filter((item) => !item.done);
    return of(this._todoList);
  }
}
