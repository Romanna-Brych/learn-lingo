import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import type { Teacher } from "../../types/teacher";
import css from "./TrialLessonForm.module.css";

type TrialLessonFormData = {
  reason: string;
  fullName: string;
  email: string;
  phone: string;
};

type Props = {
  teacher: Teacher;
  onClose: () => void;
};

const schema = yup.object({
  reason: yup.string().required("Please choose a reason"),
  fullName: yup.string().required("Full name is required"),
  email: yup
    .string()
    .required("Email is required")
    .email("Enter a valid email"),
  phone: yup.string().required("Phone number is required"),
});

const reasons = [
  "Career and business",
  "Lesson for kids",
  "Living abroad",
  "Exams and coursework",
  "Culture, travel or hobby",
];

const TrialLessonForm = ({ teacher, onClose }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TrialLessonFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: TrialLessonFormData) => {
    console.log("Trial lesson booking:", {
      teacherId: teacher.id,
      teacherName: `${teacher.name} ${teacher.surname}`,
      ...data,
    });

    onClose();
  };

  return (
    <div>
      <h2 className={css.title}>Book trial lesson</h2>

      <p className={css.text}>
        Our experienced tutor will assess your current language level, discuss
        your learning goals, and tailor the lesson to your specific needs.
      </p>

      <div className={css.teacher}>
        <img
          src={teacher.avatar_url}
          alt={`${teacher.name} ${teacher.surname}`}
          className={css.avatar}
        />

        <div>
          <p className={css.teacherLabel}>Your teacher</p>
          <p className={css.teacherName}>
            {teacher.name} {teacher.surname}
          </p>
        </div>
      </div>

      <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
        <fieldset className={css.fieldset}>
          <legend className={css.legend}>
            What is your main reason for learning English?
          </legend>

          <div className={css.radioGroup}>
            {reasons.map((reason) => (
              <label key={reason} className={css.radioLabel}>
                <input
                  type="radio"
                  value={reason}
                  className={css.radioInput}
                  {...register("reason")}
                />
                <span className={css.customRadio}></span>
                {reason}
              </label>
            ))}
          </div>

          {errors.reason && (
            <span className={css.error}>{errors.reason.message}</span>
          )}
        </fieldset>

        <label className={css.field}>
          <input
            className={css.input}
            type="text"
            placeholder="Full Name"
            {...register("fullName")}
          />
          {errors.fullName && (
            <span className={css.error}>{errors.fullName.message}</span>
          )}
        </label>

        <label className={css.field}>
          <input
            className={css.input}
            type="email"
            placeholder="Email"
            {...register("email")}
          />
          {errors.email && (
            <span className={css.error}>{errors.email.message}</span>
          )}
        </label>

        <label className={css.field}>
          <input
            className={css.input}
            type="tel"
            placeholder="Phone number"
            {...register("phone")}
          />
          {errors.phone && (
            <span className={css.error}>{errors.phone.message}</span>
          )}
        </label>

        <button className={css.submitBtn} type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Booking..." : "Book"}
        </button>
      </form>
    </div>
  );
};

export default TrialLessonForm;
