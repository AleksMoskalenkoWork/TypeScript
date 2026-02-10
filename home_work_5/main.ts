// Створіть класи Circle, Rectangle, Square і Triangle.+++

// У кожного з них є загальнодоступний метод calculateArea.+++

// У кожної фігури є загальнодоступні властивості - колір і назва, які не можна змінювати після створення.

// У Square і Rectangle зі свого боку є ще додатковий метод print, який виводить рядок із формулою розрахунку площі

interface IFigure {
  calculateArea(...args: number[]): number;
}

abstract class Figure implements IFigure {
  #color: string;
  #name: string;
  constructor(color: string, name: string) {
    this.#color = color;
    this.#name = name;
  }
  abstract calculateArea(...args: number[]): number;
}

class Circle extends Figure {
  constructor(color: string, name: string) {
    super(color, name);
  }
  override calculateArea(radius: number) {
    return Math.PI * radius * radius;
  }
}

class Triangle extends Figure {
  constructor(color: string, name: string) {
    super(color, name);
  }
  override calculateArea(a: number, b: number) {
    return (a * b) / 2;
  }
}

class Rectangle extends Figure {
  constructor(color: string, name: string) {
    super(color, name);
  }
  override calculateArea(a: number, b: number): number {
    return a * b;
  }
  print() {
    console.log('Площа прямокутника = a * b');
  }
}

class Square extends Figure {
  constructor(color: string, name: string) {
    super(color, name);
  }
  override calculateArea(a: number) {
    return a * a;
  }
  print() {
    console.log('Площа квадрата = a * a');
  }
}
