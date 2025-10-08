import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, PhoneCall, PhoneOff, Loader2, AlertCircle } from 'lucide-react';

interface VapiQuickCallProps {
  title?: string;
  description?: string;
  buttonText?: string;
  className?: string;
}

interface CallState {
  isConnecting: boolean;
  isConnected: boolean;
  isError: boolean;
  errorMessage: string | null;
  callDuration: number;
}

export function VapiQuickCall({ 
  title = "VAPI Voice Call",
  description = "Enter your VAPI credentials to start a voice call",
  buttonText = "Start Voice Call",
  className = ""
}: VapiQuickCallProps) {
  const [apiKey, setApiKey] = useState('');
  const [agentId, setAgentId] = useState('');
  const [callState, setCallState] = useState<CallState>({
    isConnecting: false,
    isConnected: false,
    isError: false,
    errorMessage: null,
    callDuration: 0,
  });
  const [vapiInstance, setVapiInstance] = useState<any>(null);
  const [callStartTime, setCallStartTime] = useState<number | null>(null);
  const [durationInterval, setDurationInterval] = useState<NodeJS.Timeout | null>(null);

  const resetCallState = () => {
    setCallState({
      isConnecting: false,
      isConnected: false,
      isError: false,
      errorMessage: null,
      callDuration: 0,
    });
    
    if (durationInterval) {
      clearInterval(durationInterval);
      setDurationInterval(null);
    }
    
    setCallStartTime(null);
  };

  const requestMicrophonePermission = async (): Promise<boolean> => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach(track => track.stop());
      return true;
    } catch (error) {
      console.error('Microphone permission denied:', error);
      setCallState(prev => ({
        ...prev,
        isError: true,
        errorMessage: 'Microphone permission is required for voice calls',
      }));
      return false;
    }
  };

  const startCall = async () => {
    // Validate inputs
    if (!apiKey.trim()) {
      setCallState(prev => ({
        ...prev,
        isError: true,
        errorMessage: 'API Key is required',
      }));
      return;
    }

    if (!agentId.trim()) {
      setCallState(prev => ({
        ...prev,
        isError: true,
        errorMessage: 'Agent ID is required',
      }));
      return;
    }

    resetCallState();
    
    setCallState(prev => ({
      ...prev,
      isConnecting: true,
      errorMessage: null,
    }));

    try {
      // Request microphone permission first
      const hasPermission = await requestMicrophonePermission();
      if (!hasPermission) {
        throw new Error('Microphone permission required');
      }

      // Dynamically import VAPI SDK
      const { default: Vapi } = await import('@vapi-ai/web');
      
      const vapi = new Vapi(apiKey.trim());
      
      // Set up event listeners
      vapi.on('call-start', () => {
        console.log(`VAPI call started with agent ${agentId}`);
        setCallStartTime(Date.now());
        setCallState(prev => ({
          ...prev,
          isConnecting: false,
          isConnected: true,
          isError: false,
        }));

        // Start duration timer
        const interval = setInterval(() => {
          if (callStartTime) {
            const duration = Math.floor((Date.now() - Date.now()) / 1000);
            setCallState(prev => ({
              ...prev,
              callDuration: duration,
            }));
          }
        }, 1000);
        setDurationInterval(interval);

        console.log("Voice call connected successfully!");
      });
      
      vapi.on('call-end', () => {
        console.log(`VAPI call ended with agent ${agentId}`);
        resetCallState();
        setVapiInstance(null);
        
        console.log("Voice call has been disconnected.");
      });
      
      vapi.on('error', (error) => {
        console.error('VAPI error:', error);
        setCallState(prev => ({
          ...prev,
          isConnecting: false,
          isError: true,
          errorMessage: error?.message || 'Unknown VAPI error occurred',
        }));
        setVapiInstance(null);
        
        console.error("Call Error:", error?.message || 'An error occurred during the call.');
      });
      
      // Start the call
      await vapi.start(agentId.trim());
      setVapiInstance(vapi);

    } catch (error) {
      console.error('Failed to start VAPI call:', error);
      setCallState(prev => ({
        ...prev,
        isConnecting: false,
        isError: true,
        errorMessage: error instanceof Error ? error.message : 'Failed to start call',
      }));
      
      console.error("Connection Failed:", error instanceof Error ? error.message : 'Failed to start call');
    }
  };

  const endCall = () => {
    if (vapiInstance) {
      try {
        vapiInstance.stop();
      } catch (error) {
        console.error('Error ending call:', error);
      }
      setVapiInstance(null);
    }
    resetCallState();
  };

  const formatCallDuration = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const isFormValid = apiKey.trim() && agentId.trim();

  return (
    <Card className={`w-full max-w-md ${className}`} data-testid="vapi-quick-call">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Phone className="h-5 w-5" />
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* API Key Input */}
        <div className="space-y-2">
          <Label htmlFor="api-key" data-testid="label-api-key">VAPI Public Key</Label>
          <Input
            id="api-key"
            type="password"
            placeholder="Enter your VAPI public key"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            disabled={callState.isConnecting || callState.isConnected}
            data-testid="input-api-key"
          />
        </div>

        {/* Agent ID Input */}
        <div className="space-y-2">
          <Label htmlFor="agent-id" data-testid="label-agent-id">Agent ID</Label>
          <Input
            id="agent-id"
            placeholder="Enter your VAPI agent ID"
            value={agentId}
            onChange={(e) => setAgentId(e.target.value)}
            disabled={callState.isConnecting || callState.isConnected}
            data-testid="input-agent-id"
          />
        </div>

        {/* Error Display */}
        {callState.isError && callState.errorMessage && (
          <div className="bg-red-50 border border-red-200 rounded-md p-3 flex items-center gap-2 text-red-800" data-testid="alert-error">
            <AlertCircle className="h-4 w-4 text-red-500" />
            <span className="text-sm">{callState.errorMessage}</span>
          </div>
        )}

        {/* Call Duration Display */}
        {callState.isConnected && (
          <div className="text-center" data-testid="call-duration">
            <p className="text-sm text-gray-600">Call Duration</p>
            <p className="text-2xl font-mono">{formatCallDuration(callState.callDuration)}</p>
          </div>
        )}

        {/* Call Button */}
        {!callState.isConnected ? (
          <Button
            onClick={startCall}
            disabled={!isFormValid || callState.isConnecting}
            className="w-full"
            data-testid="button-start-call"
          >
            {callState.isConnecting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Connecting...
              </>
            ) : (
              <>
                <PhoneCall className="mr-2 h-4 w-4" />
                {buttonText}
              </>
            )}
          </Button>
        ) : (
          <Button
            onClick={endCall}
            variant="destructive"
            className="w-full"
            data-testid="button-end-call"
          >
            <PhoneOff className="mr-2 h-4 w-4" />
            End Call
          </Button>
        )}

        {/* Instructions */}
        <div className="text-xs text-gray-500 space-y-1" data-testid="instructions">
          <p>• Your VAPI public key is used to authenticate the connection</p>
          <p>• Agent ID identifies which AI agent to connect to</p>
          <p>• Microphone permission will be requested when starting the call</p>
        </div>
      </CardContent>
    </Card>
  );
}

export default VapiQuickCall;