// Вам необхідно написати додаток Todo list.

// У списку нотаток повинні бути методи для додавання нового запису, видалення, редагування та отримання повної інформації про нотатку за ідентифікатором, а так само отримання списку всіх нотаток.

// Крім цього, у користувача має бути можливість позначити нотаток, як виконаний, і отримання інформації про те, скільки всього нотаток у списку і скільки залишилося невиконаними. Нотатки не повинні бути порожніми

// Кожний нотаток має назву, зміст, дату створення і редагування та статус. Нотатки бувають двох типів. Дефолтні та такі, які вимагають підтвердження при ридагуванні.

// Окремо необхідно розширити поведінку списку та додати можливість пошуку нотатка за ім'ям або змістом.

// Також окремо необхідно розширити список можливістю сортування нотаток за статусом або часом створення.

type Status = 'active' | 'complete';
type Search = 'title' | 'value';
type Sort = 'status' | 'createdAt';

interface Note {
  id: number;
  title: string;
  value: string;
  createdAt: Date;
  updatedAt: Date;
  status: Status;
  confirmStatus: boolean;
}

interface Statistic {
  total: number;
  complete: number;
  active: number;
}

interface List<T> {
  addNote(note: T): void;
  editNote(args: Partial<T>): void;
  deleteNote(id: number): void;
  getSingle(id: number): T | undefined;
  getAll(): Note[];
  getStatistic(): Statistic;
  markNote(id: number): void;
  search(query: Search): Note[];
  sort(param: Sort): Note[];
}

class GenerateId {
  storedNotes = localStorage.getItem('notes') || '[]';
  notes: Note[] = JSON.parse(this.storedNotes);
  generate(): number {
    if (this.notes.length === 0) return 1;

    let maxId = Math.max(...this.notes.map((note) => note.id));
    return ++maxId;
  }
}

class TodoItem implements Note {
  generateId = new GenerateId();
  id = this.generateId.generate();
  createdAt = new Date();
  updatedAt = new Date();
  status: Status = 'active';
  confirmStatus = false;
  title: string;
  value: string;

  constructor(title: string, value: string) {
    this.title = title;
    this.value = value;
    if (!this.title.trim() || !this.value.trim()) {
      throw new Error('Заповніть поля');
    }
  }
}

class CanEdite extends TodoItem {
  constructor(title: string, value: string) {
    super(title, value);
    this.confirmStatus = true;
  }
}

class TodoList implements List<Note> {
  storedNotes = localStorage.getItem('notes') || '[]';
  notes: Note[] = JSON.parse(this.storedNotes);

  addNote(note: Note) {
    this.notes.push(note);
  }

  editNote(args: Note) {
    const { id, title, value } = args;
    const note = this.getSingle(id);
    if (!note) return;
    if (note.confirmStatus) {
      const isConfirmed = confirm('Бажаєте дозволити редагування?');
      if (isConfirmed) {
        note.title = title;
        note.value = value;
        note.updatedAt = new Date();
      } else {
        alert('Редагування скасовано');
      }
    }

    if (!title.trim() || !value.trim()) {
      throw new Error('Заповніть поля');
    }

    note.title = title;
    note.value = value;
    note.updatedAt = new Date();
  }

  deleteNote(id: number) {
    this.notes = this.notes.filter((item) => item.id !== id);
  }

  getSingle(id: number): Note | undefined {
    return this.notes.find((item) => item.id === id);
  }

  getAll(): Note[] {
    return [...this.notes];
  }

  getStatistic(): Statistic {
    const total = this.notes.length;
    const complete = this.notes.filter(
      (item) => item.status === 'complete',
    ).length;
    return { total, complete, active: total - complete };
  }

  markNote(id: number) {
    const note = this.getSingle(id);
    if (note) {
      note.status = note.status === 'active' ? 'complete' : 'active';
      note.updatedAt = new Date();
    }
  }

  search(query: Search): Note[] {
    return this.notes.filter(
      (item) =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.value.toLowerCase().includes(query.toLowerCase()),
    );
  }

  sort(param: Sort): Note[] {
    return [...this.notes].sort((a, b) => {
      if (param === 'createdAt') {
        return b.createdAt.getDate() - a.createdAt.getDate();
      } else {
        return a.status.localeCompare(b.status);
      }
    });
  }
}
