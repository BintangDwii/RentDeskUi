/**
 * Pixel width for a monitor thumbnail inside the scene.
 * The 34" ultrawide (21:9) is ~1.32x wider than the 27" (16:9)
 * at identical vertical screen height.
 */
export function getMonitorWidth(monitor, count) {
  const scale = monitor.id === 'acc-monitor-2' ? 1.32 : 1.0;
  if (count === 1) return Math.round(160 * scale); // 160px vs 211px
  if (count === 2) return Math.round(130 * scale); // 130px vs 172px
  return Math.round(105 * scale); // 105px vs 139px
}
