import { describe, it } from 'vitest';
import data from './sample-response.json';

describe('API response structure', () => {
  it('shows top-level keys', () => {
    const topLevel: Record<string, string> = {};
    for (const [key, val] of Object.entries(data as any)) {
      if (Array.isArray(val)) {
        topLevel[key] = `array(${(val as any[]).length})`;
      } else if (val && typeof val === 'object') {
        topLevel[key] = `object: ${JSON.stringify(Object.keys(val))}`;
      } else {
        topLevel[key] = `${typeof val}: ${JSON.stringify(val).slice(0, 100)}`;
      }
    }
    console.log('=== TOP LEVEL KEYS ===');
    console.log(JSON.stringify(topLevel, null, 2));

    const d = data as any;
    if (d.visibility_rate) {
      console.log('\n=== visibility_rate ===');
      console.log(JSON.stringify(d.visibility_rate, null, 2));
    }
    if (d.what_this_means) {
      console.log('\n=== what_this_means ===');
      console.log(JSON.stringify(d.what_this_means, null, 2));
    }
    if (d.action_oriented) {
      console.log('\n=== action_oriented ===');
      console.log(JSON.stringify(d.action_oriented, null, 2));
    }
    if (d.cta_subline) {
      console.log('\n=== cta_subline ===');
      console.log(JSON.stringify(d.cta_subline, null, 2));
    }
  });
});
