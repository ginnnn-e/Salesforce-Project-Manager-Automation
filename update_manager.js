export default function handler(request, response) {
  // 1. Allow n8n to talk to us (CORS)
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // 2. Handle the "Pre-flight" check from browsers/n8n
  if (request.method === 'OPTIONS') {
    return response.status(200).end();
  }

  // 3. Handle the actual POST request
  if (request.method === 'POST') {
    // Get the name sent from n8n
    const { managerName } = request.body;

    if (!managerName) {
      return response.status(400).json({ error: "Missing managerName" });
    }

    console.log("API received update for:", managerName);

    // 4. Send success back to n8n
    return response.status(200).json({ 
      success: true, 
      message: `Project Manager updated to ${managerName}`,
      timestamp: new Date().toISOString()
    });
  }

  // Block any other request type (like GET)
  return response.status(405).json({ error: "Method not allowed. Use POST." });
}