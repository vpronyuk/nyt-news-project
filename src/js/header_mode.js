const themeSwitcher = document.getElementById('theme-switch');
themeSwitcher.checked = false;
function clickHandler(){
    if(this.checked){
        document.body.classList.add('light'); 
        document.body.classList.remove('dark');
        localStorage.setItem('theme', 'light');

    } else {
        document.body.classList.remove('light');
        document.body.classList.add('dark');
        localStorage.setItem('theme', 'dark');

        
    }
}
themeSwitcher.addEventListener('click',clickHandler);