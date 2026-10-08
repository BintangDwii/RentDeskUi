/** Group setup items into render-ready categories for the order summary. */
export function buildCheckoutGroups(setup, onRemove) {
  const groups = [
    {
      title: 'Desk',
      rows: setup.desk
        ? [
            {
              key: 'desk',
              image: setup.desk.image,
              name: setup.desk.name,
              price: setup.desk.price,
              onRemove: () => onRemove('desk'),
            },
          ]
        : [],
    },
    {
      title: 'Chair',
      rows: setup.chair
        ? [
            {
              key: 'chair',
              image: setup.chair.image,
              name: setup.chair.name,
              price: setup.chair.price,
              onRemove: () => onRemove('chair'),
            },
          ]
        : [],
    },
    {
      title: 'Monitors',
      rows: setup.monitors.map((m) => ({
        key: m.instanceId,
        image: m.image,
        name: m.name,
        price: m.price,
        onRemove: () => onRemove('monitor', m.instanceId),
      })),
    },
    {
      title: 'Accessories',
      rows: setup.accessories.map((a) => ({
        key: a.instanceId,
        image: a.image,
        name: a.name,
        price: a.price,
        onRemove: () => onRemove('accessory', a.instanceId),
      })),
    },
  ];
  return groups.filter((g) => g.rows.length > 0);
}
