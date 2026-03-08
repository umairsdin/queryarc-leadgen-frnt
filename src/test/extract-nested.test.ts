import { describe, it } from 'vitest';
import data from './sample-response.json';

describe('API nested structures', () => {
  it('shows nested details', () => {
    const d = data as any;
    
    console.log('=== competitor_visibility ===');
    console.log(JSON.stringify(d.competitor_visibility, null, 2));
    
    console.log('\n=== competitor_presence_card ===');
    console.log(JSON.stringify(d.competitor_presence_card, null, 2));
    
    console.log('\n=== open_opportunity_rate ===');
    console.log(JSON.stringify(d.open_opportunity_rate, null, 2));
    
    console.log('\n=== opportunity_events[0] ===');
    console.log(JSON.stringify(d.opportunity_events?.[0], null, 2));
    
    console.log('\n=== opportunity_model_breakdown ===');
    console.log(JSON.stringify(d.opportunity_model_breakdown, null, 2));
    
    console.log('\n=== model_answers[0] keys ===');
    const ma = d.model_answers?.[0];
    console.log(JSON.stringify({ ...ma, answers: `array(${ma?.answers?.length})` }, null, 2));
    
    console.log('\n=== model_answers[0].answers[0] ===');
    console.log(JSON.stringify(d.model_answers?.[0]?.answers?.[0], null, 2));
    
    console.log('\n=== questions ===');
    console.log(JSON.stringify(d.questions, null, 2));
  });
});
