export async function askBackend(query, projectPath) {
  const result = await fetch('http://localhost:5005/ask', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, project_path: projectPath }),
  });

  const json = await result.json();
  return json.result;
}