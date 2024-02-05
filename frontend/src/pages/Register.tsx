import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";

export type RegisterForm = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { showToast } = useAppContext();
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>();
  const mutation = useMutation(apiClient.register, {
    onSuccess: async() => {
      showToast({ message: "Account created", type: "SUCCESS" });
      await queryClient.invalidateQueries("validateToken");
      navigate("/");
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type:"ERROR"});
    },
  });
  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <form className="flex flex-col gap-5" onSubmit={onSubmit}>
      <h2 className="text-3xl font-bold">Create an account</h2>
      <div className="flex flex-col md:flex-row gap-5">
        <label className="text-gray-700 text-sm font-bold flex-1">
          First Name
          <input
            type="text"
            className="border rounded w-full px-1 py-2 font-normal"
            {...register("firstName", { required: "This is required" })}
          />
          {errors.firstName && (
            <span className="text-red-500 text-sm">
              {errors.firstName.message}
            </span>
          )}
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
          Last Name
          <input
            type="text"
            className="border rounded w-full px-1 py-2 font-normal"
            {...register("lastName", { required: "This is required" })}
          />
          {errors.lastName && (
            <span className="text-red-500 text-sm">
              {errors.lastName.message}
            </span>
          )}
        </label>
      </div>

      <label className="text-gray-700 text-sm font-bold">
        Email
        <input
          type="email"
          className="border rounded w-full px-1 py-2 font-normal"
          {...register("email", { required: "This is required" })}
        />
        {errors.email && (
          <span className="text-red-500 text-sm">{errors.email.message}</span>
        )}
      </label>
      <label className="text-gray-700 text-sm font-bold">
        Password
        <input
          type="password"
          className="border rounded w-full px-1 py-2 font-normal"
          {...register("password", {
            required: "This is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          })}
        />
        {errors.password && (
          <span className="text-red-500 text-sm">
            {errors.password.message}
          </span>
        )}
      </label>
      <label className="text-gray-700 text-sm font-bold">
        ConfirmPassword
        <input
          type="password"
          className="border rounded w-full px-1 py-2 font-normal"
          {...register("confirmPassword", {
            required: "This is required",
            validate: (val) => {
              if (!val) {
                return "This is required";
              } else if (val !== watch("password")) {
                return "Password does not match";
              }
            },
          })}
        />
        {errors.confirmPassword && (
          <span className="text-red-500 text-sm">
            {errors.confirmPassword.message}
          </span>
        )}
      </label>
      <span>
        <button
          className="bg-blue-500 text-white font-bold p-2  rounded hover:bg-blue-700 text-xl"
          type="submit"
        >
          Register
        </button>
      </span>
    </form>
  );
};

export default Register;
