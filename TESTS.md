# TESTS.md

## Test Suite: Audit Engine

**File:** `lib/audit/__tests__/audit.test.ts`  
**How to run:** `npm test`

### Tests

1. **cursor overprovisioned seats returns downgrade**  
   Input: Cursor Pro, 3 seats, team size 1  
   Expected: recommendation = 'downgrade', savings = $40

2. **cursor optimal returns no savings**  
   Input: Cursor Pro, 1 seat, team size 1, use case coding  
   Expected: recommendation = 'optimal', savings = $0

3. **cursor wrong use case returns switch**  
   Input: Cursor Pro, use case writing  
   Expected: recommendation = 'switch'

4. **high spend returns credits recommendation**  
   Input: Cursor Pro, $300/month, 15 seats  
   Expected: recommendation = 'credits'

5. **total savings is sum of all tool savings**  
   Input: Cursor + Claude both overprovisioned  
   Expected: totalMonthlySavings = sum of all estimatedMonthlySavings

