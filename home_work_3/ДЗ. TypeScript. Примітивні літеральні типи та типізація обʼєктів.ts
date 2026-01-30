type StatusType = 'active' | 'inactive';
type AreaType = 'frontend' | 'backend' | 'fullstack';
type LevelType = 'junior' | 'middle' | 'senior';
type DirectionType = 'web' | 'mobile' | 'desktop';

class Lecturer {
  _name: string;
  _specialization: AreaType;
  _experience: number;

  constructor(name: string, specialization: AreaType, experience: number) {
    this._name = name;
    this._specialization = specialization;
    this._experience = experience;
  }

  get name(): string {
    return this._name;
  }

  get specialization(): AreaType {
    return this._specialization;
  }

  get experience(): number {
    return this._experience;
  }
}

class School {
  // implement 'add area', 'remove area', 'add lecturer', and 'remove lecturer' methods

  // Name, surname, position, company, experience, courses, contacts
  _areas: Area[] = [];
  _lecturers: Lecturer[] = [];
  name: string;
  surname: string;
  position: string;
  company: string;
  experience: number;
  courses: string[];
  contacts: string;

  constructor(
    name: string,
    surname: string,
    position: string,
    company: string,
    experience: number,
    courses: string[],
    contacts: string,
  ) {
    this.name = name;
    this.surname = surname;
    this.position = position;
    this.company = company;
    this.experience = experience;
    this.courses = courses;
    this.contacts = contacts;
  }

  get areas(): Area[] {
    return this._areas;
  }

  get lecturers(): Lecturer[] {
    return this._lecturers;
  }

  addArea(area: Area): void {
    this._areas.push(area);
  }

  removeArea(areaName: string): void {
    this._areas = this._areas.filter((area) => area._name !== areaName);
  }

  addLecturer(lecturer: Lecturer): void {
    this._lecturers.push(lecturer);
  }

  removeLecturer(lecturerName: Lecturer): void {
    this._lecturers = this._lecturers.filter(
      (lecturer) => lecturer !== lecturerName,
    );
  }
}

class Area {
  // implement getters for fields and 'add/remove level' methods
  _levels: Level[] = [];
  _name: string;

  get name(): string {
    return this._name;
  }

  get levels(): Level[] {
    return this._levels;
  }

  constructor(name: string) {
    this._name = name;
  }

  addLevel(level: Level): void {
    this._levels.push(level);
  }

  removeLevel(levelName: string): void {
    this._levels = this._levels.filter((level) => level._name !== levelName);
  }
}

class Level {
  // implement getters for fields and 'add/remove group' methods

  _groups: Group[] = [];
  _name: string;
  _description: string;

  get name(): string {
    return this._name;
  }

  get description(): string {
    return this._description;
  }

  get groups(): Group[] {
    return this.groups;
  }

  constructor(name: string, description: string) {
    this._name = name;
    this._description = description;
  }

  addGroup(group: Group): void {
    this.groups.push(group);
  }

  removeGroup(groupIndex: number): void {
    this.groups.splice(groupIndex, 1);
  }
}

class Group {
  // implement getters for fields and 'add/remove student' and 'set status' methods

  _area: AreaType;
  _students: Student[] = []; // Modify the array so that it has a valid toSorted method*
  _status: StatusType;
  _directionName: DirectionType;
  _levelName: LevelType;

  get area(): AreaType {
    return this._area;
  }

  get students(): Student[] {
    return this._students;
  }

  get status(): StatusType {
    return this._status;
  }

  set status(value: StatusType) {
    this._status = value;
  }

  get directionName(): DirectionType {
    return this._directionName;
  }

  get levelName(): LevelType {
    return this._levelName;
  }

  constructor(
    directionName: DirectionType,
    levelName: LevelType,
    status: StatusType,
    area: AreaType,
  ) {
    this._directionName = directionName;
    this._levelName = levelName;
    this._status = status;
    this._area = area;
  }

  addStudent(student: Student): void {
    this._students.push(student);
  }

  removeStudent(studentIndex: number): void {
    this._students.splice(studentIndex, 1);
  }

  showPerformance(): Student[] {
    const sortedStudents = this._students.toSorted(
      (a, b) => b.getPerformanceRating() - a.getPerformanceRating(),
    );
    return sortedStudents;
  }
}

class Student {
  // implement 'set grade' and 'set visit' methods

  _firstName: string | undefined;
  _lastName: string | undefined;
  _birthYear: number;
  _grades: { [workName: string]: number } = {}; // workName: mark
  _visits: { [lesson: string]: string } = {}; // lesson: present

  constructor(firstName: string, lastName: string, birthYear: number) {
    this._firstName = firstName;
    this._lastName = lastName;
    this._birthYear = birthYear;
  }

  get fullName() {
    return `${this._lastName} ${this._firstName}`;
  }

  set fullName(value) {
    [this._lastName, this._firstName] = value.split(' ');
  }

  get age() {
    return new Date().getFullYear() - this._birthYear;
  }

  get grades() {
    return this._grades;
  }

  set grades(value: { [workName: string]: number }) {
    this._grades = value;
  }

  get visits() {
    return this._visits;
  }

  set visits(value: { [lesson: string]: string }) {
    this._visits = value;
  }

  getPerformanceRating() {
    const gradeValues = Object.values(this._grades);

    if (!gradeValues.length) return 0;

    const averageGrade =
      gradeValues.reduce((sum, grade) => sum + grade, 0) / gradeValues.length;
    const attendancePercentage =
      (Object.values(this._visits).filter((present) => present === 'present')
        .length /
        Object.keys(this._visits).length) *
      100;

    return (averageGrade + attendancePercentage) / 2;
  }
}
