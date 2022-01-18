import React, { useRef } from "react";
import classNames from "classnames";
import { UploadCloud as UploadIcon, X as RemoveIcon } from "react-feather";

import styles from "./Input.module.css";

interface Props {
  className?: string;
  placeholder?: string;
  value?: string;
  onChange?: (data: any) => void;
  autoFocus?: boolean;
  type: "text" | "image";
  onImageDeleteClick?: () => void;
}

type OnChangePayload<T extends { type: "text" | "image" }> = T extends {
  type: "text";
}
  ? React.ChangeEvent<HTMLInputElement>
  : string;

// type Props = {
//   className?: string;
//   placeholder?: string;
//   value?: string;
//   autoFocus?: boolean;
//   onImageDeleteClick?: () => void;
// } & (
//   | {
//       type: "text";
//       onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
//     }
//   | {
//       type: "image";
//       onChange: (base64Image: string) => void;
//     }
// );

const Input: React.FC<Props> = ({
  className,
  placeholder,
  value,
  onChange,
  autoFocus,
  type,
  onImageDeleteClick,
}) => {
  const imageInput = useRef<HTMLInputElement>(null);

  const handleImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.length) return;

    const file = event.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      if (typeof reader.result === "string" && onChange) {
        onChange(reader.result);
      }
    };

    reader.onerror = (error) => {
      console.log("Error: ", error);
    };
  };

  return (
    <div
      className={classNames(
        styles.container,
        { [styles.imageInput]: type === "image" },
        className
      )}
      onClick={() => {
        if (type !== "image") return;

        imageInput.current?.click();
      }}
    >
      {type === "image" ? (
        <>
          {value ? (
            <>
              <div
                className={styles.removeLogoContainer}
                onClick={onImageDeleteClick}
              >
                <RemoveIcon className={styles.removeIcon} />
              </div>
              <img src={value} alt="Logo" />
            </>
          ) : (
            <>
              <input
                type="file"
                accept="image/*"
                onChange={handleImage}
                ref={imageInput}
                multiple={false}
              />
              <UploadIcon
                className={styles.uploadIcon}
                width={72}
                height={72}
              />
            </>
          )}
        </>
      ) : (
        <input
          className={styles.input}
          placeholder={placeholder}
          dir="auto"
          value={value}
          onChange={onChange}
          autoFocus={autoFocus}
        />
      )}
    </div>
  );
};

Input.defaultProps = {
  className: "",
  value: "",
  onChange: (e) => null,
  autoFocus: false,
  type: "text",
  placeholder: "",
  onImageDeleteClick: () => null,
};

export default Input;
