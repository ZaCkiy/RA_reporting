import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "data.json");

export default function handler(req, res) {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([]));
  }

  const data = JSON.parse(fs.readFileSync(filePath));

  if (req.method === "GET") {
    return res.status(200).json(data);
  }

  if (req.method === "POST") {
    data.push(req.body);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    return res.status(200).json({ success: true });
  }

  res.status(405).json({ message: "Method not allowed" });
}
