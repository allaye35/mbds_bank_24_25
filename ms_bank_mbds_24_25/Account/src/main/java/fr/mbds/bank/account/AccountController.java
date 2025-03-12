package fr.mbds.bank.account;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;


import java.util.List;

@RestController
class AccountController {

    private  final AccountRepository accountRepository;

    @Autowired
    public AccountController(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    @GetMapping"/accounts")
    public List<Account> getAccounts() {
        return accountRepository.findAll();
    }


    @GetMapping("/account/{id}")
    public Account getAccount(@PathVariable Long id) {
        return accountRepository.findById(id).orElse(null);

    }

}
