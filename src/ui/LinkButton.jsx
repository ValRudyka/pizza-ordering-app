import { Link, useNavigate } from "react-router-dom";

function LinkButton({ children, path = "" }) {
  const navigate = useNavigate();
  const className = "text-small text-blue-500 hover:text-blue-700";

  if (typeof path === "number") {
    return (
      <button className={className} onClick={() => navigate(path)}>
        {children}
      </button>
    );
  }

  return (
    <Link to={path} className={className}>
      {children}
    </Link>
  );
}

export default LinkButton;
