import dbConnect from '../../../utils/db_connect'
import dbContext from '../../../models/db_context'
import withProtect from '../../../middleware/with_protect';
dbConnect();

const handler = async (req, res) => {
  const { method } = req;
  if (method !== 'GET') {
    return res
      .status(400)
      .json({ success: false, message: 'Only GET requests are allowed.' });
  }
  //const user = await dbContext.User.findById(req.user.id);
  const agents =
  {
    F1: [],
    F2: [],
    F3: [],
    F4: [],
    F5: []
  }
  const fs1 = await dbContext.User.find({ parentAgentCode: req.user.agentCode });
  agents.F1 = fs1;
  for (let f of agents.F1) {
    const fs = await dbContext.User.find({ parentAgentCode: f.agentCode });
    if (fs.length > 0) {
      for (let ff of fs) {
          agents.F2.push(ff);
      }
    }
  }
  for (let f of agents.F2) { 
    const fs = await dbContext.User.find({ parentAgentCode: f.agentCode });
    if (fs.length > 0) {
      for (let ff of fs) {
        agents.F3.push(ff);
    }
    }
  }
  for (let f of agents.F3) {
    const fs = await dbContext.User.find({ parentAgentCode: f.agentCode });
    if (fs.length > 0) {
      for (let ff of fs) {
        agents.F4.push(ff);
    }
    }
  }
  for (let f of agents.F4) {
    const fs = await dbContext.User.find({ parentAgentCode: f.agentCode });
    if (fs.length > 0) {
      for (let ff of fs) {
        agents.F5.push(ff);
    }
    }
  }
  return res
    .status(200)
    .json(agents);

};

//export default handler;
export default withProtect(handler);
