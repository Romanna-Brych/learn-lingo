import FilterSelect from "../FilterSelect/FilterSelect";
import css from "./TeachersFilters.module.css";

type Props = {
  language: string;
  level: string;
  price: string;
  onChange: (name: string, value: string) => void;
  onReset: () => void;
};

const languageOptions = [
  { label: "All", value: "" },
  { label: "French", value: "French" },
  { label: "English", value: "English" },
  { label: "German", value: "German" },
  { label: "Ukrainian", value: "Ukrainian" },
  { label: "Polish", value: "Polish" },
];

const levelOptions = [
  { label: "All", value: "" },
  { label: "A1 Beginner", value: "A1 Beginner" },
  { label: "A2 Elementary", value: "A2 Elementary" },
  { label: "B1 Intermediate", value: "B1 Intermediate" },
  { label: "B2 Upper-Intermediate", value: "B2 Upper-Intermediate" },
];

const priceOptions = [
  { label: "All", value: "" },
  { label: "10 $", value: "10" },
  { label: "20 $", value: "20" },
  { label: "30 $", value: "30" },
  { label: "40 $", value: "40" },
];

const TeachersFilters = ({
  language,
  level,
  price,
  onChange,
  onReset,
}: Props) => {
  return (
    <div className={css.filters}>
      <FilterSelect
        label="Languages"
        value={language}
        placeholder="All"
        options={languageOptions}
        onChange={(value) => onChange("language", value)}
      />

      <FilterSelect
        label="Level of knowledge"
        value={level}
        placeholder="All"
        options={levelOptions}
        onChange={(value) => onChange("level", value)}
      />

      <FilterSelect
        label="Price"
        value={price}
        placeholder="All"
        options={priceOptions}
        onChange={(value) => onChange("price", value)}
      />

      <button type="button" className={css.resetBtn} onClick={onReset}>
        Reset
      </button>
    </div>
  );
};

export default TeachersFilters;
