document.addEventListener("DOMContentLoaded", function () {
    const homeContent = document.querySelector(".main-content");
    const view = document.querySelector("#view");
    const logo = document.querySelector(".logo[data-page='home']");
    const pageButtons = Array.from(document.querySelectorAll(".tab-btn[data-page]"));
    const extraCatalogBooks = [16, 17, 18, 19, 20];
    const reservationsStorageKey = "city-library-reservations";
    let scrollTopObserver = null;
    let selectedBookDetails = null;
    let reservations = loadReservations();
    let editingReservationId = null;

    const catalogFiltersHtml = `
        <section class="catalog-page">
            <div class="catalog-filters">
                <div class="search-input-wrap">
                    <span class="search-icon">⌕</span>
                    <input type="text" id="search-title" placeholder="За назвою...">
                </div>

                <select id="search-genre">
                    <option value="">жанр</option>
                    <option value="Роман">Роман</option>
                    <option value="Фантастика">Фантастика</option>
                    <option value="Детектив">Детектив</option>
                    <option value="Поезія">Поезія</option>
                </select>

                <select id="search-author">
                    <option value="">автор</option>
                    <option value="Шевченко">Шевченко</option>
                    <option value="Франко">Франко</option>
                    <option value="Коцюбинський">Коцюбинський</option>
                    <option value="Леся Українка">Леся Українка</option>
                </select>

                <select id="search-year">
                    <option value="">рік</option>
                    <option value="2024">2024</option>
                    <option value="2023">2023</option>
                    <option value="2022">2022</option>
                    <option value="2021">2021</option>
                </select>

                <select id="search-rating">
                    <option value="">рейтинг</option>
                    <option value="5">5</option>
                    <option value="4">4+</option>
                    <option value="3">3+</option>
                </select>

                <button id="catalog-search-btn" class="catalog-search-btn">Пошук</button>
            </div>

            <div id="catalog-results" class="catalog-results"></div>
        </section>
    `;

    const pages = {
        catalog: {
            title: "Каталог | City Library",
            html: `
${catalogFiltersHtml}

<div class="content-box">
                    <div class="books-slider">
                        <h2 class="slider-title">Найкращі книги 2025 року</h2>
                        <div class="slider-container">
                            <button class="slider-arrow left" id="prevBtn">
                                <img src="https://img.icons8.com/ios-filled/50/cccccc/less-than.png" alt="prev">
                            </button>
                            <div class="slider-viewport">
                                <div class="slider-track" id="sliderTrack">
                                    <img src="./assets/books/книга 1.png" alt="Книга 1">
                                    <img src="./assets/books/книга 2.png" alt="Книга 2">
                                    <img src="./assets/books/книга 3.png" alt="Книга 3">
                                    <img src="./assets/books/книга 4.png" alt="Книга 4">
                                    <img src="./assets/books/книга 5.png" alt="Книга 5">
                                    <img src="./assets/books/книга 6.png" alt="Книга 6">
                                    <img src="./assets/books/книга 7.png" alt="Книга 7">
                                    <img src="./assets/books/книга 8.png" alt="Книга 8">
                                </div>
                            </div>
                            <button class="slider-arrow right" id="nextBtn">
                                <img src="https://img.icons8.com/ios-filled/50/cccccc/more-than.png" alt="next">
                            </button>
                        </div>
                    </div>
                    <hr class="catalog-list-divider">
                    <div class="books-list" id="booksList">

    <div class="book-row">
        <img src="./assets/books/книга 9.png" alt="Книга 9" class="book-cover">
        <div class="book-info">
            <h3 class="book-title">Назва книги 9</h3>
            <p class="book-author">Автор книги 9</p>
            <p class="book-meta">2023 | Фентезі</p>
            <div class="book-rating">★★★☆☆</div>
        </div>
        <button class="book-details-btn">Деталі</button>
    </div>

    <div class="book-row">
        <img src="./assets/books/книга 10.png" alt="Книга 10" class="book-cover">
        <div class="book-info">
            <h3 class="book-title">Назва книги 10</h3>
            <p class="book-author">Автор книги 10</p>
            <p class="book-meta">2021 | Детектив</p>
            <div class="book-rating">★★★★☆</div>
        </div>
        <button class="book-details-btn">Деталі</button>
    </div>

    <div class="book-row">
        <img src="./assets/books/книга 11.png" alt="Книга 11" class="book-cover">
        <div class="book-info">
            <h3 class="book-title">Назва книги 11</h3>
            <p class="book-author">Автор книги 11</p>
            <p class="book-meta">2020 | Роман</p>
            <div class="book-rating">★★★★★</div>
        </div>
        <button class="book-details-btn">Деталі</button>
    </div>

    <div class="book-row">
        <img src="./assets/books/книга 12.png" alt="Книга 12" class="book-cover">
        <div class="book-info">
            <h3 class="book-title">Назва книги 12</h3>
            <p class="book-author">Автор книги 12</p>
            <p class="book-meta">2019 | Пригоди</p>
            <div class="book-rating">★★★☆☆</div>
        </div>
        <button class="book-details-btn">Деталі</button>
    </div>

    <div class="book-row">
        <img src="./assets/books/книга 13.png" alt="Книга 13" class="book-cover">
        <div class="book-info">
            <h3 class="book-title">Назва книги 13</h3>
            <p class="book-author">Автор книги 13</p>
            <p class="book-meta">2018 | Класика</p>
            <div class="book-rating">★★★★☆</div>
        </div>
        <button class="book-details-btn">Деталі</button>
    </div>

    <div class="book-row">
        <img src="./assets/books/книга 14.png" alt="Книга 14" class="book-cover">
        <div class="book-info">
            <h3 class="book-title">Назва книги 14</h3>
            <p class="book-author">Автор книги 14</p>
            <p class="book-meta">2022 | Фантастика</p>
            <div class="book-rating">★★★★★</div>
        </div>
        <button class="book-details-btn">Деталі</button>
    </div>

    <div class="book-row">
        <img src="./assets/books/книга 15.png" alt="Книга 15" class="book-cover">
        <div class="book-info">
            <h3 class="book-title">Назва книги 15</h3>
            <p class="book-author">Автор книги 15</p>
            <p class="book-meta">2017 | Драма</p>
            <div class="book-rating">★★☆☆☆</div>
        </div>
        <button class="book-details-btn">Деталі</button>
    </div>

</div>
<div class="show-more-wrap">
    <button type="button" class="show-more-books-btn" id="showMoreBooksBtn" aria-label="Показати ще книги">
        <span aria-hidden="true"></span>
    </button>
</div>
                </div>
                <button type="button" class="catalog-scroll-top" id="catalogScrollTop" aria-label="Прокрутити вгору">
                    <span aria-hidden="true"></span>
                </button>


            
            `
        },
        booking: {
            title: "Бронювання | City Library",
            render: function () {
                return renderReservationsPage();
            }
        },
        reserve: {
            title: "Резерв | City Library",
            render: function () {
                return renderReservePage(selectedBookDetails);
            }
        },
        details: {
            title: "Деталі | City Library",
            render: function () {
                return `
                ${catalogFiltersHtml}
                <section class="book-details-view">
                    <div class="content-box details-content-box">
                        ${renderBookDetails(selectedBookDetails)}
                    </div>
                    <button type="button" class="catalog-scroll-top" id="detailsScrollTop" aria-label="Прокрутити вгору">
                        <span aria-hidden="true"></span>
                    </button>
                    
                    
                </section>
            `;
            }
        }
    };


    function initSlider() {
        const track = document.getElementById('sliderTrack');
        const nextBtn = document.getElementById('nextBtn');
        const prevBtn = document.getElementById('prevBtn');

        if (!track || !nextBtn || !prevBtn) return; // Перевірка на наявність

        const visibleBooks = 3;
        const originalSlides = Array.from(track.children);
        const totalSlides = originalSlides.length;

        if (totalSlides <= visibleBooks) {
            return;
        }

        originalSlides.slice(-visibleBooks).reverse().forEach(function (slide) {
            track.insertBefore(slide.cloneNode(true), track.firstChild);
        });

        originalSlides.slice(0, visibleBooks).forEach(function (slide) {
            track.appendChild(slide.cloneNode(true));
        });

        let index = visibleBooks;
        let isMoving = false;
        const slideStyle = window.getComputedStyle(track);
        const gap = parseFloat(slideStyle.columnGap || slideStyle.gap) || 0;
        const bookWidth = originalSlides[0].getBoundingClientRect().width + gap;

        setSliderPosition(false);

        nextBtn.onclick = () => {
            moveSlider(index + 1);
        };

        prevBtn.onclick = () => {
            moveSlider(index - 1);
        };

        track.addEventListener("transitionend", function () {
            isMoving = false;

            if (index >= totalSlides + visibleBooks) {
                index = visibleBooks;
                setSliderPosition(false);
                return;
            }

            if (index < visibleBooks) {
                index = totalSlides + index;
                setSliderPosition(false);
            }
        });

        function moveSlider(nextIndex) {
            if (isMoving) {
                return;
            }

            isMoving = true;
            index = nextIndex;
            setSliderPosition(true);
        }

        function setSliderPosition(shouldAnimate) {
            track.style.transition = shouldAnimate ? "transform 0.5s ease-in-out" : "none";
            track.style.transform = `translateX(-${index * bookWidth}px)`;
        }
    }

    function initCatalogScrollTop() {
        const scrollTopButton = document.getElementById("catalogScrollTop");
        const showMoreArea = document.querySelector(".show-more-wrap");

        initScrollTopVisibility(scrollTopButton, showMoreArea);
    }

    function initDetailsScrollTop() {
        const scrollTopButton = document.getElementById("detailsScrollTop");
        const showMoreArea = document.querySelector(".reviews-more-btn");

        initScrollTopVisibility(scrollTopButton, showMoreArea);
    }

    function initScrollTopVisibility(scrollTopButton, triggerArea) {
        if (!scrollTopButton || !triggerArea) {
            return;
        }

        scrollTopButton.classList.remove("is-visible");
        disconnectScrollTopObserver();

        const triggerScrollY = Math.max(
            0,
            triggerArea.getBoundingClientRect().top + window.scrollY - window.innerHeight + triggerArea.offsetHeight
        );

        const updateScrollTopVisibility = function () {
            scrollTopButton.classList.toggle("is-visible", window.scrollY >= triggerScrollY);
        };

        window.addEventListener("scroll", updateScrollTopVisibility, { passive: true });

        scrollTopObserver = {
            disconnect: function () {
                window.removeEventListener("scroll", updateScrollTopVisibility);
            }
        };

        updateScrollTopVisibility();
    }

    function disconnectScrollTopObserver() {
        if (!scrollTopObserver) {
            return;
        }

        scrollTopObserver.disconnect();
        scrollTopObserver = null;
    }

    function showMoreBooks(button) {
        const booksList = document.getElementById("booksList");

        if (!booksList || button.dataset.opened === "true") {
            return;
        }

        booksList.insertAdjacentHTML("beforeend", extraCatalogBooks.map(createBookRow).join(""));
        button.dataset.opened = "true";
        button.hidden = true;
    }

    function createBookRow(bookNumber) {
        return `
            <div class="book-row">
                <img src="./assets/books/книга ${bookNumber}.png" alt="Книга ${bookNumber}" class="book-cover">
                <div class="book-info">
                    <h3 class="book-title">Назва книги ${bookNumber}</h3>
                    <p class="book-author">Автор книги ${bookNumber}</p>
                    <p class="book-meta">2024 | Жанр</p>
                    <div class="book-rating">☆☆☆☆☆</div>
                </div>
                <button class="book-details-btn" type="button">Деталі</button>
            </div>
        `;
    }

    function getBookDetailsFromButton(button) {
        const bookRow = button.closest(".book-row");

        if (!bookRow) {
            return null;
        }

        const cover = bookRow.querySelector(".book-cover");
        const title = bookRow.querySelector(".book-title");
        const author = bookRow.querySelector(".book-author");
        const meta = bookRow.querySelector(".book-meta");
        const rating = bookRow.querySelector(".book-rating");
        const metaParts = meta ? meta.textContent.split("|").map(function (item) {
            return item.trim();
        }) : [];

        return {
            coverSrc: cover ? cover.getAttribute("src") : "",
            coverAlt: cover ? cover.getAttribute("alt") : "",
            title: title ? title.textContent.trim() : "",
            author: author ? author.textContent.trim() : "",
            year: metaParts[0] || "",
            genre: metaParts[1] || "",
            rating: rating ? rating.textContent.trim() : ""
        };
    }

    function loadReservations() {
        try {
            const storedReservations = window.localStorage.getItem(reservationsStorageKey);
            const parsedReservations = storedReservations ? JSON.parse(storedReservations) : [];

            return Array.isArray(parsedReservations) ? parsedReservations : [];
        } catch (error) {
            return [];
        }
    }

    function saveReservations() {
        try {
            window.localStorage.setItem(reservationsStorageKey, JSON.stringify(reservations));
        } catch (error) {
            return;
        }
    }

    function createReservationId(book) {
        return [book.title, book.author, book.year].join("::");
    }

    function formatReservationDate(date) {
        return new Intl.DateTimeFormat("uk-UA", {
            day: "numeric",
            month: "long",
            year: "numeric"
        }).format(date);
    }

    function escapeHtml(value) {
        return String(value || "").replace(/[&<>"']/g, function (character) {
            const htmlEntities = {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                "\"": "&quot;",
                "'": "&#39;"
            };

            return htmlEntities[character];
        });
    }

    function storeReservation(form) {
        if (!selectedBookDetails || !selectedBookDetails.title) {
            openPage("catalog");
            return;
        }

        const formData = new FormData(form);
        const reservation = {
            id: createReservationId(selectedBookDetails),
            coverSrc: selectedBookDetails.coverSrc,
            coverAlt: selectedBookDetails.coverAlt,
            title: selectedBookDetails.title,
            author: selectedBookDetails.author,
            year: selectedBookDetails.year,
            genre: selectedBookDetails.genre,
            rating: selectedBookDetails.rating,
            name: String(formData.get("name") || "").trim(),
            phone: String(formData.get("phone") || "").trim(),
            reservedAt: formatReservationDate(new Date())
        };
        const existingReservationIndex = reservations.findIndex(function (item) {
            return item.id === reservation.id;
        });

        if (existingReservationIndex === -1) {
            reservations.unshift(reservation);
        } else {
            reservations[existingReservationIndex] = reservation;
        }

        saveReservations();
        openPage("booking");
    }

    function openBookingPage() {
        openPage("booking", true);
    }

    function deleteReservation(reservationId) {
        reservations = reservations.filter(function (item) {
            return item.id !== reservationId;
        });
        if (editingReservationId === reservationId) {
            editingReservationId = null;
        }
        saveReservations();
        openBookingPage();
    }

    function toggleReservationEdit(reservationId) {
        editingReservationId = editingReservationId === reservationId ? null : reservationId;
        openBookingPage();
    }

    function saveReservationEdit(row) {
        const reservationId = row.dataset.reservationId || "";
        const nameInput = row.querySelector(".booking-edit-name");
        const phoneInput = row.querySelector(".booking-edit-phone");
        const nextName = nameInput ? nameInput.value.trim() : "";
        const nextPhone = phoneInput ? phoneInput.value.trim() : "";

        if (!reservationId || !nextName || !nextPhone) {
            return;
        }

        reservations = reservations.map(function (item) {
            if (item.id !== reservationId) {
                return item;
            }

            return {
                id: item.id,
                coverSrc: item.coverSrc,
                coverAlt: item.coverAlt,
                title: item.title,
                author: item.author,
                year: item.year,
                genre: item.genre,
                rating: item.rating,
                name: nextName,
                phone: nextPhone,
                reservedAt: item.reservedAt
            };
        });

        editingReservationId = null;
        saveReservations();
        openBookingPage();
    }

    function renderBookDetails(book) {
        const currentBook = book || {
            coverSrc: "./assets/books/книга 9.png",
            coverAlt: "Книга",
            title: "",
            author: "",
            year: "",
            genre: "",
            rating: "☆☆☆☆☆"
        };

        return `
            <div class="details-layout">
                <img src="${currentBook.coverSrc}" alt="${currentBook.coverAlt}" class="details-book-cover">

                <div class="details-info">
                    ${renderDetailsField("Назва", currentBook.title)}
                    ${renderDetailsField("Автор", currentBook.author)}
                    ${renderDetailsField("Рік", currentBook.year)}
                    ${renderDetailsField("Жанр", currentBook.genre)}
                    <div class="details-field details-rating-row">
                        <span class="details-label">Загальна оцінка:</span>
                        <span class="details-stars">${renderRatingStars(currentBook.rating)}</span>
                    </div>
                </div>

                <button type="button" class="details-exit-btn" data-page="catalog">вихід</button>
            </div>

            <hr class="details-section-divider details-description-divider">
            <div class="header-op">
                    <p><strong>Опис:</strong> це блискуча і водночас болісна сповідь про золоту еру Голлівуду, де за розкішними сукнями та скандальними шлюбами ховається справжня драма всього життя. Книга полонить своєю кінематографічністю та щирістю: ви ніби заглядаєте крізь замкову щілину в душу легенди, яка нарешті наважилася зняти всі маски. Це історія про ціну успіху, складні компроміси та одне єдине кохання, яке довелося приховувати від усього світу. Вона читається на одному диханні та залишає після себе солодкий післясмак ностальгії та легкий смуток.</p>
            </div>
            <div class="details-extra">
                <hr class="details-section-divider">
                <h2 class="details-section-title">Статус</h2>

                <div class="status-row">
                    <p>Має 13 заброньованих місць з 20</p>
                    <div class="details-progress status-progress">
                        <span></span>
                    </div>
                </div>

                <div class="status-reserve-row">
                    <p>Вільний час для бронювання з 22 квітня</p>
                    <button type="button" class="details-reserve-btn">Резерв</button>
                </div>

                <hr class="details-section-divider reviews-divider">
                <h2 class="details-section-title">Відгуки</h2>

                <div class="reviews-summary">
                    <div class="reviews-average">
                        <div class="reviews-average-number">3.2</div>
                        <div class="reviews-average-stars">${renderRatingStars("★★★☆☆")}</div>
                        <div class="reviews-count">278 відгуків</div>
                    </div>

                    <div class="reviews-bars">
                        ${renderReviewBar("5", "28")}
                        ${renderReviewBar("4", "38")}
                        ${renderReviewBar("3", "65")}
                        ${renderReviewBar("2", "31")}
                        ${renderReviewBar("1", "7")}
                    </div>
                </div>

                <article class="review-card">
                    <div class="review-card-header">
                        <img src="./assets/profile%20icon.png" alt="Профіль користувача" class="review-avatar">
                        <div>
                            <div class="review-author">Олег мадрович</div>
                            <div class="review-meta">
                                <span class="review-stars">${renderRatingStars("★★★★☆")}</span>
                                <span>20 лютого 2021 року</span>
                            </div>
                        </div>
                    </div>
                    <p class="review-text">
                        Ця книга залишилася дуже сильним враженням. Сюжет захоплюється з перших сторінок і тримається в напруженні до самого кінця. Мені особливо сподобалася глибина персонажів - вони здаються живими, зі своїм власним досвідом та мотивацією...
                        <button type="button" class="review-expand-btn">Розгорнути</button>
                    </p>
                </article>

                <button type="button" class="reviews-more-btn show-more-books-btn" aria-label="Показати більше відгуків">
                    <span aria-hidden="true"></span>
                </button>
            </div>
        `;
    }

    function renderDetailsField(label, value) {
        return `
            <div class="details-field">
                <span class="details-label">${label}:</span>
                <span class="details-value">${value}</span>
            </div>
        `;
    }

    function renderRatingStars(rating) {
        const normalizedRating = (rating || "").padEnd(5, "☆").slice(0, 5);

        return normalizedRating.split("").map(function (star) {
            const starClass = star === "★" ? "is-filled" : "is-empty";
            return `<span class="${starClass}">★</span>`;
        }).join("");
    }

    function renderReviewBar(label, width) {
        return `
            <div class="review-bar-row">
                <span>${label}</span>
                <div class="details-progress review-progress">
                    <i style="width: ${width}%"></i>
                </div>
            </div>
        `;
    }

    function renderReservationsPage() {
        return `
            <section class="booking-box-view">
                <div class="content-box booking-content-box booking-list-content-box">
                    <h1>Мої бронювання</h1>
                    <p>Тут відображаються книги, які ви вже забронювали.</p>
                    ${reservations.length ? `
                        <div class="books-list booking-reservations-list">
                            ${reservations.map(renderReservationRow).join("")}
                        </div>
                    ` : `
                        <div class="booking-empty-state">У вас ще немає заброньованих книг.</div>
                    `}
                </div>
            </section>
        `;
    }

    function renderReservationRow(reservation) {
        const isEditing = editingReservationId === reservation.id;

        return `
            <div class="book-row booking-reservation-row" data-reservation-id="${escapeHtml(reservation.id)}">
                <img src="${escapeHtml(reservation.coverSrc)}" alt="${escapeHtml(reservation.coverAlt)}" class="book-cover">
                <div class="book-info">
                    <h3 class="book-title">${escapeHtml(reservation.title)}</h3>
                    <p class="book-author">${escapeHtml(reservation.author)}</p>
                    <p class="book-meta">${escapeHtml(reservation.year)} | ${escapeHtml(reservation.genre)}</p>
                    <div class="book-rating">${escapeHtml(reservation.rating)}</div>
                    <p class="booking-reserved-meta">Заброньовано: ${escapeHtml(reservation.reservedAt)}</p>
                    ${isEditing ? `
                        <div class="booking-edit-fields">
                            <input type="text" class="booking-edit-input booking-edit-name" value="${escapeHtml(reservation.name)}" placeholder="Ім'я">
                            <input type="tel" class="booking-edit-input booking-edit-phone" value="${escapeHtml(reservation.phone)}" placeholder="+380">
                        </div>
                    ` : `
                        <p class="booking-reserved-meta">Контакт: ${escapeHtml(reservation.name)}, ${escapeHtml(reservation.phone)}</p>
                    `}
                </div>
                <div class="booking-reservation-actions">
                    <button class="book-details-btn booking-action-btn" type="button">Деталі</button>
                    <div class="booking-action-row">
                        <button class="booking-edit-btn booking-action-btn" type="button">${isEditing ? "Зберегти" : "Редагувати"}</button>
                        <button class="booking-delete-btn booking-action-btn" type="button">Видалити</button>
                    </div>
                </div>
            </div>
        `;
    }

    function renderReservePage(book) {
        const hasBook = Boolean(book && book.title);
        const currentBook = hasBook ? book : {
            title: "Книгу не вибрано"
        };
        const exitPage = hasBook ? "details" : "catalog";

        return `
            ${catalogFiltersHtml}
            <section class="booking-box-view">
                <div class="content-box booking-content-box reserve-content-box">
                    <h1>Резерв книги</h1>
                    <p>Заповніть форму, щоб забронювати книгу та забрати її у зручний час.</p>

                    <form class="booking-form booking-box-form reserve-book-form">
                        <label>
                            Назва книги
                            <div class="booking-book-name">${escapeHtml(currentBook.title)}</div>
                        </label>

                        <label>
                            Ваше ім'я
                            <input type="text" name="name" placeholder="Введіть ім'я" required>
                        </label>

                        <label>
                            Телефон
                            <input type="tel" name="phone" placeholder="+380" required>
                        </label>

                        <div class="reserve-actions">
                            <button type="button" class="reserve-exit-btn" data-page="${exitPage}">вихід</button>
                            <button type="submit" class="reserve-submit-btn" ${hasBook ? "" : "disabled"}>Забронювати</button>
                        </div>
                    </form>
                </div>
            </section>
        `;
    }

    if (!homeContent || !view) {
        return;
    }

    view.addEventListener("submit", function (event) {
        const reserveForm = event.target.closest(".reserve-book-form");

        if (!reserveForm) {
            return;
        }

        event.preventDefault();
        storeReservation(reserveForm);
    });

    view.addEventListener("click", function (event) {
        const detailsButton = event.target.closest(".book-details-btn");
        const editButton = event.target.closest(".booking-edit-btn");
        const deleteButton = event.target.closest(".booking-delete-btn");
        const showMoreButton = event.target.closest("#showMoreBooksBtn");
        const scrollTopButton = event.target.closest("#catalogScrollTop, #detailsScrollTop");
        const reserveButton = event.target.closest(".details-reserve-btn");
        const reservationRow = event.target.closest(".booking-reservation-row");

        if (editButton && reservationRow) {
            event.preventDefault();

            if (editingReservationId === reservationRow.dataset.reservationId) {
                saveReservationEdit(reservationRow);
            } else {
                toggleReservationEdit(reservationRow.dataset.reservationId);
            }
            return;
        }

        if (deleteButton && reservationRow) {
            event.preventDefault();
            deleteReservation(reservationRow.dataset.reservationId);
            return;
        }

        if (detailsButton) {
            event.preventDefault();
            selectedBookDetails = getBookDetailsFromButton(detailsButton);
            openPage("details");
            return;
        }

        if (showMoreButton) {
            event.preventDefault();
            showMoreBooks(showMoreButton);
            return;
        }

        if (reserveButton) {
            event.preventDefault();
            openPage("reserve");
            return;
        }

        if (scrollTopButton) {
            event.preventDefault();
            scrollToCatalogTop();
        }
    });

    document.addEventListener("click", function (event) {
        const trigger = event.target.closest("[data-page]");

        if (!trigger) {
            return;
        }

        const pageName = trigger.dataset.page;

        if (pageName === "home" || pages[pageName]) {
            event.preventDefault();
            openPage(pageName);
        }
    });

    if (logo) {
        logo.setAttribute("role", "button");
        logo.setAttribute("tabindex", "0");
        logo.setAttribute("aria-label", "Повернутися на головне меню");

        logo.addEventListener("keydown", function (event) {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                openPage("home");
            }
        });
    }

    window.addEventListener("hashchange", openPageFromHash);
    openPageFromHash();

    function openPageFromHash() {
        const pageName = window.location.hash.replace("#", "");
        openPage(pages[pageName] ? pageName : "home", true);
    }

    function openPage(pageName, skipHashUpdate) {
        if (pageName === "home") {
            disconnectScrollTopObserver();
            homeContent.hidden = false;
            view.hidden = true;
            view.innerHTML = "";
            document.title = "City Library";
            updateActiveButton("home");

            if (!skipHashUpdate) {
                window.scrollTo({
                    top: 0,
                    behavior: "auto"
                });
            }

            if (!skipHashUpdate && window.location.hash) {
                history.pushState("", document.title, window.location.pathname + window.location.search);
            }

            return;
        }

        const page = pages[pageName];

        if (!page) {
            return;
        }

        homeContent.hidden = true;
        view.hidden = false;
        disconnectScrollTopObserver();
        view.innerHTML = typeof page.render === "function" ? page.render() : page.html;
        if (pageName === "catalog") {
            initSlider();
            initCatalogScrollTop();
        }
        if (pageName === "details") {
            initDetailsScrollTop();
        }
        document.title = page.title;
        updateActiveButton(pageName);

        if (!skipHashUpdate) {
            window.scrollTo({
                top: 0,
                behavior: "auto"
            });
        }

        if (!skipHashUpdate && window.location.hash !== "#" + pageName) {
            window.location.hash = pageName;
        }
    }

    function updateActiveButton(activePage) {
        const visibleActivePage = activePage === "details" || activePage === "reserve" ? "catalog" : activePage;

        pageButtons.forEach(function (button) {
            const isActive = button.dataset.page === visibleActivePage;
            button.classList.toggle("is-active", isActive);
            button.toggleAttribute("aria-current", isActive);
        });
    }

    function scrollToCatalogTop() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }
});
