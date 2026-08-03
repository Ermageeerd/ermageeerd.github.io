var _____WB$wombat$assign$function_____=function(name){return (globalThis._wb_wombat && globalThis._wb_wombat.local_init && globalThis._wb_wombat.local_init(name))||globalThis[name];};if(!globalThis.__WB_pmw){globalThis.__WB_pmw=function(obj){this.__WB_source=obj;return this;}}{
let window = _____WB$wombat$assign$function_____("window");
let self = _____WB$wombat$assign$function_____("self");
let document = _____WB$wombat$assign$function_____("document");
let location = _____WB$wombat$assign$function_____("location");
let top = _____WB$wombat$assign$function_____("top");
let parent = _____WB$wombat$assign$function_____("parent");
let frames = _____WB$wombat$assign$function_____("frames");
let opener = _____WB$wombat$assign$function_____("opener");
/*     	Fullscreenr - lightweight full screen background jquery plugin
 *		By Jan Schneiders
 * 		Version 1.0
 * 		www.nanotux.com
 */
(function(b){b.fn.fullscreenr=function(a){void 0===a.height&&alert("Please supply the background image height, default values will now be used. These may be very inaccurate.");void 0===a.width&&alert("Please supply the background image width, default values will now be used. These may be very inaccurate.");void 0===a.bgCLASS&&alert("Please supply the background image ID, default #bgimg will now be used.");a=b.extend({},{width:1280,height:1024,bgCLASS:".fullimg"},a);b(document).ready(function(){b(a.bgCLASS).fullscreenrResizer(a)});
b(window).bind("resize",function(){b(a.bgCLASS).fullscreenrResizer(a)});return this};b.fn.fullscreenrResizer=function(a){a=a.height/a.width;var c=b(window).width(),d=b(window).height();d/c>a?(b(this).height(d),b(this).width(d/a)):(b(this).width(c),b(this).height(c*a));return this}})(jQuery);
}

/*
     FILE ARCHIVED ON 03:08:09 Feb 16, 2017 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 19:50:45 Aug 03, 2026.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  capture_cache.get: 0.343
  load_resource: 97.264
  PetaboxLoader3.resolve: 37.003
  PetaboxLoader3.datanode: 32.842
*/
