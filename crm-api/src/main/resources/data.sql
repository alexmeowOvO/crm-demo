INSERT INTO customers (id, name, stage, owner) VALUES
  (1, 'Acme Mining',      'Qualified', 'J. Tan'),
  (2, 'Bluefin Drilling', 'Proposal',  'R. Lim'),
  (3, 'Cobalt Resources', 'Won',       'S. Ng');

INSERT INTO interactions (id, customer_id, interaction_date, type, note) VALUES
  (1, 1, '2026-08-14', 'Call',    'Discussed drilling volumes for Q4'),
  (2, 1, '2026-08-02', 'Email',   'Sent revised rate card'),
  (3, 2, '2026-08-20', 'Meeting', 'Presented proposal'),
  (4, 3, '2026-07-30', 'Call',    'Contract signed');