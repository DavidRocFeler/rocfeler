export const fetchGitHubProjects = async () => {
  const GITHUB_API_URL = "https://api.github.com/user/repos";
  const GITHUB_TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN;

  if (!GITHUB_TOKEN) {
    throw new Error("GitHub Token no está configurado");
  }

  try {
    const response = await fetch(`${GITHUB_API_URL}?sort=pushed&direction=desc`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: "application/vnd.github.v3+json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.status}`);
    }

    const data = await response.json();
    
    // Ordenar los repositorios por fecha de push (más reciente primero)
    return data.sort((a: any, b: any) => 
      new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime()
    );

  } catch (error) {
    console.error("Error al obtener repositorios de GitHub:", error);
    throw error;
  }
};