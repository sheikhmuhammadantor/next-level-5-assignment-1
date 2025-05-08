<h1 style="text-align:center;">TypeSctipe</h1>

TypeScript has rapidly become one of the most popular tools in modern web development. By layering a typed system on top of JavaScript, it helps teams catch bugs early, enforce consistent patterns, and build projects that stay healthy as they grow. In this blog, we’ll look at three key areas:

1. **How TypeScript improves code quality and project maintainability**
2. **Key differences between `interface` and `type`**
3. **When to use `any`, `unknown`, and `never`**

---

## Improving Code Quality and Maintainability

### Early Error Detection

TypeScript adds a compilation step that checks your code **before** you even run it. By knowing the shape of your data (what properties an object has, what type a function should return), TypeScript can catch:

- Typos in property or function names
- Passing the wrong value type into a function
- Using a variable in an unintended way

This “static checking” helps surface many small mistakes at build time, so you spend less time hunting down bugs in the browser console.

### Clearer Intent

With types, your code documents itself. When you see a function signature like:

```ts
function calculateTotal(items: CartItem[]): number { … }
```

you immediately know that it expects an array of `CartItem` objects and returns a `number`. This clarity makes it easier for new team members (or your future self) to read and understand what each part of the code is supposed to do.

### Refactoring with Confidence

As projects grow larger, you often need to rename functions, split code across modules, or change data shapes. In plain JavaScript, these changes can be risky—something might break in a place you didn’t notice. TypeScript’s compiler will point out every place that needs to be updated, so your refactor stays consistent and safe.

### Better Tooling and Autocomplete

Because editors like VS Code understand TypeScript’s type information, you get rich auto‑completion, inline documentation, and real‑time error highlighting. This leads to faster development and fewer mistakes.

---

## Interfaces vs. Type Aliases

Both `interface` and `type` let you describe the shape of objects or functions, but there are some practical differences.

| Feature                     | `interface`                                                                                   | `type`                                                                     |                                             |
| --------------------------- | --------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- | ------------------------------------------- |
| **Extending / Merging**     | Can be **merged**—multiple `interface` declarations with the same name combine automatically. | Cannot merge; you’d use intersections (`&`) instead.                       |                                             |
| **Union and Intersection**  | Only supports extension (`extends`), not direct unions.                                       | Can create **union** (\`A                                                  |  B`) and **intersection** (`A & B\`) types. |
| **Computed / Mapped Types** | Less flexible for creating types by mapping or filtering.                                     | Works seamlessly with mapped (`{ [K in Keys]: … }`) and conditional types. |                                             |
| **Readability**             | Often preferred for public API shapes and object modeling.                                    | Handy for short aliases (e.g. \`type ID = string                           | number\`) or advanced type transforms.      |

In practice:

- Use **`interface`** when you want to describe a **public-facing** object shape (like props in a React component or data returned from an API).
- Use **`type`** for **quick aliases**, unions, or when you need to compose and transform types in more advanced ways.

---

## `any`, `unknown`, and `never`

TypeScript offers several special types to handle different scenarios of uncertainty or impossibility.

### `any`

- **What it is:** “Turn off” type checking—anything can go in, anything can come out.
- **When to use:** Rarely! It’s really a last resort when you have no idea what type to expect (e.g. migrating a huge JS codebase).
- **Downside:** You lose all of TypeScript’s safety, because the compiler treats it like plain JavaScript.

```ts
let data: any;
data = 12;
data = "hello";
data.toLowerCase(); // no error, but could crash at runtime
```

### `unknown`

- **What it is:** A safer counterpart to `any`. You can assign **anything** to `unknown`, but you cannot use it without first checking its type.
- **When to use:** When you truly don’t know what a value will be (for example, results from an external API) but want to force yourself to do type checks before use.

```ts
let input: unknown = fetchData();
if (typeof input === "string") {
  console.log(input.toUpperCase()); // safe, because we checked
}
```

### `never`

- **What it is:** A type that represents values that **never occur**.
- **When to use:**

  1. **Exhaustiveness checks** in a `switch` over union types
  2. Functions that always throw an error or loop forever

```ts
type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "square"; size: number };

function area(s: Shape): number {
  switch (s.kind) {
    case "circle":
      return Math.PI * s.radius ** 2;
    case "square":
      return s.size ** 2;
    default:
      // `s` is `never` here if we've covered all cases
      throw new Error(`Unknown shape: ${(s as any).kind}`);
  }
}
```

If you ever reach the `default` with a properly typed `Shape`, TypeScript will warn you—ensuring you’ve handled every variant.

---

### Last of all

TypeScript brings structure and safety to JavaScript projects. It **Early checks** catch mistakes before runtime. It have **Self-documenting types** make code easier to read and maintain. The **Interfaces** and **types** each have their strengths—choose based on your needs. Also have Special types like `unknown` and `never` help you write code that’s both flexible and sound.
