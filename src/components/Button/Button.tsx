import styles from "./Button.module.css";
interface Props {
  active?: boolean;
  text: string;
  onClick: () => void;
}
export const Button = ({ text, onClick, active }: Props) => {
  const activeStyle = active ? styles.active : "";

  return (
    <div onClick={onClick} className={`${styles.container} ${activeStyle}`}>
      {text}
    </div>
  );
};
