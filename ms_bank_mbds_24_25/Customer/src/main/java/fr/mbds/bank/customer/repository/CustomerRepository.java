package fr.mbds.bank.customer.repository;

import fr.mbds.bank.customer.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;



@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {
}
