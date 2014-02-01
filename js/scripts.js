angular.module("App", [])
	.controller('Root', function($rootScope) {
		rootScope = $rootScope;
		rootScope.layoutLeft = 0;
		rootScope.menu = {
			items : [{
				caption: "Торговля"
			}, {
				caption: "Блоги"
			}, {
				caption: "Графики"
			}, {
				caption: "Стратегии"
			}, {
				caption: "Инструменты"
			}, {
				caption: "Люди"
			}, {
				caption: "Услуги"
			}]
		};

		rootScope.user = {
			name: "Konstantin Konstaninopolsky"
			,points: 3479
			,messages: 5
		}


		rootScope.usermenu = {
			items : [{
				caption: "Сообщения"
				,icon: "mail"
			}, {
				caption: "Онлайн-поддержка"
				,icon: "headphone"
				,spec: true
			}, {
				caption: "Личный кабинет"
			}, {
				caption: "Пригласить друзей"
			}, {
				caption: "Настройки"
			}, {
				caption: "Выход"
			}]
		};

		rootScope.moveLayout = function(left) {
			rootScope.layoutLeft = rootScope.layoutLeft == left ? 0 : left;
		}
	});

angular.element(window)
	.on('resize', function(e) {
		for (var i = 0; i < rootScope.menu.items.length; i++) {
			if (rootScope.menu.items[i].hidden) {
				rootScope.menu.items[i].hidden = false;
				i = rootScope.menu.items.length;
			}
		}
		adapt();
	});

angular.element(document).ready(function() {
	adapt();
});

function adapt() {
	rootScope.clientWidth = document.documentElement.clientWidth || document.body.clientWidth;
	rootScope.clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
	rootScope.$apply();

	var logoStyle = getStyle(document.querySelectorAll('.b-logo')[0])
			,menuStyle = getStyle(document.querySelectorAll('.b-menu')[0])
			,userboxStyle = getStyle(document.querySelectorAll('.b-user-box')[0])
			,headerStyle = getStyle(document.querySelectorAll('.b-header')[0])
			,diff = parseInt(headerStyle.width) - (parseInt(logoStyle.width) + parseInt(menuStyle.width) + parseInt(userboxStyle.width));

	if (diff <= 50 && !rootScope.menu.items[0].hidden) {
		for (var i = rootScope.menu.items.length - 1; i >= 0; i--) {
			if (!rootScope.menu.items[i].hidden) {
				rootScope.menu.items[i].hidden = true;
				i = 0;
			}
		}
		adapt();
	}
}


function getStyle(elem) {
	if(!elem) return 0;
	return window.getComputedStyle ? getComputedStyle(elem, '') : elem.currentStyle;
}