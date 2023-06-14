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
