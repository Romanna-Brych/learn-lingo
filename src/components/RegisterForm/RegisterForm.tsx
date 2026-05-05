import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useAuth } from "../../context/AuthContext";
import css from "./RegisterForm.module.css";
import toast from "react-hot-toast";

type RegisterFormData = {
  name: string;
  email: string;
  password: string;
};

type Props = {
  onClose: () => void;
};

const schema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .required("Email is required")
    .email("Enter a valid email"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

const RegisterForm = ({ onClose }: Props) => {
  const { register: registerUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<RegisterFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await registerUser(data.email, data.password);
      onClose();
      toast.success("Registration successful");
    } catch {
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <div>
      <h2 className={css.title}>Registration</h2>

      <p className={css.text}>
        Thank you for your interest in our platform! To complete your
        registration, please provide the following information.
      </p>

      <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
        <label className={css.field}>
          <input
            className={css.input}
            type="text"
            placeholder="Name"
            {...register("name")}
          />
          {errors.name && (
            <span className={css.error}>{errors.name.message}</span>
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
            type="password"
            placeholder="Password"
            {...register("password")}
          />
          {errors.password && (
            <span className={css.error}>{errors.password.message}</span>
          )}
        </label>

        {errors.root && <p className={css.error}>{errors.root.message}</p>}

        <button className={css.submitBtn} type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Loading..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
