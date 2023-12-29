import database from "infra/database.js";

async function status(request, response) {
  const updateAt = new Date().toISOString();

  // versao do postgres
  const databaseVersionResult = await database.query("SHOW server_version;");
  const databaseVersionValue = databaseVersionResult.rows[0].server_version;

  // conexoes usadas do postgres

  // conexoes maximas do postgres
  const databaseMaxConnectionsResult = await database.query(
    "SHOW max_connections;",
  );
  const databaseMaxConnectionsValue =
    databaseMaxConnectionsResult.rows[0].max_connections;

  response.status(200).json({
    updated_at: updateAt,
    dependencies: {
      version: databaseVersionValue,
      max_connections: databaseMaxConnectionsValue,
    },
  });
}

export default status;
