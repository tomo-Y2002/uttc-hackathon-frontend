import { useForm } from "react-hook-form";
import { useState } from "react";
import "./ItemForm.css";
import { useAuthContext } from "../../feature/auth/provider/AuthProvider";
import { marked } from "marked";
import sanitizeHtml from 'sanitize-html';
import { SubmitProps } from "../../types";
import { useSubmitItem } from "../../hooks/useSubmitItem";

type FormProps = {
    fetchItems: () => void;
};

type FormInput = {
    categoryId: number;
    chapterId: number;
    title: string;
    description: string;
    content: string;
}

export const ItemForm = (formProps: FormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormInput>({
    criteriaMode: "all",
  });
  const { user } = useAuthContext();
  const [markdown, setMarkdown] = useState('');
  const [preview, setPreview] = useState(false);
  const { handleSubmitItem } = useSubmitItem();

  const markedText = sanitizeHtml(markdown, {
    allowedTags: [],
    disallowedTagsMode: 'recursiveEscape',
  });
  marked.setOptions({
    gfm: true,
    breaks: true,
  });
  const htmlText = marked.parse(markedText);

  const handlePreview = () => {
    setPreview(!preview);
  };

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
    setMarkdown('')
    console.log(data.categoryId, data.chapterId, data.title, data.description, data.content)
    const props: SubmitProps = {
      userId: user.uid,
      categoryId: data.categoryId,
      chapterId: data.chapterId,
      title: data.title,
      description: data.description,
      content: data.content,
    }
    handleSubmitItem(props);
    formProps.fetchItems();
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
          <div className="button-preview-wrapper">
            <button type="button" onClick={handlePreview} className="button-preview">{preview?("Preview"):("Code")}</button>
          </div>
          <div className="input-preview">
            {preview ? (
              <div className="inner-input">
                <textarea
                  id="content"
                  className="input-content"
                  {...register("content", {
                    required: {
                      value: true,
                      message: '入力が必須の項目です。',
                    }
                  })}
                  value={markdown}
                  onChange={(e) => setMarkdown(e.target.value)}
                />
                {errors.content && <div className="error">{errors.content.message}</div>}
              </div>
            ):(
              <div className="inner-preview">
                <div className="bg-gray-200 p-3 text-sm w-full prose prose-sm">
                  <div
                    className="markdown-preview"
                    dangerouslySetInnerHTML={{ __html: htmlText}}
                  />
                </div>
              </div>
            )}
          </div>
          
        </div>
        
        <button id="submit-button" type={"submit"}>Submit</button>
      </div>
    </form>
  );
};
