import Cookies from 'cookies';

import dbConnect from '../../../utils/db_connect';
import withProtect from '../../../middleware/with_protect';
import withRoles from '../../../middleware/with_roles';

dbConnect();

const handler = async (req, res) => {
  const { method } = req;

  if (method !== 'POST') {
    return res
      .status(400)
      .json({ success: false, message: 'Only POST requests are allowed.' });
  }

  // Removed refreshTokens from database
  req.user.refreshTokens = []; 
  await req.user.save();

  return res.status(200).json({
    success: true,
    data: {},
  });
};

export default withProtect(handler);
//export default withProtect(withRoles(handler, 'admin'));
