import css from "./TeachersFilters.module.css";

type Props = {
  language: string;
  level: string;
  price: string;
  onChange: (name: string, value: string) => void;
  onReset: () => void;
};

const TeachersFilters = ({
  language,
  level,
  price,
  onChange,
  onReset,
}: Props) => {
  return (
    <div className={css.filters}>
      <label className={css.label}>
        Languages
        <select
          className={css.select}
          value={language}
          onChange={(e) => onChange("language", e.target.value)}
        >
          <option value="">All</option>
          <option value="French">French</option>
          <option value="English">English</option>
          <option value="German">German</option>
          <option value="Ukrainian">Ukrainian</option>
          <option value="Polish">Polish</option>
        </select>
      </label>

      <label className={css.label}>
        Level
        <select
          className={css.select}
          value={level}
          onChange={(e) => onChange("level", e.target.value)}
        >
          <option value="">All</option>
          <option value="A1 Beginner">A1 Beginner</option>
          <option value="A2 Elementary">A2 Elementary</option>
          <option value="B1 Intermediate">B1 Intermediate</option>
          <option value="B2 Upper-Intermediate">B2 Upper-Intermediate</option>
        </select>
      </label>

      <label className={css.label}>
        Price
        <select
          className={css.select}
          value={price}
          onChange={(e) => onChange("price", e.target.value)}
        >
          <option value="">All</option>
          <option value="10">10 $</option>
          <option value="20">20 $</option>
          <option value="30">30 $</option>
          <option value="40">40 $</option>
        </select>
      </label>

      <button type="button" className={css.resetBtn} onClick={onReset}>
        Reset
      </button>
    </div>
  );
};

export default TeachersFilters;
