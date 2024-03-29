import { NextApiRequest, NextApiResponse } from 'next';
import { IProperty, Property } from '../../../models/property';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const properties: IProperty[] = await Property.find().populate("user");
            return res.status(200).json(properties);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Error fetching properties' });
        }
    }
    else {
        return res.status(405).json({ error: 'Method not allowed' });
    }
}