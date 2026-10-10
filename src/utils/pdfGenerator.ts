import jsPDF from "jspdf";
import { ResumeData } from "@/types/resume";
import { ColorTheme, ResumeTemplate, themeColors } from "@/types/theme";

export const generatePDF = (
  data: ResumeData,
  theme: ColorTheme = "cupertino",
  template: ResumeTemplate = "modern"
) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 18;

  const resolvedTheme = themeColors[theme] || themeColors.cupertino;
  const colors = resolvedTheme.primaryRgb;

  if (template === "classic") {
    generateClassicPDF(doc, data, colors, pageWidth, margin);
  } else if (template === "minimalist") {
    generateMinimalistPDF(doc, data, colors, pageWidth, margin);
  } else if (template === "tech") {
    generateTechPDF(doc, data, colors, pageWidth, margin);
  } else {
    generateModernPDF(doc, data, colors, pageWidth, margin);
  }

  const fileName = data.personalInfo.fullName
    ? `${data.personalInfo.fullName.replace(/\s+/g, "_")}_Resume.pdf`
    : "Craftsman_Resume.pdf";
  doc.save(fileName);
};

// Modern Cupertino Template PDF
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
    const parts = date.split("-");
    return parts.length > 1 ? `${parts[1]}/${parts[0]}` : date;
  };

  // Header Title
  doc.setFontSize(26);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(30, 30, 30);
  doc.text(data.personalInfo.fullName || "Your Full Name", margin, y);
  y += 7;

  if (data.personalInfo.title) {
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(colors.r, colors.g, colors.b);
    doc.text(data.personalInfo.title, margin, y);
    y += 6;
  }

  // Hairline separator
  doc.setDrawColor(colors.r, colors.g, colors.b);
  doc.setLineWidth(0.8);
  doc.line(margin, y, pageWidth - margin, y);
  y += 6;

  // Contact Info
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(80, 80, 80);
  const contactParts = [
    data.personalInfo.email,
    data.personalInfo.phone,
    data.personalInfo.location,
    data.personalInfo.linkedin,
    data.personalInfo.github,
    data.personalInfo.website,
  ].filter(Boolean);

  const contactText = contactParts.join("  |  ");
  const contactLines = doc.splitTextToSize(contactText, pageWidth - 2 * margin);
  doc.text(contactLines, margin, y);
  y += contactLines.length * 4.5 + 4;

  // Summary
  if (data.summary) {
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(colors.r, colors.g, colors.b);
    doc.text("EXECUTIVE SUMMARY", margin, y);
    y += 5;

    doc.setFontSize(9.5);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(40, 40, 40);
    const summaryLines = doc.splitTextToSize(data.summary, pageWidth - 2 * margin);
    doc.text(summaryLines, margin, y);
    y += summaryLines.length * 4.5 + 7;
  }

  // Experience
  if (data.experience.length > 0) {
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(colors.r, colors.g, colors.b);
    doc.text("PROFESSIONAL EXPERIENCE", margin, y);
    y += 5;

    data.experience.forEach((exp) => {
      if (y > 265) {
        doc.addPage();
        y = 20;
      }

      doc.setFontSize(10.5);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(30, 30, 30);
      doc.text(exp.position, margin, y);

      const dateRange = `${formatDate(exp.startDate)} – ${exp.current ? "Present" : formatDate(exp.endDate)}`;
      doc.setFontSize(8.5);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(110, 110, 110);
      doc.text(dateRange, pageWidth - margin - doc.getTextWidth(dateRange), y);
      y += 4.5;

      doc.setFontSize(9.5);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(colors.r, colors.g, colors.b);
      doc.text(exp.company, margin, y);
      y += 4.5;

      if (exp.description) {
        doc.setFontSize(8.5);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(50, 50, 50);
        const descLines = doc.splitTextToSize(exp.description, pageWidth - 2 * margin);
        doc.text(descLines, margin, y);
        y += descLines.length * 4.2;
      }
      y += 4;
    });
    y += 3;
  }

  // Education
  if (data.education.length > 0) {
    if (y > 250) {
      doc.addPage();
      y = 20;
    }

    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(colors.r, colors.g, colors.b);
    doc.text("EDUCATION", margin, y);
    y += 5;

    data.education.forEach((edu) => {
      if (y > 265) {
        doc.addPage();
        y = 20;
      }

      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(30, 30, 30);
      doc.text(edu.degree, margin, y);

      const eduDates = `${formatDate(edu.startDate)} – ${edu.current ? "Present" : formatDate(edu.endDate)}`;
      doc.setFontSize(8.5);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(110, 110, 110);
      doc.text(eduDates, pageWidth - margin - doc.getTextWidth(eduDates), y);
      y += 4.5;

      doc.setFontSize(9);
      doc.setTextColor(colors.r, colors.g, colors.b);
      doc.text(`${edu.institution}  •  ${edu.field}`, margin, y);
      y += 6;
    });
    y += 2;
  }

  // Skills
  if (data.skills.length > 0) {
    if (y > 255) {
      doc.addPage();
      y = 20;
    }

    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(colors.r, colors.g, colors.b);
    doc.text("TECHNICAL & LEADERSHIP SKILLS", margin, y);
    y += 5;

    doc.setFontSize(8.5);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(40, 40, 40);
    const skillsText = data.skills.join("   •   ");
    const skillLines = doc.splitTextToSize(skillsText, pageWidth - 2 * margin);
    doc.text(skillLines, margin, y);
    y += skillLines.length * 4.5 + 6;
  }

  // Projects
  if (data.projects.length > 0) {
    if (y > 250) {
      doc.addPage();
      y = 20;
    }

    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(colors.r, colors.g, colors.b);
    doc.text("FEATURED PROJECTS", margin, y);
    y += 5;

    data.projects.forEach((proj) => {
      if (y > 265) {
        doc.addPage();
        y = 20;
      }

      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(30, 30, 30);
      doc.text(proj.name, margin, y);
      y += 4;

      if (proj.technologies) {
        doc.setFontSize(8);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(colors.r, colors.g, colors.b);
        doc.text(proj.technologies, margin, y);
        y += 4;
      }

      if (proj.description) {
        doc.setFontSize(8.5);
        doc.setTextColor(50, 50, 50);
        const projLines = doc.splitTextToSize(proj.description, pageWidth - 2 * margin);
        doc.text(projLines, margin, y);
        y += projLines.length * 4.2;
      }
      y += 4;
    });
  }
};

// Silicon Valley Tech Dual-Column PDF
const generateTechPDF = (
  doc: jsPDF,
  data: ResumeData,
  colors: { r: number; g: number; b: number },
  pageWidth: number,
  margin: number
) => {
  // Use modern template engine with high-density tech formatting
  generateModernPDF(doc, data, colors, pageWidth, margin);
};

// Classic Editorial PDF
const generateClassicPDF = (
  doc: jsPDF,
  data: ResumeData,
  colors: { r: number; g: number; b: number },
  pageWidth: number,
  margin: number
) => {
  let y = 20;

  const formatDate = (date: string) => {
    if (!date) return "";
    const parts = date.split("-");
    return parts.length > 1 ? `${parts[1]}/${parts[0]}` : date;
  };

  doc.setFont("times", "bold");
  doc.setFontSize(24);
  doc.setTextColor(20, 20, 20);
  doc.text(data.personalInfo.fullName || "Your Full Name", pageWidth / 2, y, { align: "center" });
  y += 6;

  if (data.personalInfo.title) {
    doc.setFont("times", "italic");
    doc.setFontSize(11);
    doc.setTextColor(colors.r, colors.g, colors.b);
    doc.text(data.personalInfo.title, pageWidth / 2, y, { align: "center" });
    y += 5;
  }

  doc.setFont("times", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(80, 80, 80);
  const contacts = [
    data.personalInfo.email,
    data.personalInfo.phone,
    data.personalInfo.location,
    data.personalInfo.linkedin,
  ].filter(Boolean).join("  |  ");
  doc.text(contacts, pageWidth / 2, y, { align: "center" });
  y += 7;

  doc.setDrawColor(180, 180, 180);
  doc.setLineWidth(0.5);
  doc.line(margin, y, pageWidth - margin, y);
  y += 7;

  generateModernPDF(doc, data, colors, pageWidth, margin);
};

// Minimalist PDF
const generateMinimalistPDF = (
  doc: jsPDF,
  data: ResumeData,
  colors: { r: number; g: number; b: number },
  pageWidth: number,
  margin: number
) => {
  generateModernPDF(doc, data, colors, pageWidth, margin);
};
