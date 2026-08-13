/**
 * Nap_game.js - Core JavaScript logic for MYE Game Top-up Portal
 */

document.addEventListener('DOMContentLoaded', () => {
    // =========================================================================
    // STATE MANAGEMENT
    // =========================================================================
    const state = {
        user: {
            isLoggedIn: true,
            username: "myepro123",
            userId: "12233548",
            balance: 1200
        },
        currentGame: null,
        selectedCategory: "ALL",
        searchQuery: "",
        selectedPayment: {
            name: "Thanh toán trực tiếp",
            icon: "../images/MyE_Coin/Hinh_thuc_nap/Thanh_toan_truc_tiep.png"
        },
        selectedPackage: {
            id: "500_mye",
            name: "500 MYE COIN",
            coins: 500,
            price: "500.000 VNĐ",
            priceVal: 500000
        },
        transactions: []
    };

    // Payment icon mapping helper
    const paymentIcons = {
        "Thanh toán trực tiếp": "../images/MyE_Coin/Hinh_thuc_nap/Thanh_toan_truc_tiep.png",
        "ZaloPay": "../images/MyE_Coin/Hinh_thuc_nap/ZaloPay.png",
        "MoMo": "../images/MyE_Coin/Hinh_thuc_nap/MOMO.png",
        "ATM/Banking": "../images/MyE_Coin/Hinh_thuc_nap/ATM.png",
        "Visa/Master": "../images/MyE_Coin/Hinh_thuc_nap/Visa.png",
        "Tài khoản định danh (Bank-VA)": "../images/MyE_Coin/Hinh_thuc_nap/Tai_khoan_dinh_danh.png",
        "Tài khoản định danh": "../images/MyE_Coin/Hinh_thuc_nap/Tai_khoan_dinh_danh.png",
        "QR-Code": "../images/MyE_Coin/Hinh_thuc_nap/icon_qr.png"
    };

    // =========================================================================
    // GAME DATA
    // =========================================================================
    const gamesList = [
        {
            id: 'mye_coin',
            name: 'NẠP MYE COIN',
            category: 'ALL',
            image: '../images/Nap_Game/DS-game_nap/MYECOIN.png',
            isSpecial: true
        },
        {
            id: 'hao_khi_chien_hon',
            name: 'Hào Khí Chiến Hồn',
            category: 'RPG',
            image: '../images/Nap_Game/DS-game_nap/CARD(1).png',
            badge: '../images/Tai_khoan/20%.png'
        },
        {
            id: 'vuong_gia_vinh_dieu',
            name: 'Vương Giả Vinh Diệu',
            category: 'ACTION',
            image: '../images/Nap_Game/DS-game_nap/CARD(2).png'
        },
        {
            id: 'than_thoai_mo_phong',
            name: 'Mô Phỏng Thần Thoại',
            category: 'SIMULATION',
            image: '../images/Nap_Game/DS-game_nap/CARD(3).png'
        },
        {
            id: 'dot_kich_di_dong',
            name: 'Đột Kích Di Động',
            category: 'SHOOTING',
            image: '../images/Nap_Game/DS-game_nap/CARD(4).png'
        },
        {
            id: 'long_vu_truyen_ky',
            name: 'Long Vũ Truyền Kỳ',
            category: 'RPG',
            image: '../images/Nap_Game/DS-game_nap/CARD(1).png'
        },
        {
            id: 'tuan_phong_toc_do',
            name: 'Tuần Phong Tốc Độ',
            category: 'RACING',
            image: '../images/Nap_Game/DS-game_nap/CARD(2).png'
        },
        {
            id: 'chien_than_xuat_the',
            name: 'Chiến Thần Xuất Thế',
            category: 'ACTION',
            image: '../images/Nap_Game/DS-game_nap/CARD(3).png'
        },
        {
            id: 'sieu_cap_xa_thu',
            name: 'Siêu Cấp Xạ Thủ',
            category: 'SHOOTING',
            image: '../images/Nap_Game/DS-game_nap/CARD(4).png'
        },
        {
            id: 'mong_ao_tu_tien',
            name: 'Mộng Ảo Tu Tiên',
            category: 'RPG',
            image: '../images/Nap_Game/DS-game_nap/CARD(1).png'
        }
    ];

    // =========================================================================
    // DOM ELEMENTS
    // =========================================================================
    const views = {
        gameList: document.getElementById('view-game-list'),
        topupDetail: document.getElementById('view-topup-detail'),
        transactionConfirm: document.getElementById('view-transaction-confirm')
    };

    const header = {
        loginBtn: document.getElementById('header-login-btn'),
        userMenu: document.getElementById('header-user-menu'),
        username: document.getElementById('header-username'),
        balance: document.getElementById('header-balance'),
        logoutBtn: document.getElementById('logout-btn'),
        historyMenuBtn: document.getElementById('history-menu-btn')
    };

    const searchInput = document.getElementById('game-search');
    const gamesGrid = document.getElementById('games-grid');
    const filterPills = document.querySelectorAll('.filter-pill');

    const panelUsername = document.getElementById('panel-username');
    const panelUserId = document.getElementById('panel-userid');
    const profileBalanceVal = document.getElementById('profile-balance-val');
    const detailBreadcrumb = document.getElementById('detail-breadcrumb');

    const confirmBreadcrumb = document.getElementById('confirm-breadcrumb');
    const confirmUsername = document.getElementById('confirm-username');
    const confirmUserid = document.getElementById('confirm-userid');
    const confirmCoins = document.getElementById('confirm-coins');
    const confirmPaymentIcon = document.getElementById('confirm-payment-icon');
    const confirmPaymentMethod = document.getElementById('confirm-payment-method');
    const confirmTotalPrice = document.getElementById('confirm-total-price');
    const btnPaymentConfirm = document.getElementById('btn-payment-confirm');
    const btnConfirmHistory = document.getElementById('btn-confirm-history');

    const btnBannerHistory = document.getElementById('btn-banner-history');

    const successModalEl = document.getElementById('successModal');
    let successModalInstance = null;
    if (successModalEl && typeof bootstrap !== 'undefined') {
        successModalInstance = new bootstrap.Modal(successModalEl);
    }

    // =========================================================================
    // INITIALIZATION & EVENT LISTENERS
    // =========================================================================
    function init() {
        updateUserInfoUI();
        renderGames();
        setupEventListeners();
        updateCategoryCounts();
    }

    function updateUserInfoUI() {
        if (state.user.isLoggedIn) {
            header.loginBtn?.classList.add('d-none');
            header.userMenu?.classList.remove('d-none');
            if (header.username) header.username.textContent = state.user.username;
            if (header.balance) header.balance.textContent = state.user.balance.toLocaleString('vi-VN');
            
            if (panelUsername) panelUsername.textContent = state.user.username;
            if (panelUserId) panelUserId.textContent = state.user.userId;
            if (profileBalanceVal) {
                profileBalanceVal.innerHTML = `${state.user.balance.toLocaleString('vi-VN')} <img src="../images/MyE_Coin/coin_M.png" class="coin-icon" alt="coin">`;
            }

            if (confirmUsername) confirmUsername.textContent = state.user.username;
            if (confirmUserid) confirmUserid.textContent = state.user.userId;
        } else {
            header.loginBtn?.classList.remove('d-none');
            header.userMenu?.classList.add('d-none');
        }
    }

    function updateCategoryCounts() {
        filterPills.forEach(pill => {
            const cat = pill.getAttribute('data-category');
            const countSpan = pill.querySelector('.count');
            if (!countSpan) return;

            if (cat === 'ALL') {
                countSpan.textContent = gamesList.length;
            } else {
                const count = gamesList.filter(g => g.category === cat).length;
                countSpan.textContent = count;
            }
        });
    }

    function renderGames() {
        if (!gamesGrid) return;
        gamesGrid.innerHTML = '';

        const filtered = gamesList.filter(game => {
            const matchesCat = (state.selectedCategory === 'ALL') || (game.category === state.selectedCategory);
            const matchesSearch = game.name.toLowerCase().includes(state.searchQuery.toLowerCase());
            return matchesCat && matchesSearch;
        });

        if (filtered.length === 0) {
            gamesGrid.innerHTML = `
                <div class="col-12 text-center py-5">
                    <i class="fa-solid fa-gamepad text-secondary fs-1 mb-3"></i>
                    <p class="text-secondary fw-bold">Không tìm thấy trò chơi phù hợp</p>
                </div>
            `;
            return;
        }

        filtered.forEach(game => {
            const col = document.createElement('div');
            col.className = 'col-6 col-md-4 col-lg-2-4';
            
            const badgeHtml = game.badge ? `<div class="game-card-badge"><img src="${game.badge}" alt="Badge"></div>` : '';
            const specialClass = game.isSpecial ? 'special-card' : '';

            col.innerHTML = `
                <div class="game-card ${specialClass}" data-game-id="${game.id}">
                    <div class="game-card-img-wrapper">
                        ${badgeHtml}
                        <img src="${game.image}" class="game-card-img" alt="${game.name}">
                    </div>
                    <div class="game-card-name">${game.name}</div>
                </div>
            `;

            col.querySelector('.game-card').addEventListener('click', () => {
                selectGameAndNavigate(game);
            });

            gamesGrid.appendChild(col);
        });
    }

    // Navigating between views
    function switchView(targetView) {
        Object.values(views).forEach(v => v?.classList.add('d-none'));
        targetView?.classList.remove('d-none');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function selectGameAndNavigate(game) {
        state.currentGame = game;
        
        // Update breadcrumb
        if (detailBreadcrumb) {
            detailBreadcrumb.innerHTML = ` <span class="text-secondary">/</span> <span class="active-crumb">${game.name}</span>`;
        }

        switchView(views.topupDetail);
    }

    function setupEventListeners() {
        // Search & Filter
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                state.searchQuery = e.target.value;
                renderGames();
            });
        }

        filterPills.forEach(pill => {
            pill.addEventListener('click', () => {
                filterPills.forEach(p => p.classList.remove('active'));
                pill.classList.add('active');
                state.selectedCategory = pill.getAttribute('data-category') || 'ALL';
                renderGames();
            });
        });

        // Breadcrumb home links
        document.querySelectorAll('.breadcrumb-home-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                switchView(views.gameList);
            });
        });

        // Payment Method Selection
        const paymentCards = document.querySelectorAll('.payment-card');
        paymentCards.forEach(card => {
            card.addEventListener('click', () => {
                paymentCards.forEach(c => c.classList.remove('active'));
                card.classList.add('active');

                const method = card.getAttribute('data-method') || '';
                state.selectedPayment.name = method;
                state.selectedPayment.icon = paymentIcons[method] || '../images/MyE_Coin/Hinh_thuc_nap/MOMO.png';
            });
        });

        // Package Selection (Buy Button or Card)
        document.body.addEventListener('click', (e) => {
            const buyBtn = e.target.closest('.btn-buy-package');
            if (buyBtn) {
                const packageCard = buyBtn.closest('.package-card');
                if (packageCard) {
                    processPackageSelection(packageCard);
                }
            }
        });

        // Confirm Payment Action
        if (btnPaymentConfirm) {
            btnPaymentConfirm.addEventListener('click', () => {
                executePayment();
            });
        }

        // Auth Mock
        if (header.loginBtn) {
            header.loginBtn.addEventListener('click', () => {
                state.user.isLoggedIn = true;
                updateUserInfoUI();
                alert("Đăng nhập thành công!");
            });
        }

        if (header.logoutBtn) {
            header.logoutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                state.user.isLoggedIn = false;
                updateUserInfoUI();
                alert("Đã đăng xuất tài khoản.");
            });
        }

        // History Modals / Alerts
        const historyBtns = [header.historyMenuBtn, btnBannerHistory, btnConfirmHistory];
        historyBtns.forEach(btn => {
            if (btn) {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    showTransactionHistory();
                });
            }
        });
    }

    function processPackageSelection(cardEl) {
        state.selectedPackage = {
            id: cardEl.getAttribute('data-package-id') || '',
            name: cardEl.getAttribute('data-package-name') || '',
            coins: parseInt(cardEl.getAttribute('data-coins') || '0', 10),
            price: cardEl.getAttribute('data-price') || '',
            priceVal: parseInt(cardEl.getAttribute('data-price-val') || '0', 10)
        };

        // Populate View 3 Confirmation Data
        if (confirmCoins) confirmCoins.textContent = state.selectedPackage.coins.toLocaleString('vi-VN');
        if (confirmTotalPrice) confirmTotalPrice.textContent = state.selectedPackage.price;
        if (confirmPaymentMethod) confirmPaymentMethod.textContent = state.selectedPayment.name;
        if (confirmPaymentIcon) confirmPaymentIcon.src = state.selectedPayment.icon;

        const gameName = state.currentGame ? state.currentGame.name : "Nạp Game";
        if (confirmBreadcrumb) {
            confirmBreadcrumb.innerHTML = ` <span class="text-secondary">/</span> <a href="#" class="breadcrumb-game-link">${gameName}</a> <span class="text-secondary">/</span> <span class="active-crumb">Xác nhận thanh toán</span>`;
            confirmBreadcrumb.querySelector('.breadcrumb-game-link')?.addEventListener('click', (e) => {
                e.preventDefault();
                switchView(views.topupDetail);
            });
        }

        switchView(views.transactionConfirm);
    }

    function executePayment() {
        if (!state.user.isLoggedIn) {
            alert("Vui lòng đăng nhập để hoàn tất giao dịch.");
            return;
        }

        // Add coins to balance
        state.user.balance += state.selectedPackage.coins;
        updateUserInfoUI();

        // Record history
        state.transactions.unshift({
            id: 'TX' + Math.floor(100000 + Math.random() * 900000),
            time: new Date().toLocaleString('vi-VN'),
            packageName: state.selectedPackage.name,
            coins: state.selectedPackage.coins,
            price: state.selectedPackage.price,
            method: state.selectedPayment.name,
            game: state.currentGame ? state.currentGame.name : "MYE COIN"
        });

        // Update Modal elements
        const modalPkg = document.getElementById('success-modal-package');
        const modalPrice = document.getElementById('success-modal-price');
        const modalMethod = document.getElementById('success-modal-method');

        if (modalPkg) modalPkg.textContent = state.selectedPackage.name;
        if (modalPrice) modalPrice.textContent = state.selectedPackage.price;
        if (modalMethod) modalMethod.textContent = state.selectedPayment.name;

        // Show Bootstrap Modal
        if (successModalEl) {
            if (!successModalInstance && typeof bootstrap !== 'undefined') {
                successModalInstance = new bootstrap.Modal(successModalEl);
            }
            successModalInstance?.show();
        } else {
            alert(`Giao dịch thành công! Đã nạp ${state.selectedPackage.name}`);
        }
    }

    function showTransactionHistory() {
        if (state.transactions.length === 0) {
            alert("Bạn chưa có lịch sử giao dịch nào.");
            return;
        }

        let historyMsg = "LỊCH SỬ GIAO DỊCH GẦN ĐÂY:\n\n";
        state.transactions.forEach((tx, idx) => {
            historyMsg += `${idx + 1}. [${tx.id}] ${tx.game}\n   - Gói: ${tx.packageName}\n   - Số tiền: ${tx.price}\n   - Hình thức: ${tx.method}\n   - Thời gian: ${tx.time}\n\n`;
        });

        alert(historyMsg);
    }

    // Run Initialization
    init();
});
