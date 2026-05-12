# METRICS.md

## North Star Metric
**Audits completed per week**

Why: An audit completed means a user got value. Everything else — leads, Credex conversions, shares — flows from this. If audits aren't completing, nothing else matters.

## 3 Input Metrics

1. **Landing page → audit start rate**  
   Are visitors actually filling in the form? Low rate = headline or form friction problem.

2. **Audit start → audit complete rate**  
   Are users dropping off mid-form? Low rate = form is too long or confusing.

3. **Audit complete → email capture rate**  
   Are users giving their email after seeing results? Low rate = results aren't valuable enough or trust is low.

## What to Instrument First
- Form start event
- Form completion event
- Email capture event
- Credex CTA click event
- Shareable URL visits (vs direct visits)

## Pivot Trigger
If after 500 audits completed, email capture rate is below 10% — the results page isn't delivering enough value. Either the audit logic needs to be sharper or the savings numbers aren't believable.

If Credex consultation booking rate from high-savings audits is below 5% after 100 qualified leads — the Credex CTA placement or messaging needs rework.