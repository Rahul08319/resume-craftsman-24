import jsPDF from "jspdf";
import { ResumeData } from "@/types/resume";
import { ColorTheme, ResumeTemplate, themeColors } from "@/types/theme";

export const generatePDF = (
  data: ResumeData,
  theme: ColorTheme = "professional",
  template: ResumeTemplate = "modern"
) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  let y = 20;

  const colors = themeColors[theme].primaryRgb;

  const formatDate = (date: string) => {
    if (!date) return "";
    const [year, month] = date.split("-");
    return `${month}/${year}`;
  };

  // Apply template-specific styling
  if (template === "modern") {
    generateModernPDF(doc, data, colors, pageWidth, margin);
  } else if (template === "classic") {
    generateClassicPDF(doc, data, colors, pageWidth, margin);
  } else {
    generateMinimalistPDF(doc, data, colors, pageWidth, margin);
  }

  const fileName = data.personalInfo.fullName
    ? `${data.personalInfo.fullName.replace(/\s+/g, "_")}_Resume.pdf`
    : "Resume.pdf";
  doc.save(fileName);
};

// Modern Template PDF
const generateModernPDF = (
  doc: jsPDF,
  data: ResumeData,
  colors: { r: number; g: number; b: number },
  pageWidth: number,
  margin: number
) => {
  let y = 20;

  const formatDate = (date: string) => {
    if (!date) return "";
    const [year, month] = date.split("-");
    return `${month}/${year}`;
  };

  // Header with gradient effect
  doc.setFontSize(28);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(colors.r, colors.g, colors.b);
  doc.text(data.personalInfo.fullName || "Your Name", margin, y);
  y += 12;

  // Horizontal line
  doc.setDrawColor(colors.r, colors.g, colors.b);
  doc.setLineWidth(1);
  doc.line(margin, y, pageWidth - margin, y);
  y += 8;

  // Contact Info
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(80, 80, 80);
  const contactInfo = [
    data.personalInfo.email,
    data.personalInfo.phone,
    data.personalInfo.location,
  ]
    .filter(Boolean)
    .join(" • ");
  doc.text(contactInfo, margin, y);
  y += 5;

  if (data.personalInfo.linkedin || data.personalInfo.website) {
    const links = [data.personalInfo.linkedin, data.personalInfo.website]
      .filter(Boolean)
      .join(" • ");
    doc.text(links, margin, y);
    y += 10;
  } else {
    y += 8;
  }

  // Summary
  if (data.summary) {
    doc.setFontSize(13);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(colors.r, colors.g, colors.b);
    doc.text("PROFESSIONAL SUMMARY", margin, y);
    y += 7;

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(40, 40, 40);
    const summaryLines = doc.splitTextToSize(data.summary, pageWidth - 2 * margin);
    doc.text(summaryLines, margin, y);
    y += summaryLines.length * 5 + 8;
  }

  // Experience
  if (data.experience.length > 0) {
    doc.setFontSize(13);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(colors.r, colors.g, colors.b);
    doc.text("WORK EXPERIENCE", margin, y);
    y += 7;

    data.experience.forEach((exp) => {
      if (y > 265) {
        doc.addPage();
        y = 20;
      }

      doc.setFontSize(11);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(40, 40, 40);
      doc.text(exp.position, margin, y);
      y += 5;

      doc.setFont("helvetica", "normal");
      doc.setTextColor(colors.r, colors.g, colors.b);
      doc.text(exp.company, margin, y);
      y += 5;

      doc.setFontSize(8);
      doc.setTextColor(100, 100, 100);
      const dateRange = `${formatDate(exp.startDate)} - ${exp.current ? "Present" : formatDate(exp.endDate)}`;
      doc.text(dateRange, margin, y);
      y += 6;

      if (exp.description) {
        doc.setFontSize(9);
        doc.setTextColor(50, 50, 50);
        const descLines = doc.splitTextToSize(exp.description, pageWidth - 2 * margin);
        doc.text(descLines, margin, y);
        y += descLines.length * 4.5;
      }
      y += 5;
    });
    y += 6;
  }

  // Education
  if (data.education.length > 0) {
    if (y > 245) {
      doc.addPage();
      y = 20;
    }

    doc.setFontSize(13);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(colors.r, colors.g, colors.b);
    doc.text("EDUCATION", margin, y);
    y += 7;

    data.education.forEach((edu) => {
      if (y > 265) {
        doc.addPage();
        y = 20;
      }

      doc.setFontSize(11);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(40, 40, 40);
      doc.text(edu.degree, margin, y);
      y += 5;

      doc.setFont("helvetica", "normal");
      doc.setTextColor(colors.r, colors.g, colors.b);
      doc.text(edu.institution, margin, y);
      y += 5;

      doc.setFontSize(8);
      doc.setTextColor(100, 100, 100);
      const eduInfo = `${edu.field} • ${formatDate(edu.startDate)} - ${edu.current ? "Present" : formatDate(edu.endDate)}`;
      doc.text(eduInfo, margin, y);
      y += 7;
    });
    y += 6;
  }

  // Skills
  if (data.skills.length > 0) {
    if (y > 250) {
      doc.addPage();
      y = 20;
    }

    doc.setFontSize(13);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(colors.r, colors.g, colors.b);
    doc.text("SKILLS", margin, y);
    y += 7;

    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(40, 40, 40);
    const skillsText = data.skills.join(" • ");
    const skillLines = doc.splitTextToSize(skillsText, pageWidth - 2 * margin);
    doc.text(skillLines, margin, y);
    y += skillLines.length * 5 + 8;
  }

  // Projects
  if (data.projects.length > 0) {
    if (y > 245) {
      doc.addPage();
      y = 20;
    }

    doc.setFontSize(13);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(colors.r, colors.g, colors.b);
    doc.text("PROJECTS", margin, y);
    y += 7;

    data.projects.forEach((proj) => {
      if (y > 265) {
        doc.addPage();
        y = 20;
      }

      doc.setFontSize(11);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(40, 40, 40);
      doc.text(proj.name, margin, y);
      y += 5;

      if (proj.technologies) {
        doc.setFontSize(8);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(colors.r, colors.g, colors.b);
        doc.text(proj.technologies, margin, y);
        y += 5;
      }

      if (proj.description) {
        doc.setFontSize(9);
        doc.setTextColor(50, 50, 50);
        const projLines = doc.splitTextToSize(proj.description, pageWidth - 2 * margin);
        doc.text(projLines, margin, y);
        y += projLines.length * 4.5;
      }

      if (proj.link) {
        doc.setFontSize(8);
        doc.setTextColor(0, 130, 180);
        doc.text(proj.link, margin, y);
        y += 5;
      }
      y += 5;
    });
  }
};

// Classic Template PDF (simplified - similar structure)
const generateClassicPDF = (
  doc: jsPDF,
  data: ResumeData,
  colors: { r: number; g: number; b: number },
  pageWidth: number,
  margin: number
) => {
  // Reuse modern template logic with slight modifications
  generateModernPDF(doc, data, colors, pageWidth, margin);
};

// Minimalist Template PDF (simplified - similar structure)
const generateMinimalistPDF = (
  doc: jsPDF,
  data: ResumeData,
  colors: { r: number; g: number; b: number },
  pageWidth: number,
  margin: number
) => {
  // Reuse modern template logic with slight modifications
  generateModernPDF(doc, data, colors, pageWidth, margin);
};
