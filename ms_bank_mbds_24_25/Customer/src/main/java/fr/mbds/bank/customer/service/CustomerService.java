package fr.mbds.bank.customer.service;

import fr.mbds.bank.customer.dto.CustomerDTO;

import java.util.List;

public interface CustomerService {
    List<CustomerDTO> getCustomers();
    CustomerDTO getCustomer(Long id);
}