import React from "react";
import styles from "./EnterForm.module.scss";
import Button from "components/Button";
import Input from "components/Input";
import cn from "classnames";

type EnterFormProps = {
  onSumbit: React.FormEventHandler<HTMLFormElement>;
  className?: string;
};

const EnterForm: React.FC<EnterFormProps> = ({ onSumbit, className }) => {
  return (
    <form className={cn(styles.form, className)} onSubmit={onSumbit}>
      <Input mode="input__default" />
      <Button
        className={styles.form__btn}
        type="submit"
        mode={"button__default"}
      >
        Подключиться
      </Button>
    </form>
  );
};

export default EnterForm;
