/*  Author Details
  ==============
  Author: Ranjith Pandi

  Author URL: http://ranjithpandi.com

  Attribution is must on every page, where this work is used.

  For Attribution removal request. please consider contacting us through http://ranjithpandi.com/#contact
*/


;(function ($) {

	var cards = [ { id: 1, img: 'html5.png' }, 
				  { id: 2, img: 'css3.png' }, 
				  { id: 3, img: 'js.jpg' }, 
				  { id: 4, img: 'jquery.png' }, 
				  { id: 5, img: 'json.png' }, 
				  { id: 6, img: 'node.png' }, 
				  { id: 7, img: 'backbone.png' },
				  { id: 8, img: 'ie.jpg' }, 
				  { id: 9, img: 'chrome.png' },
				  { id: 10, img: 'firefox.png' },
				  { id: 11, img: 'git.png' },
				  { id: 12, img: 'wordpress.png' }
				];

	var no_clicks = 0;
	var cardsArr = $.merge(cards, cards);

	$.fn.playGame = function() {
		init();
	};

	init = function() {
		cardHTML();

		$(".card").on('click', function() {
			selectCard($(this));
		});

		$(".replay").on('click', function() {
			no_clicks = 0;
			$(".result").hide();
			$("match").playGame();
		})
	}

	shuffle = function() {
		return 0.5 - Math.random();
	}

	cardHTML = function() {
		cardsArr.sort(shuffle);
		var $cont = [];
		for(var k in cardsArr) {
			$cont.push("<div class='card' data-id='" +cardsArr[k].id+ "'><div class='front'></div><div class='back'><img src='images/" +cardsArr[k].img+ "' width='200' height='200'></div></div>");
		}
		$("#match").html($cont.join(""));
	}

	selectCard = function($cur){
		if($cur.hasClass("turn")) {
			return;
		}

		var id = $cur.data("id");
		$cur.addClass("turn picked");
		no_clicks++;

		var count = $(".picked").length;
		if(count == 2) {
			if($(".picked:first").data("id") == $(".picked:last").data("id")) {
				setMatch();
			}else{
				setTimeout(removeSelect, 1000);
			}
		}
	}

	removeSelect = function() {
		$(".picked").removeClass("turn picked");
	}

	setMatch = function() {
		$(".picked").removeClass("picked");

		var bestClick = getCookie("best_click");
		var count = $(".turn").length;
		var total = $(".card").length;

		if(total == count) {
			if(no_clicks < bestClick || bestClick == -1) {
				bestClick = no_clicks;
				setCookie("best_click", bestClick, 30);
			}

			if(bestClick != -1) {
				$("#bestClick").html(bestClick);
			}

			$("#totalClick").html(no_clicks);
			$(".result").show();
		}
	}

	getCookie = function(cname) {
		var name = cname + "=";
		var ca = document.cookie.split(';');
		for(var i=0; i<ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0)==' '){
				c = c.substring(1);
			}
			if (c.indexOf(name) != -1){
				return c.substring(name.length, c.length);	
			}
		}
		return -1;
	}

	setCookie = function(cname, cvalue, exdays) {
		var d = new Date();
		d.setTime(d.getTime() + (exdays*24*60*60*1000));
		var expires = "expires="+d.toGMTString();
		document.cookie = cname + "=" + cvalue + "; " + expires;
	}

})(jQuery);