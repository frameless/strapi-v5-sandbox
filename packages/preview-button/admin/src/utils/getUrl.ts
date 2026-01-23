export const getUrl = (url: string): URL | null => {
  try {
    return new URL(url);
  } catch (error: unknown) {
    //  eslint-disable-next-line no-console
    console.error('Invalid URL:', error);
    return null;
  }
};
