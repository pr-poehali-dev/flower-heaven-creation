import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Icon from '@/components/ui/icon';

interface Plant {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
}

interface CartItem extends Plant {
  quantity: number;
}

const Index = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const plants: Plant[] = [
    {
      id: 1,
      name: "Монстера Деликатесная",
      price: 2500,
      image: "/img/10fc267b-d01c-48cc-95b9-b03c3e0205bc.jpg",
      description: "Популярное тропическое растение с большими резными листьями",
      category: "Тропические"
    },
    {
      id: 2,
      name: "Суккулент Микс",
      price: 800,
      image: "/img/0e361164-e847-4f57-bb4d-f21cb0a65c7d.jpg",
      description: "Неприхотливое растение для начинающих",
      category: "Суккуленты"
    },
    {
      id: 3,
      name: "Фикус Эластика",
      price: 1800,
      image: "/img/deccacf3-9baa-461d-bf5c-dbf2316c83b6.jpg",
      description: "Элегантное растение с глянцевыми листьями",
      category: "Декоративно-лиственные"
    }
  ];

  const addToCart = (plant: Plant) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === plant.id);
      if (existing) {
        return prev.map(item =>
          item.id === plant.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...plant, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity === 0) {
      removeFromCart(id);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100 sticky top-0 bg-white z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <h1 className="text-2xl font-bold text-black">GreenHome</h1>
              <nav className="hidden md:flex space-x-6">
                <a href="#catalog" className="text-gray-600 hover:text-black transition-colors">Каталог</a>
                <a href="#about" className="text-gray-600 hover:text-black transition-colors">О нас</a>
                <a href="#delivery" className="text-gray-600 hover:text-black transition-colors">Доставка</a>
                <a href="#contacts" className="text-gray-600 hover:text-black transition-colors">Контакты</a>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsCartOpen(!isCartOpen)}
                className="relative"
              >
                <Icon name="ShoppingCart" size={18} />
                {getTotalItems() > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs">
                    {getTotalItems()}
                  </Badge>
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl font-bold text-black mb-6">
            Домашние растения<br />для уютного дома
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Создайте зеленый оазис в своем доме с нашей коллекцией здоровых и красивых растений
          </p>
          <Button size="lg" className="bg-black text-white hover:bg-gray-800">
            Смотреть каталог
          </Button>
        </div>
      </section>

      {/* Catalog Section */}
      <section id="catalog" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-black mb-4">Популярные растения</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Тщательно отобранные растения для создания идеального интерьера
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {plants.map((plant) => (
              <Card key={plant.id} className="group hover:shadow-lg transition-shadow duration-300">
                <div className="aspect-square overflow-hidden bg-gray-50">
                  <img
                    src={plant.image}
                    alt={plant.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg font-semibold">{plant.name}</CardTitle>
                      <CardDescription className="text-sm text-gray-500 mt-1">
                        {plant.category}
                      </CardDescription>
                    </div>
                    <span className="text-xl font-bold text-black">{plant.price}₽</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm mb-4">{plant.description}</p>
                  <Button 
                    onClick={() => addToCart(plant)}
                    className="w-full bg-black text-white hover:bg-gray-800"
                  >
                    Добавить в корзину
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Cart Sidebar */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="absolute right-0 top-0 h-full w-96 bg-white shadow-lg">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold">Корзина</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsCartOpen(false)}
                >
                  <Icon name="X" size={20} />
                </Button>
              </div>
            </div>
            
            <div className="p-6 flex-1 overflow-y-auto">
              {cartItems.length === 0 ? (
                <p className="text-gray-500 text-center">Корзина пуста</p>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center space-x-3 border-b pb-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{item.name}</h4>
                        <p className="text-gray-600 text-sm">{item.price}₽</p>
                        <div className="flex items-center space-x-2 mt-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            -
                          </Button>
                          <span className="text-sm">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            +
                          </Button>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Icon name="Trash2" size={16} />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {cartItems.length > 0 && (
              <div className="p-6 border-t">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-bold">Итого:</span>
                  <span className="font-bold text-xl">{getTotalPrice()}₽</span>
                </div>
                <Button className="w-full bg-black text-white hover:bg-gray-800">
                  Оформить заказ
                </Button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-4xl font-bold text-black mb-8">О нас</h3>
            <p className="text-lg text-gray-600 mb-8">
              GreenHome — это больше чем магазин растений. Мы помогаем людям создавать 
              живые пространства, которые вдохновляют и радуют каждый день.
            </p>
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Leaf" size={24} className="text-white" />
                </div>
                <h4 className="font-semibold mb-2">Качество</h4>
                <p className="text-gray-600 text-sm">Только здоровые и качественные растения</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Heart" size={24} className="text-white" />
                </div>
                <h4 className="font-semibold mb-2">Забота</h4>
                <p className="text-gray-600 text-sm">Консультации по уходу за растениями</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Truck" size={24} className="text-white" />
                </div>
                <h4 className="font-semibold mb-2">Доставка</h4>
                <p className="text-gray-600 text-sm">Бережная доставка по всей России</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Delivery Section */}
      <section id="delivery" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-4xl font-bold text-black mb-8 text-center">Доставка</h3>
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h4 className="text-xl font-semibold mb-4">Условия доставки</h4>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-center">
                    <Icon name="Check" size={16} className="mr-3 text-green-500" />
                    Бесплатная доставка от 3000₽
                  </li>
                  <li className="flex items-center">
                    <Icon name="Check" size={16} className="mr-3 text-green-500" />
                    Доставка в день заказа (Москва)
                  </li>
                  <li className="flex items-center">
                    <Icon name="Check" size={16} className="mr-3 text-green-500" />
                    Специальная упаковка для растений
                  </li>
                  <li className="flex items-center">
                    <Icon name="Check" size={16} className="mr-3 text-green-500" />
                    Гарантия сохранности при доставке
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-xl font-semibold mb-4">Стоимость</h4>
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b">
                    <span>Москва (в пределах МКАД)</span>
                    <span className="font-semibold">300₽</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span>Московская область</span>
                    <span className="font-semibold">500₽</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span>Регионы России</span>
                    <span className="font-semibold">от 800₽</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contacts Section */}
      <section id="contacts" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-4xl font-bold text-black mb-8">Контакты</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Phone" size={24} className="text-white" />
                </div>
                <h4 className="font-semibold mb-2">Телефон</h4>
                <p className="text-gray-600">+7 (495) 123-45-67</p>
              </div>
              <div>
                <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Mail" size={24} className="text-white" />
                </div>
                <h4 className="font-semibold mb-2">Email</h4>
                <p className="text-gray-600">info@greenhome.ru</p>
              </div>
              <div>
                <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="MapPin" size={24} className="text-white" />
                </div>
                <h4 className="font-semibold mb-2">Адрес</h4>
                <p className="text-gray-600">Москва, ул. Садовая, 15</p>
              </div>
            </div>
            <div className="mt-12">
              <p className="text-gray-600 mb-4">Время работы: Пн-Вс 9:00-21:00</p>
              <Button size="lg" className="bg-black text-white hover:bg-gray-800">
                Написать нам
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h4 className="text-2xl font-bold mb-4">GreenHome</h4>
            <p className="text-gray-400 mb-6">
              Создаем зеленые пространства для вашего дома
            </p>
            <div className="flex justify-center space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Icon name="Instagram" size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Icon name="Facebook" size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Icon name="Twitter" size={20} />
              </a>
            </div>
            <Separator className="my-8 bg-gray-800" />
            <p className="text-gray-400 text-sm">
              © 2024 GreenHome. Все права защищены.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;