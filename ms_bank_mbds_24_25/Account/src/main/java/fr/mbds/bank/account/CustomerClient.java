package fr.mbds.bank.account;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
import java.util.UUID;

@FeignClient(name = "customer", url = "http://localhost:8080")
public interface CustomerClient {




    @GetMapping("/customers")
    public List<Customer> getCustomers();

    @GetMapping("/customer/{id}")
    public Customer getCustomer(@PathVariable("id") Long id);
}
