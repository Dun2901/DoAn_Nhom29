// Cuộn lên đầu trang trước khi tải lại
window.addEventListener('beforeunload', function () {
    window.scrollTo(0, 0);
});


// Get references to the menu elements
const menuIcon = document.getElementById("menu_icon");
const navList = document.querySelector(".nav_list");

// Add a click event listener to the menu icon
menuIcon.addEventListener("click", (e) => {
    // Toggle the "open" class on the navList
    navList.classList.toggle("open");

    // Ngăn chặn sự kiện mặc định (cuộn lên đầu trang)
    e.preventDefault();
});





// Function to toggle the dropdown menu
function toggleDropdown() {
    var dropdown = document.getElementById("mobileDropdown");
    dropdown.classList.toggle("show");
}


const productsPerPage = 36; // Số sản phẩm trên mỗi trang
let currentPage = 1; // Trang hiện tại

// Kiểm tra xem trang đã được tải lại hay chưa
const isReloaded = localStorage.getItem('isReloaded');
if (!isReloaded) {
    // Nếu trang chưa được tải lại, đặt trang hiện tại thành 1 và đánh dấu đã tải lại
    currentPage = 1;
    localStorage.setItem('isReloaded', 'true');
} else {
    // Nếu trang đã được tải lại, đặt trang hiện tại thành 1 và đánh dấu đã tải lại
    currentPage = 1;
    localStorage.removeItem('currentPage');
    localStorage.setItem('isReloaded', 'true');
}

fetch('products.json')
    .then(response => response.json())
    .then(data => {
        // Tạo mảng sản phẩm phân trang
        const paginatedProducts = paginate(data, productsPerPage);

        // Hiển thị sản phẩm trên trang đầu tiên
        displayPage(paginatedProducts, currentPage);

        // Tạo nút phân trang
        createPagination(paginatedProducts);

        // Xử lý khi người dùng chuyển trang
        document.getElementById('pagination').addEventListener('click', (e) => {
            if (e.target.classList.contains('page-link')) {
                currentPage = parseInt(e.target.getAttribute('data-page'));

                // Lưu trạng thái trang hiện tại vào localStorage
                localStorage.setItem('currentPage', currentPage);

                // Xóa lớp "current-page" từ tất cả các nút phân trang
                const pageLinks = document.querySelectorAll('.page-link');
                pageLinks.forEach(link => link.classList.remove('current-page'));

                displayPage(paginatedProducts, currentPage);
                e.target.classList.add('current-page'); // Thêm lớp "current-page" cho nút phân trang của trang hiện tại
                scrollToTop(); // Cuộn lên đầu trang sau khi chuyển trang
            }
        });

        // Cuộn lên đầu trang sau khi tải lại
        scrollToTop();
    })
    .catch(error => console.error('Error loading JSON: ', error));

// Hàm phân trang
function paginate(data, itemsPerPage) {
    const numberOfPages = Math.ceil(data.length / itemsPerPage);
    const paginatedData = [];

    for (let i = 0; i < numberOfPages; i++) {
        const start = i * itemsPerPage;
        const end = start + itemsPerPage;
        paginatedData.push(data.slice(start, end));
    }
    return paginatedData;
}

// Hàm hiển thị sản phẩm trên trang cụ thể
function displayPage(paginatedData, page) {
    const products = paginatedData[page - 1];
    let data1 = "";

    if (products) {
        products.map((product) => {
            const { title, name, price, img } = product;
            data1 += `
                <div class="pro">
                    <img src=${img} alt="img">
                    <div class="des">
                        <span>${title}</span>
                        <h5>${name}</h5>
                        <div class="star">
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                        </div>
                        <h4>${price}</h4>
                    </div>
                    <a href="#"><i class="fa-solid fa-cart-shopping cart"></i></a>
                </div>
            `;
        });
    }
    document.querySelector("#product-container").innerHTML = data1;
}

// Hàm tạo nút phân trang
function createPagination(paginatedData) {
    const numberOfPages = paginatedData.length;
    let paginationHTML = '';

    for (let i = 1; i <= numberOfPages; i++) {
        paginationHTML += `<a class="page-link" data-page="${i}">${i}</a>`;
    }

    document.getElementById('pagination').innerHTML = paginationHTML;
}

// Hàm cuộn lên đầu trang
function scrollToTop() {
    window.scrollTo(0, 0);
}




// js for login
const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});






// Đọc dữ liệu từ file JSON
// fetch('products.json')
//     .then(response => response.json())
//     .then(data => {
//         // console.log(data)
//         let data1 = "";
//         data.map((product) => {
//             const {title, name, price, img} = product
//             data1 += `
//              <div class="pro">
//                 <img src=${img} alt="img">
//                 <div class="des">
//                     <span>${title}</span>
//                     <h5>${name}</h5>
//                     <div class="star">
//                         <i class="fa-solid fa-star"></i>
//                         <i class="fa-solid fa-star"></i>
//                         <i class="fa-solid fa-star"></i>
//                         <i class="fa-solid fa-star"></i>
//                         <i class="fa-solid fa-star"></i>
//                     </div>
//                     <h4>${price}</h4>
//                 </div>
//                 <a href="#"><i class="fa-solid fa-cart-shopping cart"></i></a>
//             </div>
//             `;
//         })
//         document.querySelector(".pro-container").innerHTML = data1;
//
//     })
//     .catch(error => console.error('Error loading JSON: ', error));
