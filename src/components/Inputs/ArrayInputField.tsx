import { Field, FieldArrayRenderProps, useField } from "formik";
import { InputHTMLAttributes, useState } from "react";
import RemoveIcon from "../Icons/RemoveIcon";

type ArrayInputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  index: number;
  arrayHelper: FieldArrayRenderProps;
};

const ArrayInputField: React.FC<ArrayInputFieldProps> = ({
  index,
  placeholder,
  arrayHelper,
  ...props
}) => {
  const [indexField, setIndexField] = useState<number | null>(null);
  const [isInputFocus, setIsInputFocus] = useState(false);

  const [field, { error, value }] = useField<{}>(props);

  const valueToString = value as string;

  return (
    <>
      <Field
        key={index}
        {...field}
        placeholder={placeholder}
        onMouseEnter={() => setIndexField(index)}
        onMouseLeave={() => {
          if (!isInputFocus) setIndexField(null);
        }}
        onFocus={() => setIsInputFocus(true)}
        onBlur={() => {
          setIsInputFocus(false);
          setIndexField(null);
          if (!value) arrayHelper.remove(index);
        }}
        style={{
          width: `${
            valueToString.length === 0
              ? placeholder?.length
              : valueToString.length + 1
          }ch`,
        }}
        className={`border border-t-0 border-l-0 border-r-0 text-lg focus:outline-none ${
          indexField === index ? "border-b-2" : "border-b-2 border-white"
        }`}
      />
      <div className="items-center flex flex-1">
        {indexField === index || error ? (
          <div
            onMouseEnter={() => setIndexField(index)}
            onMouseLeave={() => {
              if (!isInputFocus) setIndexField(null);
            }}
            onClick={() => arrayHelper.remove(index)}
            className="cursor-pointer"
          >
            <RemoveIcon width="24" height="24" />
          </div>
        ) : null}
        {error ? (
          <div className="text-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
            {error}
          </div>
        ) : null}
      </div>
    </>
  );
};

export default ArrayInputField;
