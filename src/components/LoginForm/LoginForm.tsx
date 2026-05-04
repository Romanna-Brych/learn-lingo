import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useAuth } from "../../context/AuthContext";
import css from "./LoginForm.module.css";

type LoginFormData = {
  email: string;
  password: string;
};

type Props = {
  onClose: () => void;
};

const schema = yup.object({
  email: yup
    .string()
    .required("Email is required")
    .email("Enter a valid email"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

const LoginForm = ({ onClose }: Props) => {
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LoginFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data.email, data.password);
      onClose();
    } catch {
      setError("root", {
        message: "Invalid email or password",
      });
    }
  };

  return (
    <div>
      <h2 className={css.title}>Log In</h2>

      <p className={css.text}>
        Welcome back! Please enter your credentials to access your account and
        continue your search for a teacher.
      </p>

      <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
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
          {isSubmitting ? "Loading..." : "Log In"}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
