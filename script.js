const WHATSAPP_NUMBER = "5599999999999";

const PRODUCTS = [
  { id:1, name:'Ração Bovinos 25kg', category:'racao', price:'R$ 120,00',
    img:"imagens/racao.png" },

  { id:2, name:'Sementes de Milho 10kg', category:'sementes', price:'R$ 45,00',
    img:'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=800&q=60' },

  { id:3, name:'Fertilizante NPK 20-10-10 50kg', category:'fertilizante', price:'R$ 220,00',
    img:'https://images.unsplash.com/photo-1593642634443-44adaa06623a?auto=format&fit=crop&w=800&q=60' },

  { id:4, name:'Botas de Segurança Nº42', category:'epi', price:'R$ 89,00',
    img:'https://images.unsplash.com/photo-1573497491208-6b1acb260507?auto=format&fit=crop&w=800&q=60' },

  { id:5, name:'Pulverizador Costal 16L', category:'ferramenta', price:'R$ 199,00',
    img:'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=60' },

  { id:6, name:'Medicamento Veterinário 250ml', category:'medicamento', price:'R$ 32,50',
    img:'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=60' }
];

const grid = document.getElementById("prodGrid");
const searchInput = document.getElementById("searchInput");
const emptyState = document.getElementById("emptyState");
const resultMeta = document.getElementById("resultMeta");

/* RENDER */
function renderProducts(list) {
  grid.innerHTML = "";
  if (list.length === 0) {
    emptyState.hidden = false;
    return;
  }

  emptyState.hidden = true;

  list.forEach(p => {
    const div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
      <img src="${p.img}">
      <div style="padding:12px">
        <strong>${p.name}</strong><br>
        <div class="price">${p.price}</div>
      </div>
    `;

    div.onclick = () => openModal(p);
    grid.appendChild(div);
  });

  resultMeta.textContent = `${list.length} produto(s) encontrado(s)`;
}

renderProducts(PRODUCTS);

/* MENU */
document.querySelectorAll(".menu-btn").forEach(btn => {
  btn.onclick = () => {
    document.querySelectorAll(".menu-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const cat = btn.dataset.cat;
    renderProducts(cat === "all" ? PRODUCTS : PRODUCTS.filter(p => p.category === cat));
  };
});

/* SEARCH */
searchInput.oninput = () => {
  const q = searchInput.value.toLowerCase();
  renderProducts(PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.category.toLowerCase().includes(q)
  ));
};

/* MODAL */
const modal = document.getElementById("productModal");
const closeModalBtn = document.getElementById("closeModal");

function openModal(p) {
  document.getElementById("modalImg").src = p.img;
  document.getElementById("modalName").textContent = p.name;
  document.getElementById("modalPrice").textContent = p.price;

  document.getElementById("modalWaBtn").onclick = () =>
    openWhatsApp(`Olá! Quero ${p.name}`);

  modal.style.display = "flex";
}

closeModalBtn.onclick = () => modal.style.display = "none";
modal.onclick = (e) => { if (e.target === modal) modal.style.display = "none"; };

function openWhatsApp(msg) {
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`);
}

/* FORM */
document.getElementById("clearForm").onclick = () =>
  document.getElementById("contactForm").reset();

document.getElementById("ano").textContent = new Date().getFullYear();
