// VAPI Dynamic Configuration System
// This replaces hardcoded keys and agent IDs

interface VapiConfig {
  publicKey: string;
  agentId: string;
  agentName: string;
}

let vapiConfigCache: Record<string, VapiConfig> = {};

/**
 * Get VAPI configuration for an agent (with caching)
 * This replaces hardcoded values throughout the site
 */
export async function getVapiConfig(agentName: string): Promise<VapiConfig | null> {
  // Check cache first
  if (vapiConfigCache[agentName]) {
    return vapiConfigCache[agentName];
  }

  try {
    const response = await fetch('/api/vapi/get-config', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ agentName })
    });

    if (!response.ok) {
      console.error(`Failed to get VAPI config for ${agentName}`);
      return null;
    }

    const config = await response.json();
    
    // Cache for 5 minutes
    vapiConfigCache[agentName] = config;
    setTimeout(() => {
      delete vapiConfigCache[agentName];
    }, 5 * 60 * 1000);

    return config;
  } catch (error) {
    console.error('Error fetching VAPI config:', error);
    return null;
  }
}

/**
 * Create VAPI instance with stored credentials
 */
export async function createVapiInstance(agentName: string) {
  const config = await getVapiConfig(agentName);
  if (!config) {
    throw new Error(`VAPI configuration not found for agent: ${agentName}`);
  }

  const { default: Vapi } = await import('@vapi-ai/web');
  return {
    vapi: new Vapi(config.publicKey),
    agentId: config.agentId,
    agentName: config.agentName
  };
}