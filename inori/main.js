var _____WB$wombat$assign$function_____=function(name){return (globalThis._wb_wombat && globalThis._wb_wombat.local_init && globalThis._wb_wombat.local_init(name))||globalThis[name];};if(!globalThis.__WB_pmw){globalThis.__WB_pmw=function(obj){this.__WB_source=obj;return this;}}{
let window = _____WB$wombat$assign$function_____("window");
let self = _____WB$wombat$assign$function_____("self");
let document = _____WB$wombat$assign$function_____("document");
let location = _____WB$wombat$assign$function_____("location");
let top = _____WB$wombat$assign$function_____("top");
let parent = _____WB$wombat$assign$function_____("parent");
let frames = _____WB$wombat$assign$function_____("frames");
let opener = _____WB$wombat$assign$function_____("opener");
$(function(){
	var FullscreenrOptions = {  width: 1920, height: 1080, bgCLASS: '.fullimg' };
	
	var favoriteSites = [];
	favoriteSites[0] = ["Katsu News", "https//www.katsunews.com"];
	favoriteSites[1] = ["Collateral Damage Studios", "https//www.facebook.com/cds.sg"];
	favoriteSites[2] = ["Moe Anthropomorphism", "https//www.facebook.com/moe.anthropomorphism"];
	
	var $searchInput = $('#search-zone input.form-control');
    var $searchParams = $('#search-zone .search-param');
    var $bing_query = $('#bing-query').click(searchClickInit);
    var $google_query = $('#google-query').click(searchClickInit);
    var $wikipedia_query = $('#wikipedia-query').click(searchClickInit);
    var $youtube_query = $('#youtube-query').click(searchClickInit);
    var $myanimelist_query = $('#myanimelist-query').click(searchClickInit);
    var $katsunews_query = $('#katsunews-query').click(searchClickInit);

	randomiseFavoriteSites(favoriteSites);
	randomiseBG(0, 18);
	$('#bg-info-link').attr({'title' : $('.carousel-inner img:first-child').data('info')});
	initialiseSlider();
	initialiseSearch();
	footerToggleInit();
	headerToggleInit();
	searchWeighting();
    $searchInput[0].oninput = function(){searchUpdate();};
    $('#search-form').submit(submitSearch);
	$('.tooltip-init').tooltip();
	$.fn.fullscreenr(FullscreenrOptions);
	parseRSS('https//www.katsunews.com/feed.xml', rssSuccess, rssFailure);

	$('#links-section a').on('click', function() {
		var url = $(this).attr("href");
		ga('send', 'event', 'Links', 'Header', url);
	});

	function initialiseSlider(){
		$('.active.item img').unveil();
		$('.carousel').carousel({
		  interval: false
		});

		$('.carousel').on('slid.bs.carousel', function () {
			var info = $('.active.item img').data('info');
			$('#bg-info-link').tooltip('hide')
					          .attr('data-original-title', info)
					          .tooltip('fixTitle');
			$('.active.item img').unveil();
		});
	}
	
	function initialiseSearch(){

		var $header = $('h2#inori-intro');
		var $search_hidden = $('#search-zone');

		$header.click(function(){
			$header.fadeOut(200, function(){
				$search_hidden.fadeIn(200);
				$header.unbind('click');
			});
			ga('send', 'event', 'Page', 'Header', $(this).attr('id'));
		});
	}

	function initialiseSwiper(){
		var mySwiper = new Swiper('.swiper-container',{
			slidesPerView: 'auto',
			scrollContainer: true,
			moveStartThreshold: 100,
			preventLinks: true,
			scrollbar: {
			  container: '.swiper-scrollbar'
			}
		});
		$('.arrow-left').on('click', function(e){
			e.preventDefault()
			mySwiper.swipePrev()
		});
		$('.arrow-right').on('click', function(e){
			e.preventDefault()
			mySwiper.swipeNext()
		});
		$('#rs-scroll').animate({height:'40px'});
		$('#main').animate({'padding-bottom':'40px'});
	}

	function parseRSS(url, callback, failureCallback) {
		$.ajax({
		    url: document.location.protocol + '//web.archive.org/web/20170216030801/http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=20&output=xml&callback=?&q=' + encodeURIComponent(url),
		    dataType: 'json',
		    timeout: 5000,
		    success: function(data, textStatus) {
		    	if(data.responseData == null){
		    		failureCallback('Failed');
		    		return;
		    	}
		      	callback(data);
		    },
		    error: function(xhr, textStatus, errorThrown){
		    	failureCallback('Failed');
		    }
		});
	}

	function rssSuccess(response){		
		var $xml = $($.parseXML(response.responseData.xmlString));
		var colors = ['orange', 'green', 'blue', 'yellow'];
		var $target = $('#rs-scroll .swiper-slide');
		var $title = $('#swiper-title').append('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;');
		var colorsIndex = 0;

		$target.empty();

		for(var index = 1; index < 20; index++){

			var title = $($xml.find('title')[index]).text();
			var link = $($xml.find('link')[index]).text();
			var publisher = $($xml.find("dc\\:publisher, publisher")[index-1]).text();

			fulltitle = publisher + " >> " + title
			fulltitle = fulltitle.replace(/"/g, "&quot;");
			title = title.length>60 ? title.substr(0,60-1)+'&hellip;' : title;

			if(colorsIndex >= colors.length){
				colorsIndex = 0;
			}
			$target.append('<a href="' + link + '" onclick="trackOutbound(this);" class="rss-slide rss-' + colors[colorsIndex] + '" target="_blank" title="'+ fulltitle +'"><h3>' + title + '</h3><span class="rss-link">' + publisher + '<span></a>');
			$title.append('<a href="' + link + '" onclick="trackOutbound(this);" target="_blank" title="'+ fulltitle +'">' + title + '</a>&nbsp;&nbsp;&nbsp;//&nbsp;&nbsp;&nbsp;')
			colorsIndex++;
		}

		initialiseSwiper();
	}

	function rssFailure(response){		
		var $target = $('#rs-scroll .swiper-slide');
		$target.append('<a id="reload-box" class="rss-slide rss-green"><h3>Unable to load latest news</h3><span class="rss-link">Try again?<span></a>');
		$('#reload-box').click(function(){
			parseRSS('https//www.katsunews.com/feed.xml', rssSuccess, rssFailure);
			$(this).remove();
		});
	}

	function footerToggleInit(){
		var open = false;
		$('#expand-button').click(function(){
			open = footerToggle(open);
			ga('send', 'event', 'Page', 'Footer', $(this).attr('id'));
		});

		$('#search-area').dblclick(function(e){
			open = footerToggle(open);
			ga('send', 'event', 'Page', 'Footer', $(this).attr('id'));
		    if (window.getSelection){
		        window.getSelection().removeAllRanges();
		    }else if (document.selection){
		        document.selection.empty();
		    }
		});
	}

	function footerToggle(state){
		if(state === false) {
			$("#rs-scroll").animate({ height: "200px" });
			$("#swiper-title").slideUp();
			$(".feed-dir").animate({ top: "0" });
			$(".swiper-slide").animate({ padding: "0 0 0 40px" });
			$('#main').animate({ 'padding-bottom': "200px" });
			$("#expand-icon").attr("src","img/ico-rss-collapse.svg");
			
			return true;
		} else {
			$('#rs-scroll').animate({ height: "40px" });
			$("#swiper-title").slideDown();
			$(".feed-dir").animate({ top: "40px" });
			$(".swiper-slide").animate({ padding: "40px 0 0 40px" });
			$('#main').animate({ 'padding-bottom': "40px" });
			$("#expand-icon").attr("src","img/ico-rss-expand.svg");
			return false;
		}
	}

	function headerToggleInit(){
		//var open = false;
		var open = true;
		$('#head-button, #talking-head').click(function(){
			open = headerToggle(open);
			ga('send', 'event', 'Page', 'Header', $(this).attr('id'));
		});
		//$("#brand").fadeTo( 1000 , 0);
		//$("#inori-intro-wrap").fadeTo( 1000 , 0);
		//$("#links-section-wrap").fadeTo( 1000 , 0, function() {
		//	$('#links-section').addClass("header-hide");
		//	$('#intro-section').addClass("header-hide");
		//	$('#top-bar').addClass("header-hide");
		//});
	}


	function headerToggle(state){
		if(state === false) {
			$('#intro-section').removeClass("header-hide");
			$('#links-section').removeClass("header-hide");
			$('#top-bar').removeClass("header-hide");
			$("#brand").delay(500).fadeTo( 500 , 1);
			$("#inori-intro-wrap").delay(500).fadeTo( 500 , 1);
			$("#links-section-wrap").delay(500).fadeTo( 500 , 1);
			return true;
		} else {
			$("#brand").fadeTo( 500 , 0);
			$("#inori-intro-wrap").fadeTo( 500 , 0, function(){				
				//$('h2#inori-intro').show();
				//$('#search-zone').hide();
				//initialiseSearch();
			});
			$("#links-section-wrap").fadeTo( 500 , 0, function() {
				$('#links-section').addClass("header-hide");
				$('#intro-section').addClass("header-hide");
				$('#top-bar').addClass("header-hide");
			});
			return false;
		}
	}

	function randomiseBG(s, m){
		var $carousel = $('.carousel-inner');
		var shuffled = shuffle($carousel.children(), s, m);
		$carousel.empty();
		for(var index = 0; index < shuffled.length; index++){
			$carousel.append(shuffled[index]);
		}
		$carousel.children().removeClass('active');
		$($carousel.children()[0]).addClass('active');
	}

	function shuffle(array, s, m) {
		s = s || 0;
		if (!m || m > (array.length - s)) m = array.length - s;

  		var t, i;

  		while (m) {
		    i = s + Math.floor(Math.random() * m--);
		    t = array[m + s];
    		array[m + s] = array[i];
    		array[i] = t;
  		}

  		return array;
	}

	function randomiseFavoriteSites(sites){
		randomSites = shuffle(sites);
		$('#favorite1').text(randomSites[0][0]).attr({'href' : randomSites[0][1]});
		$('#favorite2').text(randomSites[1][0]).attr({'href' : randomSites[1][1]});
		$('#favorite3').text(randomSites[2][0]).attr({'href' : randomSites[2][1]});
	}

	function searchUpdate(){
	    var query = $searchInput.val();
	    $searchParams.html(query);

	    $bing_query.attr('href', 'https//www.bing.com/search?q=' + query);
	    $google_query.attr('href', 'https://www.google.com/search?q=' + query);
	    $wikipedia_query.attr('href', 'https//en.wikipedia.org/wiki/' + query);
	    $youtube_query.attr('href', 'https//www.youtube.com/results?search_query=' + query);
	    $myanimelist_query.attr('href', 'https//myanimelist.net/anime.php?q=' + query);
	    $katsunews_query.attr('href', 'https//www.katsunews.com/q/' + query + '/1');
	}

	function submitSearch(e){
        e.preventDefault();
        var query = $searchInput.val();
        window.open('https//www.bing.com/search?q=' + query);
        $.totalStorage('bing-query', $.totalStorage('bing-query') + 1);
        ga('send', 'event', 'Search', 'bing-query', query);
    }

    function searchWeighting(){
        var cookie_bing = cookieParse('bing-query');
        var cookie_google = cookieParse('google-query');
        var cookie_youtube = cookieParse('youtube-query');
        var cookie_wikipedia = cookieParse('wikipedia-query');
        var cookie_myanimelist = cookieParse('myanimelist-query');
        var cookie_katsunews = cookieParse('katsunews-query');
        var searchArray = [{name : 'bing-query', value : cookie_bing}, 
                           {name : 'google-query', value : cookie_google}, 
                           {name : 'youtube-query', value : cookie_youtube}, 
                           {name : 'wikipedia-query', value : cookie_wikipedia}, 
                           {name : 'myanimelist-query', value : cookie_myanimelist},
                           {name : 'katsunews-query', value : cookie_katsunews}];

        searchArray = searchArray.sort(function(a, b){return b.value-a.value});

        sortSearch(searchArray);
    }

    function cookieParse(name){
        if(!$.isNumeric($.totalStorage(name))){
                $.totalStorage(name, 0)
                return 0;
        }else{
                return $.totalStorage(name);
        }
    }

    function sortSearch(searchArray){
        for(var index = 0; index < searchArray.length; index++){
                $('#search-dropdown').append($('#' + searchArray[index].name).parent());
        }
    }

    function searchClickInit(){
        var id = $(this).attr('id');
        var query = $searchInput.val();
        $.totalStorage(id, $.totalStorage(id) + 1);
        ga('send', 'event', 'Search', id, query);
    }
});

function trackOutbound(elem){
	url = $(elem).attr('href');
	ga('send', 'event', 'Links', 'Headline', url);
	return true;
}
}

/*
     FILE ARCHIVED ON 03:08:01 Feb 16, 2017 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 19:50:45 Aug 03, 2026.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  capture_cache.get: 0.353
  load_resource: 31.161
  PetaboxLoader3.resolve: 26.148
  PetaboxLoader3.datanode: 2.851
*/
