import { useRouteError } from "react-router-dom";
import LinkButton from "./LinkButton";

function NotFound() {
  //error from fetch --- simple error object with the direct message property
  const error = useRouteError();

  return (
    <div>
      <h1>Something went wrong 😢</h1>
      <p>{error.data || error.message}</p>
      <LinkButton path={-1}>&larr; Go back</LinkButton>
    </div>
  );
}

export default NotFound;
