// Helper to parse float safely
function parseValue(val) {
  const n = parseFloat(val.replace(/[^0-9.]/g, ''));
  return isNaN(n) ? 0 : n;
}

function formatCurrency(num) {
  return '$' + num.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function recalcInvoice() {
  const rows = document.querySelectorAll('#invoice-body tr');
  let subtotal = 0;

  rows.forEach(row => {
    const qtyCell = row.querySelector('.qty');
    const rateCell = row.querySelector('.rate');
    const amountCell = row.querySelector('.amount');

    // Clean inputs and parse numbers
    let qty = parseValue(qtyCell.textContent.trim());
    let rate = parseValue(rateCell.textContent.trim());

    if (qty < 0) qty = 0;
    if (rate < 0) rate = 0;

    // Update amount
    const amount = qty * rate;
    amountCell.textContent = formatCurrency(amount);

    subtotal += amount;
  });

  const downpayment = subtotal * 0.25;
  const balance = subtotal - downpayment;

  document.getElementById('subtotal').textContent = formatCurrency(subtotal);
  document.getElementById('downpayment').textContent = formatCurrency(downpayment);
  document.getElementById('balance').textContent = formatCurrency(balance);
}

// Listen for changes on qty and rate cells (contenteditable)
document.querySelectorAll('.qty, .rate').forEach(cell => {
  cell.addEventListener('input', () => {
    recalcInvoice();
  });
});

// Initial calc on page load
window.addEventListener('DOMContentLoaded', () => {
  recalcInvoice();
});
