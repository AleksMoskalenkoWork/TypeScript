// Створіть класи Circle, Rectangle, Square і Triangle.+++

// У кожного з них є загальнодоступний метод calculateArea.+++

// У кожної фігури є загальнодоступні властивості - колір і назва, які не можна змінювати після створення.

// У Square і Rectangle зі свого боку є ще додатковий метод print, який виводить рядок із формулою розрахунку площі

class Circle {
  constructor(
    private color: string,
    private name: string,
  ) {}
  calculateArea(radius: number) {
    return Math.PI * radius * radius;
  }
}

class Triangle {
  constructor(
    private color: string,
    private name: string,
  ) {}
  calculateArea(a: number, b: number) {
    return (a * b) / 2;
  }
}

class Rectangle {
  constructor(
    private color: string,
    private name: string,
  ) {}
  calculateArea(a: number, b: number): number {
    return a * b;
  }
  print() {
    console.log('Площа прямокутника = a * b');
  }
}

class Square {
  constructor(
    private color: string,
    private name: string,
  ) {}
  calculateArea(a: number) {
    return a * a;
  }
  print() {
    console.log('Площа квадрата = a * a');
  }
}
