// Google Tag Manager utility functions
export const GTM_ID = 'GTM-P8VTKFDP';

// Types for common GTM events
export interface GTMEvent {
  event: string;
  [key: string]: any;
}

export interface ContactFormEvent {
  event: 'contact_form_submit';
  form_source: string;
  email?: string;
  company?: string;
}

export interface DemoRequestEvent {
  event: 'demo_request';
  agent_type?: string;
  source: string;
}

export interface PageViewEvent {
  event: 'page_view';
  page_title: string;
  page_location: string;
}

// Push events to dataLayer
export const gtmPush = (event: GTMEvent) => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push(event);
  }
};

// Common event tracking functions
export const trackContactFormSubmit = (data: Omit<ContactFormEvent, 'event'>) => {
  gtmPush({
    event: 'contact_form_submit',
    ...data
  });
};

export const trackDemoRequest = (data: Omit<DemoRequestEvent, 'event'>) => {
  gtmPush({
    event: 'demo_request',
    ...data
  });
};

export const trackPageView = (data: Omit<PageViewEvent, 'event'>) => {
  gtmPush({
    event: 'page_view',
    ...data
  });
};

export const trackButtonClick = (buttonName: string, location: string) => {
  gtmPush({
    event: 'button_click',
    button_name: buttonName,
    location: location
  });
};

export const trackAgentDemo = (agentName: string, demoType: 'voice' | 'chat') => {
  gtmPush({
    event: 'agent_demo_started',
    agent_name: agentName,
    demo_type: demoType
  });
};

// Declare dataLayer for TypeScript
declare global {
  interface Window {
    dataLayer: GTMEvent[];
  }
}