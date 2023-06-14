import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodoService {
    private todos: Todo[] = [
        { id: 1, description: "Soul's Stone", done: false },
        { id: 2, description: "Time's Stone", done: false },
        { id: 3, description: "Space's Stone", done: false },
        { id: 4, description: "Mind's Stone", done: false },
        { id: 5, description: "Power's Stone", done: false },
        { id: 6, description: "Realty's Stone", done: true },
    ];

    create ( createTodoDto: CreateTodoDto ) {
        const todo = new Todo();
        todo.id = Math.max( ...this.todos.map( todo => todo.id ), 0 ) + 1;
        todo.description = todo.description;
        todo.done = todo.done;

        this.todos.push( todo );

        return todo;
    }

    findAll () {
        return this.todos;
    }

    findOne ( id: number ) {
        const todo = this.todos.find( ( todo ) => todo.id === id );

        if ( !todo ) throw new NotFoundException( `TODO with id #${ id } not found` );

        return todo;
    }

    update ( id: number, updateTodoDto: UpdateTodoDto ) {
        const todo = this.findOne( id );

        if ( updateTodoDto.done !== undefined ) todo.done = updateTodoDto.done;
        if ( updateTodoDto.description ) todo.description = updateTodoDto.description;

        this.todos = this.todos.map( dbTodo => ( dbTodo.id === id ) ? todo : dbTodo );

        return todo;
    }

    remove ( id: number ) {
        return `This action removes a #${ id } todo`;
    }
}
