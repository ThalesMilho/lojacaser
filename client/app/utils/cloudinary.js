import axios from 'axios';

/**
 * Faz o upload de um arquivo diretamente para o Cloudinary usando um unsigned upload preset.
 * @param {File} file - O arquivo de imagem selecionado pelo usuário.
 * @returns {Promise<{imageUrl: string, imageKey: string}>} - A URL segura e o public_id (imageKey).
 */
export const uploadToCloudinary = async (file) => {
  // Acessando variáveis de ambiente (Vite ou Webpack dependendo do setup)
  const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
  const UPLOAD_PRESET = process.env.CLOUDINARY_UPLOAD_PRESET;

  // Tratamento de erro: Verifica se as chaves obrigatórias estão presentes
  if (!CLOUD_NAME || !UPLOAD_PRESET) {
    const missingKeys = [];
    if (!CLOUD_NAME) missingKeys.push('CLOUDINARY_CLOUD_NAME');
    if (!UPLOAD_PRESET) missingKeys.push('CLOUDINARY_UPLOAD_PRESET');
    
    const errorMessage = `Configuração do Cloudinary ausente: [${missingKeys.join(', ')}]. Verifique o arquivo .env do frontend.`;
    console.error(errorMessage);
    throw new Error('O sistema de upload não está configurado corretamente. Por favor, contate o suporte técnico.');
  }

  const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', UPLOAD_PRESET);

  try {
    const response = await axios.post(CLOUDINARY_URL, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });

    return {
      imageUrl: response.data.secure_url,
      imageKey: response.data.public_id
    };
  } catch (error) {
    console.error('Erro no upload para o Cloudinary:', error);
    
    // Tratamento de erro detalhado para falhas na API do Cloudinary
    if (error.response && error.response.data && error.response.data.error) {
      throw new Error(`Erro no Cloudinary: ${error.response.data.error.message}`);
    }
    
    throw new Error('Falha ao fazer upload da imagem. Por favor, verifique sua conexão e tente novamente.');
  }
};
