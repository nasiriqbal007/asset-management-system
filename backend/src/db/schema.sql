
CREATE TABLE departments (
  id SERIAL PRIMARY KEY,
  department_name TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO departments (department_name) 
VALUES 
  ('Engineering'),
  ('Product'),
  ('Design'),
  ('DevOps'),
  ('QA'),
  ('HR'),
  ('Finance'),
  ('Sales');
CREATE TABLE employees (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  role VARCHAR(50) DEFAULT 'employee',
  password TEXT NOT NULL,
department_id INT NOT NULL ,
  CONSTRAINT fk_department 
  FOREIGN KEY (department_id) 
  REFERENCES departments(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP DEFAULT NULL
);

CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    category_name TEXT NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO categories (category_name) 
VALUES 
  ('Laptop'),
  ('Monitor'),
  ('Keyboard'),
  ('Mouse'),
  ('Headphones'),
  ('Notebook');
  
DROP TYPE IF EXISTS asset_status CASCADE;
CREATE TYPE asset_status AS ENUM (
    'available',
    'allocated',
    'damaged',
    'retired'
);


CREATE TABLE assets(
    id SERIAL PRIMARY KEY,
    asset_name TEXT NOT NULL,
    image_url TEXT,
    serial_number TEXT NOT NULL UNIQUE,
    category_id INT NOT NULL,
    purchase_date DATE NOT NULL,
    status asset_status NOT NULL DEFAULT 'available',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP DEFAULT NULL,
    CONSTRAINT fk_category
        FOREIGN KEY (category_id)
        REFERENCES categories(id)
);

DROP TYPE IF EXISTS req_status CASCADE;
CREATE TYPE req_status AS ENUM(
  'pending',
  'approved',
  'rejected'
);
CREATE TABLE asset_requests(
  id SERIAL PRIMARY KEY,
  employee_id INT NOT NULL,
  asset_id INT NOT NULL, 
  request_reason TEXT NOT NULL,
  status req_status NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_employee FOREIGN KEY (employee_id)
  REFERENCES employees(id),
  CONSTRAINT fk_asset FOREIGN KEY (asset_id)
  REFERENCES assets(id)
);

CREATE TABLE asset_allocations(
  id SERIAL PRIMARY KEY,
  employee_id INT NOT NULL,
  asset_id INT NOT NULL,
  allocated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  returned_date TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_employee
        FOREIGN KEY (employee_id)
        REFERENCES employees(id),
  CONSTRAINT fk_asset
        FOREIGN KEY (asset_id)
        REFERENCES assets(id)
);

CREATE TABLE activity_logs(
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id INT NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_user
        FOREIGN KEY (user_id)
        REFERENCES employees(id)
);