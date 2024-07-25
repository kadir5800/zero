(function($){function showPopup(selector){$(selector).addClass("active")}window.showPopup=showPopup;function hidePopup(selector){$(selector).removeClass("active")}function qtyProduct(){$(".qtyplus").click(function(e){var fieldName=$(this).attr("data-field"),currentVal=parseInt($("input[name="+fieldName+"]").val());isNaN(currentVal)?$("input[name="+fieldName+"]").val(1):$("input[name="+fieldName+"]").val(currentVal+1),e.preventDefault()}),$(".qtyminus").click(function(e){var fieldName=$(this).attr("data-field"),currentVal=parseInt($("input[name="+fieldName+"]").val());!isNaN(currentVal)&&currentVal>1?$("input[name="+fieldName+"]").val(currentVal-1):$("input[name="+fieldName+"]").val(1),e.preventDefault()})}window.qtyProduct=qtyProduct;function doAjaxAddToCart(variant_id,quantity,title,image){$.ajax({type:"post",url:"/cart/add.js",data:"quantity="+quantity+"&id="+variant_id,dataType:"json",beforeSend:function(){showPopup(".loading")},success:function(msg){$(".tshopify-popup").removeClass("active"),hidePopup(".quickview-product"),Shopify.getCart(function(cart){tbuildCart(cart)})},error:function(xhr,text){hidePopup(".loading"),$(".error-message").text($.parseJSON(xhr.responseText).description),showPopup(".error-popup")}})}window.doAjaxAddToCart=doAjaxAddToCart;function tbuildCart(cart){var $cartContainer=$(".enj-minicart-ajax");if($cartContainer.empty(),cart.item_count===0){$cartContainer.append("<p>Your cart is currently empty.</p>"),cartCallback(cart);return}var items=[],item={},data={},source=$("#CartTemplate").html(),template=Handlebars.compile(source);$.each(cart.items,function(index,cartItem){if(cartItem.image!=null)var prodImg=cartItem.image.replace(/(\.[^.]*)$/,"_small$1").replace("http:","");else var prodImg="//cdn.shopify.com/s/assets/admin/no-image-medium-cc9732cb976dd349a0df1d39816fbcc7.gif";item={id:cartItem.variant_id,line:index+1,url:cartItem.url,img:prodImg,name:cartItem.product_title,variation:cartItem.variant_title,properties:cartItem.properties,itemAdd:cartItem.quantity+1,itemMinus:cartItem.quantity-1,itemQty:cartItem.quantity,price:Shopify.formatMoney(cartItem.price,ajaxCartConfig.moneyFormat),vendor:cartItem.vendor},items.push(item)}),data={items:items,note:cart.note,totalPrice:Shopify.formatMoney(cart.total_price,ajaxCartConfig.moneyFormat)},$cartContainer.append(template(data)),$(".enj-cartcount").html(cart.item_count),$("body").removeClass("drawer--is-loading"),$("body").trigger("ajaxCart.afterCartLoad",cart),$(".js-call-minicart").click(),$(".js-number-cart").addClass("active")}function convertToSlug(text){return text.toLowerCase().replace(/[^a-z0-9 -]/g,"").replace(/\s+/g,"-").replace(/-+/g,"-")}window.convertToSlug=convertToSlug,$(document).ready(function(){$(window).width()<992?responsiveQuickview():quickView(),$(window).resize(function(){$(window).width()<992?responsiveQuickview():quickView()})}),$(document).on("click",".overlay,.continue-shopping, .close-window",function(){return hidePopup(".tshopify-popup"),setTimeout(function(){$(".loading").removeClass("loaded-content")},500),!1});function responsiveQuickview(){$(window).width()<992?$(".engoj_btn_quickview").each(function(){var linkProduct="/products/"+$(this).attr("data-id");$(this).attr("href",linkProduct)}):$(".engoj_btn_quickview").attr("href","javascript:void(0)"),$(window).resize(function(){$(window).width()<992?$(".engoj_btn_quickview").each(function(){var linkProduct="/products/"+$(this).attr("data-id");$(this).attr("href",linkProduct)}):$(".engoj_btn_quickview").attr("href","javascript:void(0)")})}function quickView(){$(".engoj_btn_quickview").click(function(){showPopup(".loading");var id=$(this).data("id"),rating=$(this).closest(".product-info").find(".spr-badge").attr("data-rating")*20+"%";return Shopify.getProduct(id,function(product){var template=$("#quick-view").html();$(".quickview-product").html(template);var quickview=$(".quickview-product");if(quickview.find(".product-name a").html(product.title).attr("href",product.url),quickview.find(".spr-badge .spr-active").css({width:rating}),quickview.find(".star-rating .shopify-product-reviews-badge").attr("data-id",product.id),quickview.find(".des").length>0){var description=product.description.replace(/(<([^>]+)>)/ig,"");description=description.split(" ").splice(0,20).join(" ")+"...",quickview.find(".des").text(description)}else quickview.find(".des").remove();quickview.find(".price").html(Shopify.formatMoney(product.price,window.money_format)),quickview.find(".product-inner").attr("id","product-"+product.id),quickview.find(".variants").attr("id","product-actions-"+product.id),quickview.find(".variants select").attr("id","product-select-"+product.id),product.compare_at_price>product.price?(quickview.find(".compare-price").html(Shopify.formatMoney(currencyConverter(product.compare_at_price_max),window.money_format)).show(),quickview.find(".price").addClass("on-sale")):(quickview.find(".compare-price").html(""),quickview.find(".price").removeClass("on-sale")),product.available?(quickview.find(".total-price span").html(Shopify.formatMoney(currencyConverter(product.price),window.money_format)),tshopifyQuickview.createQuickViewVariantsSwatch(product,quickview)):(quickview.find("select, input, .total-price, .dec, .inc, .variants label").remove(),quickview.find(".btn-addToCart").text("unavailable").addClass("disabled").attr("disabled","disabled")),qtyProduct(),tshopifyQuickview.quickViewSlider(product,quickview),tshopifyQuickview.initQuickviewAddToCart(),$(".quickview-product").addClass("active"),$(".loading").addClass("loaded-content"),$(".quickview-product .total-price").length>0&&($(".quickview-product span[class=qtyplus]").on("click",tshopifyQuickview.updatePricingQuickview),$(".quickview-product span[class=qtyminus]").on("click",tshopifyQuickview.updatePricingQuickview))}),!1})}window.quickView=quickView;var tshopifyQuickview={selectCallbackQuickview:function(variant,selector){var self=this,productItem=jQuery(".quickview-product .product-item"),addToCart=productItem.find(".btn-addToCart"),productPrice=productItem.find(".price"),comparePrice=productItem.find(".compare-price"),totalPrice=productItem.find(".total-price span");if(variant&&variant.featured_image){var originalImage=jQuery(".engoj_img_main_quickview"),newImage=variant.featured_image,element=originalImage[0];Shopify.Image.switchImage(newImage,element,function(newImageSizedSrc,newImage2,element2){var $el=$(element2);$el.attr("src",newImageSizedSrc)})}if(variant){variant.available?addToCart.removeClass("disabled").removeAttr("disabled").text("Add to Cart"):addToCart.val("sold_out").addClass("disabled").attr("disabled","disabled").text("Sold Out"),productPrice.html(Shopify.formatMoney(currencyConverter(variant.price),window.money_format)),variant.compare_at_price>variant.price?(comparePrice.html(Shopify.formatMoney(currencyConverter(variant.compare_at_price),window.money_format)).show(),productPrice.addClass("on-sale")):(comparePrice.hide(),productPrice.removeClass("on-sale"));for(var form=jQuery("#"+selector.domIdPrefix).closest("form"),i2=0,length=variant.options.length;i2<length;i2++){var radioButton=form.find('.swatch[data-option-index="'+i2+'"] :radio[value="'+variant.options[i2]+'"]');radioButton.length&&(radioButton.get(0).checked=!0)}var inventoryInfo=productItem.find(".product-inventory span");variant.available?variant.inventory_management!=null?inventoryInfo.text(variant.inventory_quantity+" in_stock"):inventoryInfo.text("many_in_stock"):inventoryInfo.text("out_of_stock");var regex=/([0-9]+[.|,][0-9]+[.|,][0-9]+)/g,unitPriceTextMatch=$(".quickview-product .price").text().match(regex);if(unitPriceTextMatch||(regex=/([0-9]+[.|,][0-9]+)/g,unitPriceTextMatch=$(".quickview-product .price").text().match(regex)),unitPriceTextMatch){var unitPriceText=unitPriceTextMatch[0],unitPrice=unitPriceText.replace(/[.|,]/g,""),quantity=parseInt($(".quickview-product input[name=quantity]").val()),totalPrice=unitPrice*quantity;totalPrice=currencyConverter(totalPrice);var totalPriceText=Shopify.formatMoney(totalPrice,window.money_format);regex=/([0-9]+[.|,][0-9]+[.|,][0-9]+)/g,totalPriceText.match(regex)||(regex=/([0-9]+[.|,][0-9]+)/g),totalPriceText=totalPriceText.match(regex)[0];var regInput=new RegExp(unitPriceText,"g"),totalPriceHtml=$(".quickview-product .price").html().replace(regInput,totalPriceText);$(".quickview-product .total-price span").html(totalPriceHtml)}if(variant&&variant.featured_image){var newImage=Shopify.resizeImage(variant.featured_image.src,"small");newImage=newImage.replace(/https?:/,""),jQuery(".quick-view .quickview-more-views img").each(function(){var grandSize=jQuery(this).attr("src");if(grandSize==newImage)return jQuery(this).parent().trigger("click"),!1})}}else addToCart.text("unavailable").addClass("disabled").attr("disabled","disabled");Currency.convertAll(shopCurrency,jQuery("#currencies a.selected").attr("data-currency")),jQuery(".selected-currency").text(Currency.currentCurrency)},createQuickViewVariantsSwatch:function(product,quickviewTemplate){var self=this;if(product.variants.length>1){for(var i2=0;i2<product.variants.length;i2++){var variant=product.variants[i2],option='<option value="'+variant.id+'">'+variant.title+"</option>";quickviewTemplate.find("form.variants > select").append(option)}new Shopify.OptionSelectors("product-select-"+product.id,{product:product,onVariantSelected:self.selectCallbackQuickview,enableHistoryState:!0});for(var filePath=window.file_url.substring(0,window.file_url.lastIndexOf("?")),assetUrl=window.asset_url.substring(0,window.asset_url.lastIndexOf("?")),options="",i2=0;i2<product.options.length;i2++){options+='<div class="swatch clearfix" data-option-index="'+i2+'">',options+='<div class="header">'+product.options[i2].name+"</div>";var is_color=!1;/Color|Colour/i.test(product.options[i2].name)&&(is_color=!0);for(var optionValues=new Array,j=0;j<product.variants.length;j++){var variant=product.variants[j],value=variant.options[i2],valueHandle=convertToSlug(value),forText="swatch-"+i2+"_"+valueHandle;optionValues.indexOf(value)<0&&(options+='<div data-value="'+value+'" class=" '+(is_color?"color":"")+valueHandle+(variant.available?" available ":" soldout ")+'">',options+='<input id="'+forText+'" type="radio" name="option-'+i2+'" value="'+value+'" '+(j==0?" checked ":"")+(variant.available?"":" disabled")+" />",is_color?options+='<label class="link_color" for="'+forText+'" style="background-color: '+valueHandle+';"></label>':options+='<label class="variant_other" for="'+forText+'">'+value+"</label>",options+="</div>",variant.available&&$('.quickview-product .swatch[data-option-index="'+i2+'"] .'+valueHandle).removeClass("soldout").addClass("available").find(":radio").removeAttr("disabled"),optionValues.push(value))}options+="</div>"}quickviewTemplate.find("form.variants > select").after(options),quickviewTemplate.find(".swatch :radio").change(function(){var optionIndex=$(this).closest(".swatch").attr("data-option-index"),optionValue=$(this).val();$(this).closest("form").find(".single-option-selector").eq(optionIndex).val(optionValue).trigger("change")}),product.available&&product.options.size>1&&(Shopify.optionsMap={},Shopify.linkOptionSelectors(product))}else{quickviewTemplate.find("form.variants > select").remove();var variant_field='<input type="hidden" name="id" value="'+product.variants[0].id+'">';quickviewTemplate.find("form.variants").append(variant_field)}},createQuickViewVariants:function(product,quickviewTemplate){var self=this;if(product.variants.length>1){for(var i2=0;i2<product.variants.length;i2++){var variant=product.variants[i2],option='<option value="'+variant.id+'">'+variant.title+"</option>";quickviewTemplate.find("form.variants > select").append(option)}new Shopify.OptionSelectors("product-select-"+product.id,{product:product,onVariantSelected:self.selectCallbackQuickview,enableHistoryState:!0}),$(".quickview-product .selectize-input input").attr("disabled","disabled"),product.options.length==1&&$(".selector-wrapper:eq(0)").prepend("<label>"+product.options[0].name+"</label>"),quickviewTemplate.find("form.variants .selector-wrapper label").each(function(i3,v){$(this).html(product.options[i3].name)})}else{quickviewTemplate.find("form.variants > select").remove();var variant_field='<input type="hidden" name="id" value="'+product.variants[0].id+'">';quickviewTemplate.find("form.variants").append(variant_field)}},quickViewSlider:function(product,quickviewTemplate){var featuredImage=Shopify.resizeImage(product.featured_image,"grande");if(quickviewTemplate.find(".featured-image").append('<a title="'+product.title+'" class="product-photo" href="'+product.url+'"><img class="engoj_img_main_quickview lazyload" data-src="'+featuredImage+'" alt="'+product.title+'"/><span class="loading" style="height: 100%; width: 100%; top:0; left:0 z-index: 999; position: absolute; display: none; background: url('+window.loading_url+') center no-repeat;"></span></a>'),product.images.length!=0){var quickViewCarousel=quickviewTemplate.find(".more-views .owl-carousel");for(i in product.images){var grande=Shopify.resizeImage(product.images[i],"grande"),compact=Shopify.resizeImage(product.images[i],"compact"),item='<div class="item"><a href="javascript:void(0)" data-image="'+grande+'"><img data-src="'+compact+'" class="lazyload"  /></a></div>';quickViewCarousel.append(item)}quickViewCarousel.find("a").click(function(){var featureImage=quickviewTemplate.find(".featured-image img"),moreviewLoad=quickviewTemplate.find(".featured-image .loading");featureImage.attr("src")!=$(this).attr("data-image")&&(featureImage.attr("src",$(this).attr("data-image")),moreviewLoad.show(),featureImage.on("load",function(e){moreviewLoad.hide(),$(this).unbind("load"),moreviewLoad.hide()}))}),setTimeout(function(){var img=$(".owl-carousel").find(".item");img.length>3&&$(".quickview-product .owl-carousel").slick({slidesToShow:3,slideToScroll:1,dots:!1,arrows:!1})},1e3)}else quickviewTemplate.find(".more-views").remove()},initQuickviewAddToCart:function(){$(".quickview-product .btn-addToCart").length>0&&$(".quickview-product .btn-addToCart").click(function(){var variant_id=$(".quickview-product select[name=id]").val();variant_id||(variant_id=$(".quickview-product input[name=id]").val());var quantity=$(".quickview-product input[name=quantity]").val();quantity||(quantity=1);var title=$(".quickview-product .product-title a").html(),image=$(".quickview-product .featured-image img").attr("src");doAjaxAddToCart(variant_id,quantity,title,image)})},updatePricingQuickview:function(){var regex=/([0-9]+[.|,][0-9]+[.|,][0-9]+)/g,unitPriceTextMatch=$(".quickview-product .price").text().match(regex);if(unitPriceTextMatch||(regex=/([0-9]+[.|,][0-9]+)/g,unitPriceTextMatch=$(".quickview-product .price").text().match(regex)),unitPriceTextMatch){var unitPriceText=unitPriceTextMatch[0],unitPrice=unitPriceText.replace(/[.|,]/g,""),quantity=parseInt($(".quickview-product input[name=quantity]").val()),totalPrice=unitPrice*quantity,totalPriceText=Shopify.formatMoney(totalPrice,window.money_format);regex=/([0-9]+[.|,][0-9]+[.|,][0-9]+)/g,totalPriceText.match(regex)||(regex=/([0-9]+[.|,][0-9]+)/g),totalPriceText=totalPriceText.match(regex)[0];var regInput=new RegExp(unitPriceText,"g"),totalPriceHtml=$(".quickview-product .price").html().replace(regInput,totalPriceText);$(".quickview-product .total-price span").html(totalPriceHtml)}}}})(jQuery);
//# sourceMappingURL=/cdn/shop/t/2/assets/quickview.js.map?v=178850781605103683081688369646
