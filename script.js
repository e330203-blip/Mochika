/*
    Mochika JavaScript
    Ürün detaylarını göstermek ve sipariş formunu yönetmek için kullanılır.
*/

const products = [
    { id: 1, category: "bileklikler", name: "Boncuklu Kalp Bileklik", price: "149 TL", icon: "♡", description: "Pastel renkli boncuklarla hazırlanmış, günlük kullanıma uygun el yapımı bileklik." },
    { id: 2, category: "bileklikler", name: "Pembe Çiçek Bileklik", price: "139 TL", icon: "✿", description: "Pembe ve beyaz tonların bir araya geldiği zarif el yapımı bileklik." },
    { id: 3, category: "bileklikler", name: "Pastel Yıldız Bileklik", price: "149 TL", icon: "✦", description: "Minik yıldız detayları bulunan tatlı ve renkli bileklik." },
    { id: 4, category: "kil", name: "Mini Kalp Kil Figürü", price: "119 TL", icon: "♡", description: "El yapımı küçük bir kil figürü. Masa veya raf dekorasyonu için kullanılabilir." },
    { id: 5, category: "kil", name: "Çiçekli Kil Magnet", price: "99 TL", icon: "✿", description: "Çiçek detaylı, el yapımı dekoratif kil magnet." },
    { id: 6, category: "takilar", name: "Mini Bulut Küpe", price: "159 TL", icon: "☁", description: "Minimal ve sevimli bulut tasarımlı küpe." },
    { id: 7, category: "takilar", name: "Kalp Kolye", price: "169 TL", icon: "♡", description: "Sade kalp detaylı, günlük kullanıma uygun kolye." },
    { id: 8, category: "takilar", name: "Pastel Yüzük", price: "109 TL", icon: "○", description: "Pastel renkli, tatlı ve minimal yüzük." },
    { id: 9, category: "aksesuar", name: "Çiçekli Telefon Süsü", price: "89 TL", icon: "✿", description: "Telefonuna veya çantana takabileceğin el yapımı küçük aksesuar." },
    { id: 10, category: "susleme", name: "Mini Süsleme Paketi", price: "129 TL", icon: "✧", description: "Hobi ve hediye paketleri için kullanılabilecek pastel tonlarda mini süsleme seti." }
];

function renderProducts() {
    const list = document.getElementById("product-list");
    if (!list) return;

    list.className = "products-inner-grid";
    list.innerHTML = products.map(product => `
        <article class="product-card" data-category="${product.category}" data-id="${product.id}">
            <button class="product-click" onclick="openProduct(${product.id})" aria-label="${product.name} detaylarını aç">
                <div class="product-image"><span>${product.icon}</span></div>
                <div class="product-info">
                    <p class="product-category">${product.category}</p>
                    <h3>${product.name}</h3>
                    <strong>${product.price}</strong>
                    <span class="details-link">Detayları gör →</span>
                </div>
            </button>
        </article>
    `).join("");
}

function openProduct(id) {
    const product = products.find(item => item.id === id);
    const modal = document.getElementById("product-modal");
    const body = document.getElementById("modal-body");
    if (!product || !modal || !body) return;

    body.innerHTML = `
        <div class="modal-product">
            <div class="product-image large"><span>${product.icon}</span></div>
            <div>
                <p class="product-category">${product.category}</p>
                <h2>${product.name}</h2>
                <p class="modal-description">${product.description}</p>
                <strong class="modal-price">${product.price}</strong>
                <a href="order.html" class="button primary-button">Bu ürünü sipariş et →</a>
            </div>
        </div>
    `;

    modal.classList.add("show");
    modal.setAttribute("aria-hidden", "false");
}

function closeProduct() {
    const modal = document.getElementById("product-modal");
    if (!modal) return;
    modal.classList.remove("show");
    modal.setAttribute("aria-hidden", "true");
}

document.addEventListener("DOMContentLoaded", () => {
    renderProducts();

    const closeButton = document.getElementById("modal-close");
    const modal = document.getElementById("product-modal");

    if (closeButton) closeButton.addEventListener("click", closeProduct);
    if (modal) modal.addEventListener("click", event => {
        if (event.target === modal) closeProduct();
    });

    const orderForm = document.getElementById("order-form");
    if (orderForm) {
        orderForm.addEventListener("submit", event => {
            event.preventDefault();
            const message = document.getElementById("order-message");
            message.textContent = "Sipariş bilgileriniz alındı. Ödeme altyapısı henüz bağlanmadığı için bu aşamada gerçek ödeme alınmamaktadır.";
        });
    }
});
