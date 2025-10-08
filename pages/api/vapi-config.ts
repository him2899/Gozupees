import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  // Return VAPI configuration from environment variables
  const config = {
    publicKey: process.env.VAPI_PUBLIC_KEY,
    publicKeyGzp: "969200c5-7907-492a-b1b3-f859dfca0029", // GoZupees Website Agents key
    publicKeyMultilingual: "b38c975f-ed60-4944-9846-36fca37e5305", // Multilingual Chloe Agents key
    publicKeySB: "66034320-83fe-4da0-acb9-9df12b5a6636", // SB Account key
    // GoZupees AI Voice Agents (using main GZP account)
    hannahAssistantId: "20bf7071-6b44-46dc-9d22-3517d02cb47c",
    ollieAssistantId: "eebe0b37-08a9-47a2-9012-25aef6071b2f",
    novaAssistantId: "739242ff-7e89-4386-8026-aa14957abf83",
    zenoAssistantId: "07eb7ae8-334f-42b3-afbb-8208bb5709aa",
    cooperAssistantId: "489c9210-7d8d-4528-88ea-9e6406c31584",
    seraAssistantId: "56831ac9-b8f4-4d46-9770-c0b498ef18f3",
    mayaAssistantId: "6b2c7dcf-1676-48a8-a231-d44002cdc6de",
    kayleeAssistantId: "65eb3ee6-e537-40b6-9775-7e572295d92e",
    matthewAssistantId: "d1439f15-1d3e-4490-af1f-346e2b63fe61",
    // Legacy/Other agents
    chloeAssistantId: process.env.VAPI_CHLOE_ASSISTANT_ID,
    tycheAssistantId: process.env.VAPI_TYCHE_ASSISTANT_ID,
    marcusAssistantId: process.env.VAPI_MARCUS_ASSISTANT_ID,
    alexAssistantId: process.env.VAPI_ALEX_ASSISTANT_ID,
    emmaAssistantId: process.env.VAPI_EMMA_ASSISTANT_ID,
    // Ask4 ISP/MSP assistant IDs
    davidAssistantId: "24cc781e-27a9-42ca-82f9-36d19f0ee122",
    maggieAssistantId: "fc6ea8ad-c2a0-498a-9203-a8aac426cf33",
    soniyaAssistantId: "0378ac25-e576-4e0c-87f4-71716c298d9d",
    jakeAssistantId: "77db82a9-aa89-4682-8cdb-af8d5297a79f",
    maryAssistantId: "8d99e24c-e766-47b3-918f-189ec3282e28",
  };

  // Check if at least one public key is available
  if (!config.publicKey && !config.publicKeyGzp) {
    return res.status(500).json({
      error: "VAPI configuration incomplete - no public keys available",
      missing: {
        publicKey: !config.publicKey,
        publicKeyGzp: !config.publicKeyGzp,
      },
    });
  }

  res.status(200).json(config);
}
