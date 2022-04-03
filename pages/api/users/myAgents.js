import dbConnect from '../../../utils/db_connect'
import dbContext from '../../../models/db_context'
import withProtect from '../../../middleware/with_protect';
import { saleAgg } from '../../../helpers/sale_agg';
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

  for (let ff of fs1) { 
    let myFF = {
      ...ff._doc,
      totalSales: 0,
      countSales: 0
    };
    const sale = await saleAgg(dbContext, ff._id);
    if (sale.length > 0) { 
      myFF.totalSales = sale[0].totalSales;
      myFF.countSales = sale[0].countSales;
    }
    agents.F1.push(myFF);
  }
  for (let f of agents.F1) {
    const fs = await dbContext.User.find({ parentAgentCode: f.agentCode });
    if (fs.length > 0) {
      for (let ff of fs) {

        let myFF = {
          ...ff._doc,
          totalSales: 0,
          countSales: 0
        };
        const sale = await saleAgg(dbContext, ff._id);
        if (sale.length > 0) { 
          myFF.totalSales = sale[0].totalSales;
          myFF.countSales = sale[0].countSales;
        }
        agents.F2.push(myFF);
      }
    }
  }
  for (let f of agents.F2) {
    const fs = await dbContext.User.find({ parentAgentCode: f.agentCode });
    if (fs.length > 0) {
      for (let ff of fs) {
        let myFF = {
          ...ff._doc,
          totalSales: 0,
          countSales: 0
        };
        const sale = saleAgg(dbContext, ff._id);
        if (sale.length > 0) {
          myFF.totalSales = sale[0].totalSales;
          myFF.countSales = sale[0].countSales;
        }
        agents.F3.push(myFF);
      }
    }
  }
  for (let f of agents.F3) {
    const fs = await dbContext.User.find({ parentAgentCode: f.agentCode });
    if (fs.length > 0) {
      for (let ff of fs) {
        let myFF = {
          ...ff._doc,
          totalSales: 0,
          countSales: 0
        };
        const sale = await saleAgg(dbContext, ff._id);
        if (sale.length > 0) {
          myFF.totalSales = sale[0].totalSales;
          myFF.countSales = sale[0].countSales;
        }
        agents.F4.push(myFF);
      }
    }
  }
  for (let f of agents.F4) {
    const fs = await dbContext.User.find({ parentAgentCode: f.agentCode });
    if (fs.length > 0) {
      for (let ff of fs) {
        let myFF = {
          ...ff._doc,
          totalSales: 0,
          countSales: 0
        };
        const sale = await saleAgg(dbContext, ff._id);
        if (sale.length > 0) {
          myFF.totalSales = sale[0].totalSales;
          myFF.countSales = sale[0].countSales;
        }
        agents.F5.push(myFF);
      }
    }
  }
  return res
    .status(200)
    .json(agents);

};

//export default handler;
export default withProtect(handler);
