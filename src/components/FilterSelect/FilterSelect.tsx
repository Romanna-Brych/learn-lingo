import { useState } from "react";
import css from "./FilterSelect.module.css";

type Option = {
  label: string;
  value: string;
};

type Props = {
  label: string;
  value: string;
  placeholder: string;
  options: Option[];
  onChange: (value: string) => void;
};

const FilterSelect = ({
  label,
  value,
  placeholder,
  options,
  onChange,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedLabel =
    options.find((option) => option.value === value)?.label ?? placeholder;

  const handleSelect = (value: string) => {
    onChange(value);
    setIsOpen(false);
  };

  return (
    <div className={css.wrapper}>
      <p className={css.label}>{label}</p>

      <div className={css.selectWrapper}>
        <button
          type="button"
          className={css.selectBtn}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {selectedLabel}

          <svg className={`${css.arrow} ${isOpen ? css.arrowOpen : ""}`}>
            <use href="/sprite.svg#icon-arrow-down" />
          </svg>
        </button>

        {isOpen && (
          <ul className={css.options}>
            {options.map((option) => (
              <li key={option.value}>
                <button
                  type="button"
                  className={`${css.option} ${
                    option.value === value ? css.activeOption : ""
                  }`}
                  onClick={() => handleSelect(option.value)}
                >
                  {option.label}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default FilterSelect;
