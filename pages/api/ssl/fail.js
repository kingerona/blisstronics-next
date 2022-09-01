const handler = async (req, res) => {
  res.status(200).json({
    message: 'Payment failed',
    data: req.body,
  });
};

export default handler;
