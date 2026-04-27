document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const searchInput = document.getElementById('search-input');
    const autocompleteDropdown = document.getElementById('autocomplete-dropdown');
    const bossGrid = document.getElementById('boss-grid');
    const itemsGrid = document.getElementById('items-grid');
    const bossView = document.getElementById('boss-view');
    const itemsView = document.getElementById('item-results');
    const clearSearchBtn = document.getElementById('clear-search');
    const classFilters = document.querySelectorAll('input[name="class"]');
    
    // Modals
    const itemModal = document.getElementById('item-modal');
    const bossModal = document.getElementById('boss-modal');
    const closeButtons = document.querySelectorAll('.close-modal');

    // State
    let currentFilter = 'All';
    let currentSearch = '';

    // Initialize
    renderBosses();

    // --- Search & Autocomplete ---
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        currentSearch = query;
        
        if (query.length < 2) {
            autocompleteDropdown.classList.add('hidden');
            if (query.length === 0) {
                showBossView();
            }
            return;
        }

        // Filter items
        const matches = allItems.filter(item => {
            const matchesQuery = item.name.toLowerCase().includes(query);
            const matchesFilter = currentFilter === 'All' || item.classes.some(c => c.includes(currentFilter)) || item.classes.includes('All Classes');
            return matchesQuery && matchesFilter;
        });
        
        if (matches.length > 0) {
            renderAutocomplete(matches, query);
            autocompleteDropdown.classList.remove('hidden');
        } else {
            autocompleteDropdown.classList.add('hidden');
        }
    });

    // Close autocomplete when clicking outside
    document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && !autocompleteDropdown.contains(e.target)) {
            autocompleteDropdown.classList.add('hidden');
        }
    });

    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            autocompleteDropdown.classList.add('hidden');
            if (currentSearch.length >= 2) {
                performSearch(currentSearch);
            }
        }
    });

    clearSearchBtn.addEventListener('click', () => {
        searchInput.value = '';
        currentSearch = '';
        autocompleteDropdown.classList.add('hidden');
        showBossView();
    });

    // --- Filters ---
    classFilters.forEach(radio => {
        radio.addEventListener('change', (e) => {
            currentFilter = e.target.value;
            if (currentSearch.length >= 2) {
                performSearch(currentSearch);
            } else {
                renderBosses();
            }
        });
    });

    // --- Rendering Functions ---

    function renderAutocomplete(matches, query) {
        autocompleteDropdown.innerHTML = '';
        matches.slice(0, 8).forEach(item => {
            const div = document.createElement('div');
            div.className = 'p-3 hover:bg-white/5 cursor-pointer border-b border-white/5 last:border-0 flex items-center justify-between transition-colors';
            
            // Highlight match
            const regex = new RegExp(`(${query})`, 'gi');
            const highlightedName = item.name.replace(regex, '<span class="text-brand-gold font-bold">$1</span>');
            
            let classColor = 'text-gray-400';
            if(item.classes.includes('Mythic Uniques')) classColor = 'text-[#c16bff]';

            div.innerHTML = `
                <span class="text-white">${highlightedName}</span>
                <span class="text-xs ${classColor}">${item.classes.join(', ')}</span>
            `;
            
            div.addEventListener('click', () => {
                searchInput.value = item.name;
                currentSearch = item.name;
                autocompleteDropdown.classList.add('hidden');
                performSearch(item.name);
            });
            
            autocompleteDropdown.appendChild(div);
        });
    }

    function performSearch(query) {
        const matches = allItems.filter(item => {
            const matchesQuery = item.name.toLowerCase().includes(query.toLowerCase());
            const matchesFilter = currentFilter === 'All' || item.classes.some(c => c.includes(currentFilter)) || item.classes.includes('All Classes');
            return matchesQuery && matchesFilter;
        });

        renderItems(matches);
        bossView.classList.add('hidden');
        itemsView.classList.remove('hidden');
    }

    function showBossView() {
        bossView.classList.remove('hidden');
        itemsView.classList.add('hidden');
        renderBosses();
    }

    function renderItems(items) {
        itemsGrid.innerHTML = '';
        if (items.length === 0) {
            itemsGrid.innerHTML = `
                <div class="col-span-full py-12 text-center text-gray-500">
                    <svg class="w-12 h-12 mx-auto mb-3 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <p>No items found matching your criteria.</p>
                </div>
            `;
            return;
        }

        items.forEach(item => {
            const card = document.createElement('div');
            const isMythic = item.classes.includes('Mythic Uniques');
            card.className = `bg-brand-card p-5 rounded-xl card-hover cursor-pointer flex flex-col justify-between h-full relative overflow-hidden group`;
            
            let classTags = item.classes.map(c => {
                let colorClass = 'bg-white/5 text-gray-400';
                if(c === 'Mythic Uniques') colorClass = 'bg-[#c16bff]/20 text-[#c16bff] border border-[#c16bff]/30';
                return `<span class="px-2 py-0.5 rounded text-xs ${colorClass}">${c}</span>`;
            }).join(' ');

            card.innerHTML = `
                <div class="absolute -right-6 -top-6 w-24 h-24 bg-brand-gold/10 rounded-full blur-xl group-hover:bg-brand-gold/20 transition-all"></div>
                <div class="relative z-10">
                    <h3 class="text-lg font-bold ${isMythic ? 'text-[#c16bff]' : 'text-brand-gold'} mb-2">${item.name}</h3>
                    <div class="flex flex-wrap gap-1.5 mb-4">${classTags}</div>
                </div>
                <div class="relative z-10 mt-auto border-t border-white/5 pt-3">
                    <p class="text-sm text-gray-400 flex items-start gap-1.5">
                        <svg class="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
                        <span class="line-clamp-2">Dropped by: <span class="text-gray-300">${item.bosses.map(b => b.name).join(', ')}</span></span>
                    </p>
                </div>
            `;

            card.addEventListener('click', () => openItemModal(item));
            itemsGrid.appendChild(card);
        });
    }

    function renderBosses() {
        bossGrid.innerHTML = '';
        
        let displayBosses = lootData.bosses;
        
        displayBosses.forEach(boss => {
            const card = document.createElement('div');
            card.className = `bg-brand-card rounded-xl boss-card-hover cursor-pointer flex flex-col h-full overflow-hidden relative group`;
            
            card.innerHTML = `
                <div class="h-2 w-full bg-gradient-to-r from-brand-red to-[#5a1111]"></div>
                <div class="p-6 flex-grow flex flex-col">
                    <div class="flex justify-between items-start mb-3">
                        <h3 class="text-xl font-bold text-white group-hover:text-brand-red transition-colors">${boss.name}</h3>
                    </div>
                    
                    <div class="space-y-3 mb-5 flex-grow text-sm">
                        <div class="flex items-start gap-2">
                            <svg class="w-4 h-4 text-brand-gold mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
                            <span class="text-gray-300 line-clamp-2" title="${boss.summon}">${boss.summon}</span>
                        </div>
                        <div class="flex items-start gap-2">
                            <svg class="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                            <span class="text-gray-400">${boss.location}</span>
                        </div>
                    </div>

                    <div class="pt-4 border-t border-white/5 flex items-center justify-between">
                        <span class="text-xs font-medium bg-white/5 px-2 py-1 rounded text-gray-400">${boss.difficulty}</span>
                        <span class="text-xs font-medium text-brand-red flex items-center gap-1">
                            View Loot <svg class="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                        </span>
                    </div>
                </div>
            `;

            card.addEventListener('click', () => openBossModal(boss));
            bossGrid.appendChild(card);
        });
    }

    // --- Modals Logic ---

    function openItemModal(item) {
        document.getElementById('modal-item-name').textContent = item.name;
        
        const isMythic = item.classes.includes('Mythic Uniques');
        if (isMythic) {
            document.getElementById('modal-item-name').className = "text-2xl font-bold text-[#c16bff] mb-1 drop-shadow-[0_0_8px_rgba(193,107,255,0.4)]";
        } else {
            document.getElementById('modal-item-name').className = "text-2xl font-bold text-brand-gold mb-1";
        }

        document.getElementById('modal-item-classes').textContent = item.classes.join(', ');

        const bossesContainer = document.getElementById('modal-item-bosses');
        bossesContainer.innerHTML = '';

        item.bosses.forEach(boss => {
            const div = document.createElement('div');
            div.className = 'bg-brand-card p-4 rounded-xl border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer hover:border-brand-red/50 transition-colors';
            div.innerHTML = `
                <div>
                    <h4 class="text-lg font-bold text-white">${boss.name}</h4>
                    <p class="text-sm text-gray-400 mt-1 flex items-center gap-1.5">
                        <svg class="w-4 h-4 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
                        ${boss.summon}
                    </p>
                </div>
                <div class="text-right flex-shrink-0">
                    <span class="text-xs bg-white/5 px-2 py-1 rounded text-gray-300 block mb-1">${boss.location}</span>
                    <span class="text-xs text-brand-red">${boss.difficulty}</span>
                </div>
            `;
            
            // Allow clicking boss in item modal to switch to boss modal
            div.addEventListener('click', () => {
                closeModal(itemModal);
                setTimeout(() => openBossModal(boss), 300);
            });

            bossesContainer.appendChild(div);
        });

        itemModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function openBossModal(boss) {
        document.getElementById('modal-boss-name').textContent = boss.name;
        document.getElementById('modal-boss-diff').textContent = boss.difficulty;
        document.getElementById('modal-boss-elem').textContent = boss.element + ' Damage';
        document.getElementById('modal-boss-summon').textContent = boss.summon;
        document.getElementById('modal-boss-location').textContent = boss.location;
        
        const cosmeticContainer = document.getElementById('modal-boss-cosmetic-container');
        if (boss.cosmetic) {
            document.getElementById('modal-boss-cosmetic').textContent = boss.cosmetic;
            cosmeticContainer.classList.remove('hidden');
        } else {
            cosmeticContainer.classList.add('hidden');
        }

        const lootContainer = document.getElementById('modal-boss-loot');
        lootContainer.innerHTML = '';

        Object.entries(boss.loot).forEach(([className, items]) => {
            if (currentFilter !== 'All' && !className.includes(currentFilter) && className !== 'All Classes' && className !== 'Mythic Uniques') {
                return;
            }

            const group = document.createElement('div');
            let colorClass = 'text-brand-gold';
            if(className === 'Mythic Uniques') colorClass = 'text-[#c16bff]';

            group.innerHTML = `
                <h5 class="text-sm uppercase font-bold ${colorClass} mb-3 border-b border-white/5 pb-1">${className}</h5>
                <ul class="space-y-1.5">
                    ${items.map(item => `
                        <li class="text-gray-300 text-sm flex items-center gap-2 hover:text-white cursor-pointer transition-colors item-link" data-item="${item}">
                            <span class="w-1.5 h-1.5 rounded-full bg-white/20 block"></span>
                            ${item}
                        </li>
                    `).join('')}
                </ul>
            `;
            lootContainer.appendChild(group);
        });

        // Add listeners to items in boss modal to open item modal
        lootContainer.querySelectorAll('.item-link').forEach(el => {
            el.addEventListener('click', (e) => {
                const itemName = e.currentTarget.getAttribute('data-item');
                const itemData = allItems.find(i => i.name === itemName);
                if (itemData) {
                    closeModal(bossModal);
                    setTimeout(() => openItemModal(itemData), 300);
                }
            });
        });

        bossModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal(modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    closeButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const modal = e.target.closest('.modal-overlay');
            if (modal) closeModal(modal);
        });
    });

    // Close modal on outside click
    document.querySelectorAll('.modal-overlay').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modal);
            }
        });
    });
    
    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal-overlay.active').forEach(modal => {
                closeModal(modal);
            });
        }
    });

});
