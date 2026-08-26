import fs from "node:fs";
import path from "node:path";
import { PDFDocument } from "pdf-lib";

const inputPath = path.resolve(
  "resume/resume.pdf",
);

const existingPdfBytes =
  fs.readFileSync(inputPath);

const pdfDoc =
  await PDFDocument.load(
    existingPdfBytes,
  );

pdfDoc.setTitle(
  "Trần Nguyễn Anh Khoa — Resume",
);

pdfDoc.setAuthor(
  "Trần Nguyễn Anh Khoa",
);

pdfDoc.setSubject(
  "Software Engineer Resume",
);

pdfDoc.setKeywords([
  "Trần Nguyễn Anh Khoa",
  "Resume",
  "Software Engineer",
  "Frontend Engineer",
]);

pdfDoc.setCreator(
  "Trần Nguyễn Anh Khoa Portfolio",
);

pdfDoc.setProducer(
  "Portfolio Resume System",
);

const pdfBytes =
  await pdfDoc.save();

fs.writeFileSync(
  inputPath,
  pdfBytes,
);

console.log(
  "✓ Resume metadata updated successfully.",
);