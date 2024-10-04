document.addEventListener("DOMContentLoaded", () => {
    const foodContainer = document.getElementById("food-container");
    const categoryNameElement = document.getElementById("category-name");

    // Get category ID from query string
    const urlParams = new URLSearchParams(window.location.search);
    const categoryId = parseInt(urlParams.get('category'));

    // Find the correct category from the foods array
    const category = foods.find(food => food.id === categoryId);

    if (category && category.items && category.items.length > 0) {
        // Set the category name as a heading
        categoryNameElement.textContent = category.name;

        // Clear the food container before rendering
        foodContainer.innerHTML = "";

        // Render each subcategory/item within the selected category
        let itemsHTML = ''; // Accumulate HTML for items

        category.items.forEach(item => {
            // Create a card for each subcategory/item using template literals
            itemsHTML += `
                <div class="card">
                    <img src="${item.imgSrc}" alt="${item.name}">
                    <div class="card-content">
                        <h3>${item.name}</h3>
                        <p>${item.description}</p>
                        <p class="price">Price: LKR ${item.price.toFixed(2)}</p>
                        <a href="cart.html">
                        <button class="enabled-btn">Add to Cart</button>
                        </a>
                    </div>
                </div>
            `;
        });

        // Set the accumulated item HTML into the container using innerHTML
        foodContainer.innerHTML = itemsHTML;
    } else {
        // If no items found, show a message indicating no subcategories are available
        categoryNameElement.textContent = "No Items Found";
        foodContainer.innerHTML = `<p>No items found for this category.</p>`;
    }
});
