import styles from './Empty.module.scss';

type EmptyProps = {
  text: string;
  imageName: string;
};

function Empty({ text, imageName }: EmptyProps) {
  return (
    <div className={styles.emptyWrapper}>
      <div
        className={styles.empty}
        style={{
          backgroundImage: `url(./${imageName}.jpg)`,
        }}
      >
        <h2>{text} Please, try again!</h2>
      </div>
    </div>
  );
}

export default Empty;
