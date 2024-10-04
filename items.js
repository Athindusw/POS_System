let cart = [];
let items = {
    chicken_burger: { name: 'Turkey Burger', price: 1600, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQy3HcObPBzWp91SlLFxP02-Ifg--VOHr4SQw&s' },
    beef_burger: { name: 'Shawarma Burger', price: 800, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyAzTF78mJqP2DJB_Tln1Ns3coU7lbcmc_uw&s' },
    fries: { name: 'Paneer Burger', price: 900, image: 'https://www.dishbyrish.co.uk/wp-content/uploads/2023/08/DSC00019-720x720.jpg' },
    soda: { name: 'Bacon Burgers', price: 650, image: 'https://www.tastesoflizzyt.com/wp-content/uploads/2019/06/bacon-cheeseburger-4.jpg' },
    soda1: { name: 'Olive Burgers', price: 1800, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKudj0zwNRE4njYSd-BQG8x2j0eXPF1MiERA&s' }
};

function populateMenuItems() {
    const itemSelect = document.getElementById('item-name');
    itemSelect.innerHTML = ''; // Clear previous options
    for (let key in items) {
        const option = document.createElement('option');
        option.value = key;
        option.textContent = items[key].name;
        itemSelect.appendChild(option);
    }
}

function renderManagedItems() {
    const itemsListEl = document.getElementById('items-list');
    itemsListEl.innerHTML = ''; // Clear previous items

    for (let key in items) {
        const li = document.createElement('li');
        li.textContent = `${items[key].name} - ${items[key].price} LKR`;
        itemsListEl.appendChild(li);
    }
}

function addNewItem() {
    const newItemName = document.getElementById('new-item-name').value;
    const newItemPrice = parseFloat(document.getElementById('new-item-price').value);

    if (newItemName && newItemPrice > 0) {
        const newItemKey = newItemName.toLowerCase().replace(/\s+/g, '_');
        items[newItemKey] = { name: newItemName, price: newItemPrice, image: 'https://via.placeholder.com/50?text=' + newItemName.replace(/\s+/g, '+') };

        populateMenuItems(); // Update the select options in the order form
        renderManagedItems(); // Update the items in the managed items section

        document.getElementById('new-item-name').value = '';
        document.getElementById('new-item-price').value = '';
    } else {
        alert('Please enter a valid item name and price.');
    }
}

function addItemToCart() {
    const itemName = document.getElementById('item-name').value;
    const quantity = parseInt(document.getElementById('quantity').value);
    const discount = parseInt(document.getElementById('discount').value) || 0;

    const item = items[itemName];
    const discountedPrice = item.price - (item.price * discount / 100);
    const cartItem = {
        name: item.name,
        quantity,
        price: discountedPrice * quantity,
        image: item.image
    };

    cart.push(cartItem);
    renderCart();
}

function renderCart() {
    const cartItemsEl = document.getElementById('cart-items');
    cartItemsEl.innerHTML = '';

    let totalAmount = 0;
    cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <div class="cart-item-info">
                <img src="${item.image}" alt="${item.name}">
                <span>${item.name}</span>
            </div>
            <span>Quantity: ${item.quantity}</span>
            <span>${item.price} LKR</span>
            <button onclick="removeItem(${index})">Delete</button>
        `;
        totalAmount += item.price;
        cartItemsEl.appendChild(li);
    });

    document.getElementById('total-amount').textContent = totalAmount;
}

function removeItem(index) {
    cart.splice(index, 1);
    renderCart();
}

function generateReceipt() {
    const doc = new jspdf.jsPDF();
    let y = 20;

    doc.text("MOS Burgers Receipt", 20, y);
    y += 10;

    cart.forEach(item => {
        doc.text(`${item.name} - ${item.quantity} x ${item.price/item.quantity} LKR = ${item.price} LKR`, 20, y);
        y += 10;
    });

    doc.text(`Total: ${document.getElementById('total-amount').textContent} LKR`, 20, y + 10);
    doc.save('receipt.pdf');
}

function generateReport() {
    const doc = new jspdf.jsPDF();
    doc.text("Monthly Report", 20, 20);
    doc.text(`Total Sales: ${document.getElementById('total-amount').textContent} LKR`, 20, 30);
    doc.save('monthly_report.pdf');
}

populateMenuItems(); // Initialize the select options in the order form
renderManagedItems(); // Display the initial managed items
