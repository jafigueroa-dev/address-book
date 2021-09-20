import { ErrorMessage, Field, useField } from "formik";
import { InputHTMLAttributes } from "react";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
};

const InputField: React.FC<InputFieldProps> = ({
  label,
  placeholder,
  ...props
}) => {
  const [field] = useField<{}>(props);

  return (
    <div className="w-full p-2">
      <label className="font-medium text-sm">{label}</label>
      <Field
        placeholder={placeholder}
        {...field}
        className="w-full px-2 py-2 rounded-none border border-blue-400 bg-blue-50 focus:outline-none focus:ring-1 focus:ring-indigo-300 focus:border-indigo-300"
      />
      <ErrorMessage
        name={field.name}
        render={error => (
          <div className="text-xs font-medium text-red-500">{error}</div>
        )}
      />
    </div>
  );
};

export default InputField;
