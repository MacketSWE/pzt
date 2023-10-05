import { pztColors, useAppStore } from "../../store/store";
import { Button } from "../Button";
import { ColorSelect } from "../ColorSelect";
import styles from "./Menu.module.css";

interface Props {
  selected: string;
  setSelected: (text: string) => void;
}

export const Menu = ({ selected, setSelected }: Props) => {
  const color = useAppStore((state) => state.color);
  const setColor = useAppStore((state) => state.setColor);

  const handleOnClick = (text: string) => {
    setSelected(text);
  };

  return (
    <div className={styles.container}>
      <Text>Pattern</Text>
      <div className={styles.buttons}>
        <Button
          active={selected === "Center"}
          onClick={() => handleOnClick("Center")}
          text="Center"
        />
        <Button
          active={selected === "Swirl"}
          onClick={() => handleOnClick("Swirl")}
          text="Swirl"
        />
        <Button
          active={selected === "Vortex"}
          onClick={() => handleOnClick("Vortex")}
          text="Swirl 2"
        />
      </div>

      <Text>Color</Text>
      <div className={styles.buttons}>
        {pztColors.map((c) => {
          return (
            <ColorSelect
              color={c.color}
              active={color.name === c.name}
              onClick={() => setColor(c)}
              text={c.name}
            />
          );
        })}
      </div>
    </div>
  );
};

const Text = ({ children }: { children: any }) => {
  return <div className={styles.text}>{children}</div>;
};
