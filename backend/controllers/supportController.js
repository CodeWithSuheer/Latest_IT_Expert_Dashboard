import { Clients } from "../models/clientModel.js";
import  {Support}  from "../models/supportModel.js"




export const getAllSupports = async (req, res, next) => {
    try {
        const supportData = await Support.find({}).sort({createdAt: -1});
        const supportWithClientsData = await Promise.all(
            supportData.map(async (support) => {
                const client = await Clients.findOne({ customerId: support.customerId });
                return {
                    support,
                    client,
                };
            })
        );
        res.status(200).json(supportWithClientsData);
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};
