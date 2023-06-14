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
