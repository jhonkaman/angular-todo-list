import { Component, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';

// Define the structure of a todo item
interface TodoItem {
  id: number;
  text: string;
  completed: boolean;
}

@Component({
  selector: 'app-todo-list',
  imports: [FormsModule],
  templateUrl: './todo-list.html',
})
export class TodoList {
  // Used to generate unique IDs for each todo
  private nextId = 1;

  // Signal holding the list of todos
  todos = signal<TodoItem[]>([
    { id: this.nextId++, text: 'Learn HTML', completed: true },
    { id: this.nextId++, text: 'Learn JavaScript', completed: false },
    { id: this.nextId++, text: 'Learn Angular', completed: false }
  ]);

  // Signal for the new todo input field
  newTodo = signal('');

  // Signal to control whether completed todos are hidden
  hideCompleted = signal(false);

  // Computed signal that returns the visible todos based on hideCompleted
  visibleTodos = computed(() => {
    const allTodos = this.todos();
    return this.hideCompleted()
      ? allTodos.filter(todo => !todo.completed)
      : allTodos;
  });

  // Add a new todo to the list
  addTodo() {
    const todoText = this.newTodo().trim();
    if (todoText) {
      this.todos.update(todos => [
        ...todos,
        { id: this.nextId++, text: todoText, completed: false }
      ]);
      this.newTodo.set('');
    }
  }

  // Delete a todo from the list by its id
  deleteTodo(todoToDelete: TodoItem) {
    this.todos.update(todos => todos.filter(todo => todo.id !== todoToDelete.id));
  }

  // Toggle the completed status of a todo by its id
  toggleTodo(todoToToggle: TodoItem) {
    this.todos.update(todos =>
      todos.map(todo =>
        todo.id === todoToToggle.id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  }
}
