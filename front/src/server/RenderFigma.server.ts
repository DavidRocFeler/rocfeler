export const fetchFigmaData = async (fileKey: string) => {
  const FIGMA_API_URL = 'https://api.figma.com/v1/files';
  const FIGMA_IMAGE_API_URL = 'https://api.figma.com/v1/images';
  const FIGMA_TOKEN = process.env.NEXT_PUBLIC_FIGMA_TOKEN;

  if (!FIGMA_TOKEN) {
    throw new Error('El token de Figma no está definido. Asegúrate de configurarlo en .env.local');
  }

  try {
    // Solicitud principal al archivo
    const response = await fetch(`${FIGMA_API_URL}/${fileKey}`, {
      method: 'GET',
      headers: {
        'X-Figma-Token': FIGMA_TOKEN,
      },
    });

    if (!response.ok) {
      const errorDetails = await response.text();
      throw new Error(`Error al obtener los datos: ${response.status}, Detalles: ${errorDetails}`);
    }

    const data = await response.json();

    // Encuentra el nodo MainLogo
    const findMainLogo = (node: any): string | null => {
      if (node.name === 'MainLogo' && node.type === 'RECTANGLE' && node.fills[0]?.type === 'IMAGE') {
        return node.id; // Retorna el ID del nodo
      }
      if (node.children) {
        for (const child of node.children) {
          const result = findMainLogo(child);
          if (result) return result;
        }
      }
      return null;
    };

    const mainLogoNodeId = findMainLogo(data.document);

    // Solicitud para obtener la URL de la imagen MainLogo
    let mainLogoUrl = null;
    if (mainLogoNodeId) {
      const imageResponse = await fetch(
        `${FIGMA_IMAGE_API_URL}/${fileKey}?ids=${mainLogoNodeId}`,
        {
          method: 'GET',
          headers: {
            'X-Figma-Token': FIGMA_TOKEN,
          },
        }
      );

      if (imageResponse.ok) {
        const imageData = await imageResponse.json();
        mainLogoUrl = imageData.images[mainLogoNodeId];
      }
    }

    return {
      thumbnailUrl: data.thumbnailUrl,
      fileName: data.name,
      mainLogoUrl, // Retornamos la URL correcta
    };
  } catch (error) {
    console.error('Error al obtener datos de Figma:', error);
    throw error;
  }
};
