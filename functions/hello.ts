// eslint-disable-next-line require-await
exports.handler = async (event: any) => {
  const name = event.queryStringParameters.name || 'World';

  return {
    statusCode: 200,
    body: JSON.stringify({ data: { name } }),
  };
};
