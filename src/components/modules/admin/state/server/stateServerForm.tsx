import StateClientForm from "../client/stateClientForm";

async function FetchOptions() {
  return <StateClientForm />;
}

export default function StateServerForm() {
  return <FetchOptions />;
}
