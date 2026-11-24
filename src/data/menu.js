// Menu data is kept separate from components. Later this can be replaced by the
// `menu_items` table in Supabase (see src/services/menuService.js and supabase/schema.sql).
// price is in INR. veg: true = vegetarian, false = non-vegetarian.

export const categories = [
  { id: 'burgers', name: 'Burgers', blurb: 'Stacked, juicy and toasted-bun perfect.', photo: 'burger1', icon: 'Sandwich' },
  { id: 'pizza', name: 'Pizza', blurb: 'Hand-stretched, baked hot and bubbly.', photo: 'pizza1', icon: 'Pizza' },
  { id: 'sandwiches', name: 'Sandwiches', blurb: 'Grilled, layered and full of flavour.', photo: 'sandwich1', icon: 'Sandwich' },
  { id: 'pasta', name: 'Pasta', blurb: 'Silky sauces, al dente every time.', photo: 'pasta1', icon: 'UtensilsCrossed' },
  { id: 'desserts', name: 'Desserts', blurb: 'The sweet finish you deserve.', photo: 'dessert1', icon: 'CakeSlice' },
  { id: 'milkshakes', name: 'Milkshakes', blurb: 'Thick, cold and made to order.', photo: 'shake1', icon: 'GlassWater' },
  { id: 'fries-starters', name: 'Fries & Starters', blurb: 'Crispy bites to begin with.', photo: 'fries1', icon: 'Salad' },
  { id: 'indian', name: 'Indian Food', blurb: 'Comfort classics, slow-cooked.', photo: 'indian1', icon: 'Soup' },
  { id: 'coffee', name: 'Coffee & Beverages', blurb: 'Freshly brewed, always.', photo: 'coffee1', icon: 'Coffee' },
];

export const menuItems = [
  // Burgers
  { id: 'b1', category: 'burgers', name: 'Classic Cheese Burger', desc: 'Crisp veg patty, cheddar, lettuce, tomato and house sauce in a toasted brioche bun.', price: 189, veg: true, bestseller: true, photo: 'burger1' },
  { id: 'b2', category: 'burgers', name: 'Smoky Chicken Burger', desc: 'Juicy grilled chicken, smoked mayo, caramelised onion and pickles.', price: 229, veg: false, bestseller: true, photo: 'burger2' },
  { id: 'b3', category: 'burgers', name: 'Paneer Tikka Burger', desc: 'Spiced paneer steak, mint chutney, onion rings and fresh greens.', price: 209, veg: true, bestseller: false, photo: 'burger3' },
  { id: 'b4', category: 'burgers', name: 'Double Stack Chicken Burger', desc: 'Two crispy chicken patties, double cheese and our signature sauce.', price: 299, veg: false, bestseller: false, photo: 'burger2' },

  // Pizza
  { id: 'p1', category: 'pizza', name: 'Margherita', desc: 'San Marzano style tomato, fresh mozzarella and basil on a thin crust.', price: 289, veg: true, bestseller: true, photo: 'pizza1' },
  { id: 'p2', category: 'pizza', name: 'Farmhouse Veg', desc: 'Bell peppers, mushrooms, olives, sweet corn and onions with extra cheese.', price: 349, veg: true, bestseller: false, photo: 'pizza2' },
  { id: 'p3', category: 'pizza', name: 'Peri Peri Chicken', desc: 'Peri peri chicken, red onion, jalapeño and mozzarella.', price: 399, veg: false, bestseller: true, photo: 'pizza3' },
  { id: 'p4', category: 'pizza', name: 'Paneer Makhani Pizza', desc: 'Creamy makhani sauce, tandoori paneer and capsicum.', price: 369, veg: true, bestseller: false, photo: 'pizza2' },

  // Sandwiches
  { id: 's1', category: 'sandwiches', name: 'Grilled Veg Cheese Sandwich', desc: 'Seasonal vegetables, mozzarella and basil pesto on multigrain bread.', price: 149, veg: true, bestseller: true, photo: 'sandwich1' },
  { id: 's2', category: 'sandwiches', name: 'Chicken Club Sandwich', desc: 'Triple-layer toast with grilled chicken, egg, lettuce and mayo.', price: 219, veg: false, bestseller: false, photo: 'sandwich2' },
  { id: 's3', category: 'sandwiches', name: 'Paneer Tikka Panini', desc: 'Pressed ciabatta with tikka paneer, peppers and mint mayo.', price: 189, veg: true, bestseller: false, photo: 'sandwich1' },
  { id: 's4', category: 'sandwiches', name: 'Egg Mayo Toastie', desc: 'Soft scrambled egg mayo with cheddar on buttery toasted bread.', price: 139, veg: false, bestseller: false, photo: 'sandwich2' },

  // Pasta
  { id: 'pa1', category: 'pasta', name: 'Creamy Alfredo Penne', desc: 'Penne in a parmesan cream sauce with garlic and herbs.', price: 249, veg: true, bestseller: true, photo: 'pasta1' },
  { id: 'pa2', category: 'pasta', name: 'Arrabbiata', desc: 'Spicy tomato, garlic and chilli with a drizzle of olive oil.', price: 229, veg: true, bestseller: false, photo: 'pasta2' },
  { id: 'pa3', category: 'pasta', name: 'Chicken Pesto Fusilli', desc: 'Grilled chicken tossed in fresh basil pesto and toasted pine nuts.', price: 299, veg: false, bestseller: false, photo: 'pasta3' },
  { id: 'pa4', category: 'pasta', name: 'Baked Mac & Cheese', desc: 'Three-cheese macaroni with a golden breadcrumb crust.', price: 259, veg: true, bestseller: false, photo: 'pasta1' },

  // Desserts
  { id: 'd1', category: 'desserts', name: 'Warm Chocolate Brownie', desc: 'Fudgy brownie with vanilla ice cream and hot chocolate sauce.', price: 169, veg: true, bestseller: true, photo: 'dessert1' },
  { id: 'd2', category: 'desserts', name: 'Glazed Donut Trio', desc: 'Three fresh donuts: classic glaze, chocolate and cinnamon sugar.', price: 179, veg: true, bestseller: false, photo: 'dessert2' },
  { id: 'd3', category: 'desserts', name: 'New York Cheesecake', desc: 'Silky baked cheesecake on a biscuit base with berry compote.', price: 219, veg: true, bestseller: true, photo: 'dessert3' },
  { id: 'd4', category: 'desserts', name: 'Pancake Stack', desc: 'Fluffy pancakes with maple syrup, butter and seasonal fruit.', price: 199, veg: true, bestseller: false, photo: 'brunch' },

  // Milkshakes
  { id: 'm1', category: 'milkshakes', name: 'Classic Chocolate Shake', desc: 'Belgian chocolate blended with vanilla ice cream and cold milk.', price: 169, veg: true, bestseller: true, photo: 'shake1' },
  { id: 'm2', category: 'milkshakes', name: 'Strawberry Cream Shake', desc: 'Fresh strawberries, cream and ice cream, topped with whipped cream.', price: 169, veg: true, bestseller: false, photo: 'shake2' },
  { id: 'm3', category: 'milkshakes', name: 'Oreo Cookie Shake', desc: 'Crushed Oreo, vanilla ice cream and a cookie crumble rim.', price: 189, veg: true, bestseller: true, photo: 'shake1' },
  { id: 'm4', category: 'milkshakes', name: 'Cold Coffee Shake', desc: 'Espresso, ice cream and milk blended thick and frothy.', price: 179, veg: true, bestseller: false, photo: 'shake2' },

  // Fries & Starters
  { id: 'f1', category: 'fries-starters', name: 'Classic Salted Fries', desc: 'Skin-on fries, crisp outside and fluffy inside.', price: 119, veg: true, bestseller: false, photo: 'fries1' },
  { id: 'f2', category: 'fries-starters', name: 'Peri Peri Loaded Fries', desc: 'Fries with peri peri seasoning, cheese sauce and jalapeño.', price: 169, veg: true, bestseller: true, photo: 'fries2' },
  { id: 'f3', category: 'fries-starters', name: 'Crispy Chicken Wings', desc: 'Six wings tossed in smoky BBQ or hot buffalo sauce.', price: 259, veg: false, bestseller: false, photo: 'fries2' },
  { id: 'f4', category: 'fries-starters', name: 'Garlic Bread with Cheese', desc: 'Toasted baguette with garlic butter and melted mozzarella.', price: 139, veg: true, bestseller: false, photo: 'spread' },

  // Indian Food
  { id: 'i1', category: 'indian', name: 'Butter Chicken with Naan', desc: 'Tender chicken in a rich tomato-butter gravy, served with butter naan.', price: 329, veg: false, bestseller: true, photo: 'indian2' },
  { id: 'i2', category: 'indian', name: 'Paneer Butter Masala', desc: 'Soft paneer cubes in a creamy cashew-tomato gravy with two rotis.', price: 279, veg: true, bestseller: true, photo: 'indian1' },
  { id: 'i3', category: 'indian', name: 'Chicken Dum Biryani', desc: 'Slow-cooked basmati and marinated chicken with raita.', price: 319, veg: false, bestseller: false, photo: 'indian3' },
  { id: 'i4', category: 'indian', name: 'Dal Tadka with Jeera Rice', desc: 'Yellow lentils tempered with garlic and ghee, with cumin rice.', price: 219, veg: true, bestseller: false, photo: 'indian1' },

  // Coffee & Beverages
  { id: 'c1', category: 'coffee', name: 'Signature Cappuccino', desc: 'Double espresso with velvety steamed milk and latte art.', price: 149, veg: true, bestseller: true, photo: 'coffee1' },
  { id: 'c2', category: 'coffee', name: 'Caramel Latte', desc: 'Espresso, steamed milk and house-made caramel.', price: 169, veg: true, bestseller: false, photo: 'coffee3' },
  { id: 'c3', category: 'coffee', name: 'Iced Americano', desc: 'Bold espresso over ice with a splash of cold water.', price: 139, veg: true, bestseller: false, photo: 'coffee2' },
  { id: 'c4', category: 'coffee', name: 'Fresh Lime Soda', desc: 'Sweet, salted or mixed. Cold, fizzy and refreshing.', price: 99, veg: true, bestseller: false, photo: 'coffee2' },
];

export const getCategoryName = (id) => categories.find((c) => c.id === id)?.name || id;
