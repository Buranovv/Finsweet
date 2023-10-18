import { useState } from "react";
import { useForm } from "react-hook-form";
import request from "../../server";
import { Modal } from "antd";
import { toast } from "react-toastify";

const AccountForm = () => {
  const [formLoad, setFormLoad] = useState(false);

  const {
    formState: { errors },
    register,
    handleSubmit,
    reset,
    watch,
  } = useForm({
    mode: "onTouched",
  });

  const change = (data) => {
    Modal.confirm({
      title: "Do you want to change your password?",
      onOk: async () => {
        try {
          setFormLoad(true);
          await request.put("auth/password", data);
          reset({ currentPassword: "", newPassword: "" });
          toast.success("Password changed!");
        } catch (error) {
          console.log(error);
        } finally {
          setFormLoad(false);
        }
      },
    });
  };

  const currentPassword = watch("currentPassword");

  return (
    <div>
      <form
        onSubmit={handleSubmit(change)}
        className={`form ${formLoad ? "form-disabled" : ""}`}
      >
        <div>
          <input
            style={{
              border: `1px solid ${errors.currentPassword ? "red" : ""}`,
            }}
            type="password"
            placeholder="Current password"
            {...register("currentPassword", {
              required: "Please enter the current password!",
            })}
          />
          {errors.currentPassword ? (
            <p>{errors.currentPassword?.message}</p>
          ) : null}
        </div>
        <div>
          <input
            style={{ border: `1px solid ${errors.newPassword ? "red" : ""}` }}
            type="password"
            placeholder="New password"
            {...register("newPassword", {
              required: "Please enter a new password!",
              minLength: {
                value: 5,
                message: "Password`s minimal length must be 5!",
              },
              validate: (value) =>
                value !== currentPassword || "The passwords must not be same!",
            })}
          />
          {errors.newPassword ? <p>{errors.newPassword?.message}</p> : null}
        </div>
        <button type="submit">Change</button>
      </form>
    </div>
  );
};

export default AccountForm;
