import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { TodoList } from '../todo-list';
import { TodoListService } from '../todo-list.service';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css'],
})
export class ListItemComponent implements OnInit, AfterViewChecked {
  // 获取到编辑todo名称的输入框
  @ViewChild('editNameInput') editNameInput!: ElementRef;
  @Input() todo!: TodoList;
  @Input() onSelectStatus!: boolean;
  @Output() currentTodoId = new EventEmitter();
  @Output() currentDoneTodoId = new EventEmitter();
  isActive!: boolean;
  showEditName: boolean = false;
  currentEditName!: string;

  constructor(public todoListService: TodoListService) {}
  ngAfterViewChecked(): void {
    if(this.showEditName) {
      this.editNameInput.nativeElement.focus();
    }
  }
  /**
   * 初始化
   */
  ngOnInit(): void {
    this.currentEditName = this.todo.name;
  }

  /**
   * 删除todo
   */
  handleDeleteTodo(id: string) {
    // this.currentTodoId.emit(id);
    this.todoListService.delete(id).subscribe();
  }

  /**
   * 修改当前todo的完成情况
   */
  handleChange(checked: boolean, id: string) {
    // this.currentDoneTodoId.emit(this.todo);
    this.todoListService.handleTodoChecked(id, checked).subscribe();
  }

  /**
   * 鼠标移入移出事件
   */
  handleMouse(flag: boolean) {
    this.isActive = flag;
  }

  /**
   * todo名称编辑事件
   */
  handleEdit() {
    this.showEditName = true;
    // this.editNameInput.nativeElement.focus();
  }

  /**
   * 点击回车保存当前todo编辑后的名称
   */
  saveNewTodo(event: any, currentTodo: TodoList) {
    if (event.keyCode !== 13) return;
    if (event.target.value.trim() === '') {
      alert('请输入值！');
      return;
    }
    currentTodo.name = event.target.value;
    this.todoListService.editTodo(currentTodo).subscribe(() => {
      event.target.value = '';
      this.showEditName = false;
    });
  }

  /**
   * 失去焦点保存
   */
  handleSave(todo: TodoList) {
    // 失去焦点时询问是否保存当前的修改
    const isSave = confirm('你是否保存当前所输入的内容?');
    if(isSave) {
      todo.name = this.currentEditName;
      this.todoListService.editTodo(todo).subscribe();
    } else {
      this.currentEditName = todo.name;
    }
    this.showEditName = false;
  }
}
