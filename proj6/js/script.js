$(document).ready(() => {
    $('.main_btna, .main_btn, a[href="#sheldure"]').on('click', () => {
        $('.overlay').fadeIn('slow');
        $('.modal').slideDown('slow');
    });

    $('.close').on('click', () => {
        $('.overlay').fadeOut('slow');
        $('.modal').slideUp('slow');
        
    });
});