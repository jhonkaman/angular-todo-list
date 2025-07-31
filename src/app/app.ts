import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HelloWorld } from './hello-world/hello-world';
import { TodoList } from './todo-list/todo-list';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HelloWorld, TodoList],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'angular-training-ground';
}
