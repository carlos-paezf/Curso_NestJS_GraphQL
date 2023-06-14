# Sección 02: Breve reforzamiento de Nest

Esta sección tiene por objetivo ser un reforzamiento y una auto-evaluación para determinar si necesitas un mayor reforzamiento.

Idealmente todos los conceptos que usaré a continuación deben de ser familiares: módulos, controlador, servicios, DTOs, etc.

Si no es así, y sientes que todo es nuevo y complicado, te recomiendo que no continues con el curso y realiza el curso de [Nest: Backend Escalable](https://github.com/carlos-paezf/Curso_Nest_Backend_Escalable), para tener la base que necesitas para entrar en este curso.

## Inicio del proyecto

Vamos a crear un nuevo proyecto de Nest con el siguiente comando, y dentro del cual seleccionamos el gestor de paquetes favorito (en mi caso es pnpm):

```txt
$: nest new todo
```

Inicialmente vamos a dejar solo los archivos `main.ts` y `app.module.ts` dentro del directorio de `src`. Además, deshabilitamos el formato de prettier dentro de `eslintrc.js`. También se podría desinstalar todo el paquete del proyecto, pero no es recomendable si queremos darle un formato en común durante un desarrollo en equipo.

Lo siguiente es correr el proyecto con el siguiente comando:

```txt
$: pnpm run start:dev
```

El proyecto debe responder un status 404 cuando apuntamos a `http://localhost:3000` indicando que todo ha salido bien.

## Crear un recurso completo (CRUD)

Vamos a crear un CRUD automático usando el CLI de Nest con el siguiente comando:

```txt
$: nest g res todo --no-spec
? What transport layer do you use? REST API
? Would you like to generate CRUD entry points? Yes
```

Lo anterior crear una entidad, 2 DTO's (Data Transfer Object), 1 servicio, 1 controlador y un modulo, además de actualizar el modulo principal de la aplicación. Otro punto importante es que a través de la creación del recurso, contamos con un esquema para los endpoints del módulo, es decir, contamos con el esqueleto de los métodos para el CRUD.

En el módulo se declaran los controladores y proveedores del recurso, además de que podemos declarar las importaciones o exportaciones correspondientes al módulo. En un controlador tenemos el punto de acceso a los endpoints del recurso, mientras que el servicio se encarga de ejecutar las acciones sobre una entidad. Los DTO's son estructuras que se encargan de estandarizar la data que llega desde la petición, logrando evitar errores.

## Seleccionar ToDo's

Vamos a moldear la forma en que lucen los ToDo's dentro de la entidad que se creo en la lección anterior:

```ts
export class Todo {
    id: number;

    description: string;

    done: boolean;
}
```

Dentro del servicio creamos un arreglo de todos:

```ts
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
    ...
}
```

Ahora, en el método de `findAll` dentro del servicio, retornamos el arreglo de todos:

```ts
@Injectable()
export class TodoService {
    ...
    findAll () {
        return this.todos;
    }
    ...
}
```

Cuando hacemos una petición a `http://localhost:3000/todos` usando el verbo GET, recibimos la lista de tareas que dejamos.

Usando TypeScript podemos aprovechar el tipado estricto para evitar errores en la ejecución de los proyectos. En este momento queremos obtener una tarea por su id, pero actualmente el controlador está recibiendo un string, la intención es convertirlo a número o lanzar una excepción. Nest nos ofrece un pipe llamado `ParseIntPipe` con el cual completamos dicha tarea, y logramos tener un código más limpio y estructurado:

```ts
import { ..., ParseIntPipe } from '@nestjs/common';
...

@Controller( 'todo' )
export class TodoController {
    ...
    @Get( ':id' )
    findOne ( @Param( 'id', ParseIntPipe ) id: number ) {
        return this.todoService.findOne( id );
    }
    ...
}
```

Por el lado del servicio solo nos encargamos de especificar la lógica de como se debe obtener el todo mediante su id:

```ts
import { ..., NotFoundException } from '@nestjs/common';
...

@Injectable()
export class TodoService {
    ...
    findOne ( id: number ) {
         const todo = this.todos.filter( ( todo ) => todo.id === id );

        if ( !todo ) throw new NotFoundException( `TODO with id #${ id } not found` );

        return todo;
    }
    ...
}
```

## Crear TODO

Vamos a definir la estructura que esperamos recibir en el body de la petición del método POST, y con el cual nos aseguramos que sea confiable la creación del TODO. Dicha estructura la definimos en los archivos de DTO, pero antes realizamos la instalación de 2 paquetes necesarios:

```txt
$: pnpm add class-validator class-transformer
```

Adicional configuramos la lista blanca de propiedades que permitimos en la petición, y para ello, vamos al archivo `main.ts` y añadimos:

```ts
import { ValidationPipe } from '@nestjs/common';
...

async function bootstrap () {
    const app = await NestFactory.create( AppModule );
    
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true
        })
    )
    ...
}
```

Con lo anterior logramos que se valide la información que se envía, y que se ajuste a la estructura que nosotros declaremos en el DTO:

```ts
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateTodoDto {
    @IsString()
    @IsNotEmpty()
    description: string;

    @IsOptional()
    @IsBoolean()
    done?: boolean;
}
```

Ahora si podemos realizar la creación dentro del servicio:

```ts
@Injectable()
export class TodoService {
    ...
    create ( createTodoDto: CreateTodoDto ) {
        const todo = new Todo();
        todo.id = Math.max(...this.todos.map(todo => todo.id), 0) + 1;
        todo.description = todo.description;
        todo.done = todo.done;

        this.todos.push( todo );

        return todo;
    }
    ...
}
```
