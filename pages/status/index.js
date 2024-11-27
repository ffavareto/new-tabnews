import useSWR from "swr";

async function fetchAPI(key) {
  const response = await fetch(key);
  const responseBody = await response.json();
  return responseBody;
}

export default function StatusPage() {
  return (
    <>
      <UpdatedAt />
      <DatabaseStatus />
    </>
  );
}

function UpdatedAt() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  let updatedAtText = "Carregando...";

  if (!isLoading && data) {
    updatedAtText = new Date(data.updated_at).toLocaleString("pt-BR");
  }

  return (
    <>
      <h1>Status</h1>
      <div>Última atualização: {updatedAtText}</div>
    </>
  );
}

function DatabaseStatus() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  let databaseStatusInformation = "Carregando...";

  if (!isLoading && data) {
    const { dependencies } = data;
    const { database } = dependencies;

    databaseStatusInformation = (
      <>
        <div>Versão: {database.version}</div>
        <div>Conexões abertas: {database.opened_connections}</div>
        <div>Conexões máximas: {database.max_connections}</div>
      </>
    );
  }

  return (
    <>
      <h1>Database</h1>
      <div>{databaseStatusInformation}</div>
    </>
  );
}
