import './Empty.scss';

type EmptyProps = {
  text: string;
  imageName: string;
};

function Empty(props: EmptyProps) {
  return (
    <div className="empty-wrapper">
      <div
        className="empty"
        style={{
          backgroundImage: `url(./src/assets/${props.imageName}.jpg)`,
        }}
      >
        <h2>{props.text} Please, try again!</h2>
      </div>
    </div>
  );
}

export default Empty;
