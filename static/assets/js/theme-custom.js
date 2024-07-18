document.addEventListener('DOMContentLoaded', function () {
    const tabContainer = document.querySelector('.secondtabcontainer');
    const tabs = tabContainer.querySelectorAll('.tabbuttonsecond');
    const tabPanels = document.querySelectorAll('.tabpanelsecond');

    // Function to initialize Slick Carousel
    function initializeSlick(panelId) {
        const panel = document.getElementById(panelId);
        console.log("panel: " + panel)
        if (panel) {
            $(panel).slick('unslick');
            $.HSCore.components.HSSlickCarousel.init('#' + panelId);
        }
    }

    // Function to handle tab change
    function handleTabChange(clickedTab) {
        // Hide all tab panels
        tabPanels.forEach(panel => panel.hidden = true);
        // Mark all tabs as unselected
        tabs.forEach(tab => tab.setAttribute('aria-selected', 'false'));

        // Show the selected tab panel
        const panelId = clickedTab.getAttribute('aria-controls');
        const panel = document.getElementById(panelId);
        if (!panel) {
            return;
        }
        panel.hidden = false;
        // Mark the clicked tab as selected
        clickedTab.setAttribute('aria-selected', 'true');

        // Initialize slick carousel for the shown panel if visible
        initializeSlick(panelId);
    }

    // Event listener for tab click
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            handleTabChange(tab);
        });
    });

    /* // Initialize slick carousel for all initially visible tab panels on page load
    tabPanels.forEach(panel => {
        console.log("Initializing")
        if (!panel.hidden) {
            console.log("final initial")
            const panelId = panel.getAttribute('id');
            initializeSlick(panelId);
        }
    }); */
});






document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.category-group').forEach(categoryGroup => {
        const Ctabs = categoryGroup.querySelectorAll('.Ctab');
        const CtabPanels = categoryGroup.querySelectorAll('.Ctab-panel');

        Ctabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const panelId = tab.getAttribute('aria-controls');
                const panel = categoryGroup.querySelector(`#${panelId}`);

                if (panel) {
                    CtabPanels.forEach(p => {
                        if (p.id === panelId) {
                            p.removeAttribute('hidden');
                            p.setAttribute('aria-hidden', 'false');
                        } else {
                            p.setAttribute('hidden', 'true');
                            p.setAttribute('aria-hidden', 'true');
                        }
                    });

                    Ctabs.forEach(t => {
                        if (t === tab) {
                            t.setAttribute('aria-selected', 'true');
                        } else {
                            t.setAttribute('aria-selected', 'false');
                        }
                    });
                } else {
                    console.error('Panel not found:', panelId);
                }
            });
        });
    });
});











document.addEventListener('DOMContentLoaded', function () {
    const allContainers = document.querySelectorAll('.featured_category');
    allContainers.forEach((allContainer) => {
        const tabContainers = allContainer.querySelector('.thirdtabcontainer');
        const tabs = tabContainers.querySelectorAll('.tabbuttonthird');
        const tabPanels = allContainer.querySelectorAll('.tabpanelthird');

        
        // Function to initialize Slick Carousel
        function initializeSlick(panelId) {
            const panel = allContainer.querySelector(`#${panelId}`);
            console.log("panel: " + panel)
            if (panel) {
                $(panel).slick('unslick');
                $.HSCore.components.HSSlickCarousel.init('#' + panelId);
            }
        }

        // Function to handle tab change
        function handleTabChange(clickedTab) {
            // Hide all tab panels
            tabPanels.forEach(panel => panel.hidden = true);
            // Mark all tabs as unselected
            tabs.forEach(tab => tab.setAttribute('aria-selected', 'false'));

            // Show the selected tab panel
            const panelId = clickedTab.getAttribute('aria-controls');
            const panel = allContainer.querySelector(`#${panelId}`);
            if (!panel) {
                return;
            }
            panel.hidden = false;
            // Mark the clicked tab as selected
            clickedTab.setAttribute('aria-selected', 'true');

            // Initialize slick carousel for the shown panel if visible
            initializeSlick(panelId);
        }

        // Event listener for tab click
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                handleTabChange(tab);
            });
        });
    })

    

    const searchInput = document.getElementById("searchProduct");
    const searchICO = document.getElementById("searchProduct1");
    const searchResult = document.getElementById("searchResult");

    if (searchInput) {
        searchInput.addEventListener("input", function(event) {
            const q = event.target.value.trim();
            const formData = new FormData();
            formData.append('q', q);

            if (q.length > 0) {
                $.ajax({
                    type: 'POST',
                    url: '/nav-search/',
                    data: formData,
                    processData: false,
                    contentType: false,
                    beforeSend: function(xhr, settings) {
                        xhr.setRequestHeader('X-CSRFToken', getCookie("csrftoken"));
                    },
                    success: function(response) {
                        searchResult.innerHTML = '';
                        if (response.query_list && response.query_list.length > 0) {
                            response.query_list.forEach((query) => {
                                const div = document.createElement('div');
                                div.textContent = query.title;
                                div.addEventListener('click', () => {
                                    window.location.href = `/${encodeURIComponent(query.meta_title)}`;
                                });
                                searchResult.appendChild(div);
                            });
                            searchResult.style.display = "block";
                        } else {
                            searchResult.style.display = "none";
                        }
                    },
                    error: function(error) {
                        console.error('Error filtering products:', error);
                    }
                });
            } else {
                searchResult.style.display = "none";
            }
        });

        searchInput.addEventListener("keyup", function(event) {
            if (event.key === 'Enter') {
                const q = event.target.value.trim();
                if (q !== '') {
                    window.location.href = `/shop?q=${encodeURIComponent(q)}`;
                }
            }
        });

        document.addEventListener("keyup", function(event) {
            if (event.key === 'Escape') {
                resetSearch();
            }
        });

        document.body.addEventListener("click", function(event) {
            if (!event.target.closest('.js-focus-state')) {
                resetSearch();
            }
        });

        function resetSearch() {
            searchInput.value = '';
            searchResult.style.display = 'none';
        }
    }

    if (searchICO) {
        searchICO.addEventListener("click", function(event) {
            const q = searchInput.value.trim();
            if (q !== '') {
                window.location.href = `/catalog?q=${encodeURIComponent(q)}`;
            }
        });
    }


    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
});