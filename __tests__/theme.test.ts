import { theme, colors, spacing, radius, typography } from '../src/theme/theme';

describe('theme', () => {
  it('bundles every token group', () => {
    expect(theme.colors).toBe(colors);
    expect(theme.spacing).toBe(spacing);
    expect(theme.radius).toBe(radius);
    expect(theme.typography).toBe(typography);
  });

  it('uses increasing spacing steps', () => {
    const steps = [spacing.xs, spacing.sm, spacing.md, spacing.lg, spacing.xl];
    expect([...steps].sort((a, b) => a - b)).toEqual(steps);
  });

  it('defines hex colors', () => {
    Object.values(colors).forEach((value) => expect(value).toMatch(/^#[0-9a-f]{6}$/i));
  });
});
