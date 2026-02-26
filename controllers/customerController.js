import Customer from '../models/customer.js';

export async function AddCustomer(req, res) {
  try {
    let customerId = "0001";
    const lastCustomer = await Customer.findOne().sort({ createdAt: -1 });

    if (lastCustomer) {
      const lastId = parseInt(lastCustomer.customerId);
      customerId = String(lastId + 1).padStart(4, "0");
    }

    // NEVER store empty or null email
    if (!req.body.email || req.body.email.trim() === "") {
      delete req.body.email;
    }

    const customer = new Customer({
      customerId,
      ...req.body
    });

    await customer.save();

    res.status(200).json({ message: "Customer added successfully" });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({
        message: "Email already exists"
      });
    }
    res.status(500).json({ message: err.message });
  }
}

export async function GetCustomers(req, res) {
    const customers = await Customer.find();
    res.status(200).json(customers);
}

export async function GetCustomerById(req, res) {
    const customerId = req.params.customerId;
    const customer = await Customer.findOne({ customerId: customerId });
    if (!customer) {
        res.status(404).json({ message: 'Customer not found' });
    } else {
        res.status(200).json(customer);
    }
}

export async function UpdateCustomer(req, res) {
    const customerId = req.params.customerId;
    const { businessName, contactName, email, mobile, phone, address, discount, route, creditLimit, creditPeriod } = req.body;    
    const customer = await Customer.findOneAndUpdate({ customerId: customerId }, { businessName, contactName, email, mobile, phone, address, discount, route, creditLimit, creditPeriod }, { new: true });
    if (!customer) {
        res.status(404).json({ message: 'Customer not found' });
    } else {
        res.status(200).json(customer);
    }
}

export async function DeleteCustomer(req, res) {
    const customerId = req.params.customerId;
    const customer = await Customer.findOneAndDelete({ customerId: customerId });
    if (!customer) {
        res.status(404).json({ message: 'Customer not found' });
    } else {
        res.status(200).json({ message: 'Customer deleted successfully' });
    }
}

export async function AddCustomerBalance(req, res) {
  try {
    const { customerId } = req.params;
    const amount = Number(req.body.amount);

    if (isNaN(amount)) {
      return res.status(400).json({ message: "Invalid amount" });
    }

    const customer = await Customer.findOneAndUpdate(
      { customerId: customerId },   // ← IMPORTANT
      { $inc: { balance: amount } },
      { new: true }
    );

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.status(200).json(customer);
  } catch (error) {
    console.error("AddCustomerBalance ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
}

export async function ReduceCustomerBalance(req, res) {
    const customerId = req.params.customerId;
    const { amount } = req.body;
    const customer = await Customer.findOneAndUpdate({ customerId: customerId }, { $inc: { balance: -amount } }, { new: true });
    if (!customer) {
        res.status(404).json({ message: 'Customer not found' });
    } else {
        res.status(200).json(customer);
    }
}