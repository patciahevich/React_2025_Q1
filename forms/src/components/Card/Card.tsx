import { FormData } from '../../utils/types';

type CardProps = {
  data: FormData;
  key: string;
  new: boolean;
};

function Card(props: CardProps) {
  const { name, age, country, image, email, gender } = props.data;
  return (
    <article className={props.new ? 'new' : ''}>
      <img src={image} />
      <p>{`${name}, ${age}`}</p>
      <p>{`Country: ${country}`}</p>
      <p>{`e-mail: ${email}`}</p>
      <p>{`gender: ${gender}`}</p>
    </article>
  );
}

export default Card;
