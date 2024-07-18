

document.addEventListener('DOMContentLoaded', function () {

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