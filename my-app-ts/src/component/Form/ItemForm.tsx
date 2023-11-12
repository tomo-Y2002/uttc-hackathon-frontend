import { useForm } from "react-hook-form";
import "./ItemForm.css";
import { useAuthContext } from "../../feature/auth/provider/AuthProvider";

type FormProps = {
    onSubmit: (userId: string, categoryId: number, chapterId: number, title: string, description: string, content: string) => void;
};

type FormInput = {
    categoryId: number;
    chapterId: number;
    title: string;
    description: string;
    content: string;
}

export const ItemForm = (props: FormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormInput>({
    criteriaMode: "all",
  });
  const { user } = useAuthContext();

  const onSubmit = (data: FormInput) => {
    if (errors.categoryId) {
      console.log("CategoryId validation error",errors.categoryId.message);
    }
    if (errors.chapterId) {
      console.log("ChapterId validation error",errors.chapterId.message);
    }
    if (errors.title) {
      console.log("Title validation error",errors.title.message);
    }
    if (errors.description) {
      console.log("Description validation error",errors.description.message);
    }
    if (errors.content) {
      console.log("Content validation error",errors.content.message);
    }
    if (!user || !user.uid) {
      console.error("User is not authenticated");
      return;
    }
    console.log(data.categoryId, data.chapterId, data.title, data.description, data.content)
    props.onSubmit(user.uid, data.categoryId, data.chapterId, data.title, data.description, data.content);
    reset();
  };
  

  return (
    <form id="user-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <div className="input-section">
          <label htmlFor="category-id">カテゴリ</label>
          <select 
            id="category-id"
            className="input-id"
            {...register("categoryId", {
              required: {
                value: true,
                message: '入力が必須の項目です。',
              },
              valueAsNumber: true,
            })}
          >
            {["ブログ", 
                  "技術書", 
                  "動画"
                  ].map((item, index) => (
              <option key={index} value={index+1}>{item}</option>
            ))}
          </select>
          {errors.categoryId && <div className="error">{errors.categoryId.message}</div>}
        </div>
        <div className="input-section">
          <label htmlFor="chapter-id">カリキュラム</label>
          <select 
            id="chapter-id"
            className="input-id"
            {...register("chapterId", {
              required: {
                value: true,
                message: '入力が必須の項目です。',
              },
              valueAsNumber: true,
            })}
          >
            {["OSコマンド", 
                  "Git", 
                  "GitHub", 
                  "HTML&CSS", 
                  "JavaScript", 
                  "React", 
                  "React x Typescript", 
                  "SQL", 
                  "Docker", 
                  "Go", 
                  "HTTP Server", 
                  "RDBMS", "UnitTest", 
                  "フロントエンドとバクエンドの接続", 
                  "CI", 
                  "CD", 
                  "認証", 
                  "ハッカソン準備"].map((item, index) => (
              <option key={index} value={index+1}>{item}</option>
            ))}
          </select>
          {errors.chapterId && <div className="error">{errors.chapterId.message}</div>}
        </div>
        <div className="input-section">
          <label htmlFor="title">タイトル </label>
          <input
            id="title"
            type={"text"}
            {...register("title", {
              required: {
                value: true,
                message: '入力が必須の項目です。',
              }
            })}
          />
          {errors.title && <div className="error">{errors.title.message}</div>}
        </div>
        <div className="input-section">
          <label htmlFor="description">説明</label>
          <input
            id="description"
            type={"text"}
            {...register("description", {
              required: {
                value: true,
                message: '入力が必須の項目です。',
              }
            })}
          />
          {errors.description && <div className="error">{errors.description.message}</div>}
        </div>
        <div className="input-section">
          <label htmlFor="content">内容</label>
          <textarea
            id="content"
            className="input-content"
            {...register("content", {
              required: {
                value: true,
                message: '入力が必須の項目です。',
              }
            })}
          />
          {errors.content && <div className="error">{errors.content.message}</div>}
        </div>
        <button id="submit-button" type={"submit"}>Submit</button>
      </div>
    </form>
  );
};
