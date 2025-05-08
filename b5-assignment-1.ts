function formatString(input: string, toUpper?: boolean): string {
  return toUpper ?? true ? input.toUpperCase() : input.toLowerCase();
}

//
function filterByRating(
  items: { title: string; rating: number }[]
): { title: string; rating: number }[] {
  return items.filter((item) => item.rating >= 4);
}

//
function concatenateArrays<T>(...arrays: T[][]): T[] {
  // return arrays.flat();
  const arr: T[] = [];
  arrays.forEach((a) => arr.push(...a));
  return arr;
}

//
class Vehicle {
  private make: string;
  private year: number;

  constructor(make: string, year: number) {
    this.make = make;
    this.year = year;
  }

  public getInfo(): string {
    return `Make: ${this.make}, Year: ${this.year}`;
  }
}

class Car extends Vehicle {
  private model: string;

  constructor(make: string, year: number, model: string) {
    super(make, year);
    this.model = model;
  }

  public getModel(): string {
    return `Model: ${this.model}`;
  }
}

//
function processValue(value: string | number): number {
  if (typeof value === "string") return value.length;
  return value * 2;
}

//
interface Product {
  name: string;
  price: number;
}

function getMostExpensiveProduct(products: Product[]): Product | null {
  if (products.length == 0) return null;
  return products.reduce((max, product) =>
    max.price > product.price ? max : product
  );
}

//
enum Day {
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
  Sunday,
}

function getDayType(day: Day): string {
  if (day === Day.Saturday || day === Day.Sunday) return "Weekend";
  return "Weekday";
}

//
async function squareAsync(n: number): Promise<number> {
  return new Promise((resolve, reject) => {
    if (n >= 0) {
      setTimeout(() => {
        resolve(n * n);
      }, 1000);
    } else {
      reject("Error: Negative number not allowed");
    }
  });
}
