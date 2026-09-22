// Put this file at: src/services/prescriptionUtils.js

const NESTED_KEYS = [
  "items",
  "prescription_items",
  "prescribed_medicines",
  "medicines",
  "prescriptions",
];

export const normalize = (value) =>
  (value ?? "").toString().trim().toLowerCase();

/**
 * Turns whatever /api/account/my-prescriptions/ returns into a flat list
 * of one entry per prescribed medicine:
 * { id, medicineId, name, pharmacyName, dosage, frequency, duration,
 *   quantity, instructions, doctorName, date }
 *
 * Handles both:
 *  - flat rows:      [{ medicine_name, dosage, ... }]
 *  - nested records: [{ doctor_name, items: [{ medicine, dosage, ... }] }]
 */
export function normalizePrescriptions(data) {
  const records = Array.isArray(data) ? data : data?.results ?? [];
  const flat = [];

  records.forEach((record, recordIndex) => {
    const nested = NESTED_KEYS.map((key) => record?.[key]).find(
      Array.isArray
    );
    const rows = nested ?? [record];

    rows.forEach((row, rowIndex) => {
      const med =
        row?.medicine && typeof row.medicine === "object"
          ? row.medicine
          : null;

      const medicineId =
        med?.id ??
        row?.medicine_id ??
        (typeof row?.medicine === "number" ||
        typeof row?.medicine === "string"
          ? row.medicine
          : null);

      const item = {
        id: `${record?.id ?? recordIndex}-${row?.id ?? rowIndex}`,
        medicineId,
        name: row?.medicine_name ?? med?.name ?? row?.name ?? "",
        pharmacyName:
          row?.pharmacy_name ?? med?.pharmacy_name ?? "",
        dosage: row?.dosage ?? "",
        frequency: row?.frequency ?? "",
        duration: row?.duration ?? "",
        quantity: row?.quantity ?? "",
        instructions: row?.instructions ?? row?.notes ?? "",
        doctorName: row?.doctor_name ?? record?.doctor_name ?? "",
        date:
          row?.appointment_date ?? record?.appointment_date ?? "",
      };

      if (item.name || item.medicineId !== null) {
        flat.push(item);
      } else {
        console.warn(
          "Prescription row has no medicine name or id:",
          row
        );
      }
    });
  });

  return flat;
}

/** Find the pharmacy medicine(s) a prescription item refers to. */
export function findMatchingMedicines(item, medicines) {
  if (item.medicineId !== null && item.medicineId !== undefined) {
    const byId = medicines.filter(
      (m) => String(m.id) === String(item.medicineId)
    );
    if (byId.length > 0) return byId;
  }

  const name = normalize(item.name);
  if (!name) return [];

  return medicines.filter((m) => normalize(m.name) === name);
}