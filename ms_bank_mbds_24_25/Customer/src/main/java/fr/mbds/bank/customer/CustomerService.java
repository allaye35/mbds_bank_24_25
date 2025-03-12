package fr.mbds.bank.customer;


import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;


import java.util.List;


@Service
public class CustomerService {
    CustomerRepository customerRepository;

    public CustomerService(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }
    public Customer getCustomer(@PathVariable Long id) {
        return customerRepository.findById(id).orElse(null);

    }

    public List<Customer> getCustomers(){
        return customerRepository.findAll();
    }



}