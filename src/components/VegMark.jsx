// Standard Indian food-labelling mark: green dot = vegetarian, red dot = non-vegetarian.
export default function VegMark({ veg }) {
  return (
    <span className={`veg-mark ${veg ? 'veg' : 'nonveg'}`} role="img" aria-label={veg ? 'Vegetarian' : 'Non-vegetarian'} title={veg ? 'Vegetarian' : 'Non-vegetarian'}>
      <i />
    </span>
  );
}
