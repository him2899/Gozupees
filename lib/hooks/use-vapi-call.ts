import { useState, useCallback, useRef, useEffect } from 'react';
import { startWebCall } from '@/lib/vapi-integration';

export interface VapiCallState {
  isConnecting: boolean;
  isConnected: boolean;
  isError: boolean;
  errorMessage: string | null;
  callDuration: number;
}

export interface UseVapiCallReturn {
  callState: VapiCallState;
  startCall: (agentName: string) => Promise<void>;
  endCall: () => void;
  requestMicrophonePermission: () => Promise<boolean>;
}

export function useVapiCall(): UseVapiCallReturn {
  const [callState, setCallState] = useState<VapiCallState>({
    isConnecting: false,
    isConnected: false,
    isError: false,
    errorMessage: null,
    callDuration: 0,
  });

  const vapiInstanceRef = useRef<any>(null);
  const callStartTimeRef = useRef<number | null>(null);
  const durationIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const resetCallState = useCallback(() => {
    setCallState({
      isConnecting: false,
      isConnected: false,
      isError: false,
      errorMessage: null,
      callDuration: 0,
    });
    
    if (durationIntervalRef.current) {
      clearInterval(durationIntervalRef.current);
      durationIntervalRef.current = null;
    }
    
    callStartTimeRef.current = null;
  }, []);

  const requestMicrophonePermission = useCallback(async (): Promise<boolean> => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      // Stop the stream immediately, we just needed permission
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
  }, []);

  const startCall = useCallback(async (agentName: string) => {
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

      const vapiInstance = await startWebCall(
        agentName,
        () => {
          // On call start
          callStartTimeRef.current = Date.now();
          setCallState(prev => ({
            ...prev,
            isConnecting: false,
            isConnected: true,
            isError: false,
          }));

          // Start duration timer
          durationIntervalRef.current = setInterval(() => {
            if (callStartTimeRef.current) {
              const duration = Math.floor((Date.now() - callStartTimeRef.current) / 1000);
              setCallState(prev => ({
                ...prev,
                callDuration: duration,
              }));
            }
          }, 1000);
        },
        () => {
          // On call end
          resetCallState();
          vapiInstanceRef.current = null;
        }
      );

      vapiInstanceRef.current = vapiInstance;

    } catch (error) {
      console.error('Failed to start VAPI call:', error);
      setCallState(prev => ({
        ...prev,
        isConnecting: false,
        isError: true,
        errorMessage: error instanceof Error ? error.message : 'Failed to start call',
      }));
    }
  }, [resetCallState, requestMicrophonePermission]);

  const endCall = useCallback(() => {
    if (vapiInstanceRef.current) {
      try {
        vapiInstanceRef.current.stop();
      } catch (error) {
        console.error('Error ending call:', error);
      }
      vapiInstanceRef.current = null;
    }
    resetCallState();
  }, [resetCallState]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      endCall();
    };
  }, [endCall]);

  return {
    callState,
    startCall,
    endCall,
    requestMicrophonePermission,
  };
}

export function formatCallDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}