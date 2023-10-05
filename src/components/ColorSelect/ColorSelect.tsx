import styles from "./ColorSelect.module.css";
interface Props {
  active?: boolean;
  text: string;
  onClick: () => void;
  color: string;
}
export const ColorSelect = ({ text, onClick, active, color }: Props) => {
  const activeStyle = active ? styles.active : "";

  return (
    <div
      onClick={onClick}
      className={`${styles.container} ${activeStyle}`}
      style={{
        backgroundColor: color,
        border: color === "white" ? `1px solid lightgray` : "",
      }}
    ></div>
  );
};
