import { getSession } from 'next-auth/react';
import { SslCommerzPayment } from 'sslcommerz';
import Order from '../../../models/Order';
import User from '../../../models/User';
import db from '../../../utils/db';

const handler = async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).send({ error: 'signin required' });
  }

  const orderId = req.body.orderId;
  await db.connect();
  const order = await Order.findById(orderId);
  const customer = await User.findById(order.user);
  await db.disconnect();

  if (!order) {
    return res.status(401).send({ error: 'Order not found' });
  }

  if (!customer) {
    return res.status(401).send({ error: 'Invalid customer' });
  }

  if (order.isPaid) {
    return res.status(401).send({ error: 'Order is paid already.' });
  }

  const { totalPrice, shippingAddress } = order;
  const paymentDetails = {
    total_amount: totalPrice,
    currency: 'BDT',
    tran_id: orderId, // use unique tran_id for each api call
    success_url: `${process.env.ROOT_URL}/order/${orderId}`,
    fail_url: `${process.env.ROOT_URL}/api/ssl/fail`,
    cancel_url: `${process.env.ROOT_URL}/placeorder`,
    ipn_url: `${process.env.ROOT_URL}/api/ssl/ipn`,
    shipping_method: 'Courier',
    product_name: 'Computer and accessories',
    product_category: 'Electronic',
    product_profile: 'general',
    cus_name: shippingAddress.fullName,
    cus_email: customer.email,
    cus_add1: shippingAddress.address,
    cus_add2: '',
    cus_city: shippingAddress.city,
    cus_state: '',
    cus_postcode: shippingAddress.postalCode,
    cus_country: shippingAddress.country,
    cus_phone: shippingAddress.phone,
    cus_fax: '',
    ship_name: shippingAddress.fullName,
    ship_add1: shippingAddress.address,
    ship_add2: '',
    ship_city: shippingAddress.city,
    ship_state: '',
    ship_postcode: shippingAddress.postalCode,
    ship_country: shippingAddress.country,
  };

  const store_id = process.env.STORE_ID;
  const store_passwd = process.env.STORE_PASSWD;
  const is_live = false;

  const sslcz = new SslCommerzPayment(store_id, store_passwd, is_live);
  const response = await sslcz.init(paymentDetails);

  if (!response) {
    return res.status(401).send({ error: 'No response from payment server!' });
  }

  const GatewayPageURL = await response.GatewayPageURL;

  res.status(201).send({ message: 'Payment session created', GatewayPageURL });
};

export default handler;
