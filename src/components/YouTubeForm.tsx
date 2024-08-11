import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

type FormValues = {
  username: string;
  email: string;
  channel: string;
};

export const YouTubeForm = () => {
  const form = useForm<FormValues>();
  const { register, control, handleSubmit, formState: { errors } } = form;

  const onSubmit = (data: FormValues) => {
    console.log("Form submitted", data);
  };

  return (
    <div>
      <h1>YouTube Form</h1>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          {...register("username", {
            required: "Username is required",
            validate: (value) => 
              value.includes("admin")
                ? "Username cannot contain 'admin'"
                : true,
          })}
        />
        {errors.username && <p>{errors.username.message}</p>}

        <label htmlFor="email">E-mail</label>
        <input
          type="email"
          id="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
              message: "Enter a valid email address",
            },
          })}
        />
        {errors.email && <p>{errors.email.message}</p>}

        <label htmlFor="channel">Channel</label>
        <input
          type="text"
          id="channel"
          {...register("channel", {
            required: "Channel name is required",
            validate: {
              noSpace: (value) =>
                value.trim() !== value
                  ? "Channel name cannot start or end with a space"
                  : true,
              minLength: (value) =>
                value.length >= 5
                  ? true
                  : "Channel name must be at least 5 characters long",
            },
          })}
        />
        {errors.channel && <p>{errors.channel.message}</p>}

        <button>Submit</button>
      </form>
      <DevTool control={control} />
    </div>
  );
};
