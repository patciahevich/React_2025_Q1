import convertFileToBase64 from './convertFile';

export const handleFileUpload = async (
  event: React.ChangeEvent<HTMLInputElement>,
  callback: (file: string) => void
) => {
  const file = event.target.files?.[0];

  if (file) {
    try {
      const base64String = await convertFileToBase64(file);
      callback(base64String);
    } catch (error) {
      console.warn(error);
    }
  }
};
