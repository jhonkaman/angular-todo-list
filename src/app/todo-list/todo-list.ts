import { Component, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface TodoItem {
  text: string;
  completed: boolean;
}

@Component({
  selector: 'app-todo-list',
  imports: [FormsModule],
  templateUrl: './todo-list.html',
})
export class TodoList {
  todos = signal<TodoItem[]>([
    { text: 'Learn Angular basics', completed: false },
    { text: 'Build a todo app', completed: false },
    { text: 'Practice TypeScript', completed: false }
  ]);

  newTodo = signal('');
  hideCompleted = signal(false);

  visibleTodos = computed(() => {
    const allTodos = this.todos();
    return this.hideCompleted()
      ? allTodos.filter(todo => !todo.completed)
      : allTodos;
  });

  addTodo() {
    const todoText = this.newTodo().trim();
    if (todoText) {
      this.todos.update(todos => [...todos, { text: todoText, completed: false }]);
      this.newTodo.set('');
    }
  }

    deleteTodo(index: number) {
    const todoToDelete = this.visibleTodos()[index];
    this.todos.update(todos => todos.filter(todo => todo !== todoToDelete));
  }

    toggleTodo(index: number) {
    const todoToToggle = this.visibleTodos()[index];
    this.todos.update(todos =>
      todos.map(todo =>
        todo === todoToToggle
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  }
}
