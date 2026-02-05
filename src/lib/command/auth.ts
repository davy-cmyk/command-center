/**
 * Command Center Authentication
 * Simple access gate using COMMAND_CENTER_KEY
 */

// Get the expected key from environment
const COMMAND_CENTER_KEY = process.env.COMMAND_CENTER_KEY || '';

export interface AuthResult {
  authorized: boolean;
  error?: string;
}

/**
 * Check if request is authorized
 * - Allow if ?key= matches OR x-command-key header matches
 * - Otherwise returns not authorized (caller should return 404)
 */
export function checkCommandAuth(
  queryKey: string | string[] | undefined,
  headerKey: string | string[] | undefined
): AuthResult {
  // If no key is configured, deny access
  if (!COMMAND_CENTER_KEY) {
    return { authorized: false, error: 'Command center key not configured' };
  }

  // Normalize inputs
  const queryKeyStr = Array.isArray(queryKey) ? queryKey[0] : queryKey;
  const headerKeyStr = Array.isArray(headerKey) ? headerKey[0] : headerKey;

  // Check query param or header
  const providedKey = queryKeyStr || headerKeyStr;

  if (!providedKey) {
    return { authorized: false, error: 'No key provided' };
  }

  // Use timing-safe comparison if available, otherwise simple comparison
  if (providedKey === COMMAND_CENTER_KEY) {
    return { authorized: true };
  }

  return { authorized: false, error: 'Invalid key' };
}

/**
 * Get the expected key status (for settings page)
 */
export function getKeyStatus(): { configured: boolean; hint: string } {
  if (!COMMAND_CENTER_KEY) {
    return { configured: false, hint: 'Not set' };
  }
  
  // Show first 3 and last 3 characters as hint
  const hint = COMMAND_CENTER_KEY.length > 6 
    ? `${COMMAND_CENTER_KEY.slice(0, 3)}...${COMMAND_CENTER_KEY.slice(-3)}`
    : '***';
  
  return { configured: true, hint };
}
