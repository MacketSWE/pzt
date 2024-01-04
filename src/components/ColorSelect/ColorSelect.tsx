import styles from "./ColorSelect.module.css";
interface Props {
  active?: boolean;
  text: string;
  onClick: () => void;
  color: string;
}
export const ColorSelect = ({ text, onClick, active, color }: Props) => {
  const activeStyle = active ? styles.active : "";

  console.log("color", color);
  return (
    <div
      onClick={onClick}
      className={`${styles.container} ${activeStyle}`}
      style={{
        backgroundColor: color,
        border:
          color === "#FFFFFF" ? `1px solid lightgray` : `1px sold ${color}`,
      }}
    ></div>
  );
};
