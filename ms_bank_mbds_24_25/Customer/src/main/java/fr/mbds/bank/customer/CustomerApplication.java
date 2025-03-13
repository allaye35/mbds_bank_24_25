package fr.mbds.bank.customer;

import fr.mbds.bank.customer.repository.CustomerRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.List;

@SpringBootApplication
public class CustomerApplication {

	public static void main(String[] args) {
		SpringApplication.run(CustomerApplication.class, args);

	}

	@Bean
	CommandLineRunner commandLineRunner(CustomerRepository customerRepository) {

		return args -> {
			List<Customer> customersList = List.of(
					Customer.builder()
							.firstName("Elodie").lastName("Bantos")
							.email("elodie.bantos@etu.univ-cotedazur.fr")
							.build(),
					Customer.builder()
							.firstName("Yue").lastName("Guo")
							.email("yue.guo@etu.univ-cotedazur.fr")
							.build(),
					Customer.builder()
							.firstName("Valeriia").lastName("Lapshina")
							.email("valeriia.lapshina@etu.univ-cotedazur.fr")
							.build(),
					Customer.builder()
							.firstName("Dounia").lastName("Zoubid")
							.email("dounia.zoubid@etu.univ-cotedazur.fr")
							.build()
			);
			customerRepository.saveAll(customersList);
		};
	}
}

