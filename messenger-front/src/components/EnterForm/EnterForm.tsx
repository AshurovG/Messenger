import React from "react";
import styles from "./EnterForm.module.scss";
import Button from "components/Button";
import Input from "components/Input";
import cn from "classnames";
import { useTheme } from "slices/MainSlice";

type EnterFormProps = {
  onSumbit: React.FormEventHandler<HTMLFormElement>;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  value: string;
  className?: string;
};

const EnterForm: React.FC<EnterFormProps> = ({
  onSumbit,
  onChange,
  value,
  className,
}) => {
  const theme = useTheme();
  React.useEffect(() => {
    console.log(value);
  }, []);

  return (
    <form className={cn(styles.form, className)} onSubmit={onSumbit}>
      <Input mode={`input__${theme}`} onChange={onChange} value={value} />
      <Button
        className={styles.form__btn}
        type="submit"
        mode={`button__${theme}`}
      >
        Подключиться
      </Button>
    </form>
  );
};

export default EnterForm;
