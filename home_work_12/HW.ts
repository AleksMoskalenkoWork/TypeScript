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

type FilterType = 'match' | 'range' | 'values';

type BaseFilter<F> = {
  type: FilterType;
  filter: Extract<F, string | number>;
  filterTo?: Extract<F, string | number>;
};

type SearchFilter<F> = {
  values: F[];
};

interface BaseFilterState {
  name?: BaseFilter<string>;
}

interface MovieFilterState extends BaseFilterState {
  releaseYear?: BaseFilter<string | number>;
  rating?: BaseFilter<string | number>;
  awards?: SearchFilter<string>;
}

interface List<T, F extends BaseFilterState> {
  items: T[];
  filterState: F;
  applySearchValue(name: string): void;
  applyFiltersValue(filters: Partial<F>): void;
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
