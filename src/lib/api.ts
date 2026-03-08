const API_BASE = 'https://mini-audit-api.queryarc.com';

export async function submitRun(payload: {
  brand_name: string;
  website: string;
  competitors: string[];
}): Promise<{ run_id: string }> {
  const res = await fetch(`${API_BASE}/api/run`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Failed to submit run');
  return res.json();
}

export async function fetchRun(runId: string) {
  const res = await fetch(`${API_BASE}/api/run/${runId}`);
  if (!res.ok) throw new Error('Failed to fetch run');
  return res.json();
}
