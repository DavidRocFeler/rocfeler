export const fetchGitHubProjects = async () => {
  const GITHUB_API_URL = "https://api.github.com/user/repos";
  const GITHUB_TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN;

  console.log("Token utilizado:", GITHUB_TOKEN); // Log para verificar el token

  if (!GITHUB_TOKEN) {
    throw new Error("GitHub Token no está configurado");
  }

  try {
    const response = await fetch(GITHUB_API_URL, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: "application/vnd.github.v3+json", // Versión de la API
      },
    });

    console.log("Respuesta de la API:", response); // Log para verificar la respuesta

    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.status}`);
    }

    const data = await response.json();
    console.log("Datos obtenidos:", data); // Log para verificar los datos
    return data; // Retorna la lista de repositorios
  } catch (error) {
    console.error("Error al obtener repositorios de GitHub:", error);
    throw error;
  }
};
