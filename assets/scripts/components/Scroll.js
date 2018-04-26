function rmh_pageScroll(){
	let docElem = document.documentElement,
		$headerTopBar = $('.header__top-bar'),
		didScroll = false,
		changeHeaderOn = 100;

	function testScoll() {
		window.addEventListener( 'scroll', function( event ) {
			if( !didScroll ) {
				didScroll = true;
				setTimeout( scrollPage, 250 );
			}
		}, false );
	}

	function scrollPage() {
		let sy = scrollY();
		if ( sy >= changeHeaderOn ) {
			$headerTopBar.addClass( 'header__top-bar--less-padding' );
			// $("#block-block-11").animate({opacity: 0}, 'fast');
			// console.log('test');
		}
		else {
			$headerTopBar.removeClass( 'header__top-bar--less-padding' );
			// $("#block-block-11").animate({opacity: 1}, 'fast');
		}
		didScroll = false;
	}

	function scrollY() {
		return window.pageYOffset || docElem.scrollTop;
	}

	testScoll();
}

module.exports = {
	rmh_pageScroll
};