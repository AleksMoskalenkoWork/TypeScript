// Визначте інтерфейс, який використовує сигнатуру індексу з типами об'єднання. Наприклад, тип значення для кожного ключа може бути число | рядок.
interface UnionInterface {
  [key: string]: number | string;
}

// Створіть інтерфейс, у якому типи значень у сигнатурі індексу є функціями. Ключами можуть бути рядки, а значеннями — функції, які приймають будь-які аргументи.
interface FunctionInterface {
  [key: string]: (...args: unknown[]) => void;
}

// Опишіть інтерфейс, який використовує сигнатуру індексу для опису об'єкта, подібного до масиву. Ключі повинні бути числами, а значення - певного типу.
interface ArrayInterface {
  [index: number]: string;
  length: number;
}

// Створіть інтерфейс з певними властивостями та індексною сигнатурою. Наприклад, ви можете мати властивості типу name: string та індексну сигнатуру для додаткових динамічних властивостей.
interface UserInterface {
  name: string;
  age: number;
  [key: string]: string | number;
}

// Створіть два інтерфейси, один з індексною сигнатурою, а інший розширює перший, додаючи специфічні властивості.
interface BaseInterface {
  [key: string]: string | number;
}

interface ExtendedInterface extends BaseInterface {
  name: string;
  age: number;
}

// Напишіть функцію, яка отримує об'єкт з індексною сигнатурою і перевіряє, чи відповідають значення певних ключів певним критеріям (наприклад, чи всі значення є числами).
function validateObject(obj: ExtendedInterface): boolean {
  for (const key in obj) {
    if (typeof obj[key] !== 'number') {
      return false;
    }
  }
  return true;
}
