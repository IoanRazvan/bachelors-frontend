import express from "express";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = 4200;

const app = express();

app.use(express.static(path.join(__dirname, "bachelors-frontend")));

/**
 * Used for k8s liveness and readiness probes
 */
app.get("/health", (req, res) => {
  res.status(200).end();
});

app.get("*", (req, res) => {
  res.sendFile(
    path.join(__dirname, "bachelors-frontend", "index.html")
  );
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
