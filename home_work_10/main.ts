// Вам потрібно створити тип DeepReadonly який буде робити доступними тільки для читання навіть властивості вкладених обʼєктів.
type DeepReadonly<T> = {
  // ітерація по ключам
  readonly [K in keyof T]: T[K] extends object // перевірка чи є ключ обʼєктом
    ? DeepReadonly<T[K]>
    : T[K]; // умова якщо обʼєкт, викликаємо DeepReadonly інакше повертаємо властивості
};

// Вам потрібно створити тип DeepRequireReadonly який буде робити доступними тільки для читання навіть властивості вкладених обʼєктів та ще й робити їх обовʼязковими.

type DeepRequireReadonly<T> = {
  readonly [K in keyof T]-?: T[K] extends object
    ? DeepRequireReadonly<T[K]>
    : T[K];
}; // реалізація як в попоредньому завданні, але додаємо -?

// Вам потрібно створити тип UpperCaseKeys, який буде приводити всі ключі до верхнього регістру.
type UpperCaseKeys<T> = {
  [K in keyof T as Uppercase<K & string>]: T[K];
};

// І саме цікаве. Створіть тип ObjectToPropertyDescriptor, який перетворює звичайний обʼєкт на обʼєкт де кожне value є дескриптором.

type ObjectToPropertyDescriptor<T> = {
  [K in keyof T]: {
    value: T[K];
  };
};
// треба більше погуглити, не впевнений в реалізаціі
