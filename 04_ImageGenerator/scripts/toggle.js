const themetoggle = document.querySelector('.theme-toggle');


(()=>{
    const savedTheme = localStorage.getItem('theme');
    const systemPreferDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    const isDarkTheme = savedTheme === 'dark' || (!savedTheme && systemPreferDark);
    document.body.classList.toggle('dark-theme', isDarkTheme);
    themetoggle.querySelector("i").className = isDarkTheme ? "fa-solid fa-sun" : "fa-solid fa-moon";
})();

if (themetoggle) {
    const toggletheme = () => {
        const isDarkTheme = document.body.classList.toggle('dark-theme');
        localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');
        themetoggle.querySelector("i").className = isDarkTheme ? "fa-solid fa-sun" : "fa-solid fa-moon";
    }

    themetoggle.addEventListener("click" , toggletheme);
}