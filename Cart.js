/*
 Задание: Разработать приложение “конструктор комплексного обеда”.
 Разработанное приложение должно позволять составлять обед из 15 блюд,
 при этом должна быть реализована возможность выбора нескольких порций одного блюда.
 У каждого блюда есть цена, фотография, название, а так же дополнительные поля, которые на ваш взгляд необходимы.
 Список блюд представлен в виде таблицы. Выбранные блюда должны визуально выделяться.
 По мере составления обеда, должен происходить подсчёт общей стоимости.
 После составления обеда пользователь должен иметь возможность подтвердить выбор и как результат этого действия
 во всплывающем окне должно быть отображено подтверждающее сообщение.
 Использовать window.alert для отображения всплывающих окон нельзя,
 вместо этого можно использовать любой сторонний компонент для сокарщения времени разработки.

 Что оценивается: понимание принципа шаблона разработки MVVM,
 уменее правильно струтурировать код в терминах MVVM,
 оптимальное использование возможностей Knockout,
 дизайн UI не должен вызывать отторжения,
 но в тоже время не стоит концентрироваться на нём слишком сильно.

 Обязательные элементы реализации:

 Применить как минимум единожны вычисляемые свойства (computed properties)
 Реализовать пользовательский тип binding-а (custom bindings)
 */

(function () {
    'use strict';
    ko.bindingHandlers.src = {
        update: function (element, valueAccessor) {
            ko.bindingHandlers.attr.update(element, function () {
                return { src: valueAccessor()}
            });
        }
    };

    var dishes = {
        'dish': [
            {
                'name': 'Борщик',
                'category': 'Первое',
                'price': 5000,
                'photo': 'img/borch.jpg',
                'quantity': 0,
                "isChecked": false
            },
            {
                'name': 'Щи',
                'category': 'Первое',
                'price': 3000,
                'photo': 'img/schi.jpg',
                'quantity': 0,
                "isChecked": false
            },
            {
                'name': 'Гороховый',
                'category': 'Первое',
                'price': 2500,
                'photo': 'img/gor.jpg',
                'quantity': 0,
                "isChecked": false
            },
            {
                'name': 'Щавель',
                'category': 'Первое',
                'price': 5000,
                'photo': 'img/schav.jpg',
                'quantity': 0,
                "isChecked": false
            },
            {
                'name': 'Картошечка с котлеткой',
                'category': 'Второе',
                'price': 15000,
                'photo': 'img/kartosch.jpg',
                'quantity': 0,
                "isChecked": false
            },
            {
                'name': 'Гречка с отбивнушкой',
                'category': 'Второе',
                'price': 10000,
                'photo': 'img/gre.jpg',
                'quantity': 0,
                "isChecked": false
            },
            {
                'name': 'Рис с овощами',
                'category': 'Второе',
                'price': 6000,
                'photo': 'img/ris.jpg',
                'quantity': 0,
                "isChecked": false
            },
            {
                'name': 'Овсянка',
                'category': 'Второе',
                'price': 2000,
                'photo': 'img/ovs.jpg',
                'quantity': 0,
                "isChecked": false
            },
            {
                'name': 'Пироженка',
                'category': 'Десерт',
                'price': 4000,
                'photo': 'img/pir.jpg',
                'quantity': 0,
                "isChecked": false
            },
            {
                'name': 'Конфетка',
                'category': 'Десерт',
                'price': 800,
                'photo': 'img/konf.jpg',
                'quantity': 0,
                "isChecked": false
            },
            {
                'name': 'Халва',
                'category': 'Десерт',
                'price': 3000,
                'photo': 'img/halva.jpg',
                'quantity': 0,
                "isChecked": false
            },
            {
                'name': 'Мороженка',
                'category': 'Десерт',
                'price': 4500,
                'photo': 'img/mor.jpg',
                'quantity': 0,
                "isChecked": false
            },
            {
                'name': 'Чай',
                'category': 'Напитки',
                'price': 1000,
                'photo': 'img/tea.jpg',
                'quantity': 0,
                "isChecked": false
            },
            {
                'name': 'Кофе',
                'category': 'Напитки',
                'price': 2000,
                'photo': 'img/kofe.jpg',
                'quantity': 0,
                "isChecked": false
            },
            {
                'name': 'Сок',
                'category': 'Напитки',
                'price': 3000,
                'photo': 'img/sok.jpg',
                'quantity': 0,
                "isChecked": false
            }
        ]
    };

    function DishesViewModel(dishes) {
        var self = this;
        self.isChecked = ko.observable();
        self.name = ko.observable();
        self.category = ko.observable();
        self.price = ko.observable();
        self.photo = ko.observable();
        self.quantity = ko.observable();
        self.subTotal = ko.computed(function () {
            return self.price() * parseInt('0' + self.quantity(), 10);
        });
        ko.mapping.fromJS(dishes, {}, this);
    }

    function CartViewModel() {
        var self = this;
        self.dish = ko.observableArray();
        self.DishChecked = ko.computed(function () {
            for (var i = 0, length = self.dish().length; i < length; i++) {
                if (self.dish()[i].isChecked()) {
                    return true;
                }
            }
            return false;
        });
        self.AllChecked = ko.observable(false);
        self.total = ko.computed(function () {
            var total = 0;
            for (var i = 0, length = self.dish().length; i < length; i++) {
                total += self.dish()[i].isChecked() ? self.dish()[i].subTotal() : 0;
            }
            return total;
        });
        self.formatCurrency = function (value) {
            return value + ' руб';
        };
        self.switchAll = function () {
            var all = self.AllChecked();
            ko.utils.arrayForEach(self.dish(), function (dish) {
                dish.isChecked(all);
            });
            return true;
        };
        self.reset = function () {
            self.AllChecked(false);
            for (var i = 0, length = self.dish().length; i < length; i++) {
                self.dish()[i].isChecked(false);
                self.dish()[i].quantity(0);
            }
        };
        self.save = function () {
            if (self.DishChecked()) {
                var orderData = $.map(self.dish(), function (line) {
                    if (line.isChecked()) {
                        return line.quantity() > 0 ? line.quantity() + ' ' + line.name() : 'Неверно';
                    }
                });
                if(orderData.indexOf('Неверно')+1){
                    jAlert('Неверный ввод');
                    return false;
                }
                jAlert(orderData.toString() + ' заказан(а/ы)');
                self.reset();
            } else {
                jAlert('Ничего не заказано :(')
            }
        };
    }

    var cartViewModel = new CartViewModel();

    var mapping = {
        'dish': {
            create: function (options) {
                return new DishesViewModel(options.data);
            }
        }
    };

    ko.mapping.fromJS(dishes, mapping, cartViewModel);

    ko.applyBindings(cartViewModel);

})();