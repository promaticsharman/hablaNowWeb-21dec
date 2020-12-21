<script type="text/javascript" src="js/jquery-2.2.3.min.js"></script>
<script type="text/javascript" src="js/popper.js"></script> <!-- Necessary-JavaScript-File-For-Bootstrap --> 
<script type="text/javascript" src="js/bootstrap.js"></script> <!-- Necessary-JavaScript-File-For-Bootstrap --> 

<script type="text/javascript" src="js/owl.carousel.js"></script>
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@9"></script>

<script src="js/moment.js"></script>
<script src="https://unpkg.com/gijgo@1.9.13/js/gijgo.min.js" type="text/javascript"></script>
<script src="js/bootstrap-select.js"></script>

<!-- datatable -->
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.36/pdfmake.min.js"></script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.36/vfs_fonts.js"></script>
<script type="text/javascript" src="https://cdn.datatables.net/v/bs4/jszip-2.5.0/dt-1.10.20/b-1.6.1/b-html5-1.6.1/b-print-1.6.1/fh-3.1.6/r-2.2.3/datatables.min.js"></script>
<!-- datatable -->

<script defer src="js/wow.js"></script>

<script type="text/javascript">
    $('.dataTable').DataTable()
</script>

<script type="text/javascript">
    $(document).ready(function() {
        $('.selpckr').selectpicker();
        $('.dtpckr').datepicker({
            uiLibrary: 'bootstrap4'
        });
    });


    $('.owl_header').owlCarousel({
        loop:true,
        margin:0,
        dots:false,
        nav:true,
        mouseDrag:false,
        autoplay:true,
        animateOut: 'slideOutLeft',
        responsive:{
            0:{
                items:1
            },
            600:{
                items:1
            },
            1000:{
                items:1
            }
        }
    });

</script>

<script>
	wow = new WOW({
        animateClass: 'animated',
        offset: 100,
        callback: function(box) {
        	console.log("WOW: animating <" + box.tagName.toLowerCase() + ">")
        }
    });
	wow.init();
</script>

<script>
	$(window).on("scroll load" , function() {
		if ($(this).scrollTop() > 100){  
			$('.header').addClass("fixed_hedr");
			$('.logo_ch').find("img").attr('src', 'img/logo.png');
		}
		else {
			$('.header').removeClass("fixed_hedr");
			$('.logo_ch').find("img").attr('src', 'img/logow.png');
			$('.innr_hedr .logo_ch').find("img").attr('src', 'img/logo.png');
		}
	});
</script>