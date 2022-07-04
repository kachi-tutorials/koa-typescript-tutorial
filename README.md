## KOA Typscript Tutorial

Before you start this part, make sure you have read [**part 1**](https://github.com/tutorial-point/koa-server-tutorial) of this tutorial series as we're gonna be starting from there.

In this tutorial, we'll be our **`Koa JS`** server to **`typescript`**.

## Installation

First lets install all the packages we need:

```bash
npm i -D @types/koa @types/koa-bodyparser @types/node
```

## Migrating packages

Next we'll need to migrate some of our packages.

1. Firstly we need to edit our **`package.json`** file.
2. Create a **`tsconfig.json`** file.

Let's start by updating our **`package.json`** file:

- Find **`"main": "index.js"`** to **`"main": "src/index.ts"`**
- Add **`"start": "ts-node src/index.ts"`** to your **`"scripts"`**

Your new **`package.json`** file should look like this:

```json
{
  "name": "koa_tutorial",
  "version": "1.0.0",
  "description": "",
  "main": "src/index.ts",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "ts-node src/index.ts"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "@koa/cors": "^3.3.0",
    "koa": "^2.13.4",
    "koa-bodyparser": "^4.3.0",
    "koa-router": "^10.1.1"
  },
  "devDependencies": {
    "@types/koa": "^2.13.4",
    "@types/koa-bodyparser": "^4.3.7",
    "@types/node": "^18.0.1"
  }
}
```

Next we'll create our **`tsconfig.json`** file, run the following command in your terminal:

```bash
npx tsc --init
```

This should create a **`tsconfig.json`** file with the default settings, let's replace it with the following code:

```json
{
  "compilerOptions": {
    "baseUrl": "src",
    "target": "es2016",
    "noImplicitAny": false,
    "module": "commonjs",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true
  },
  "include": ["src"]
}
```

### What does each line do?

1. **baseUrl** - Specify the base directory to resolve non-relative module names.
2. **target** - Set the JavaScript language version for emitted JavaScript and include compatible library declarations.
3. **noImplicitAny** - Enable error reporting for expressions and declarations with an implied any type.
4. **module** - Specify what module code is generated.
5. **esModuleInterop** - Emit additional JavaScript to ease support for importing CommonJS modules. This enables allowSyntheticDefaultImports for type compatibility.
6. **forceConsistentCasingInFileNames** - Ensure that casing is correct in imports.
7. **strict** - Enable all strict type checking options.

## Restructuring our project

We will now need to restruct our project by doing the following:

Firstly, let's create a **`src`** folder:

```bash
mkdir src
```

Now we need to rename our files from **`js`** to **`ts`**, update the following files:

- **`index.js` to `index.ts`**
- **`router.js` to `router.ts`**
- **`events.controllers.js` to `events.controllers.ts`**

Now let's move our **`index.ts`** file, **`router.ts `** file and **`controllers`** directory into our **`src`** directory. Our new folder structure should look like this.

```
- src
-- controllers
--- events.controllers.ts
-- index.ts
-- router.ts
- .gitignore
- package-lock.json
- package.json
- README.md
- tsconfig.json
```

## Refactoring our code

Now let's refactor our **`.ts`** files. For each let's do the following:

1. update your imports **`const variableName = require("module-name")`** to **`import variableName from "module-name"`**
2. update your exports from **`module.exports =`** to **`export`** or **`export default`**

Let's start by editing our **`index.ts`** file

```javascript
import Koa from "koa";
import parser from "koa-bodyparser";
import cors from "@koa/cors";
import router from "./router";

const App = new Koa();
const port = 8000;

App.use(parser())
  .use(cors())
  .use(router.routes());

App.listen(port, () => {
  console.log(`🚀 Server listening http://127.0.0.1:${port}/ 🚀`);
});
```

Next, let's update **`router.ts`**:

```javascript
import Router from "koa-router";
import { getEvents, postEvent } from "./controllers/events.controllers";

const router = new Router();

router.get("/events_list", getEvents);
router.post("/post_event", postEvent);

export default router;
```

Before we update our **`events.controllers.ts`** file, let's create a **`types`** directory using the following command:

```bash
mkdir src/types
touch src/types/events.types.ts
```

This will create a new **`types`** directory containing a **`events.types.ts`** file.

Now add the following code to our **`events.types.ts`** file:

```typescript
export interface eventsDbProps {
  name: string;
  adultsOnly: boolean;
  attendees: number;
  description: string;
}
```

Finally, let's update the **`events.controllers.ts`** in our **`events`** directory with the following code:

```javascript
import { Context } from "koa";
import { eventsDbProps } from "types/events.types";

const events_db: eventsDbProps[] = [];

export const getEvents = (ctx: Context) => {
  ctx.body = events_db;
  ctx.status = 200;
};

export const postEvent = (ctx: Context) => {
  events_db.push(ctx.request.body);
  ctx.body = "Event Created!";
  ctx.status = 201;
};
```

### What did we just do?

1. Import our types from **`"koa"`** and **`"types/events.types"`**
2. Declared type for **`events_db`** as **`eventsDbProps[]`**
3. Declared **`ctx`** argument as **`Context`**.

And we're finished!

## Running our server

To run our typescript server run the following command:

```bash
npm start
```

And that's all! Thank you for reading!
