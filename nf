echo 'Filename:'

read fn

mkdir "./src/components/$fn"

echo '.container {
  padding: 10px;
}' > "./src/components/$fn/$fn.module.css"

echo "import styles from './$fn.module.css';

export const $fn = () => {
  return (
    <div className={styles.container}>
      Foobar
    </div>
  );
}" > "./src/components/$fn/$fn.tsx"

echo "export { $fn } from './$fn';" > "./src/components/$fn/index.ts"
