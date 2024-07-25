(function(a){a.fn.prepareTransition=function(){return this.each(function(){var b=a(this);b.one("TransitionEnd webkitTransitionEnd transitionend oTransitionEnd",function(){b.removeClass("is-transitioning")});var c=["transition-duration","-moz-transition-duration","-webkit-transition-duration","-o-transition-duration"],d=0;a.each(c,function(a2,c2){d=parseFloat(b.css(c2))||d}),d!=0&&(b.addClass("is-transitioning"),b[0].offsetWidth)})}})(jQuery);function replaceUrlParam(e,r,a){var n=new RegExp("("+r+"=).*?(&|$)"),c=e;return c=e.search(n)>=0?e.replace(n,"$1"+a+"$2"):c+(c.indexOf("?")>0?"&":"?")+r+"="+a}typeof Shopify=="undefined"&&(Shopify={}),Shopify.formatMoney||(Shopify.formatMoney=function(cents,format){var value="",placeholderRegex=/\{\{\s*(\w+)\s*\}\}/,formatString=format||this.money_format;typeof cents=="string"&&(cents=cents.replace(".",""));function defaultOption(opt,def){return typeof opt=="undefined"?def:opt}function formatWithDelimiters(number,precision,thousands,decimal){if(precision=defaultOption(precision,2),thousands=defaultOption(thousands,","),decimal=defaultOption(decimal,"."),isNaN(number)||number==null)return 0;number=(number/100).toFixed(precision);var parts=number.split("."),dollars=parts[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g,"$1"+thousands),cents2=parts[1]?decimal+parts[1]:"";return dollars+cents2}switch(formatString.match(placeholderRegex)[1]){case"amount":value=formatWithDelimiters(cents,2);break;case"amount_no_decimals":value=formatWithDelimiters(cents,0);break;case"amount_with_comma_separator":value=formatWithDelimiters(cents,2,".",",");break;case"amount_no_decimals_with_comma_separator":value=formatWithDelimiters(cents,0,".",",");break}return formatString.replace(placeholderRegex,value)}),Shopify.getProduct=function(handle,callback){jQuery.getJSON("/products/"+handle+".js",function(product,textStatus){typeof callback=="function"?callback(product):Shopify.onProduct(product)})};function currencyConverter(money){Currency.format="money_with_currency_format";var cookieCurrency=Currency.cookie.read(),money_c=Currency.convert(money,shopCurrency,cookieCurrency);return money}function currencyCallback(id){jQuery(id).each(function(){jQuery(this).attr("data-currency-USD",jQuery(this).html())}),Currency.convertAll(shopCurrency,Currency.cookie.read(),id,"money_format")}function updatePricingQty(qty){Currency.format="money_with_currency_format";var cookieCurrency=Currency.cookie.read(),$variant_sellector=$("#productSelect option:selected"),regex=/([0-9]+[.|,][0-9]+[.|,][0-9]+)/g,unitPriceTextMatch=$($variant_sellector).text().match(regex);if(unitPriceTextMatch||(regex=/([0-9]+[.|,][0-9]+)/g,unitPriceTextMatch=$($variant_sellector).text().match(regex)),unitPriceTextMatch){var quantity,unitPriceText=unitPriceTextMatch[0],unitPrice=unitPriceText.replace(/[.|,]/g,"");qty?quantity=qty:quantity=parseInt($("#Quantity").val(),10);var totalPrice=unitPrice*quantity,totalPriceText=Shopify.formatMoney(totalPrice,window.money_format);regex=/([0-9]+[.|,][0-9]+[.|,][0-9]+)/g,totalPriceText.match(regex)||(regex=/([0-9]+[.|,][0-9]+)/g),totalPriceText=totalPriceText.match(regex)[0];var currentPriceText=$(".engoj_price_main");regex=/([0-9]+[.|,][0-9]+[.|,][0-9]+)/g,currentPriceText.text().match(regex)||(regex=/([0-9]+[.|,][0-9]+)/g),currentPriceText=currentPriceText.text().match(regex)[0];var regInput=new RegExp(currentPriceText,"g"),totalPriceHtml=$(".engoj_price_main").html().replace(regInput,totalPriceText)}}Shopify.resizeImage=function(image,size){try{if(size=="original")return image;var matches=image.match(/(.*\/[\w\-\_\.]+)\.(\w{2,4})/);return matches[1]+"_"+size+"."+matches[2]}catch(e){return image}},window.timber=window.timber||{},timber.cacheSelectors=function(){timber.cache={$html:$("html"),$body:$("body"),$navigation:$("#AccessibleNav"),$mobileSubNavToggle:$(".mobile-nav__toggle"),$changeView:$(".engoj-view-mode"),$productImage:$("#ProductPhotoImg"),$thumbImages:$("#ProductThumbs").find("a.product-single__thumbnail"),$recoverPasswordLink:$(".RecoverPassword"),$hideRecoverPasswordLink:$(".HideRecoverPasswordLink"),$recoverPasswordForm:$(".RecoverPasswordForm"),$customerLoginForm:$(".CustomerLoginForm"),$passwordResetSuccess:$("#ResetSuccess")}},timber.init=function(){FastClick.attach(document.body),timber.cacheSelectors(),timber.accessibleNav(),timber.drawersInit(),timber.mobileNavToggle(),timber.productImageSwitch(),timber.responsiveVideos(),timber.collectionViews(),timber.loginForms()},timber.accessibleNav=function(){var $nav=timber.cache.$navigation,$allLinks=$nav.find("a"),$topLevel=$nav.children("li").find("a"),$parents=$nav.find(".site-nav--has-dropdown"),$subMenuLinks=$nav.find(".site-nav__dropdown").find("a"),activeClass="nav-hover",focusClass="nav-focus";$parents.on("mouseenter touchstart",function(evt){var $el=$(this);$el.hasClass(activeClass)||evt.preventDefault(),showDropdown($el)}),$parents.on("mouseleave",function(){hideDropdown($(this))}),$subMenuLinks.on("touchstart",function(evt){evt.stopImmediatePropagation()}),$allLinks.focus(function(){handleFocus($(this))}),$allLinks.blur(function(){removeFocus($topLevel)});function handleFocus($el){var $subMenu=$el.next("ul"),hasSubMenu=!!$subMenu.hasClass("sub-nav"),isSubItem=$(".site-nav__dropdown").has($el).length,$newFocus=null;isSubItem?($newFocus=$el.closest(".site-nav--has-dropdown").find("a"),addFocus($newFocus)):(removeFocus($topLevel),addFocus($el))}function showDropdown($el){$el.addClass(activeClass),setTimeout(function(){timber.cache.$body.on("touchstart",function(){hideDropdown($el)})},250)}function hideDropdown($el){$el.removeClass(activeClass),timber.cache.$body.off("touchstart")}function addFocus($el){$el.addClass(focusClass)}function removeFocus($el){$el.removeClass(focusClass)}},timber.drawersInit=function(){timber.LeftDrawer=new timber.Drawers("NavDrawer","left"),timber.RightDrawer=new timber.Drawers("CartDrawer","right",{onDrawerOpen:ajaxCart.load})},timber.mobileNavToggle=function(){timber.cache.$mobileSubNavToggle.on("click",function(){$(this).parent().toggleClass("mobile-nav--expanded")})},timber.getHash=function(){return window.location.hash},timber.productPage=function(options){var moneyFormat=options.money_format,variant=options.variant,selector=options.selector,$productImage=$("#ProductPhotoImg"),$addToCart=$("#AddToCart"),$productPrice=$("#ProductPrice"),$comparePrice=$("#ComparePrice"),$quantityElements=$(".quantity-selector, label + .js-qty"),$addToCartText=$("#AddToCartText");if(variant){if(variant.featured_image){var newImg=variant.featured_image,el=$productImage[0];Shopify.Image.switchImage(newImg,el,timber.switchImage)}variant.available?($addToCart.removeClass("disabled").prop("disabled",!1),$addToCartText.html("Add to Cart"),$quantityElements.show()):($addToCart.addClass("disabled").prop("disabled",!0),$addToCartText.html("Sold Out"),$quantityElements.hide()),$productPrice.html(Shopify.formatMoney(variant.price,moneyFormat)),variant.compare_at_price>variant.price?$comparePrice.html("Compare at "+Shopify.formatMoney(variant.compare_at_price,moneyFormat)).show():$comparePrice.hide()}else $addToCart.addClass("disabled").prop("disabled",!0),$addToCartText.html("Unavailable"),$quantityElements.hide()},timber.productImageSwitch=function(){timber.cache.$thumbImages.length&&timber.cache.$thumbImages.on("click",function(evt){evt.preventDefault();var newImage=$(this).attr("href");timber.switchImage(newImage,null,timber.cache.$productImage)})},timber.switchImage=function(src,imgObject,el){var $el=$(el);$el.attr("src",src)},timber.responsiveVideos=function(){var $iframeVideo=$('iframe[src*="youtube.com/embed"], iframe[src*="player.vimeo"]'),$iframeReset=$iframeVideo.add("iframe#admin_bar_iframe");$iframeVideo.each(function(){$(this).wrap('<div class="video-wrapper"></div>')}),$iframeReset.each(function(){this.src=this.src})},timber.collectionViews=function(){timber.cache.$changeView.length&&timber.cache.$changeView.on("click",function(){var view=$(this).data("view"),url=document.URL,hasParams=url.indexOf("?")>-1;hasParams?window.location=replaceUrlParam(url,"view",view):window.location=url+"?view="+view})},timber.loginForms=function(){function showRecoverPasswordForm(){timber.cache.$recoverPasswordForm.show(),timber.cache.$customerLoginForm.hide()}function hideRecoverPasswordForm(){timber.cache.$recoverPasswordForm.hide(),timber.cache.$customerLoginForm.show()}timber.cache.$recoverPasswordLink.on("click",function(evt){evt.preventDefault(),showRecoverPasswordForm()}),timber.cache.$hideRecoverPasswordLink.on("click",function(evt){evt.preventDefault(),hideRecoverPasswordForm()}),timber.getHash()=="#recover"&&showRecoverPasswordForm()},timber.resetPasswordSuccess=function(){timber.cache.$passwordResetSuccess.show()},timber.Drawers=function(){var Drawer=function(id,position,options){var defaults={close:".js-drawer-close",open:".js-drawer-open-"+position,openClass:"js-drawer-open",dirOpenClass:"js-drawer-open-"+position};if(this.$nodes={parent:$("body, html"),page:$("#PageContainer"),moved:$(".is-moved-by-drawer")},this.config=$.extend(defaults,options),this.position=position,this.$drawer=$("#"+id),!this.$drawer.length)return!1;this.drawerIsOpen=!1,this.init()};return Drawer.prototype.init=function(){$(this.config.open).on("click",$.proxy(this.open,this)),this.$drawer.find(this.config.close).on("click",$.proxy(this.close,this))},Drawer.prototype.open=function(evt){var externalCall=!1;if(evt?evt.preventDefault():externalCall=!0,evt&&evt.stopPropagation&&(evt.stopPropagation(),this.$activeSource=$(evt.currentTarget)),this.drawerIsOpen&&!externalCall)return this.close();this.$nodes.moved.addClass("is-transitioning"),this.$drawer.prepareTransition(),this.$nodes.parent.addClass(this.config.openClass+" "+this.config.dirOpenClass),this.drawerIsOpen=!0,this.trapFocus(this.$drawer,"drawer_focus"),this.config.onDrawerOpen&&typeof this.config.onDrawerOpen=="function"&&(externalCall||this.config.onDrawerOpen()),this.$activeSource&&this.$activeSource.attr("aria-expanded")&&this.$activeSource.attr("aria-expanded","true"),this.$nodes.page.on("touchmove.drawer",function(){return!1}),this.$nodes.page.on("click.drawer",$.proxy(function(){return this.close(),!1},this))},Drawer.prototype.close=function(){this.drawerIsOpen&&($(document.activeElement).trigger("blur"),this.$nodes.moved.prepareTransition({disableExisting:!0}),this.$drawer.prepareTransition({disableExisting:!0}),this.$nodes.parent.removeClass(this.config.dirOpenClass+" "+this.config.openClass),this.drawerIsOpen=!1,this.removeTrapFocus(this.$drawer,"drawer_focus"),this.$nodes.page.off(".drawer"))},Drawer.prototype.trapFocus=function($container,eventNamespace){var eventName=eventNamespace?"focusin."+eventNamespace:"focusin";$container.attr("tabindex","-1"),$container.focus(),$(document).on(eventName,function(evt){$container[0]!==evt.target&&!$container.has(evt.target).length&&$container.focus()})},Drawer.prototype.removeTrapFocus=function($container,eventNamespace){var eventName=eventNamespace?"focusin."+eventNamespace:"focusin";$container.removeAttr("tabindex"),$(document).off(eventName)},Drawer}(),$(timber.init);function showPopup(selector){$(selector).addClass("active")}window.showPopup=showPopup;function hidePopup(selector){$(selector).removeClass("active")}
//# sourceMappingURL=/cdn/shop/t/6/assets/timber.js.map?v=118109709416041923331688631753
