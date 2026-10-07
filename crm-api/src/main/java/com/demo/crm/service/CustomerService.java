package com.demo.crm.service;

import com.demo.crm.dto.CustomerDetailDto;
import com.demo.crm.dto.CustomerSummary;
import com.demo.crm.dto.InteractionDto;
import com.demo.crm.model.Customer;
import com.demo.crm.repository.CustomerRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class CustomerService {

    private final CustomerRepository customerRepository;

    public CustomerService(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    @Transactional(readOnly = true)
    public List<CustomerSummary> findAll() {
        return customerRepository.findAll().stream()
                .map(c -> new CustomerSummary(c.getId(), c.getName(), c.getStage()))
                .toList();
    }

    @Transactional(readOnly = true)
    public Optional<CustomerDetailDto> findById(Long id) {
        return customerRepository.findById(id).map(this::toDetail);
    }

    private CustomerDetailDto toDetail(Customer c) {
        List<InteractionDto> interactions = c.getInteractions().stream()
                .map(i -> new InteractionDto(
                        i.getDate() == null ? null : i.getDate().toString(),
                        i.getType(),
                        i.getNote()))
                .toList();
        return new CustomerDetailDto(c.getId(), c.getName(), c.getStage(), c.getOwner(), interactions);
    }
}