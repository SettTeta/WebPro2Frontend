import { connect, model, models, Schema } from "mongoose"
const connectionString = process.env.MONGODB_URI_PRO2

export default async function handler(req, res) {
    await connect(connectionString);
    console.log("req.method: ", req.method)

    if (req.method === 'GET') {
        const docs = await Course.find();
        res.status(200).json(docs)
    } else if (req.method === 'POST') {
        const doc = await Course.create(req.body)
        res.status(201).json(doc)
    } else {
        res.setHeader('Allow', ['GET', 'POST'])
        res.status(405).end(`Method ${req.method} Not Allowed`)
    }
}

const courseSchema = new Schema({
    code: String,
    title: String,
    instructor: String,
    date: String,
    time: String,
    credit: String,
});

const Course = models?.courses || model('course', courseSchema);
