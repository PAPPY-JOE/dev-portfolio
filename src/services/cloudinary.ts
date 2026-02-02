export const uploadToCloudinary = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'assets');

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/dkjucbdpq/image/upload`,
    {
      method: 'POST',
      body: formData
    }
  );

  const data = await res.json();
  return data.secure_url as string;
};