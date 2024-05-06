export function isValidCSVrow(row) {
  return !!(row.Street && row.City && row['Zip Code']);
}
