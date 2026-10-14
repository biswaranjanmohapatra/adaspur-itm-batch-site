import { describe, expect, it } from 'vitest';
import { getBatchFromRegistrationNumber, validateRegistrationNumber } from '@/lib/registrationValidation';

describe('student registration number validation', () => {
  it.each([
    ['UNITM210001', '2021-2024'],
    ['UNITM220001', '2022-2025'],
    ['UNITM230001', '2023-2026'],
    ['UNITM240001', '2024-2027'],
    ['UNITM250001', '2025-2028'],
    ['UNITM210030', '2021-2024'],
    ['UNITM220030', '2022-2025'],
    ['UNITM230030', '2023-2026'],
    ['UNITM240030', '2024-2027'],
    ['UNITM250030', '2025-2028'],
  ])('accepts %s for batch %s', (number, batchId) => {
    expect(validateRegistrationNumber(number)).toMatchObject({ valid: true, batch: { batchId } });
  });

  it.each(['UNITM210000', 'UNITM210031', 'UNITM260001', 'ITM210001'])('rejects invalid number %s', (number) => {
    expect(validateRegistrationNumber(number).valid).toBe(false);
  });

  it('normalizes case and surrounding whitespace before identifying a batch', () => {
    expect(getBatchFromRegistrationNumber(' unitm240015 ')).toMatchObject({ batchId: '2024-2027' });
  });

  it('returns null instead of a missing batch for invalid registration numbers', () => {
    expect(getBatchFromRegistrationNumber('not-a-student-number')).toBeNull();
  });
});