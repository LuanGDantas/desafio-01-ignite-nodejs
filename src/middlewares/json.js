export async function json(req, res) {
  const buffers = [];

  for await (const chunk of req) {
    buffers.push(chunk);
  }
  
  req.body = buffers.length > 0 
    ? JSON.parse(Buffer.concat(buffers).toString()) 
    : null;

  res.setHeader('Content-type', 'application/json')
}