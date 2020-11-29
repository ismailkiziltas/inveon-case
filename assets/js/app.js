"use strict";

var mobile = "1024";
var desktop = "1025";

var template = `
    <a href="#" class="product-item">
        <div class="product-image">
            <img src="https://picsum.photos/seed/picsum/500/500" alt="Product">
        </div>
        <div class="product-content">
            <div class="product-title">Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet consectetur adipisicing elit. </div>
            <div class="product-price-row">
                <div class="product-discount-price">
                    %20
                </div>
                <div class="product-price">
                    <s>249,00 TL</s>
                    <strong>169,00 TL</strong>
                </div>
            </div>
        </div>
    </a>
`;

var templateExtra = `
    <a href="#" class="product-item">
        <div class="product-image">
            <img src="https://picsum.photos/seed/picsum/500/500" alt="Product">
        </div>
        <div class="product-content">
            <div class="product-title">Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet consectetur adipisicing elit. </div>
            <div class="product-price-row">
                <div class="product-discount-price">
                    %20
                </div>
                <div class="product-price">
                    <s>249,00 TL</s>
                    <strong>169,00 TL</strong>
                </div>
            </div>
        </div>
        <div class="product-extra-price">
            <div>Sepette %<b>12</b> indirimli fiyat</div>
            <strong>171,51</strong><small>TL</small>
        </div>
        <div class="product-label">Süper Hızlı</div>
    </a>
`;

function products() {
    for (var i = 1; i <= 15; i++) {
        if (i % 2 == 0) document.querySelector('.products').innerHTML += template;
        else document.querySelector('.products').innerHTML += templateExtra;
    }
}

function pagination() {
    for (var i = 1; i <= 7; i++) {
        if (i == 1) {
            document.getElementById('pagination').innerHTML += `
                <div>
                    <button type="button" class="paginate-button active">${i}</button>
                </div>
            `;
        } else {
            document.getElementById('pagination').innerHTML += `
                <div>
                    <button type="button" class="paginate-button">${i}</button>
                </div>
            `;
        }
    }
}

function changeProductsGrid(item) {
    document.querySelectorAll('.products .product-item').forEach(function (product) {
        product.style.flex = `0 0 calc(100% / ${Number(item.getAttribute('data-show-columns'))})`;
    });
}

function isShow(isMobile, isDesktop, item) {
    if (isMobile && isDesktop === 'notDesktop') item.classList.remove('none');
    else if (!isMobile && isDesktop === 'notDesktop') item.classList.add('none');

    if (isMobile === 'notMobile' && isDesktop) item.classList.remove('none');
    else if (isMobile === 'notMobile' && !isDesktop) item.classList.add('none');
}

function mobileDesktopCheck() {
    var isMobile = window.matchMedia(`(max-width: ${mobile}px)`).matches;
    var isDesktop = window.matchMedia(`(min-width: ${desktop}px)`).matches;

    isShow(isMobile, 'notDesktop', document.getElementById('menu-button'));
    isShow(isMobile, 'notDesktop', document.getElementById('close-menu-button'));
    isShow('notMobile', isDesktop, document.querySelector('[data-selector="change-grid"]'));
}

function getCategories() {
    $.ajax({
        dataType: "json",
        url: '/categories.json',
        success: function (response) {
            response.forEach(function (item) {
                $('[data-selector="categories-list"]').append(`
                    <li class="categories-item">
                        <a href="#" class="categories-link">
                            ${item.name}
                            <span>(${item.count})</span>
                        </a>
                    </li>
                `);
            });
        }
    });
}

document.addEventListener('DOMContentLoaded', function () {
    products();
    pagination();
    mobileDesktopCheck();
    getCategories();
});

window.addEventListener("resize", function () {
    mobileDesktopCheck();
});

document.getElementById('menu-button').addEventListener('click', function () {
    document.body.classList.add('mobile-categories-active');
});

document.getElementById('close-menu-button').addEventListener('click', function () {
    document.body.classList.remove('mobile-categories-active');
});

document.querySelectorAll('[data-selector="view-button"]').forEach(function (item) {
    item.addEventListener('click', function () {

        document.querySelectorAll('[data-selector="view-button"]').forEach(function(button){
            button.classList.remove('active');
        });

        this.classList.add('active');
        changeProductsGrid(item);
    });
});