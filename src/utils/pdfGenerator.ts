import jsPDF from "jspdf";
import { ResumeData } from "@/types/resume";

export const generatePDF = (data: ResumeData) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  let y = 20;

  const formatDate = (date: string) => {
    if (!date) return "";
    const [year, month] = date.split("-");
    return `${month}/${year}`;
  };

  // Header
  doc.setFontSize(24);
  doc.setTextColor(34, 78, 156); // Primary color
  doc.text(data.personalInfo.fullName || "Your Name", margin, y);
  y += 10;

  // Contact Info
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  const contactInfo = [
    data.personalInfo.email,
    data.personalInfo.phone,
    data.personalInfo.location,
  ]
    .filter(Boolean)
    .join(" | ");
  doc.text(contactInfo, margin, y);
  y += 5;

  if (data.personalInfo.linkedin || data.personalInfo.website) {
    const links = [data.personalInfo.linkedin, data.personalInfo.website]
      .filter(Boolean)
      .join(" | ");
    doc.text(links, margin, y);
    y += 8;
  }

  // Line separator
  doc.setDrawColor(34, 78, 156);
  doc.setLineWidth(0.5);
  doc.line(margin, y, pageWidth - margin, y);
  y += 8;

  // Summary
  if (data.summary) {
    doc.setFontSize(14);
    doc.setTextColor(34, 78, 156);
    doc.text("Professional Summary", margin, y);
    y += 6;

    doc.setFontSize(10);
    doc.setTextColor(50, 50, 50);
    const summaryLines = doc.splitTextToSize(data.summary, pageWidth - 2 * margin);
    doc.text(summaryLines, margin, y);
    y += summaryLines.length * 5 + 6;
  }

  // Experience
  if (data.experience.length > 0) {
    doc.setFontSize(14);
    doc.setTextColor(34, 78, 156);
    doc.text("Work Experience", margin, y);
    y += 6;

    data.experience.forEach((exp) => {
      if (y > 270) {
        doc.addPage();
        y = 20;
      }

      doc.setFontSize(12);
      doc.setTextColor(50, 50, 50);
      doc.setFont(undefined, "bold");
      doc.text(exp.position, margin, y);
      y += 5;

      doc.setFont(undefined, "normal");
      doc.setTextColor(34, 78, 156);
      doc.text(exp.company, margin, y);
      y += 5;

      doc.setFontSize(9);
      doc.setTextColor(100, 100, 100);
      const dateRange = `${formatDate(exp.startDate)} - ${exp.current ? "Present" : formatDate(exp.endDate)}`;
      doc.text(dateRange, margin, y);
      y += 5;

      if (exp.description) {
        doc.setFontSize(10);
        doc.setTextColor(50, 50, 50);
        const descLines = doc.splitTextToSize(exp.description, pageWidth - 2 * margin);
        doc.text(descLines, margin, y);
        y += descLines.length * 5;
      }
      y += 4;
    });
    y += 4;
  }

  // Education
  if (data.education.length > 0) {
    if (y > 250) {
      doc.addPage();
      y = 20;
    }

    doc.setFontSize(14);
    doc.setTextColor(34, 78, 156);
    doc.text("Education", margin, y);
    y += 6;

    data.education.forEach((edu) => {
      if (y > 270) {
        doc.addPage();
        y = 20;
      }

      doc.setFontSize(12);
      doc.setTextColor(50, 50, 50);
      doc.setFont(undefined, "bold");
      doc.text(edu.degree, margin, y);
      y += 5;

      doc.setFont(undefined, "normal");
      doc.setTextColor(34, 78, 156);
      doc.text(edu.institution, margin, y);
      y += 5;

      doc.setFontSize(9);
      doc.setTextColor(100, 100, 100);
      const eduInfo = `${edu.field} | ${formatDate(edu.startDate)} - ${edu.current ? "Present" : formatDate(edu.endDate)}`;
      doc.text(eduInfo, margin, y);
      y += 6;
    });
    y += 4;
  }

  // Skills
  if (data.skills.length > 0) {
    if (y > 260) {
      doc.addPage();
      y = 20;
    }

    doc.setFontSize(14);
    doc.setTextColor(34, 78, 156);
    doc.text("Skills", margin, y);
    y += 6;

    doc.setFontSize(10);
    doc.setTextColor(50, 50, 50);
    const skillsText = data.skills.join(" • ");
    const skillLines = doc.splitTextToSize(skillsText, pageWidth - 2 * margin);
    doc.text(skillLines, margin, y);
    y += skillLines.length * 5 + 6;
  }

  // Projects
  if (data.projects.length > 0) {
    if (y > 250) {
      doc.addPage();
      y = 20;
    }

    doc.setFontSize(14);
    doc.setTextColor(34, 78, 156);
    doc.text("Projects", margin, y);
    y += 6;

    data.projects.forEach((proj) => {
      if (y > 270) {
        doc.addPage();
        y = 20;
      }

      doc.setFontSize(12);
      doc.setTextColor(50, 50, 50);
      doc.setFont(undefined, "bold");
      doc.text(proj.name, margin, y);
      y += 5;

      if (proj.technologies) {
        doc.setFontSize(9);
        doc.setFont(undefined, "normal");
        doc.setTextColor(34, 78, 156);
        doc.text(proj.technologies, margin, y);
        y += 5;
      }

      if (proj.description) {
        doc.setFontSize(10);
        doc.setTextColor(50, 50, 50);
        const projLines = doc.splitTextToSize(proj.description, pageWidth - 2 * margin);
        doc.text(projLines, margin, y);
        y += projLines.length * 5;
      }

      if (proj.link) {
        doc.setFontSize(9);
        doc.setTextColor(0, 150, 200);
        doc.text(proj.link, margin, y);
        y += 5;
      }
      y += 4;
    });
  }

  // Save the PDF
  const fileName = data.personalInfo.fullName
    ? `${data.personalInfo.fullName.replace(/\s+/g, "_")}_Resume.pdf`
    : "Resume.pdf";
  doc.save(fileName);
};
