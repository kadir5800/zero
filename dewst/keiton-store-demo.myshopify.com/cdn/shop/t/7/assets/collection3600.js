(function($){$(document).ready(function(){collection.init()}),$(".engoj-collection-sidebar")&&History.Adapter.bind(window,"statechange",function(){var State=History.getState();if(!collection.fillterClick){collection.filterParams();var newurl=collection.filterCreateUrl();collection.filterGetContent(newurl),collection.resetFilter()}collection.fillterClick=!1});var collection={init:function(){this.initCollectionFilter(),this.initCollectionSorting()},initReview:function(){},initToggle:function(){},filterCategories:function(){},fillterTagEvents:function(){$("body").delegate('.filter-tag a:not(".clear"), .filter-tag label',"click",function(e){$(this).toggleClass("active");var currentTags=[];if(Shopify.queryParams.constraint&&(currentTags=Shopify.queryParams.constraint.split("+")),!window.filter_mul_choice&&!$(this).prev().is(":checked")){var otherTag=$(this).parents(".filter-tag").find("input:checked");if(otherTag.length>0){var tagName=otherTag.val();if(tagName){var tagPos=currentTags.indexOf(tagName);tagPos>=0&&currentTags.splice(tagPos,1)}}}var tagName=$(this).prev().val();if(tagName){var tagPos=currentTags.indexOf(tagName);tagPos>=0?currentTags.splice(tagPos,1):currentTags.push(tagName)}currentTags.length?Shopify.queryParams.constraint=currentTags.join("+"):delete Shopify.queryParams.constraint,collection.filterAjaxClick(),e.preventDefault()})},filterMapClearAll:function(){$("body").delegate(".refined-widgets a.clear-all","click",function(e){delete Shopify.queryParams.constraint,delete Shopify.queryParams.q,collection.filterAjaxClick(),e.preventDefault(),$('.filter-tag a:not(".clear"), .filter-tag label').removeClass("active")}),$("body").delegate(".filter-block .clear","click",function(e){var currentTags=[],filterTag=$(this).parent().parent();Shopify.queryParams.constraint&&(currentTags=Shopify.queryParams.constraint.split("+")),filterTag.find("input:checked").each(function(){var selectedTag=$(this),tagName=selectedTag.val();if(tagName){var tagPos=currentTags.indexOf(tagName);tagPos>=0&&currentTags.splice(tagPos,1)}}),filterTag.find("a").each(function(){$(this).removeClass("active")}),currentTags.length?Shopify.queryParams.constraint=currentTags.join("+"):delete Shopify.queryParams.constraint,collection.filterAjaxClick(),e.preventDefault()})},filterMapClear:function(){$(".filter-tag").each(function(){var filterTag=$(this);filterTag.find("input:checked").length>0&&filterTag.find(".clear").show().click(function(e){var currentTags=[];Shopify.queryParams.constraint&&(currentTags=Shopify.queryParams.constraint.split("+")),filterTag.find("input:checked").each(function(){var selectedTag=$(this),tagName=selectedTag.val();if(tagName){var tagPos=currentTags.indexOf(tagName);tagPos>=0&&currentTags.splice(tagPos,1)}}),currentTags.length?Shopify.queryParams.constraint=currentTags.join("+"):delete Shopify.queryParams.constraint,collection.filterAjaxClick(),e.preventDefault()})})},filterParams:function(){if(Shopify.queryParams={},location.search.length)for(var aKeyValue,i=0,aCouples=location.search.substr(1).split("&");i<aCouples.length;i++)aKeyValue=aCouples[i].split("="),aKeyValue.length>1&&(Shopify.queryParams[decodeURIComponent(aKeyValue[0])]=decodeURIComponent(aKeyValue[1]))},filterMapEvents:function(){collection.fillterTagEvents()},resetFilter:function(){$(".filter-custom .active, .filter-links .active").removeClass("active"),$(".filter-tag input:checked").attr("checked",!1);var cat=location.pathname.match(/\/collections\/(.*)(\?)?/);cat&&cat[1]&&$(".filter-links a[href='"+cat[0]+"']").addClass("active")},filterMapData:function(data){var currentList=$(".grid-uniform"),productList=$(data).find(".grid-uniform");currentList.replaceWith(productList),$(".pagination").length>0&&$(".pagination").replaceWith($(data).find(".pagination")),$(".filter-blocks").replaceWith($(data).find(".filter-blocks")),collection.filterMapClear(),quickView();var ajaxCartConfig={cartContainer:".enj-minicart-ajax",addToCartSelector:".enj-add-to-cart-btn",cartCountSelector:".enj-cartcount",cartCostSelector:".enj-cartcost",moneyFormat:null};jQuery(function($2){ajaxCart.init(ajaxCartConfig)});function loadmore(){$(".loadmore").children("a").on("click",function(e){$(".loadmore").addClass("d-none"),$(".loading.tshopify-popup").addClass("active");var link=$(".loadmore").children("a").attr("href");link!="#"?($(".load-data").load(link+" .product-grid-view .row"),setTimeout(function(){$(".load-data .js_loadmore").each(function(){$(this).appendTo(".product-grid-view .row")}),$(".loadmore").eq(0).remove(),loadmore(),quickView();var ajaxCartConfig2={cartContainer:".enj-minicart-ajax",addToCartSelector:".enj-add-to-cart-btn",cartCountSelector:".enj-cartcount",cartCostSelector:".enj-cartcost",moneyFormat:null};jQuery(function($2){ajaxCart.init(ajaxCartConfig2)}),$(".loading.tshopify-popup").removeClass("active")},2e3)):$(".loadmore").remove(),e.preventDefault()})}loadmore(),jQuery(".engoj_select_color a").each(function(){jQuery(this).on("click",function(){var engoImage=jQuery(this).data("engojvariant-img");return jQuery(this).parents(".engoj_grid_parent").find(".engoj_find_img img").attr({src:engoImage}),!1})})},filterCreateUrl:function(baseLink){var newQuery=$.param(Shopify.queryParams).replace(/%2B/g,"+");return baseLink?newQuery!=""?baseLink+"?"+newQuery:baseLink:location.pathname+"?"+newQuery},filterAjaxClick:function(baseLink){delete Shopify.queryParams.page;var newurl=collection.filterCreateUrl(baseLink);collection.fillterClick=!0,History.pushState({param:Shopify.queryParams},newurl,newurl),collection.filterGetContent(newurl)},filterGetContent:function(newurl){$.ajax({type:"get",url:newurl,beforeSend:function(){showPopup(".loading")},success:function(data){collection.filterMapData(data),collection.filterMapClear(),hidePopup(".loading"),hidePopup(".filter-to-left , .js-bg")},error:function(xhr,text){hidePopup(".loading"),hidePopup(".filter-to-left, .js-bg"),$(".ajax-error-message").text($.parseJSON(xhr.responseText).description),showPopup(".ajax-error-modal")}})},initCollectionFilter:function(){$(".engoj-collection-sidebar").length>0&&(collection.filterParams(),collection.filterMapEvents(),collection.filterMapClear(),collection.filterMapClearAll())},initCollectionSorting:function(e){$(".collection-sorting a").click(function(e2){e2.preventDefault(),$(this).parent().hasClass("active")||(Shopify.queryParams.sort_by=$(this).attr("href"),collection.filterAjaxClick(),$(".collection-sorting li.active").removeClass("active"),$(this).parent().addClass("active"));var selected=$(this).text();$(this).closest(".dropdown").find(".dropdown-label").text(selected),$(this).closest(".dropdown-content").removeClass("active")})},initCollectionViewMode:function(){},initCollectionShow:function(){},initPaging:function(){}}})(jQuery);
//# sourceMappingURL=/cdn/shop/t/7/assets/collection.js.map?v=71617923839282046691688631756
