import { connect, model, models, Schema } from "mongoose"
const connectionString = process.env.MONGODB_URI_PRO2

export default async function handler(req, res) {
    await connect(connectionString);
    console.log("req.method: ", req.method)

    if (req.method === 'GET') {
        const docs = await Registration.find();
        res.status(200).json(docs)
    } else if (req.method === 'POST') {
        const doc = await Registration.create(req.body)
        res.status(201).json(doc)
    } else {
        res.setHeader('Allow', ['GET', 'POST'])
        res.status(405).end(`Method ${req.method} Not Allowed`)
    }
}

const registrationSchema = new Schema({
    studentID: String,
    courseID: String,
});

const Registration = models?.registrations || model('registrations', registrationSchema);
