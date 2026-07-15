/* =========================================================
   FreshBite — app.js
   Frontend-only food ordering demo.
   All data lives in memory (arrays/objects) — no backend, no DB.
   ========================================================= */

/* ---------------- DATA ---------------- */

const CATEGORIES = [
  { id:'pizza', label:'Pizza', emoji:'🍕' },
  { id:'ramen', label:'Ramen', emoji:'🍜' },
  { id:'tacos', label:'Tacos', emoji:'🌮' },
  { id:'sushi', label:'Sushi', emoji:'🍣' },
  { id:'burgers', label:'Burgers', emoji:'🍔' },
  { id:'salads', label:'Salads', emoji:'🥗' },
  { id:'desserts', label:'Desserts', emoji:'🍰' },
  { id:'indian', label:'Indian', emoji:'🍛' },
];

const RESTAURANTS = [
  { id:1, name:'Nonna\'s Table', cuisine:'Italian', rating:4.7, price:'₹₹', tags:['pizza'], emoji:'🍕', desc:'Wood-fired pizza and slow-simmered sauces from a family recipe book.' },
  { id:2, name:'Kyoto Steam', cuisine:'Japanese', rating:4.8, price:'₹₹₹', tags:['ramen','sushi'], emoji:'🍜', desc:'Tonkotsu broth simmered for eighteen hours, and sushi cut to order.' },
  { id:3, name:'Casa Verde', cuisine:'Mexican', rating:4.5, price:'₹', tags:['tacos'], emoji:'🌮', desc:'Street-style tacos, handmade tortillas, salsas roasted daily.' },
  { id:4, name:'The Patty House', cuisine:'American', rating:4.4, price:'₹₹', tags:['burgers'], emoji:'🍔', desc:'Smash burgers with a griddle-crisp edge and house sauce.' },
  { id:5, name:'Leaf & Ladle', cuisine:'Healthy', rating:4.6, price:'₹₹', tags:['salads'], emoji:'🥗', desc:'Seasonal, plant-forward bowls built for actual flavor.' },
  { id:6, name:'Spice Junction', cuisine:'Indian', rating:4.9, price:'₹₹', tags:['indian'], emoji:'🍛', desc:'Slow-cooked curries and tandoor classics from a Chennai kitchen.' },
  { id:7, name:'Sugar & Stone', cuisine:'Bakery', rating:4.6, price:'₹', tags:['desserts'], emoji:'🍰', desc:'Small-batch cakes, tarts and cookies baked each morning.' },
  { id:8, name:'Umami Bar', cuisine:'Japanese', rating:4.3, price:'₹₹', tags:['sushi','ramen'], emoji:'🍣', desc:'Neighborhood sushi counter with a short, honest menu.' },
];

const MENU_ITEMS = [
  // Nonna's Table
  { id:101, rid:1, name:'Margherita Pizza', price:349, diet:'veg', emoji:'🍕', desc:'San Marzano tomato, fior di latte, basil, wood-fired crust.', ingredients:['Tomato sauce','Fior di latte mozzarella','Fresh basil','Olive oil','Sea salt'], nutrition:{cal:780,protein:'28g',carbs:'92g',fat:'26g'} },
  { id:102, rid:1, name:'Pepperoni Pizza', price:399, diet:'nonveg', emoji:'🍕', desc:'Double pepperoni, mozzarella, oregano, tomato base.', ingredients:['Tomato sauce','Mozzarella','Pepperoni','Oregano'], nutrition:{cal:890,protein:'34g',carbs:'88g',fat:'38g'} },
  { id:103, rid:1, name:'Truffle Mushroom Pizza', price:459, diet:'veg', emoji:'🍕', desc:'Wild mushrooms, truffle oil, parmesan, thyme.', ingredients:['Mushroom blend','Truffle oil','Parmesan','Mozzarella','Thyme'], nutrition:{cal:820,protein:'26g',carbs:'86g',fat:'34g'} },
  // Kyoto Steam
  { id:201, rid:2, name:'Tonkotsu Ramen', price:429, diet:'nonveg', emoji:'🍜', desc:'Pork bone broth, chashu, soft egg, scallion, nori.', ingredients:['Pork broth','Chashu pork','Ramen noodles','Soft-boiled egg','Nori','Scallion'], nutrition:{cal:680,protein:'32g',carbs:'70g',fat:'24g'} },
  { id:202, rid:2, name:'Miso Veggie Ramen', price:379, diet:'vegan', emoji:'🍜', desc:'Miso broth, tofu, corn, bamboo shoot, mushroom.', ingredients:['Miso broth','Tofu','Corn','Bamboo shoot','Mushroom','Noodles'], nutrition:{cal:520,protein:'20g',carbs:'74g',fat:'12g'} },
  { id:203, rid:2, name:'Salmon Nigiri Set', price:499, diet:'nonveg', emoji:'🍣', desc:'Eight pieces of hand-pressed salmon nigiri.', ingredients:['Sushi rice','Fresh salmon','Wasabi','Nori'], nutrition:{cal:410,protein:'26g',carbs:'52g',fat:'8g'} },
  // Casa Verde
  { id:301, rid:3, name:'Al Pastor Tacos (3)', price:259, diet:'nonveg', emoji:'🌮', desc:'Marinated pork, pineapple, onion, cilantro, corn tortilla.', ingredients:['Pork','Pineapple','Onion','Cilantro','Corn tortilla'], nutrition:{cal:520,protein:'28g',carbs:'48g',fat:'22g'} },
  { id:302, rid:3, name:'Black Bean Tacos (3)', price:219, diet:'vegan', emoji:'🌮', desc:'Spiced black beans, avocado, pico de gallo.', ingredients:['Black beans','Avocado','Pico de gallo','Corn tortilla','Lime'], nutrition:{cal:430,protein:'14g',carbs:'58g',fat:'16g'} },
  // The Patty House
  { id:401, rid:4, name:'Classic Smash Burger', price:299, diet:'nonveg', emoji:'🍔', desc:'Double smash patty, cheddar, pickles, house sauce.', ingredients:['Beef patty','Cheddar','Pickles','Brioche bun','House sauce'], nutrition:{cal:760,protein:'38g',carbs:'52g',fat:'42g'} },
  { id:402, rid:4, name:'Crispy Paneer Burger', price:269, diet:'veg', emoji:'🍔', desc:'Crisp-fried paneer, slaw, chipotle mayo.', ingredients:['Paneer','Cabbage slaw','Chipotle mayo','Brioche bun'], nutrition:{cal:640,protein:'22g',carbs:'58g',fat:'32g'} },
  // Leaf & Ladle
  { id:501, rid:5, name:'Harvest Grain Bowl', price:319, diet:'vegan', emoji:'🥗', desc:'Quinoa, roasted squash, kale, pomegranate, tahini.', ingredients:['Quinoa','Roasted squash','Kale','Pomegranate','Tahini dressing'], nutrition:{cal:460,protein:'14g',carbs:'56g',fat:'18g'} },
  { id:502, rid:5, name:'Grilled Chicken Caesar', price:349, diet:'nonveg', emoji:'🥗', desc:'Grilled chicken, romaine, parmesan, sourdough croutons.', ingredients:['Chicken breast','Romaine','Parmesan','Croutons','Caesar dressing'], nutrition:{cal:540,protein:'40g',carbs:'26g',fat:'28g'} },
  // Spice Junction
  { id:601, rid:6, name:'Butter Chicken', price:379, diet:'nonveg', emoji:'🍛', desc:'Tandoori chicken in a tomato-butter gravy, served with rice.', ingredients:['Chicken','Tomato gravy','Butter','Cream','Basmati rice'], nutrition:{cal:710,protein:'36g',carbs:'62g',fat:'32g'} },
  { id:602, rid:6, name:'Paneer Tikka Masala', price:329, diet:'veg', emoji:'🍛', desc:'Grilled paneer in a spiced masala gravy.', ingredients:['Paneer','Onion-tomato masala','Cream','Spices','Rice'], nutrition:{cal:640,protein:'24g',carbs:'58g',fat:'30g'} },
  { id:603, rid:6, name:'Vegan Dal Tadka', price:239, diet:'vegan', emoji:'🍛', desc:'Yellow lentils tempered with cumin and garlic, gluten-free.', ingredients:['Yellow lentils','Cumin','Garlic','Turmeric','Rice'], nutrition:{cal:380,protein:'18g',carbs:'54g',fat:'8g'}, extraTag:'gluten-free' },
  // Sugar & Stone
  { id:701, rid:7, name:'Molten Chocolate Cake', price:189, diet:'veg', emoji:'🍰', desc:'Warm chocolate cake with a liquid center, vanilla bean ice cream.', ingredients:['Dark chocolate','Butter','Eggs','Flour','Vanilla ice cream'], nutrition:{cal:520,protein:'8g',carbs:'58g',fat:'28g'} },
  { id:702, rid:7, name:'Gluten-Free Berry Tart', price:229, diet:'veg', emoji:'🍰', desc:'Almond crust, vanilla custard, seasonal berries.', ingredients:['Almond flour','Custard','Mixed berries','Apricot glaze'], nutrition:{cal:390,protein:'6g',carbs:'42g',fat:'20g'}, extraTag:'gluten-free' },
  // Umami Bar
  { id:801, rid:8, name:'Rainbow Roll', price:449, diet:'nonveg', emoji:'🍣', desc:'Crab, avocado, cucumber, topped with assorted sashimi.', ingredients:['Crab stick','Avocado','Cucumber','Sushi rice','Assorted fish'], nutrition:{cal:480,protein:'22g',carbs:'62g',fat:'14g'} },
  { id:802, rid:8, name:'Veggie Temaki Set', price:339, diet:'vegan', emoji:'🍣', desc:'Hand rolls with avocado, cucumber, pickled radish.', ingredients:['Nori','Sushi rice','Avocado','Cucumber','Pickled radish'], nutrition:{cal:360,protein:'9g',carbs:'64g',fat:'10g'} },
];

const REVIEWS = {
  101:[{user:'Meera',rating:5,comment:'Crust was perfectly charred, tasted like an actual pizzeria.'}, {user:'Arjun',rating:4,comment:'Great balance of basil and tomato, would order again.'}],
  201:[{user:'Divya',rating:5,comment:'Broth was rich without being heavy, chashu melted in my mouth.'}],
  401:[{user:'Karthik',rating:4,comment:'Sauce made the burger, patty could be slightly juicier.'}],
  601:[{user:'Priya',rating:5,comment:'Tastes homemade, gravy was the right amount of spicy.'}, {user:'Sanjay',rating:5,comment:'Best butter chicken I have had delivered.'}],
};

const COUPONS = {
  FRESH20: { type:'percent', value:20, label:'20% off' },
  FLAT50: { type:'flat', value:50, label:'₹50 off' },
  WELCOME10: { type:'percent', value:10, label:'10% off' },
};

const TEAM = [
  { name:'Ananya Rao', role:'Founder & Head Chef', emoji:'👩‍🍳' },
  { name:'Vikram Shah', role:'Operations Lead', emoji:'🧑‍💼' },
  { name:'Leah Fernandes', role:'Delivery Network', emoji:'🚴' },
  { name:'Rohan Iyer', role:'Menu Curator', emoji:'📋' },
];

const AWARDS = [
  { icon:'🏆', text:'Best Local Delivery App — City Food Awards, 2024' },
  { icon:'⭐', text:'4.7-star average across 12,000+ verified ratings' },
  { icon:'🌱', text:'Sustainable Packaging Certification, 2023' },
];

const DELIVERY_SLOTS = ['ASAP · 28 min','12:30 PM','1:00 PM','1:30 PM','7:00 PM','7:30 PM','8:00 PM'];

/* ---------------- STATE (in-memory only) ---------------- */

const state = {
  cart: [],                 // {itemId, qty}
  wishlist: [],              // itemIds
  user: null,                 // {name, email}
  addresses: [
    { id:1, label:'Home', line:'21 Marigold Street, Chennai 600028' },
  ],
  orders: [],                 // {id, items, total, placedAt, status, slot}
  coupon: null,
  selectedSlot: DELIVERY_SLOTS[0],
  accountTab: 'profile',
};

/* ---------------- HELPERS ---------------- */

const $ = (sel, root=document) => root.querySelector(sel);
const $$ = (sel, root=document) => [...root.querySelectorAll(sel)];
const findItem = id => MENU_ITEMS.find(i => i.id === Number(id));
const findRestaurant = id => RESTAURANTS.find(r => r.id === Number(id));
const currency = n => '₹' + n.toFixed(0);
const dietLabel = { veg:'Veg', nonveg:'Non-Veg', vegan:'Vegan' };
const dietTagClass = { veg:'tag--veg', nonveg:'tag--nonveg', vegan:'tag--vegan' };

function toast(msg){
  const t = $('#toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toast._t);
  toast._t = setTimeout(()=> t.classList.remove('show'), 2200);
}

function cartCount(){
  return state.cart.reduce((s,c)=> s + c.qty, 0);
}
function cartLines(){
  return state.cart.map(c => ({ ...c, item: findItem(c.itemId) })).filter(l => l.item);
}
function cartSubtotal(){
  return cartLines().reduce((s,l)=> s + l.item.price * l.qty, 0);
}
function deliveryFee(){
  const sub = cartSubtotal();
  return sub === 0 ? 0 : (sub > 500 ? 0 : 40);
}
function couponDiscount(sub){
  if(!state.coupon) return 0;
  const c = COUPONS[state.coupon];
  if(!c) return 0;
  return c.type === 'percent' ? Math.round(sub * c.value/100) : Math.min(c.value, sub);
}
function cartTotal(){
  const sub = cartSubtotal();
  const disc = couponDiscount(sub);
  return Math.max(0, sub - disc) + deliveryFee();
}
function updateHeaderCounts(){
  $('#cartCount').textContent = cartCount();
  $('#wishlistCount').textContent = state.wishlist.length;
}

function addToCart(itemId, qty=1){
  const existing = state.cart.find(c => c.itemId === itemId);
  if(existing) existing.qty += qty;
  else state.cart.push({ itemId, qty });
  updateHeaderCounts();
  toast('Added to cart');
}
function setQty(itemId, qty){
  const line = state.cart.find(c => c.itemId === itemId);
  if(!line) return;
  line.qty = qty;
  if(line.qty <= 0) state.cart = state.cart.filter(c => c.itemId !== itemId);
  updateHeaderCounts();
  renderCurrentPage();
}
function removeFromCart(itemId){
  state.cart = state.cart.filter(c => c.itemId !== itemId);
  updateHeaderCounts();
  renderCurrentPage();
}
function toggleWishlist(itemId){
  const i = state.wishlist.indexOf(itemId);
  if(i === -1){ state.wishlist.push(itemId); toast('Saved to wishlist'); }
  else { state.wishlist.splice(i,1); toast('Removed from wishlist'); }
  updateHeaderCounts();
  renderCurrentPage();
}

/* ---------------- ROUTER ---------------- */

function parseHash(){
  const raw = location.hash.replace(/^#\//,'') || 'home';
  const [path, query] = raw.split('?');
  const params = new URLSearchParams(query || '');
  return { path: path || 'home', params };
}

function navigateTo(){
  const { path, params } = parseHash();
  const pages = $$('.page');
  pages.forEach(p => p.classList.remove('active'));
  const target = document.getElementById('page-' + path) ? path : 'home';
  document.getElementById('page-' + target).classList.add('active');

  $$('.nav a').forEach(a => a.classList.toggle('active', a.dataset.route === target));
  $('#mainNav').classList.remove('open');
  window.scrollTo({ top:0, behavior:'instant' in window ? 'instant' : 'auto' });

  switch(target){
    case 'home': renderHome(); break;
    case 'restaurants': renderRestaurants(params); break;
    case 'menu': renderMenu(params); break;
    case 'product': renderProduct(params); break;
    case 'cart': renderCart(); break;
    case 'checkout': renderCheckout(); break;
    case 'account': renderAccount(params); break;
    case 'about': renderAbout(); break;
    case 'contact': break;
    case 'login': break;
  }
}
function renderCurrentPage(){ navigateTo(); }
window.addEventListener('hashchange', navigateTo);

/* ---------------- CARD BUILDERS ---------------- */

function dishCardHTML(item){
  const r = findRestaurant(item.rid);
  const wished = state.wishlist.includes(item.id);
  return `
  <div class="card">
    <div class="card__media">
      ${item.emoji}
      <button class="card__wishlist ${wished?'active':''}" onclick="event.stopPropagation(); toggleWishlist(${item.id})" title="Save">♥</button>
    </div>
    <div class="card__body" onclick="location.hash='#/product?id=${item.id}'" style="cursor:pointer">
      <h3 class="card__title">${item.name}</h3>
      <div class="card__meta">
        <span class="tag ${dietTagClass[item.diet]}">${dietLabel[item.diet]}</span>
        ${item.extraTag ? `<span class="tag tag--gluten-free">Gluten-Free</span>` : ''}
        <span>${r ? r.name : ''}</span>
      </div>
      <div class="card__price-row">
        <span class="price">${currency(item.price)}</span>
        <button class="card__cta" onclick="event.stopPropagation(); addToCart(${item.id})">Add +</button>
      </div>
    </div>
  </div>`;
}

function restaurantCardHTML(r){
  return `
  <div class="card card--restaurant" onclick="location.hash='#/menu?rid=${r.id}'" style="cursor:pointer">
    <div class="card__media">${r.emoji}</div>
    <div class="card__body">
      <h3 class="card__title">${r.name}</h3>
      <p class="cuisine">${r.cuisine} · ${r.price}</p>
      <div class="card__meta">
        <span class="tag tag--rating">★ ${r.rating}</span>
        <span>${r.desc}</span>
      </div>
    </div>
  </div>`;
}

/* ---------------- PAGE: HOME ---------------- */

function renderHome(){
  $('#categoryRow').innerHTML = CATEGORIES.map(c => `
    <button class="category-pill" onclick="location.hash='#/restaurants?cuisine=${c.id}'">
      <span class="emoji">${c.emoji}</span>
      <span class="label">${c.label}</span>
    </button>`).join('');

  const featured = MENU_ITEMS.slice(0,8);
  $('#featuredDishes').innerHTML = featured.map(dishCardHTML).join('');

  const popular = [...RESTAURANTS].sort((a,b)=> b.rating - a.rating).slice(0,4);
  $('#popularRestaurants').innerHTML = popular.map(restaurantCardHTML).join('');
}

/* ---------------- PAGE: RESTAURANT LISTING ---------------- */

function renderRestaurants(params){
  const cuisineSelect = $('#filterCuisine');
  if(cuisineSelect.options.length <= 1){
    [...new Set(RESTAURANTS.map(r=>r.cuisine))].forEach(c => {
      const opt = document.createElement('option');
      opt.value = c; opt.textContent = c;
      cuisineSelect.appendChild(opt);
    });
  }

  const urlCategory = params.get('cuisine');
  const urlSearch = (params.get('q')||'').toLowerCase();

  function apply(){
    const cuisine = $('#filterCuisine').value;
    const minRating = parseFloat($('#filterRating').value) || 0;
    const price = $('#filterPrice').value;
    let results = RESTAURANTS.filter(r => {
      if(cuisine && r.cuisine !== cuisine) return false;
      if(r.rating < minRating) return false;
      if(price && r.price !== price) return false;
      if(urlCategory && !r.tags.includes(urlCategory) && r.cuisine.toLowerCase() !== urlCategory.toLowerCase()) {
        // allow category-tag match only, ignore plain search fallback below
      }
      return true;
    });
    if(urlCategory && !cuisine){
      const byTag = RESTAURANTS.filter(r => r.tags.includes(urlCategory));
      if(byTag.length) results = results.filter(r => r.tags.includes(urlCategory) && r.rating >= minRating && (!price || r.price===price));
    }
    if(urlSearch){
      results = results.filter(r => r.name.toLowerCase().includes(urlSearch) || r.cuisine.toLowerCase().includes(urlSearch) || r.tags.some(t=>t.includes(urlSearch)));
    }
    $('#restaurantResults').innerHTML = results.length
      ? results.map(restaurantCardHTML).join('')
      : `<div class="empty-state"><span class="emoji">🍽️</span>No restaurants match those filters yet.</div>`;
  }

  $('#filterCuisine').onchange = apply;
  $('#filterRating').onchange = apply;
  $('#filterPrice').onchange = apply;
  $('#clearFilters').onclick = () => { location.hash = '#/restaurants'; };
  apply();
}

/* ---------------- PAGE: MENU ---------------- */

let activeMenuFilter = 'all';

function renderMenu(params){
  const rid = Number(params.get('rid')) || RESTAURANTS[0].id;
  const r = findRestaurant(rid);
  activeMenuFilter = 'all';
  $('#menuHeader').innerHTML = `
    <p class="eyebrow">${r.cuisine} · ${r.price} · ★ ${r.rating}</p>
    <h1>${r.emoji} ${r.name}</h1>
    <p class="cuisine-line">${r.desc}</p>`;

  const filters = ['all','veg','nonveg','vegan','gluten-free'];
  const labels = {all:'All', veg:'Veg', nonveg:'Non-Veg', vegan:'Vegan', 'gluten-free':'Gluten-Free'};
  $('#menuFilters').innerHTML = filters.map(f =>
    `<button data-f="${f}" class="${f==='all'?'active':''}">${labels[f]}</button>`).join('');

  $$('#menuFilters button').forEach(btn => {
    btn.onclick = () => {
      activeMenuFilter = btn.dataset.f;
      $$('#menuFilters button').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      drawItems();
    };
  });

  function drawItems(){
    let items = MENU_ITEMS.filter(i => i.rid === rid);
    if(activeMenuFilter !== 'all'){
      items = items.filter(i => activeMenuFilter === 'gluten-free' ? i.extraTag === 'gluten-free' : i.diet === activeMenuFilter);
    }
    $('#menuItemsGrid').innerHTML = items.length
      ? items.map(dishCardHTML).join('')
      : `<div class="empty-state"><span class="emoji">🥲</span>No dishes match this filter.</div>`;
  }
  drawItems();
}

/* ---------------- PAGE: PRODUCT DETAIL ---------------- */

function renderProduct(params){
  const id = Number(params.get('id'));
  const item = findItem(id) || MENU_ITEMS[0];
  const r = findRestaurant(item.rid);
  const line = state.cart.find(c => c.itemId === item.id);
  const qty = line ? line.qty : 0;
  const wished = state.wishlist.includes(item.id);

  $('#productDetail').innerHTML = `
    <div class="product-media">${item.emoji}</div>
    <div class="product-info">
      <p class="eyebrow">${r ? r.name : ''}</p>
      <h1>${item.name}</h1>
      <p class="price">${currency(item.price)}</p>
      <div class="product-tags">
        <span class="tag ${dietTagClass[item.diet]}">${dietLabel[item.diet]}</span>
        ${item.extraTag ? `<span class="tag tag--gluten-free">Gluten-Free</span>` : ''}
      </div>
      <p>${item.desc}</p>

      <div class="qty-row">
        <div class="qty-control">
          <button onclick="adjustProductQty(${item.id}, -1)">−</button>
          <span id="productQty">${qty}</span>
          <button onclick="adjustProductQty(${item.id}, 1)">+</button>
        </div>
        <button class="btn btn--primary" onclick="addProductToCart(${item.id})">Add to cart</button>
        <button class="icon-btn ${wished?'active':''}" onclick="toggleWishlist(${item.id}); renderProduct(new URLSearchParams('id=${item.id}'))" title="Wishlist">♥</button>
      </div>

      <div class="detail-block">
        <h4>Ingredients</h4>
        <p>${item.ingredients.join(', ')}.</p>
      </div>
      <div class="detail-block">
        <h4>Nutritional info (per serving)</h4>
        <div class="nutrition-grid">
          <div><strong>${item.nutrition.cal}</strong><span>Calories</span></div>
          <div><strong>${item.nutrition.protein}</strong><span>Protein</span></div>
          <div><strong>${item.nutrition.carbs}</strong><span>Carbs</span></div>
          <div><strong>${item.nutrition.fat}</strong><span>Fat</span></div>
        </div>
      </div>
    </div>`;

  const reviews = REVIEWS[item.id] || [];
  $('#productReviews').innerHTML = `
    <h3>Customer reviews ${reviews.length ? `(${reviews.length})` : ''}</h3>
    ${reviews.length ? reviews.map(rv => `
      <div class="review">
        <div class="review__head"><span>${rv.user}</span><span class="stars">${'★'.repeat(rv.rating)}${'☆'.repeat(5-rv.rating)}</span></div>
        <p>${rv.comment}</p>
      </div>`).join('') : '<p style="color:var(--brown-45)">No reviews yet — be the first to try this dish.</p>'}
  `;
}
window.adjustProductQty = function(itemId, delta){
  const el = $('#productQty');
  let q = Math.max(0, parseInt(el.textContent) + delta);
  el.textContent = q;
};
window.addProductToCart = function(itemId){
  const q = parseInt($('#productQty').textContent) || 1;
  addToCart(itemId, q === 0 ? 1 : q);
  if(q === 0) $('#productQty').textContent = 1;
};

/* ---------------- PAGE: CART ---------------- */

function renderCart(){
  const lines = cartLines();
  $('#cartList').innerHTML = lines.length ? lines.map(l => `
    <div class="cart-row">
      <div class="cart-row__media">${l.item.emoji}</div>
      <div class="cart-row__info">
        <h4>${l.item.name}</h4>
        <span>${currency(l.item.price)} each</span><br>
        <button class="cart-row__remove" onclick="removeFromCart(${l.item.id})">Remove</button>
      </div>
      <div class="qty-control">
        <button onclick="setQty(${l.item.id}, ${l.qty - 1})">−</button>
        <span>${l.qty}</span>
        <button onclick="setQty(${l.item.id}, ${l.qty + 1})">+</button>
      </div>
      <strong class="price">${currency(l.item.price * l.qty)}</strong>
    </div>`).join('') : `<div class="empty-state"><span class="emoji">🧺</span>Your cart is empty.<br><br><button class="btn btn--primary" onclick="location.hash='#/restaurants'">Browse restaurants</button></div>`;

  const sub = cartSubtotal();
  const disc = couponDiscount(sub);
  const fee = deliveryFee();
  $('#cartReceipt').innerHTML = `
    <h3>Receipt</h3>
    <div class="receipt-row"><span>Subtotal</span><span>${currency(sub)}</span></div>
    ${state.coupon ? `<div class="receipt-row"><span>Coupon (${state.coupon})</span><span>-${currency(disc)}</span></div>` : ''}
    <div class="receipt-row"><span>Delivery fee</span><span>${fee === 0 ? 'Free' : currency(fee)}</span></div>
    <div class="receipt-row total"><span>Total</span><span>${currency(cartTotal())}</span></div>
    <div class="coupon-row">
      <input type="text" id="couponInput" placeholder="Coupon code" value="${state.coupon||''}">
      <button onclick="applyCoupon()">Apply</button>
    </div>
    <p class="coupon-msg" id="couponMsg"></p>
    <button class="btn btn--primary btn--full" ${lines.length?'':'disabled'} onclick="location.hash='#/checkout'">Checkout</button>
  `;
}
window.applyCoupon = function(){
  const code = $('#couponInput').value.trim().toUpperCase();
  const msg = $('#couponMsg');
  if(!code){ state.coupon=null; renderCart(); return; }
  if(COUPONS[code]){
    state.coupon = code;
    renderCart();
    $('#couponMsg').textContent = `Applied: ${COUPONS[code].label}`;
    $('#couponMsg').className = 'coupon-msg ok';
  } else {
    msg.textContent = 'Invalid coupon code.';
    msg.className = 'coupon-msg err';
  }
};

/* ---------------- PAGE: CHECKOUT ---------------- */

function renderCheckout(){
  if(cartLines().length === 0){
    $('#checkoutLayout').innerHTML = `<div class="empty-state"><span class="emoji">🛒</span>Add something to your cart before checking out.</div>`;
    return;
  }
  const addr = state.addresses;
  $('#checkoutLayout').innerHTML = `
    <form class="checkout-form" id="checkoutForm">
      <fieldset>
        <legend>Delivery address</legend>
        ${addr.map((a,i) => `
          <label class="radio-card">
            <input type="radio" name="address" value="${a.id}" ${i===0?'checked':''}>
            <span><strong>${a.label}</strong><br><small>${a.line}</small></span>
          </label>`).join('')}
        <input type="text" id="newAddress" placeholder="Or enter a new delivery address">
      </fieldset>

      <fieldset>
        <legend>Delivery time</legend>
        <div class="time-slots" id="timeSlots">
          ${DELIVERY_SLOTS.map(s => `<button type="button" class="time-slot ${s===state.selectedSlot?'active':''}" data-slot="${s}">${s}</button>`).join('')}
        </div>
      </fieldset>

      <fieldset>
        <legend>Payment method</legend>
        <label class="radio-card"><input type="radio" name="payment" value="card" checked><span><strong>Credit / Debit Card</strong><br><small>Simulated — no real charge</small></span></label>
        <label class="radio-card"><input type="radio" name="payment" value="upi"><span><strong>UPI</strong><br><small>Simulated payment</small></span></label>
        <label class="radio-card"><input type="radio" name="payment" value="cod"><span><strong>Cash on Delivery</strong></span></label>
        <div id="cardFields" style="display:flex; gap:10px; margin-top:6px;">
          <input type="text" placeholder="Card number" maxlength="19" style="flex:2">
          <input type="text" placeholder="MM/YY" maxlength="5" style="flex:1">
          <input type="text" placeholder="CVV" maxlength="3" style="flex:1">
        </div>
      </fieldset>

      <button type="submit" class="btn btn--primary btn--full">Place order — ${currency(cartTotal())}</button>
    </form>
    <aside class="receipt" id="checkoutSummary"></aside>
  `;

  const sub = cartSubtotal(), disc = couponDiscount(sub), fee = deliveryFee();
  $('#checkoutSummary').innerHTML = `
    <h3>Order summary</h3>
    ${cartLines().map(l => `<div class="receipt-row"><span>${l.qty}× ${l.item.name}</span><span>${currency(l.item.price*l.qty)}</span></div>`).join('')}
    <div class="receipt-row"><span>Subtotal</span><span>${currency(sub)}</span></div>
    ${state.coupon ? `<div class="receipt-row"><span>Coupon</span><span>-${currency(disc)}</span></div>` : ''}
    <div class="receipt-row"><span>Delivery</span><span>${fee===0?'Free':currency(fee)}</span></div>
    <div class="receipt-row total"><span>Total</span><span>${currency(cartTotal())}</span></div>
  `;

  $$('#timeSlots .time-slot').forEach(btn => btn.onclick = () => {
    state.selectedSlot = btn.dataset.slot;
    $$('#timeSlots .time-slot').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
  });

  $$('input[name="payment"]').forEach(r => r.onchange = () => {
    $('#cardFields').style.display = r.value === 'card' && r.checked ? 'flex' : (r.checked ? 'none' : $('#cardFields').style.display);
  });

  $('#checkoutForm').onsubmit = (e) => {
    e.preventDefault();
    placeOrder();
  };
}

function placeOrder(){
  const order = {
    id: 'FB-' + Math.floor(1000 + Math.random()*9000),
    items: cartLines().map(l => ({ name:l.item.name, qty:l.qty, price:l.item.price })),
    total: cartTotal(),
    placedAt: new Date().toLocaleString(),
    slot: state.selectedSlot,
    status: 1, // stage index for simulated tracking
  };
  state.orders.unshift(order);
  state.cart = [];
  state.coupon = null;
  updateHeaderCounts();
  toast('Order placed! Track it in your account.');
  location.hash = '#/account?tab=orders';
}

/* ---------------- PAGE: ACCOUNT ---------------- */

function renderAccount(params){
  if(!state.user){
    location.hash = '#/login';
    return;
  }
  const tab = params.get('tab') || state.accountTab || 'profile';
  state.accountTab = tab;
  $('#accountGreeting').textContent = `Welcome back, ${state.user.name}.`;

  $$('#accountTabs button').forEach(b => b.classList.toggle('active', b.dataset.tab === tab));
  $$('#accountTabs button').forEach(b => b.onclick = () => { location.hash = '#/account?tab=' + b.dataset.tab; });

  const content = $('#accountContent');
  if(tab === 'profile'){
    content.innerHTML = `
      <h3>Profile</h3>
      <p><strong>Name:</strong> ${state.user.name}</p>
      <p><strong>Email:</strong> ${state.user.email}</p>
      <button class="btn btn--ghost" onclick="logout()">Log out</button>
    `;
  } else if(tab === 'orders'){
    content.innerHTML = state.orders.length ? state.orders.map(o => {
      const stages = ['Placed','Preparing','Out for delivery','Delivered'];
      return `
      <div class="order-card">
        <div class="order-card__head"><span>#${o.id}</span><span>${o.placedAt}</span></div>
        ${o.items.map(i => `<div class="receipt-row"><span>${i.qty}× ${i.name}</span><span>${currency(i.price*i.qty)}</span></div>`).join('')}
        <div class="receipt-row total"><span>Total</span><span>${currency(o.total)}</span></div>
        <p style="font-size:12.5px;color:var(--brown-45);margin:8px 0 2px">Delivery: ${o.slot} · Status: ${stages[o.status]}</p>
        <div class="tracker">${stages.map((s,i)=>`<span class="${i<=o.status?'done':''}"></span>`).join('')}</div>
        ${o.status < 3 ? `<button class="btn btn--ghost" style="margin-top:10px" onclick="advanceOrder('${o.id}')">Simulate next step</button>` : '<p style="margin-top:8px;color:var(--green);font-weight:700;font-size:13px">Delivered ✓</p>'}
      </div>`;
    }).join('') : `<div class="empty-state"><span class="emoji">📦</span>No orders yet.</div>`;
  } else if(tab === 'addresses'){
    content.innerHTML = `
      ${state.addresses.map(a => `<div class="address-card"><span><strong>${a.label}</strong><br><small>${a.line}</small></span></div>`).join('')}
      <form id="addAddressForm" style="display:flex; gap:10px; margin-top:14px;">
        <input type="text" id="newAddrLabel" placeholder="Label (e.g. Work)" style="flex:1; padding:10px; border-radius:10px; border:1.5px solid var(--line)">
        <input type="text" id="newAddrLine" placeholder="Full address" style="flex:2; padding:10px; border-radius:10px; border:1.5px solid var(--line)">
        <button class="btn btn--primary" type="submit">Add</button>
      </form>
    `;
    $('#addAddressForm').onsubmit = (e) => {
      e.preventDefault();
      const label = $('#newAddrLabel').value.trim() || 'Address';
      const line = $('#newAddrLine').value.trim();
      if(!line) return;
      state.addresses.push({ id:Date.now(), label, line });
      renderAccount(new URLSearchParams('tab=addresses'));
    };
  } else if(tab === 'wishlist'){
    const items = state.wishlist.map(findItem).filter(Boolean);
    content.innerHTML = items.length ? `<div class="grid grid--dishes">${items.map(dishCardHTML).join('')}</div>` : `<div class="empty-state"><span class="emoji">♥</span>Nothing saved yet.</div>`;
  }
}
window.advanceOrder = function(id){
  const o = state.orders.find(o => o.id === id);
  if(o && o.status < 3){ o.status++; renderAccount(new URLSearchParams('tab=orders')); toast('Order status updated'); }
};
window.logout = function(){
  state.user = null;
  toast('Logged out');
  location.hash = '#/home';
};

/* ---------------- PAGE: ABOUT ---------------- */

function renderAbout(){
  $('#teamGrid').innerHTML = TEAM.map(t => `
    <div class="team-card">
      <div class="avatar">${t.emoji}</div>
      <h4>${t.name}</h4>
      <span>${t.role}</span>
    </div>`).join('');
  $('#awardsList').innerHTML = AWARDS.map(a => `<li><span style="font-size:22px">${a.icon}</span><span>${a.text}</span></li>`).join('');
}

/* ---------------- AUTH ---------------- */

$('#loginForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const email = e.target.email.value;
  state.user = { name: email.split('@')[0], email };
  toast('Logged in');
  location.hash = '#/account';
});
$('#registerForm').addEventListener('submit', (e) => {
  e.preventDefault();
  state.user = { name: e.target.name.value, email: e.target.email.value };
  toast('Account created');
  location.hash = '#/account';
});
$$('.auth-tabs button').forEach(btn => {
  btn.addEventListener('click', () => {
    $$('.auth-tabs button').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const isLogin = btn.dataset.auth === 'login';
    $('#loginForm').classList.toggle('hidden', !isLogin);
    $('#registerForm').classList.toggle('hidden', isLogin);
  });
});

/* ---------------- CONTACT FORM ---------------- */

$('#contactForm').addEventListener('submit', (e) => {
  e.preventDefault();
  toast('Message sent — we\'ll reply within a day.');
  e.target.reset();
});

/* ---------------- NAV / MISC ---------------- */

$('#hamburger').addEventListener('click', () => $('#mainNav').classList.toggle('open'));

document.addEventListener('click', (e) => {
  if(!e.target.closest('.icon-btn') && !e.target.closest('.hero__search')){
    if(e.target.id === 'accountBtn' && !state.user){ /* handled by inline onclick */ }
  }
});
$('#accountBtn').addEventListener('click', (e) => {
  if(!state.user){ e.stopPropagation(); location.hash = '#/login'; }
});

/* ---------------- INIT ---------------- */

updateHeaderCounts();
navigateTo();