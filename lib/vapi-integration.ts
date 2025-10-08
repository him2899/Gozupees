// VAPI Integration Helper Library
export interface VapiCallConfig {
  agentName: string;
  phoneNumber?: string;
}

export interface VapiCallResponse {
  success: boolean;
  agentId?: string;
  publicKey?: string;
  agentName?: string;
  callType?: 'web' | 'phone';
  callId?: string;
  error?: string;
}

/**
 * Initiate a VAPI call (web or phone) using stored credentials and agent configuration
 */
export async function initiateVapiCall(config: VapiCallConfig): Promise<VapiCallResponse> {
  try {
    const response = await fetch('/api/vapi/start-call', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(config),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.error || 'Failed to initiate call',
      };
    }

    return data;
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Start a web-based VAPI call using the VAPI SDK
 */
export async function startWebCall(agentName: string, onCallStart?: () => void, onCallEnd?: () => void) {
  const callConfig = await initiateVapiCall({ agentName });
  
  if (!callConfig.success || !callConfig.publicKey || !callConfig.agentId) {
    throw new Error(callConfig.error || 'Failed to get call configuration');
  }

  // Dynamically import VAPI SDK
  const { default: Vapi } = await import('@vapi-ai/web');
  
  const vapi = new Vapi(callConfig.publicKey);
  
  // Set up event listeners
  vapi.on('call-start', () => {
    console.log(`VAPI call started with ${agentName}`);
    onCallStart?.();
  });
  
  vapi.on('call-end', () => {
    console.log(`VAPI call ended with ${agentName}`);
    onCallEnd?.();
  });
  
  vapi.on('error', (error) => {
    console.error('VAPI error:', error);
    onCallEnd?.();
  });
  
  // Start the call
  await vapi.start(callConfig.agentId);
  
  return vapi;
}

/**
 * Start a phone-based VAPI call
 */
export async function startPhoneCall(agentName: string, phoneNumber: string): Promise<VapiCallResponse> {
  return initiateVapiCall({ agentName, phoneNumber });
}