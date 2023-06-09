export const apiService = async (page = 1, limit = 10) => {
  const endpoint = new URL('https://picsum.photos/v2/list');
  const params = { page, limit };

  endpoint.search = new URLSearchParams(params);
  const request = await fetch(endpoint);

  if (!request.ok) throw new Error('Something went wrong...');

  return await request.json();
};
