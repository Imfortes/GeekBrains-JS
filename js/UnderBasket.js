/**
 *
 * @param basket
 * @param classProductCount
 * @param classProductContainer
 * @param classTotalPrice
 * @constructor
 */
function UnderBasket(basket, classProductCount, classProductContainer, classTotalPrice) {
    this.basket = basket;
    this.classProductCount = classProductCount;
    this.classProductContainer = classProductContainer;
    this.classTotalPrice = classTotalPrice;

    //Удаляем товар из корзины
    var self = this;
    $(this.classProductContainer).on('click', 'a.cancel', function () {
        var idProduct = $(this).attr('data-id');
        if(basket.remove(idProduct)){
            self.updateView();
        }

    });
}

/**
 * Обновление товаров, отображаемых в корзине
 */
UnderBasket.prototype.updateView = function () {
  //console.log(this.basket.basketItems);

    //Отображаем количество товаров
    $(this.classProductCount).text(this.basket.basketItems.length);


    var $ulContainer = $(this.classProductContainer);
    //Очищаем контейнер
    $ulContainer.empty();

    var totalPrice = 0;

    var self = this;
    this.basket.basketItems.forEach(function (value, index) {
        totalPrice += value.price;
        $ulContainer.append(self.getProductTopElement(value, index));
    });

    $(this.classTotalPrice).text(totalPrice.toString());
};

/**
 *
 * @param product
 * @param index
 * @returns {jQuery|HTMLElement}
 */
UnderBasket.prototype.getProductTopElement = function (product, index) {
    var $li = $('<li />', {
        class: 'under_basket-item'
    });

    var $aImg = $('<a />', {
        href: '#'
    });

    var $img = $('<img />', {
        src: product.src,
        alt: 'Изображение №' + index,
        class: 'under_basket-mer'
    });

    var $h2 = $('<h2 />', {
        class: 'item-title',
        text: product.title
    });

    var $p = $('<p />', {
        html: '1 x &#36;'
    });

    var $spanPrice = $('<span />', {
        class: 'item-price',
        text: product.price
    });

    var $aCancel = $('<a />', {
        class: 'cancel',
        href: '#',
        "data-id": product.id_product
    });

    var $imgCancel = $('<img />', {
        class: 'under_basket-cancel',
        src: 'img/1827.png',
        alt: 'Удалить товар из корзины'
    });

    $aImg.append($img);
    $li.append($aImg);
    $li.append($h2);
    $p.append($spanPrice);
    $li.append($p);
    $aCancel.append($imgCancel);
    $li.append($aCancel);

    return $li; //Полностью элемент
};