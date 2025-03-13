package fr.mbds.bank.account;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;


import java.util.List;

@RestController
class AccountController {

    private  final AccountRepository accountRepository;
    private  final CustomerClient customerClient;

    @Autowired
    public AccountController(AccountRepository accountRepository, CustomerClient customerClient) {
        this.accountRepository = accountRepository;
        this.customerClient = customerClient;
    }

    @GetMapping("/accounts")
    public List<Account> getALLAccounts() {
        List<Account> accountList =accountRepository.findAll();
        accountList.forEach(account -> {
            account.setCustomer(customerClient.getCustomer(account.getCustomerId()));

        });
        return accountList;

    }


    @GetMapping("/account/{id}")
    public Account getAccount(@PathVariable String id) {
        Account account = accountRepository.findById(id).orElse(null);
        if (account == null) {
            return null;
        }
        Customer customer = customerClient.getCustomer(account.getCustomerId());
        account.setCustomer(customer);
        return account;
    }

}


