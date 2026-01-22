// Registration number validation utilities

export interface BatchInfo {
  batchId: string;
  batchName: string;
  prefix: string;
  startYear: number;
  endYear: number;
}

export const BATCH_CONFIG: BatchInfo[] = [
  { batchId: '2021-2024', batchName: 'Batch 2021-2024', prefix: 'UNITM21', startYear: 2021, endYear: 2024 },
  { batchId: '2022-2025', batchName: 'Batch 2022-2025', prefix: 'UNITM22', startYear: 2022, endYear: 2025 },
  { batchId: '2023-2026', batchName: 'Batch 2023-2026', prefix: 'UNITM23', startYear: 2023, endYear: 2026 },
  { batchId: '2024-2027', batchName: 'Batch 2024-2027', prefix: 'UNITM24', startYear: 2024, endYear: 2027 },
  { batchId: '2025-2028', batchName: 'Batch 2025-2028', prefix: 'UNITM25', startYear: 2025, endYear: 2028 },
];

// Valid registration number range: UNITM21XXXX where XXXX is 0001-0030
const REGISTRATION_REGEX = /^UNITM(21|22|23|24|25)\d{4}$/;
const MIN_ROLL = 1;
const MAX_ROLL = 30;

export function validateRegistrationNumber(regNumber: string): { 
  valid: boolean; 
  error?: string; 
  batch?: BatchInfo;
} {
  const normalized = regNumber.toUpperCase().trim();
  
  // Check format
  if (!REGISTRATION_REGEX.test(normalized)) {
    return { 
      valid: false, 
      error: 'Invalid registration number format. Expected format: UNITM21XXXX (e.g., UNITM210001)' 
    };
  }

  // Extract batch prefix and roll number
  const prefix = normalized.substring(0, 7); // UNITM21, UNITM22, etc.
  const rollNumber = parseInt(normalized.substring(7), 10); // 0001-0030

  // Validate roll number range
  if (rollNumber < MIN_ROLL || rollNumber > MAX_ROLL) {
    return { 
      valid: false, 
      error: `Roll number must be between ${MIN_ROLL.toString().padStart(4, '0')} and ${MAX_ROLL.toString().padStart(4, '0')}` 
    };
  }

  // Find matching batch
  const batch = BATCH_CONFIG.find(b => b.prefix === prefix);
  if (!batch) {
    return { 
      valid: false, 
      error: 'Invalid batch prefix in registration number' 
    };
  }

  return { valid: true, batch };
}

export function getBatchFromRegistrationNumber(regNumber: string): BatchInfo | null {
  const result = validateRegistrationNumber(regNumber);
  return result.valid ? result.batch! : null;
}

export function normalizeRegistrationNumber(regNumber: string): string {
  return regNumber.toUpperCase().trim();
}
