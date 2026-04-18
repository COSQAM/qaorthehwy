import { describe, it, expect } from 'vitest';
import { renderDescription } from '../markdown';

describe('renderDescription', () => {
  it('wraps a single plain-text paragraph in <p>', () => {
    const out = renderDescription('Just a single line.');
    expect(out).toContain('<p>Just a single line.</p>');
  });

  it('produces separate <p> tags for paragraphs split by blank lines', () => {
    const out = renderDescription('First paragraph.\r\n\r\nSecond paragraph.');
    expect(out).toContain('<p>First paragraph.');
    expect(out).toContain('<p>Second paragraph.');
    const paragraphCount = (out.match(/<p>/g) || []).length;
    expect(paragraphCount).toBe(2);
  });

  it('renders markdown links as anchor tags', () => {
    const out = renderDescription('See [Playwright](https://playwright.dev/).');
    expect(out).toContain('<a href="https://playwright.dev/">Playwright</a>');
  });

  it('renders numbered lists as <ol>/<li>', () => {
    const out = renderDescription('1. First\n2. Second\n3. Third');
    expect(out).toContain('<ol>');
    expect(out).toContain('<li>First</li>');
    expect(out).toContain('<li>Third</li>');
  });

  it('renders bulleted lists with "* " prefix as <ul>/<li>', () => {
    const out = renderDescription('* one\n* two\n* three');
    expect(out).toContain('<ul>');
    expect(out).toContain('<li>one</li>');
  });

  it('renders italic text with single asterisks', () => {
    const out = renderDescription('This is *much* better.');
    expect(out).toContain('<em>much</em>');
  });

  it('renders horizontal rules from ---', () => {
    const out = renderDescription('Before\n\n---\n\nAfter');
    expect(out).toMatch(/<hr\s*\/?>/);
  });

  it('escapes raw HTML so inline tags do not execute', () => {
    const out = renderDescription('hi <script>alert(1)</script> bye');
    expect(out).not.toContain('<script>');
    expect(out).toContain('&lt;script&gt;');
  });
});
