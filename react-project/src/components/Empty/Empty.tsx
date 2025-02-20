import './Empty.scss';

type EmptyProps = {
  text: string;
  imageName: string;
};

function Empty({ text, imageName }: EmptyProps) {
  return (
    <div className="empty-wrapper">
      <div
        className="empty"
        style={{
          backgroundImage: `url(./src/assets/${imageName}.jpg)`,
        }}
      >
        <h2>{text} Please, try again!</h2>
      </div>
    </div>
  );
}

export default Empty;
