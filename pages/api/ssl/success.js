import toast from 'react-hot-toast';
import { SslCommerzPayment } from 'sslcommerz';
import Order from '../../../models/Order';
import db from '../../../utils/db';

const store_id = process.env.STORE_ID;
const store_passwd = process.env.STORE_PASSWD;
const is_live = false;

const handler = async (req, res) => {
  console.log('success checked');
  const data = {
    val_id: req.body.val_id,
  };

  const sslcz = new SslCommerzPayment(store_id, store_passwd, is_live);
  const response = await sslcz.validate(data);

  if (response.status === 'INVALID_TRANSACTION') {
    return res.send({
      message: 'Invalid Transaction',
    });
  }

  await db.connect();
  const orderDate = new Date();
  await Order.findByIdAndUpdate(response.tran_id, {
    isPaid: true,
    paidAt: orderDate.toLocaleString(),
  });
  await db.disconnect();
  res.redirect(`/order/${response.tran_id}`);
  toast.success('payment successful');
};

export default handler;
