package fr.mbds.bank.customer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
class CustomerController {
    private final CustomerService customerService;

    @Autowired
    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }


    @GetMapping("/customers")
    public List<Customer> getAllCustomers() {
        return customerService.getCustomers();
    }

    @GetMapping("/customer/{id}")
    public Customer getCustomerById(@PathVariable("id") Long id) {
        return customerService.getCustomer(id);
    }




}