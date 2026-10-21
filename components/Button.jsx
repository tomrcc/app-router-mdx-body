export default function Button({ button_text, button_link }) {
  return (
    <a className="button" href={button_link}>
      {button_text}
    </a>
  );
}
