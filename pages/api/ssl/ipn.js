import { SslCommerzPayment } from 'sslcommerz';
import Order from '../../../models/Order';
import db from '../../../utils/db';

const store_id = process.env.STORE_ID;
const store_passwd = process.env.STORE_PASSWD;
const is_live = false;

const handler = async (req, res) => {
  console.log('ipn checked');
  const data = {
    val_id: req.body.val_id,
  };

  const sslcz = new SslCommerzPayment(store_id, store_passwd, is_live);
  const response = await sslcz.validate(data);

  if (!response) {
    return res.send({ error: 'No response from the payment server' });
  }

  if (response.status === 'INVALID_TRANSACTION') {
    return res.send({
      error: 'Invalid Transaction',
    });
  }

  if (response.status === 'VALIDATED') {
    return res.send({ error: 'Already validated' });
  }

  await db.connect();
  await Order.findByIdAndUpdate(response.tran_id, {
    isPaid: true,
    paidAt: Date.now(),
    paymentStatus: response.risk_level === '1' ? 'On hold' : 'Paid',
  });
  await db.disconnect();
  res.send({ message: 'Order paid successfully' });
};

export default handler;
