// 1. У вас є типи Car, Truck та об'єднання Vehicle. Напишіть функцію getVehicleCapacity(vehicle: Vehicle): string,
// яка робить звуження типу за дискримінантом kind та повертає спецефічне повідомлення про навантаження.
// Реалізуйте вичерпну перевірку за допомогою функції. Додайте до об'єднання новий тип Motorcycle, щоб переконатися,
// що ваша функція "впаде" з помилкою на етапі компіляції.

interface Car {
  kind: 'car';
  passengers: number;
}

interface Truck {
  kind: 'truck';
  cargoWeight: number;
}

// interface Motorcycle {
//   kind: 'motorcycle';
//   hasSidecar: boolean;
// }

type Vehicle = Car | Truck; // | Motorcycle;

function getVehicleCapacity(vehicle: Vehicle): string {
  switch (vehicle.kind) {
    case 'car':
      return `Limits ${vehicle.passengers} passengers.`;
    case 'truck':
      return `Limits ${vehicle.cargoWeight} kg of cargo.`;
    default:
      const vehicleCheck: never = vehicle;
      return vehicleCheck;
  }
}

// 2. Ви отримуєте повідомлення через WebSocket, яке має тип unknown. Реалізуйте функцію-захисник типу isChatMessage,
// яка перевіряє, чи відповідає отриманий об'єкт інтерфейсу ChatMessage. Використовуйте різні оператори
// для безпечної перевірки.

interface ChatMessage {
  text: string;
  authorId: number;
}

function isChatMessage(data: unknown): data is ChatMessage {
  return (
    typeof data === 'object' &&
    data !== null &&
    'text' in data &&
    typeof (data as ChatMessage).text === 'string' &&
    'authorId' in data &&
    typeof (data as ChatMessage).authorId === 'number'
  );
}

function processMessage(data: unknown): void {
  if (isChatMessage(data)) {
    console.log(`User ${data.authorId} says: "${data.text.toUpperCase()}"`);
  } else {
    console.log('Invalid format');
  }
}

// 3. Тип RouteHandlers вимагає, щоб значенням маршруту була строка (назва компонента) або об'єкт із функцією action.
// Створіть об'єкт appRoutes із маршрутами home (string) та login (об'єкт із методом action).
// Оголосіть його так, щоб компілятор перевірив відповідність типу RouteHandlers, але водночас зберіг точну структуру об'єкта.
// Переконайтеся, що виклик appRoutes.login.action() не викликає помилки.

type RouteHandlers = {
  [routePath: string]: string | { action: () => void };
};

const appRoutes = {
  home: 'HomeComponent',
  login: {
    action: () => console.log('Login action executed'),
  },
} satisfies RouteHandlers;

appRoutes.login.action();
