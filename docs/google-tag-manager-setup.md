# Google Tag Manager Implementation Guide

## Overview

Google Tag Manager (GTM) has been implemented across the GoZupees website to enable comprehensive tracking and analytics without requiring code changes for each new tag.

## Setup Instructions

### 1. Environment Variable Configuration

Add your GTM container ID to your environment variables:

```bash
# In your .env.local file
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
```

Replace `GTM-XXXXXXX` with your actual GTM container ID.

### 2. GTM Container Setup

In your GTM container, you can track these predefined events:

#### Contact Form Submissions
- **Event Name**: `contact_form_submit`
- **Parameters**:
  - `form_source`: Source of the form (e.g., "about_contact")
  - `email`: User's email address
  - `company`: User's company name

#### Demo Requests
- **Event Name**: `demo_request`
- **Parameters**:
  - `source`: Source of the request
  - `agent_type`: Type of AI agent demo requested

#### Button Clicks
- **Event Name**: `button_click`
- **Parameters**:
  - `button_name`: Name/text of the button
  - `location`: Page or section where button was clicked

#### Agent Demo Interactions
- **Event Name**: `agent_demo_started`
- **Parameters**:
  - `agent_name`: Name of the AI agent
  - `demo_type`: Type of demo ("voice" or "chat")

#### Page Views
- **Event Name**: `page_view`
- **Parameters**:
  - `page_title`: Title of the page
  - `page_location`: URL of the page

## Usage Examples

### Tracking Contact Form Submission

```typescript
import { trackContactFormSubmit } from '../lib/gtm';

// In your form submission handler
trackContactFormSubmit({
  form_source: 'homepage_contact',
  email: 'user@example.com',
  company: 'Acme Corp'
});
```

### Tracking Demo Requests

```typescript
import { trackDemoRequest } from '../lib/gtm';

trackDemoRequest({
  source: 'insurance_page',
  agent_type: 'Insurance Reception Agent'
});
```

### Tracking Button Clicks

```typescript
import { trackButtonClick } from '../lib/gtm';

trackButtonClick('Get Started', 'Homepage Hero');
```

### Tracking Agent Demo Starts

```typescript
import { trackAgentDemo } from '../lib/gtm';

trackAgentDemo('Josh Insurance Agent', 'voice');
```

## GTM Configuration Recommendations

### 1. Google Analytics 4 Integration

Create a GA4 tag in GTM to send events to Google Analytics:

1. **Tag Type**: Google Analytics: GA4 Event
2. **Measurement ID**: Your GA4 property ID
3. **Event Name**: `{{Event}}` (built-in variable)
4. **Trigger**: Custom Event trigger for each event type

### 2. Facebook Pixel Integration

Create Facebook Pixel tags for conversion tracking:

1. **Tag Type**: Facebook Pixel
2. **Pixel ID**: Your Facebook Pixel ID
3. **Event Type**: Custom events based on GTM events
4. **Trigger**: Custom Event triggers

### 3. LinkedIn Insight Tag

Create LinkedIn conversion tracking:

1. **Tag Type**: LinkedIn Insight Tag
2. **Partner ID**: Your LinkedIn Partner ID
3. **Conversion ID**: Specific conversion IDs for different actions

## Event Mapping for Common Platforms

### Google Analytics 4
- `contact_form_submit` → `generate_lead`
- `demo_request` → `request_quote`
- `agent_demo_started` → `engage_with_content`

### Facebook Pixel
- `contact_form_submit` → `Lead`
- `demo_request` → `InitiateCheckout`
- `agent_demo_started` → `ViewContent`

### LinkedIn
- `contact_form_submit` → Custom conversion
- `demo_request` → Custom conversion

## Testing and Debugging

### 1. GTM Preview Mode
Use GTM's preview mode to test events before publishing.

### 2. Browser Console
Check browser console for dataLayer pushes:
```javascript
console.log(window.dataLayer);
```

### 3. GA4 DebugView
Use Google Analytics DebugView to verify events are being received.

## Security Considerations

- The GTM ID is exposed in the frontend (this is normal and expected)
- Ensure no sensitive data is passed in GTM events
- Use GTM's built-in consent management for GDPR compliance

## Advanced Features

### Custom Dimensions
Set up custom dimensions in GA4 to capture:
- User's industry
- AI agent type preferences
- Demo completion status

### Enhanced Ecommerce
If implementing subscription tracking:
- Purchase events for paid plans
- Subscription start/end events
- Upgrade/downgrade tracking

## Maintenance

- Review GTM events quarterly to ensure relevance
- Update event schemas when new features are added
- Monitor GTM container performance in production