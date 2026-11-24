// All photography lives here so it can be swapped for the café's own photos.
// Currently Unsplash CDN URLs. To use your own photos, drop files in /public/images
// and replace values with '/images/your-file.jpg'.

const u = (id) => `https://images.unsplash.com/photo-${id}`;

export const photos = {
  burger1: u('1568901346375-23c9450c58cd'),
  burger2: u('1550547660-d9450f859349'),
  burger3: u('1586190848861-99aa4a171e90'),
  pizza1: u('1513104890138-7c749659a591'),
  pizza2: u('1565299624946-b28f40a0ae38'),
  pizza3: u('1574071318508-1cdbab80d002'),
  sandwich1: u('1528735602780-2552fd46c7af'),
  sandwich2: u('1539252554453-80ab65ce3586'),
  pasta1: u('1473093295043-cdd812d0e601'),
  pasta2: u('1621996346565-e3dbc646d9a9'),
  pasta3: u('1551183053-bf91a1d81141'),
  dessert1: u('1578985545062-69928b1d9587'),
  dessert2: u('1551024601-bec78aea704b'),
  dessert3: u('1488477181946-6428a0291777'),
  shake1: u('1572490122747-3968b75cc699'),
  shake2: u('1553787499-6f9133860278'),
  fries1: u('1573080496219-bb080dd4f877'),
  fries2: u('1630431341973-02e1b662ec35'),
  indian1: u('1565557623262-b51c2513a641'),
  indian2: u('1585937421612-70a008356fbe'),
  indian3: u('1631452180519-c014fe946bc7'),
  coffee1: u('1509042239860-f550ce710b93'),
  coffee2: u('1495474472287-4d71bcdd2085'),
  coffee3: u('1541167760496-1628856ab772'),
  interior1: u('1555396273-367ea4eb4db5'),
  interior2: u('1517248135467-4c7edcad34c4'),
  interior3: u('1559925393-8be0ec4767c8'),
  prep1: u('1556910103-1c02745aae4d'),
  prep2: u('1577219491135-ce391730fb2c'),
  spread: u('1504674900247-0877df9cc836'),
  brunch: u('1567620905732-2d1ec7ab7445'),
};

// Build a sized URL. Unsplash supports w/h/fit/crop params; other URLs pass through.
export const img = (key, w = 800, h) => {
  const base = photos[key] || key;
  if (!base.includes('images.unsplash.com')) return base;
  const hh = h ? `&h=${h}` : '';
  return `${base}?auto=format&fit=crop&w=${w}${hh}&q=75`;
};
