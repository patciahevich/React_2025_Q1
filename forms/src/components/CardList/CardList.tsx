import useForms from '../../hooks/useForms';
import Card from '../Card/Card';

function CardList() {
  const { forms } = useForms();

  return (
    <>
      <section>
        <h2>Controlled Forms</h2>
        {forms.controlled.map((form, index) => (
          <Card data={form} key={form.email} new={index === 0} />
        ))}
      </section>
      <section>
        <h2>Uncontrolled Forms</h2>
        {forms.uncontrolled.map((form, index) => (
          <Card data={form} key={form.email} new={index === 0} />
        ))}
      </section>
    </>
  );
}

export default CardList;
