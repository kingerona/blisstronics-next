const handler = async (req, res) => {
  res.redirect(303, `/order/${req.body.tran_id}`);
};

export default handler;
