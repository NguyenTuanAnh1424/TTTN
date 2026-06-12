// Hàm load các component (Header, Footer)
function loadComponent(elementId, filePath) {
    fetch(filePath)
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.text();
        })
        .then(html => {
            document.getElementById(elementId).innerHTML = html;
        })
        .catch(error => console.error('Error loading component:', error));
}

document.addEventListener("DOMContentLoaded", () => {
    // Tải Header và Footer
    loadComponent('header-placeholder', 'components/header.html');
    loadComponent('footer-placeholder', 'components/footer.html');

    // Chức năng Ẩn/Hiện mật khẩu cho nhiều ô input
    const togglePasswords = document.querySelectorAll(".toggle-pw");
    
    togglePasswords.forEach(icon => {
        icon.addEventListener("click", function () {
            // Tìm ô input nằm ngay trước icon
            const input = this.previousElementSibling;
            
            if (input) {
                const type = input.getAttribute("type") === "password" ? "text" : "password";
                input.setAttribute("type", type);
                
                // Đổi icon mắt
                this.classList.toggle("fa-eye");
                this.classList.toggle("fa-eye-slash");
            }
        });
    });
});