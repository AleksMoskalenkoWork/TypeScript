// У вас є дві сутності - список фільмів і список категорій фільмів.++

// Кожен фільм містить поля: назва, рік випуску, рейтинг, список нагород.++

// Категорія містить поля: назва і фільми.++

interface Awards {
  name: string;
  year: number;
}

interface Movie {
  title: string;
  releaseYear: number;
  rating: number;
  awards: Awards[];
}

interface Category {
  name: string;
  movies: Movie[];
}

// У кожного списку є пошук за ім'ям (це, по суті, фільтрація), у списку ++ фільмів є додаткова фільтрація за роком випуску, рейтингом і нагородами.++

// У нас визначено три типи фільтрів:++

// Фільтр відповідності має поле filter++
// Фільтр діапазону має поле filter і filterTo++
// Фільтр пошуку за значеннями має поле values++

// Кожен список містить стан його фільтрів, який може бути змінений тільки методом applySearchValue або applyFiltersValue (за наявності додаткових фільтрів)

// я б рекомендував прибрати неоднорідність з фільтрів і додати кожному дискримінант

enum FilterType {
  Match = 'match',
  Range = 'range',
  Values = 'values',
}

interface MatchFilter<T> {
  type: FilterType.Match;
  value: T;
}

interface RangeFilter<T> {
  type: FilterType.Range;
  from: T;
  to: T;
}

interface SearchFilter<T> {
  type: FilterType.Values;
  values: T[];
}

type Filter<T> = MatchFilter<T> | RangeFilter<T> | SearchFilter<T>;

interface MovieFilterState {
  name?: Filter<string>;
  releaseYear?: Filter<number>;
  rating?: Filter<number>;
  awards?: Filter<string>;
}

interface List<T, F> {
  items: T[];
  filterState: F;
  applySearchValue(name: string): void;
  applyFiltersValue(filters: Partial<F>): void;
}

class MovieList implements List<Movie, MovieFilterState> {
  items: Movie[];
  filterState: MovieFilterState;

  constructor(movies: Movie[]) {
    this.items = movies;
    this.filterState = {};
  }

  applySearchValue(name: string): void {
    this.filterState.name = { type: FilterType.Match, value: name };
  }

  applyFiltersValue(filters: Partial<MovieFilterState>): void {
    this.filterState = { ...this.filterState, ...filters };
  }
}

// Вам необхідно подумати про поділ вашого коду на різні сутності, інтерфеси і типи, щоб зробити ваше рішення типобезпечним. Реалізація всіх методів не є необхідною - це за бажанням.

// type GridFilterValue<T> = {
//   type: GridFilterTypeEnum;
//   filter: Extract<T, string | number>;
//   filterTo?: Extract<T, string | number>;
// };

// type GridFilterSetValues<T> = {
//   values: T[];
// };
