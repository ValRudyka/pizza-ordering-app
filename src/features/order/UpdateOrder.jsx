import { useFetcher } from "react-router-dom";
import FormButton from "../../ui/FormButton";
import { updateOrder } from "../../../services/apiRestaurant";

function UpdateOrder() {
  const fetcher = useFetcher();

  return (
    <fetcher.Form method="PATCH" className="text-right">
      <FormButton type="primary">Make priority</FormButton>
    </fetcher.Form>
  );
}

export default UpdateOrder;

export async function action({ params }) {
  const updateObj = { priority: true };
  await updateOrder(params.id, updateObj);
  return null;
}
