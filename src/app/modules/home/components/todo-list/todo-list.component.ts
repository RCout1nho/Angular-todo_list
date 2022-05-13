import { Component, DoCheck, OnInit } from '@angular/core';
import { TaskList } from '../../model/task-list';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements DoCheck {
  public taskList: TaskList[] = JSON.parse(
    localStorage.getItem('@todo-list:list') || '[]'
  );

  constructor() {}

  public ngDoCheck(): void {
    this.setLocalStorage();
  }

  public deteleItemTaskList(event: number) {
    this.taskList.splice(event, 1);
  }

  public deleteAllTaskList() {
    const confirm = window.confirm('Você realmente deseja deletar tudo?');

    if (!confirm) return;

    this.taskList = [];
  }

  public setEmitTaskList(event: string) {
    this.taskList.push({
      task: event,
      checked: false,
    });
  }

  public validationInput(event: string, index: number) {
    if (!event.length) {
      const confirm = window.confirm('Task está vazia, deseja deletar?');

      if (!confirm) return;

      this.deteleItemTaskList(index);
    }
  }

  public setLocalStorage() {
    if (this.taskList) {
      this.taskList.sort((a, b) => Number(a.checked) - Number(b.checked));

      localStorage.setItem('@todo-list:list', JSON.stringify(this.taskList));
    }
  }
}
