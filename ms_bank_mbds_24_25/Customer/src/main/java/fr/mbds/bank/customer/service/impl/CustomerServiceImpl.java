package fr.mbds.bank.customer.service.impl;

import fr.mbds.bank.customer.Customer;
import fr.mbds.bank.customer.repository.CustomerRepository;
import fr.mbds.bank.customer.dto.CustomerDTO;
import fr.mbds.bank.customer.mapper.CustomerMapper;
import fr.mbds.bank.customer.service.CustomerService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CustomerServiceImpl implements CustomerService {
    private final CustomerRepository customerRepository;
    private final CustomerMapper customerMapper;

    public CustomerServiceImpl(CustomerRepository customerRepository, CustomerMapper customerMapper) {
        this.customerRepository = customerRepository;
        this.customerMapper = customerMapper;
    }

    @Override
    public List<CustomerDTO> getCustomers() {
        return customerRepository
                .findAll()
                .stream()
                .map(customerMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public CustomerDTO getCustomer(Long id) {
        Customer customer = customerRepository.findById(id).orElse(null);
        if (customer != null)
            return customerMapper.toDTO(customer);
        return null;
    }
}

