import bcrypt from 'bcryptjs';

const data = {
  users: [
    {
      name: 'John',
      email: 'admin@example.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: true,
    },
    {
      name: 'Jane',
      email: 'user@example.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: false,
    },
  ],

  products: [
    {
      id: 1,
      name: 'Product 1',
      slug: 'product-1',
      type: 'variable',
      category: ['Keyboard'],
      brand: 'Gigabyte',
      description: 'Short description',
      price: 600,
      imageUrl: '/images/product-1.jpg',
      stockAmount: 10,
      isFeatured: true,
      isVisible: true,
      isOneSale: false,
      salePrice: 500,
      saleStarts: 'start-date-2022',
      saleEnds: 'end-date-2022',
      rating: 4.5,
      reviewCount: 10,
      variations: [
        {
          name: 'variation1',
          imageUrl: '/images/product-9.jpg',
          attributes: {
            color: 'black',
            switch: 1,
          },
        },
        {
          name: 'variation2',
          imageUrl: '/images/product-10.jpg',
          attributes: {
            color: 'white',
            switch: 1,
          },
        },
        {
          name: 'variation3',
          imageUrl: '/images/product-11.jpg',
          attributes: {
            color: 'black',
            switch: 1,
          },
        },
        {
          name: 'variation4',
          imageUrl: '/images/product-12.jpg',
          attributes: {
            color: 'white',
            switch: 1,
          },
        },
      ],
    },
    {
      id: 2,
      name: 'Product 2',
      slug: 'product-2',
      type: 'simple',
      category: ['Keyboard'],
      brand: 'Gigabyte',
      description: 'Short description',
      price: 600,
      imageUrl: '/images/product-2.jpg',
      stockAmount: 10,
      isFeatured: false,
      isVisible: true,
      isOneSale: false,
      salePrice: 500,
      saleStarts: 'start-date-2022',
      saleEnds: 'end-date-2022',
      rating: 4.5,
      reviewCount: 10,
    },
    {
      id: 3,
      name: 'Product 3',
      slug: 'product-3',
      type: 'simple',
      category: ['Mouse'],
      brand: 'Gigabyte',
      description: 'Short description',
      price: 600,
      imageUrl: '/images/product-3.jpg',
      stockAmount: 10,
      isFeatured: true,
      isVisible: true,
      isOneSale: false,
      salePrice: 500,
      saleStarts: 'start-date-2022',
      saleEnds: 'end-date-2022',
      rating: 4.5,
      reviewCount: 10,
    },
    {
      id: 4,
      name: 'Product 4',
      slug: 'product-4',
      type: 'simple',
      category: ['Mouse'],
      brand: 'Gigabyte',
      description: 'Short description',
      price: 600,
      imageUrl: '/images/product-4.jpg',
      stockAmount: 10,
      isFeatured: false,
      isVisible: true,
      isOneSale: false,
      salePrice: 500,
      saleStarts: 'start-date-2022',
      saleEnds: 'end-date-2022',
      rating: 4.5,
      reviewCount: 10,
    },
    {
      id: 5,
      name: 'Product 5',
      slug: 'product-5',
      type: 'simple',
      category: ['Keyboard'],
      brand: 'Asus',
      description: 'Short description',
      price: 600,
      imageUrl: '/images/product-5.jpg',
      stockAmount: 10,
      isFeatured: true,
      isVisible: true,
      isOneSale: false,
      salePrice: 500,
      saleStarts: 'start-date-2022',
      saleEnds: 'end-date-2022',
      rating: 4.5,
      reviewCount: 10,
    },
    {
      id: 6,
      name: 'Product 6',
      category: ['Keyboard'],
      slug: 'product-6',
      type: 'simple',
      brand: 'Asus',
      description: 'Short description',
      price: 600,
      imageUrl: '/images/product-6.jpg',
      stockAmount: 10,
      isFeatured: false,
      isVisible: true,
      isOneSale: false,
      salePrice: 500,
      saleStarts: 'start-date-2022',
      saleEnds: 'end-date-2022',
      rating: 4.5,
      reviewCount: 10,
    },
    {
      id: 7,
      name: 'Product 7',
      slug: 'product-7',
      type: 'simple',
      category: ['Mouse'],
      brand: 'Asus',
      description: 'Short description',
      price: 600,
      imageUrl: '/images/product-7.jpg',
      stockAmount: 10,
      isFeatured: true,
      isVisible: true,
      isOneSale: false,
      salePrice: 500,
      saleStarts: 'start-date-2022',
      saleEnds: 'end-date-2022',
      rating: 4.5,
      reviewCount: 10,
    },
    {
      id: 8,
      name: 'Product 8',
      slug: 'product-8',
      type: 'simple',
      category: ['Mouse'],
      brand: 'Asus',
      description: 'Short description',
      price: 600,
      imageUrl: '/images/product-8.jpg',
      stockAmount: 10,
      isFeatured: false,
      isVisible: true,
      isOneSale: false,
      salePrice: 500,
      saleStarts: 'start-date-2022',
      saleEnds: 'end-date-2022',
      rating: 4.5,
      reviewCount: 10,
    },
  ],
};

export default data;
