/**
 * Pixel width for a monitor thumbnail inside the scene.
 * The 34" ultrawide (21:9) is ~1.32x wider than the 27" (16:9)
 * at identical vertical screen height.
 * Constant per model regardless of count so adding/removing
 * a monitor never resizes the ones already on the desk.
 */
export function getMonitorWidth(monitor) {
  return monitor.id === 'acc-monitor-2' ? 172 : 130;
}

export function getMonitorWidthMobile(monitor) {
  return monitor.id === 'acc-monitor-2' ? 132 : 100;
}
