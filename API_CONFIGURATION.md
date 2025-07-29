# API Configuration

## Overview

All hardcoded URLs have been replaced with a centralized configuration system.

## Configuration File

The API base URL is now configured in `src/config/api.js`:

```javascript
const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL ||
  "https://call-optix-or-dafolks.onrender.com" ||
  "http://localhost:5000";

export default baseUrl;
```

## Environment Variable

To configure the API URL, set the `NEXT_PUBLIC_BASE_URL` environment variable:

```bash
# For production
NEXT_PUBLIC_BASE_URL=https://call-optix-or-dafolks.onrender.com

# For local development
NEXT_PUBLIC_BASE_URL=http://localhost:5000
```

## Usage

Import the baseUrl in any component that needs to make API calls:

```javascript
import baseUrl from "@/config/api";

// Use in API calls
const response = await axios.post(`${baseUrl}/api/endpoint`, data);
```

## Updated Files

The following files have been updated to use the centralized configuration:

- `src/app/compontent/common/admin/Sidebar.jsx`
- `src/app/compontent/common/admin/Header.jsx`
- `src/app/(website-group)/signup/page.js`
- `src/app/(website-group)/login/page.js`
- `src/app/(website-group)/page.js`
- `src/app/(admin-group)/admin-panel/login/page.js`
- `src/app/(admin-group)/admin-panel/users/page.js`
- `src/app/(admin-group)/admin-panel/dashboard/page.js`
- `src/app/(admin-group)/admin-panel/user-actions.js`

## Benefits

1. **Centralized Configuration**: All API URLs are managed in one place
2. **Environment Flexibility**: Easy to switch between development and production URLs
3. **Maintainability**: No need to update URLs in multiple files
4. **Consistency**: All components use the same base URL configuration
