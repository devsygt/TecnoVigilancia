// Lapse Time for the first Carousel
$('.carousel').carousel({
  interval: 4000//Four second
})
// Second Carousel Details
var owl = $('.owl-carousel');
owl.owlCarousel({
    //Count Providers slider
    items:7,
    loop:true,
    margin:50,
    autoplay:true,
    autoplayTimeout:5000,
    autoplayHoverPause:true,
    responsiveClass:true,
    // Second Slider Responsive for devices sizes
    responsive:{
        0:{
            items:2,
            nav:true
        },
        509:{
            items:3,
            nav:false
        },
        768:{
            items:4,
            nav:false
        },
        992:{
            items:5,
            nav:false
        },
        1200:{
            items:7,
            nav:false
        }
    }
});

// $('.play').on('click',function(){
//     owl.trigger('play.owl.autoplay',[1000])
// })
// $('.stop').on('click',function(){
//     owl.trigger('stop.owl.autoplay')
// })
