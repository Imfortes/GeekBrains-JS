function Basket(idBasket) {
    Container.call(this, idBasket);

    this.countGoods = 0; //Общее количество товаров
    this.amount = 0; //Общая стоимость товаров
    this.basketItems = []; //Массив для хранения товаров

    //Получаем все товары, при созаднии корзины
    this.loadBasketItems();
}

Basket.prototype = Object.create(Container.prototype);
Basket.prototype.constructor = Basket;

Basket.prototype.render = function (root55) {
  var $basketDiv = $('<div />', {
      id: this.id,
      text: 'Корзина'
  });

  var $basketItemsDiv = $('<div />', {
      id: this.id + '_items'
  });

  var $basketItemsList = $('<table><thead><tr><td>Наименование</td><td>Цена</td><td>Удалить</td></tr></thead>' +
      '<tbody id="' + this.id  + '_list"></tbody></table>');

  $basketItemsDiv.appendTo($basketDiv);
  $basketItemsList.appendTo($basketItemsDiv);
  $basketDiv.appendTo(root55);
};


/**
 * Метод получения/загрузки товаров
 */
Basket.prototype.loadBasketItems = function () {

    //var self = this;
    $.get({
        url: './js/Basket.json',
        dataType: 'json',
        context: this,
        async: false,
        success: function (data) {

            this.countGoods = data.basket.length;
            this.amount = data.amount;

            for (var itemKey in data.basket)
            {
                this.basketItems.push(data.basket[itemKey]);
            }
            this.renderItemList();
        }
    });
};

Basket.prototype.add = function (idProduct, title, price, src) {
    var basketItem = {
        "id_product": idProduct,
        "title": title,
        "price": price,
        "src": src
    };
    this.countGoods++;
    this.amount += price;
    this.basketItems.push(basketItem);
};

Basket.prototype.renderItemList = function () {
    var $basketItemsDiv = $('#'+ this.id + '_list');
    $basketItemsDiv.empty();
    for (var itemKey in this.basketItems)
    {
        var $basketGoodsRow = $('<tr><td>' + this.basketItems[itemKey].title + '</td><td>' + this.basketItems[itemKey].price
            +'</td></tr>');

        var $delButton = $('<button />', {
            class: this.id +'__delete',
            'data-index': itemKey,
            text: 'del'
        });
        $basketGoodsRow.append($('<td />').append($delButton));
        $basketGoodsRow.appendTo($basketItemsDiv);
    }
};

Basket.prototype.remove = function (productId) {
    var isDeleted = true;
    for(var i = 0; i < this.basketItems.length; i++)
    {
        if(this.basketItems[i].id_product.toString() === productId.toString()){
            this.countGoods--;
            this.amount -= this.basketItems[i].price;
            this.basketItems.splice(i, 1);
            isDeleted = true;
            break; //Для удаления одного элемента
        }
    }
   return isDeleted;
    //this.refresh(); //Перерисовываем корзину
};



