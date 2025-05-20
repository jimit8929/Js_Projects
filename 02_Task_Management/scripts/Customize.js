export{};

// Dark Mode and Customization
document.addEventListener('DOMContentLoaded', () => {
    const customizeModal = document.getElementById('customizeModal');
    const darkModeToggle = document.getElementById('darkModeToggle');
    
    const themeManager = {
        init() {
            this.applyTheme(localStorage.getItem('theme') || 'light');
            this.setupEventListeners();
        },
        
        setupEventListeners() {
            document.querySelector('[aria-label="Customize"]').addEventListener('click', () => {
                customizeModal.classList.toggle('hidden');
            });
            
            document.getElementById('closeCustomizeModal').addEventListener('click', () => 
                customizeModal.classList.add('hidden'));
            
            customizeModal.addEventListener('click', e => {
                if(e.target === customizeModal) customizeModal.classList.add('hidden');
            });
            
            darkModeToggle.addEventListener('change', e => this.toggleTheme(e.target.checked));
            
            document.getElementById('resetBtn').addEventListener('click', () => this.resetTheme());
        },
        
        applyTheme(theme) {
            document.documentElement.classList.toggle('dark', theme === 'dark');
            darkModeToggle.checked = theme === 'dark';
        },
        
        toggleTheme(isDark) {
            const theme = isDark ? 'dark' : 'light';
            localStorage.setItem('theme', theme);
            this.applyTheme(theme);
        },
        
        resetTheme() {
            if(confirm("Reset to default theme?")) {
                localStorage.removeItem('theme');
                this.applyTheme('light');
                customizeModal.classList.add('hidden');
            }
        }
    };

    themeManager.init();
});