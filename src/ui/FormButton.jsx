import { Link } from "react-router-dom";

function FormButton({
  children,
  path = "",
  disabled = false,
  type = "",
  handleClick,
}) {
  const base = `inline-block text-sm disabled:cursor-not-allowed rounded-full bg-yellow-400 font-semibold 
                uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-yellow-300 focus:outline-none focus:ring 
                focus:ring-yellow-300 focus:ring-offset-2  `;

  const styles = {
    primary: base + " px-4 py-3 md:px-6 md:py-4",
    small: base + " px-4 py-2 md:px-5 md:py-2.5 text-xs",
    round: base + " px-2.5 py-1 md:px-3.5 md:py-2 text-xs",
    secondary: `inline-block text-sm rounded-full border-2 border-stone-300 px-4 py-2.5 md:px-6 md:py-3.5 font-semibold 
                uppercase tracking-wide text-stone-400 transition-colors duration-300 hover:bg-stone-300 hover:text-stone-600 
                focus:outline-none focus:ring focus:ring-stone-300 focus:ring-offset-2 `,
  };

  if (path) {
    return (
      <Link to={path} className={styles[type]}>
        {children}
      </Link>
    );
  }

  return (
    <button
      disabled={disabled}
      onClick={handleClick || null}
      className={styles[type]}
    >
      {children}
    </button>
  );
}

export default FormButton;