type GridFilterValue<T> = {
  type: GridFilterTypeEnum;
  filter: Extract<T, string | number>;
  filterTo?: Extract<T, string | number>;
};

type GridFilterSetValues<T> = {
  values: T[];
};