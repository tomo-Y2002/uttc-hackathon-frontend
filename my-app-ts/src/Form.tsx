import { useForm } from "react-hook-form";
import "./Form.css";

type FormProps = {
    onSubmit: (name: string, age: number) => void;
};

type FormInput = {
    name: string;
    age: string;
}

const Form = (props: FormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormInput>({
    criteriaMode: "all",
  });

  const onSubmit = (data: FormInput) => {
    if (errors.name) {
      console.log("Name validation error",errors.name.message);
    }
    if (errors.age) {
      console.log("Name validation error",errors.age.message);
    }
    props.onSubmit(data.name, parseInt(data.age));
    reset();
  };
  

  return (
    <form id="user-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-gruoup">
        <div className="input-section">
          <label htmlFor="user-name">Name: </label>
          <input
            id="user-name"
            type={"text"}
            {...register("name", {
              required: {
                value: true,
                message: '入力が必須の項目です。',
              },
              maxLength: {
                value: 50,
                message: '50文字以下で入力してください。',
              },
            })}
          />
          {errors.name?.type === "required" && <div className="error">{errors.name.message}</div>}
          {errors.name?.type === "maxLength" && <div className="error">{errors.name.message}</div>}
        </div>
        <div className="input-section">
          <label htmlFor="user-age">Age: </label>
          <input
            id="user-age"
            type={"number"}
            {...register("age", {
              required: {
                value: true,
                message: '入力が必須の項目です。',
              },
              max: {
                value: 80,
                message: '80歳以下で入力してください。'
              },
              min: {
                value: 20,
                message: '20歳以上で入力してください。'
              }
            })}
          />
          {errors.age && <div className="error">{errors.age.message}</div>}
        </div>
        <button id="submit-button" type={"submit"}>Submit</button>
      </div>
    </form>
  );
};

export default Form;