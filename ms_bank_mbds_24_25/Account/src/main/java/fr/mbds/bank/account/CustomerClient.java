package fr.mbds.bank.account;

import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
import java.util.UUID;

@FeignClient(name = "CUSTOMER")
public interface CustomerClient {




    @GetMapping("/customers")
    @CircuitBreaker(name = "customer", fallbackMethod = "getAllCustomers")
    public List<Customer> getCustomers();

    @GetMapping("/customer/{id}")
    @CircuitBreaker(name = "customer", fallbackMethod = "getDefaultCustomer")
    public Customer getCustomer(@PathVariable("id") Long id);


    default Customer getDefaultCustomer(Long id, Exception exception)
    {
        Customer customer = new Customer();
        customer.setId(id);
        customer.setFirstName("Not available");
        customer.setLastName("Not available");
        customer.setEmail("Not available");
        return customer;
    }
    default List<Customer> getAllCustomers(Exception exception)
    {
        return List.of();
    }

}
