const handler = async (req, res) => {
  res.redirect(`/order/${req.body.tran_id}`);
};

export default handler;
