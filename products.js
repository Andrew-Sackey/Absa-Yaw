// products.js - Standalone Products Section JavaScript
console.log('📦 Loading products.js...');

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 DOM Ready - Initializing Products...');
    
    // Small delay to ensure all other scripts have loaded
    setTimeout(initializeProducts, 200);
});

function initializeProducts() {
    console.log('🔧 Starting products initialization...');
    
    // Product data
    const productData = {
        1: {
            title: "Professional Knapsack Sprayer",
            category: "Knapsack Sprayers",
            description: "High-capacity, durable sprayer with ergonomic design for efficient pesticide application. Features adjustable nozzle, comfortable straps, and easy-to-clean components.",
            features: ["20L Capacity", "Durable", "Ergonomic Design", "Adjustable Nozzle"],
            price: "₵35.00",
            originalPrice: "₵42.00",
            image: "./images/knap.png"
        },
        2: {
            title: "Advanced Weedicide X",
            category: "Weedicides",
            description: "Powerful broad-spectrum herbicide for effective weed control in all crop types. Fast-acting formula with eco-safe ingredients for sustainable farming.",
            features: ["Fast Acting", "Eco-Safe", "Broad Spectrum", "All Crops"],
            price: "₵15.00",
            image: "./images/w0.jpeg"
        },
        3: {
            title: "GreenShield Pesticide Pro",
            category: "Pesticides",
            description: "Advanced protection formula for comprehensive crop defense against pests and diseases. Long-lasting protection with multi-pest control capabilities.",
            features: ["Long-lasting", "Multi-pest", "Advanced Formula", "Crop Defense"],
            price: "₵18.00",
            image: "./images/w4.png"
        },
        4: {
            title: "Premium Maize Seeds",
            category: "Seeds",
            description: "High-yield maize variety with excellent drought resistance and pest tolerance. Specially selected for optimal growth in various climatic conditions.",
            features: ["High Yield", "Drought Resistant", "Pest Tolerant", "Climate Adaptive"],
            price: "₵12.00",
            image: "./images/w14.jpeg"
        },
        5: {
            title: "Precision Sprayer Nozzle Kit",
            category: "Knapsack Sprayers",
            description: "Complete nozzle set for precise application and reduced chemical waste. Includes 5 different nozzle types for various spraying needs.",
            features: ["5-Piece Set", "Precision", "Waste Reduction", "Versatile"],
            price: "₵8.99",
            image: "./images/S4.jpeg"
        },
        6: {
            title: "Mobile Power Sprayer",
            category: "Knapsack Sprayers",
            description: "Battery-powered sprayer for efficient coverage of large agricultural areas. Lightweight design with long battery life and powerful motor.",
            features: ["Battery Powered", "Mobile", "Long Battery Life", "Powerful Motor"],
            price: "₵85.00",
            originalPrice: "₵95.00",
            image: "./images/S5.jpeg"
        },
        7: {
            title: "Organic Maize Seeds",
            category: "Seeds",
            description: "Certified organic cashew seeds for sustainable and profitable farming. High-quality seeds with excellent germination rates.",
            features: ["Certified Organic", "High Quality", "Sustainable", "High Germination"],
            price: "₵9.50",
            image: "./images/w8.jpeg"
        },
        8: {
            title: "Powerful weedicide",
            category: "weedicides",
            description: "Powerful weedicide that is strong enough to burn all weeds in less than 3 day. Lightweight design with high power output.",
            features: ["High Power", "Lightweight", "Versatile Use", "Efficient"],
            price: "₵65.75",
            image: "./images/w16.jpeg"
        },
        9: {
            title: "Premium Organic Fertilizer",
            category: "Fertilizers",
            description: "100% organic fertilizer for sustainable soil enrichment and crop nutrition. Enriches soil naturally while promoting healthy plant growth.",
            features: ["100% Organic", "Soil Enriching", "Natural", "Eco-Friendly"],
            price: "₵25.00",
            image: "./images/w15.jpeg"
        },
        10: {
            title: "InsectGuard Pro",
            category: "Pesticides",
            description: "Advanced broad-spectrum insecticide for comprehensive pest management. Professional-grade formula for maximum effectiveness.",
            features: ["Broad Spectrum", "Professional", "Maximum Effectiveness", "Advanced Formula"],
            price: "₵20.00",
            image: "./images/w3.jpeg"
        },
        11: {
            title: "Effective Fertilizer",
            category: "Fertilizers",
            description: "Elite fertilizer for maximum yield and superior quality harvest. Premium genetic selection for optimal results.",
            features: ["Elite Variety", "Organic", "Maximum Yield", "Superior Quality"],
            price: "₵19.99",
            image: "./images/w6.jpeg"
        },
        12: {
            title: "Compact Knapsack Sprayer",
            category: "Knapsack Sprayers",
            description: "Lightweight and durable sprayer perfect for small to medium farming operations. Compact design with professional performance.",
            features: ["Lightweight", "Compact", "Durable", "Professional"],
            price: "₵28.00",
            originalPrice: "₵32.00",
            image: "./images/R7.jpeg"
        }
    };

    // Initialize components
    setupFilters();
    setupQuickView();
    setupBuyButtons();
    setupLoadMore();
    
    console.log('✅ Products initialization complete!');

    // Filter functionality
    function setupFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const productCards = document.querySelectorAll('.product-card');

        console.log(`🔍 Found ${filterButtons.length} filter buttons and ${productCards.length} product cards`);

        if (filterButtons.length === 0) {
            console.error('❌ No filter buttons found!');
            return;
        }

        filterButtons.forEach((button) => {
            const category = button.getAttribute('data-category');
            console.log(`🏷️ Setting up filter: ${category}`);
            
            button.addEventListener('click', function(e) {
                e.preventDefault();
                console.log(`🎯 Filter clicked: ${category}`);

                // Update active state
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');

                // Filter products
                filterProducts(category);
            });
        });

        function filterProducts(category) {
            console.log(`🔄 Filtering for: ${category}`);
            
            productCards.forEach((card) => {
                const cardCategory = card.getAttribute('data-category');
                const shouldShow = category === 'all' || cardCategory === category;

                if (shouldShow) {
                    card.style.display = 'block';
                    card.classList.remove('hidden');
                    card.classList.add('visible');
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                        card.classList.add('hidden');
                        card.classList.remove('visible');
                    }, 300);
                }
            });
        }
    }

    // Quick View Modal
    function setupQuickView() {
        const modal = document.getElementById('quickViewModal');
        const quickViewButtons = document.querySelectorAll('.quick-view-btn');
        const closeButton = document.getElementById('modalClose');
        const overlay = document.getElementById('modalOverlay');

        console.log(`👁️ Found ${quickViewButtons.length} quick view buttons`);

        if (!modal) {
            console.error('❌ Quick view modal not found!');
            return;
        }

        // Setup quick view buttons
        quickViewButtons.forEach((button) => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const productId = this.getAttribute('data-product');
                console.log(`👁️ Opening quick view for product: ${productId}`);
                
                showQuickView(productId);
            });
        });

        // Setup close handlers
        if (closeButton) {
            closeButton.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('❌ Closing modal via close button');
                hideQuickView();
            });
        }

        if (overlay) {
            overlay.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('❌ Closing modal via overlay');
                hideQuickView();
            });
        }

        // Escape key handler
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                console.log('⌨️ Closing modal via Escape key');
                hideQuickView();
            }
        });

        function showQuickView(productId) {
            const product = productData[productId];
            if (!product) {
                console.error(`❌ Product ${productId} not found!`);
                return;
            }

            console.log('📦 Loading product:', product.title);

            // Update modal content
            const modalImage = document.getElementById('modalProductImage');
            const modalCategory = document.getElementById('modalCategory');
            const modalTitle = document.getElementById('modalTitle');
            const modalDescription = document.getElementById('modalDescription');
            const modalFeatures = document.getElementById('modalFeatures');
            const modalPrice = document.getElementById('modalPrice');
            const modalBuyBtn = document.getElementById('modalBuyBtn');

            if (modalImage) modalImage.src = product.image;
            if (modalCategory) modalCategory.textContent = product.category;
            if (modalTitle) modalTitle.textContent = product.title;
            if (modalDescription) modalDescription.textContent = product.description;
            
            if (modalFeatures) {
                modalFeatures.innerHTML = product.features
                    .map(feature => `<span class="feature-tag">${feature}</span>`)
                    .join('');
            }

            if (modalPrice) {
                if (product.originalPrice) {
                    modalPrice.innerHTML = `
                        <span class="current-price">${product.price}</span>
                        <span class="original-price">${product.originalPrice}</span>
                    `;
                } else {
                    modalPrice.innerHTML = `<span class="current-price">${product.price}</span>`;
                }
            }

            if (modalBuyBtn) {
                modalBuyBtn.setAttribute('data-product-id', productId);
                modalBuyBtn.setAttribute('data-price', product.price.replace('$', ''));
                modalBuyBtn.setAttribute('data-title', product.title);
            }

            // Show modal
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
            console.log('✅ Modal opened successfully');
        }

        function hideQuickView() {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
            console.log('✅ Modal closed');
        }
    }

    // Buy buttons
    function setupBuyButtons() {
        console.log('💳 Setting up buy buttons...');
        
        document.addEventListener('click', function(e) {
            const buyButton = e.target.closest('.buy-btn') || e.target.closest('.modal-buy-btn');
            
            if (buyButton) {
                e.preventDefault();
                console.log('💳 Buy button clicked');
                
                const productId = buyButton.getAttribute('data-product-id');
                const price = buyButton.getAttribute('data-price');
                const title = buyButton.getAttribute('data-title');
                
                processPurchase(productId, price, title, buyButton);
            }
        });

        function processPurchase(productId, price, title, button) {
            console.log('💰 Processing purchase:', { productId, price, title });
            
            const originalText = button.innerHTML;
            button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
            button.disabled = true;

            // Simulate processing
            setTimeout(() => {
                button.innerHTML = '<i class="fas fa-check"></i> Success!';
                button.style.background = 'linear-gradient(135deg, #10b981, #059669)';
                
                // Show notification
                console.log(`✅ Purchase successful: ${title}`);
                
                // Reset button
                setTimeout(() => {
                    button.innerHTML = originalText;
                    button.disabled = false;
                    button.style.background = '';
                }, 3000);
                
            }, 2000);
        }
    }

    // Load more
    function setupLoadMore() {
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        
        console.log('📊 Setting up load more button...');
        
        if (!loadMoreBtn) {
            console.error('❌ Load more button not found!');
            return;
        }

        const hiddenCards = document.querySelectorAll('.product-card.hidden');
        console.log(`👻 Found ${hiddenCards.length} hidden cards`);

        if (hiddenCards.length === 0) {
            loadMoreBtn.style.display = 'none';
            console.log('ℹ️ No hidden cards - hiding load more button');
            return;
        }

        loadMoreBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('📊 Load more clicked');
            
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
            this.disabled = true;

            setTimeout(() => {
                const currentHiddenCards = document.querySelectorAll('.product-card.hidden');
                console.log(`📦 Showing ${currentHiddenCards.length} cards`);
                
                currentHiddenCards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.remove('hidden');
                        card.classList.add('visible');
                        card.style.display = 'block';
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, index * 100);
                });

                setTimeout(() => {
                    loadMoreBtn.style.display = 'none';
                    console.log('✅ All products loaded');
                }, 1000);

            }, 1000);
        });
    }
}