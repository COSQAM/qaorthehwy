export function normalizeLineTerminators(value) {
  if (typeof value === 'string') {
    return value.replace(/[\u2028\u2029\u0085\u000B\u000C]/g, '\n');
  }
  if (Array.isArray(value)) {
    return value.map(normalizeLineTerminators);
  }
  if (value && typeof value === 'object') {
    const out = {};
    for (const [k, v] of Object.entries(value)) {
      out[k] = normalizeLineTerminators(v);
    }
    return out;
  }
  return value;
}
